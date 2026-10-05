import "server-only";

import { readFile } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve } from "node:path";
import type { CatalogProduct } from "@/app/lib/products";
import { getProductImagePath } from "@/app/lib/product-image-storage";
import { getSupabaseAdmin } from "@/app/lib/supabase-admin";

export const extensionByContentType: Record<string, string> = {
  "image/avif": "avif",
  "image/bmp": "bmp",
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/svg+xml": "svg",
  "image/webp": "webp",
};
export const allowedExtensions = new Set(Object.values(extensionByContentType));

export function getLocalImagePath(image: string) {
  if (!image.startsWith("/") || image.startsWith("//")) return null;

  let decodedPath: string;
  try {
    decodedPath = decodeURIComponent(image.split(/[?#]/, 1)[0]);
  } catch {
    return null;
  }

  const publicDirectory = resolve(process.cwd(), "public");
  const filePath = resolve(publicDirectory, decodedPath.replace(/^[/\\]+/, ""));
  const relativePath = relative(publicDirectory, filePath);
  if (!relativePath || relativePath.startsWith("..") || isAbsolute(relativePath)) return null;

  return { filePath, relativePath };
}

export function getImageExtension(path: string, contentType: string) {
  const pathExtension = extname(path).slice(1).toLowerCase();
  if (allowedExtensions.has(pathExtension)) return pathExtension;
  return extensionByContentType[contentType.split(";")[0].trim().toLowerCase()] ?? null;
}

export function safeProductFileName(product: CatalogProduct, extension: string) {
  const safeId = product.id.replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-|-$/g, "") || "product";
  return `${String(product.lot).padStart(3, "0")}-${safeId}.${extension}`;
}

export async function downloadProductImage(product: CatalogProduct, bucket: string) {
  if (!product.image) return null;

  const storagePath = getProductImagePath(product.image, bucket);
  if (storagePath) {
    const { data, error } = await getSupabaseAdmin().storage.from(bucket).download(storagePath);
    if (error || !data) {
      throw new Error(`Could not download the Supabase image for “${product.name}”.`);
    }

    const extension = getImageExtension(storagePath, data.type);
    if (!extension) throw new Error(`Unsupported image format for “${product.name}”.`);
    return {
      fileName: safeProductFileName(product, extension),
      bytes: new Uint8Array(await data.arrayBuffer()),
    };
  }

  const localImage = getLocalImagePath(product.image);
  if (localImage) {
    let bytes: Buffer;
    try {
      bytes = await readFile(localImage.filePath);
    } catch {
      throw new Error(`Could not read the local image for “${product.name}”.`);
    }

    const extension = getImageExtension(localImage.relativePath, "");
    if (!extension) throw new Error(`Unsupported image format for “${product.name}”.`);
    return {
      fileName: safeProductFileName(product, extension),
      bytes: new Uint8Array(bytes),
    };
  }

  throw new Error(
    `The image for “${product.name}” is not a product in the configured Supabase bucket or a local public image.`
  );
}
