import "server-only";

import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AuctionState, CatalogProduct, ProductRow } from "@/app/lib/products";
import { getAuctionState, getProducts, mapProductRow } from "@/app/lib/products";
import { downloadProductImage } from "@/app/lib/product-image-file";
import { getProductImagePath } from "@/app/lib/product-image-storage";

export type CatalogSource = "offline" | "supabase";

// A catalog row as stored in the snapshot. `image` is the path the app renders
// (a local copy under /offline/ when possible); `sourceImage` is the original
// database value, used to detect whether the local copy can be reused.
export type OfflineProduct = CatalogProduct & { sourceImage: string | null };

export type OfflineSnapshot = {
  version: 1;
  generatedAt: string;
  auction: AuctionState;
  products: OfflineProduct[];
};

const offlineDirectory = path.join(process.cwd(), "offline");
const snapshotFile = path.join(offlineDirectory, "snapshot.json");
const offlineImagesDirectory = path.join(process.cwd(), "public", "offline");

export function getBucketName() {
  return process.env.SUPABASE_PRODUCT_BUCKET || "mazad-bucket";
}

export async function readOfflineSnapshot(): Promise<OfflineSnapshot | null> {
  try {
    const content = await readFile(snapshotFile, "utf8");
    const parsed = JSON.parse(content) as OfflineSnapshot;
    if (parsed?.version !== 1 || !Array.isArray(parsed.products)) return null;
    if (!parsed.auction || typeof parsed.auction.current_lot !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function hasOfflineSnapshot() {
  return (await readOfflineSnapshot()) !== null;
}

async function writeSnapshotFile(snapshot: OfflineSnapshot) {
  await mkdir(offlineDirectory, { recursive: true });
  const tempFile = path.join(offlineDirectory, `snapshot.${Date.now()}.tmp.json`);
  await writeFile(tempFile, JSON.stringify(snapshot, null, 2), "utf8");
  await rename(tempFile, snapshotFile);
}

// Loads the catalog from the local snapshot when one exists, and falls back to
// Supabase otherwise. This lets the auction screens keep working when the
// internet is unavailable.
export async function loadCatalog(): Promise<{
  products: CatalogProduct[];
  auction: AuctionState;
  source: CatalogSource;
}> {
  const snapshot = await readOfflineSnapshot();

  if (snapshot) {
    return {
      products: snapshot.products.map((product) => ({
        id: product.id,
        lot: product.lot,
        name: product.name,
        code: product.code,
        currentBid: product.currentBid,
        image: product.image,
        accent: product.accent,
        description: product.description,
        details: product.details,
        specs: product.specs,
      })),
      auction: snapshot.auction,
      source: "offline",
    };
  }

  const [products, auction] = await Promise.all([getProducts(), getAuctionState()]);
  return { products, auction, source: "supabase" };
}

async function localizeImage(product: CatalogProduct, sourceImage: string | null) {
  const bucket = getBucketName();
  if (!sourceImage || !getProductImagePath(sourceImage, bucket)) {
    // Local public paths and external URLs are stored as-is; only Supabase
    // bucket images need a local copy to work offline.
    return product.image;
  }

  try {
    const downloaded = await downloadProductImage(product, bucket);
    if (!downloaded) return product.image;

    await mkdir(offlineImagesDirectory, { recursive: true });
    await writeFile(path.join(offlineImagesDirectory, downloaded.fileName), downloaded.bytes);
    return `/offline/${downloaded.fileName}`;
  } catch {
    // Keep the original URL when the copy fails; the image just will not be
    // available offline.
    return product.image;
  }
}

export type SyncOptions = {
  auction?: { current_lot?: number; status?: string };
  clampCurrentLot?: boolean;
};

// Replaces the snapshot product list with the given database rows, reusing the
// stored local image copy when the source image did not change.
export async function syncSnapshotProductRows(
  rows: ProductRow[],
  options: SyncOptions = {}
): Promise<boolean> {
  const snapshot = await readOfflineSnapshot();
  if (!snapshot) return false;

  const existingById = new Map(snapshot.products.map((product) => [product.id, product]));

  const products: OfflineProduct[] = [];
  for (const row of rows) {
    const mapped = mapProductRow(row);
    const existing = existingById.get(mapped.id);
    const sourceImage = row.image ?? null;

    let image = mapped.image;
    if (existing && existing.sourceImage === sourceImage) {
      image = existing.image;
    } else {
      image = await localizeImage(mapped, sourceImage);
    }

    products.push({ ...mapped, image, sourceImage });
  }

  let currentLot = options.auction?.current_lot ?? snapshot.auction.current_lot;
  const status = options.auction?.status ?? snapshot.auction.status;
  if (options.clampCurrentLot) {
    currentLot = products.length === 0 ? 1 : Math.min(currentLot, products.length);
  }

  await writeSnapshotFile({
    ...snapshot,
    products,
    auction: { current_lot: currentLot, status },
  });

  return true;
}

export async function appendSnapshotProduct(row: ProductRow): Promise<boolean> {
  const snapshot = await readOfflineSnapshot();
  if (!snapshot) return false;

  const mapped = mapProductRow(row);
  const sourceImage = row.image ?? null;
  const image = await localizeImage(mapped, sourceImage);

  await writeSnapshotFile({
    ...snapshot,
    products: [...snapshot.products, { ...mapped, image, sourceImage }],
  });

  return true;
}

export async function setSnapshotProductBid(
  id: string,
  currentBid: string
): Promise<{ lot: number; currentBid: string } | null> {
  const snapshot = await readOfflineSnapshot();
  if (!snapshot) return null;

  const product = snapshot.products.find((entry) => entry.id === id);
  if (!product) return null;

  await writeSnapshotFile({
    ...snapshot,
    products: snapshot.products.map((entry) =>
      entry.id === id ? { ...entry, currentBid } : entry
    ),
  });

  return { lot: product.lot, currentBid };
}

export async function applySnapshotAuction(currentLot: number, status: string): Promise<boolean> {
  const snapshot = await readOfflineSnapshot();
  if (!snapshot) return false;

  await writeSnapshotFile({
    ...snapshot,
    auction: { current_lot: currentLot, status },
  });

  return true;
}

export async function resetSnapshot(): Promise<boolean> {
  const snapshot = await readOfflineSnapshot();
  if (!snapshot) return false;

  await writeSnapshotFile({
    ...snapshot,
    products: [],
    auction: { current_lot: 1, status: "stopped" },
  });

  return true;
}

// Downloads the whole catalog with images from Supabase and returns the rows
// that make up a new snapshot. Any product whose image cannot be downloaded is
// reported through `warnings` and keeps its original image URL.
export async function buildOfflineSnapshotProducts(): Promise<{
  products: OfflineProduct[];
  warnings: string[];
}> {
  const catalog = await getProducts();
  const bucket = getBucketName();

  await rm(offlineImagesDirectory, { recursive: true, force: true });
  await mkdir(offlineImagesDirectory, { recursive: true });

  const warnings: string[] = [];

  const products = await Promise.all(
    catalog.map(async (product): Promise<OfflineProduct> => {
      const sourceImage = product.image || null;
      let image = product.image;

      if (sourceImage && getProductImagePath(sourceImage, bucket)) {
        try {
          const downloaded = await downloadProductImage(product, bucket);
          if (downloaded) {
            await writeFile(path.join(offlineImagesDirectory, downloaded.fileName), downloaded.bytes);
            image = `/offline/${downloaded.fileName}`;
          }
        } catch (error) {
          warnings.push(
            error instanceof Error ? error.message : `Could not copy the image for “${product.name}”.`
          );
        }
      }

      return { ...product, sourceImage, image };
    })
  );

  return { products, warnings };
}

export async function saveOfflineSnapshot(products: OfflineProduct[], auction: AuctionState) {
  const generatedAt = new Date().toISOString();
  const snapshot: OfflineSnapshot = {
    version: 1,
    generatedAt,
    auction,
    products,
  };

  await writeSnapshotFile(snapshot);
  return generatedAt;
}

export async function removeOfflineData() {
  await rm(snapshotFile, { force: true });
  await rm(offlineImagesDirectory, { recursive: true, force: true });
}
