"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Download,
  GripVertical,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import type { Product } from "@/app/data/products";
import type { CatalogProduct } from "@/app/lib/products";
import { canOptimizeProductImage } from "@/app/lib/product-image";

type AdminProduct = Product & { lot: number };
type StorageUsage = {
  bucket: string;
  usedBytes: number;
  capacityBytes: number | null;
  remainingBytes: number | null;
};
type OfflineStatus = {
  enabled: boolean;
  bucket: string;
  generatedAt: string | null;
  count: number;
};
type EditorValue = {
  lot: string;
  name: string;
  code: string;
  currentBid: string;
  image: string;
  accent: string;
  description: string;
  details: string;
  specs: string;
};

const emptyEditor: EditorValue = {
  lot: "",
  name: "",
  code: "",
  currentBid: "0",
  image: "",
  accent: "#0f766e",
  description: "",
  details: "",
  specs: "",
};

function toEditorValue(product?: AdminProduct): EditorValue {
  if (!product) return emptyEditor;

  return {
    lot: String(product.lot),
    name: product.name,
    code: product.code,
    currentBid: product.currentBid,
    image: product.image,
    accent: product.accent,
    description: product.description,
    details: product.details.join("\n"),
    specs: product.specs
      .filter(([label]) => label.trim().toLowerCase() !== "lot")
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n"),
  };
}

function parseSpecs(value: string): Array<[string, string]> {
  return value
    .split("\n")
    .map((line) => {
      const separator = line.indexOf(":");
      if (separator < 0) return null;
      const label = line.slice(0, separator).trim();
      const specValue = line.slice(separator + 1).trim();
      return label && specValue ? ([label, specValue] as [string, string]) : null;
    })
    .filter((spec): spec is [string, string] => spec !== null);
}

async function responseError(response: Response) {
  const text = await response.text();
  try {
    const body = JSON.parse(text) as { error?: string };
    if (body.error) return body.error;
  } catch {
    // A route-level 404 or server error may return HTML instead of JSON.
  }

  return `The request failed (HTTP ${response.status}). Refresh the page and try again.`;
}

function formatStorage(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 100 ? 0 : 1)} ${units[unit]}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function exportProductsAsPdf(products: AdminProduct[]) {
  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) {
    window.alert("Allow pop-ups for this site to export the product list as a PDF.");
    return;
  }

  const rows = [...products]
    .sort((a, b) => a.lot - b.lot)
    .map(
      (product) => `
        <tr>
          <td>${product.lot}</td>
          <td>${escapeHtml(product.name)}</td>
          <td>$${escapeHtml(product.currentBid || "0")}</td>
        </tr>`
    )
    .join("");

  printWindow.document.write(`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Auction products</title>
        <style>
          @page { size: A4; margin: 16mm; }
          body { color: #101316; font: 14px Arial, sans-serif; }
          h1 { margin: 0 0 6px; font-size: 24px; }
          p { margin: 0 0 20px; color: #59636d; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 10px 12px; border: 1px solid #d9dfe2; text-align: left; }
          th { background: #f2f4f5; font-size: 12px; text-transform: uppercase; }
          tr { break-inside: avoid; }
          @media print { thead { display: table-header-group; } }
        </style>
      </head>
      <body>
        <h1>Auction products</h1>
        <p>${products.length} products</p>
        <table>
          <thead><tr><th>Lot</th><th>Name</th><th>Current bid</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <script>window.onload = () => { window.focus(); window.print(); };</script>
      </body>
    </html>`);
  printWindow.document.close();
}

function ProductEditor({
  product,
  saving,
  error,
  totalProducts,
  onClose,
  onSave,
}: {
  product?: AdminProduct;
  saving: boolean;
  error: string;
  totalProducts: number;
  onClose: () => void;
  onSave: (
    value: EditorValue,
    imageFile: File | null,
    onImageUploaded: (url: string) => void
  ) => void;
}) {
  const [value, setValue] = useState(() => toEditorValue(product));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");
  const [imageInputKey, setImageInputKey] = useState(0);

  function update<K extends keyof EditorValue>(key: K, next: EditorValue[K]) {
    setValue((current) => ({ ...current, [key]: next }));
  }

  function clearSelectedImage() {
    setImageFile(null);
    setImageInputKey((key) => key + 1);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(value, imageFile, (url) => {
      update("image", url);
      clearSelectedImage();
    });
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-[#101316] outline-none transition placeholder:text-[#9aa3aa] focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/15";
  const labelClass = "block text-sm font-medium text-[#303940]";

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#101316]/55 p-0 sm:items-center sm:p-5">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-editor-title"
        className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-[#f7f8fb] shadow-2xl sm:rounded-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              {product ? `Lot ${product.lot}` : "New auction item"}
            </p>
            <h2 id="product-editor-title" className="mt-1 text-xl font-semibold text-[#101316]">
              {product ? "Edit product" : "Add product"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="grid h-10 w-10 place-items-center rounded-lg border border-black/10 bg-white text-[#59636d] hover:bg-[#f2f4f5]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-5 p-5 sm:p-7">
          {!product && (
            <p className="rounded-lg border border-[#0f766e]/15 bg-[#0f766e]/5 px-4 py-3 text-sm leading-6 text-[#42645f]">
              This product will be added at the end of the list and assigned the next lot number automatically.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className={`${labelClass} sm:col-span-2`}>
              Product name <span className="text-red-600">*</span>
              <input
                required
                maxLength={180}
                value={value.name}
                onChange={(event) => update("name", event.target.value)}
                className={inputClass}
                placeholder="e.g. Oak coffee table"
              />
            </label>

            {product && (
              <label className={labelClass}>
                Lot number
                <input
                  type="number"
                  min="1"
                  max={totalProducts}
                  step="1"
                  required
                  value={value.lot}
                  onChange={(event) => update("lot", event.target.value)}
                  className={inputClass}
                />
                <span className="mt-1 block font-normal text-[#76818b]">
                  Moving this item renumbers the affected lots.
                </span>
              </label>
            )}
            <label className={labelClass}>
              Product code
              <input
                value={value.code}
                onChange={(event) => update("code", event.target.value)}
                className={inputClass}
                placeholder="Optional"
              />
            </label>
            <label className={labelClass}>
              Current bid ($)
              <input
                type="number"
                min="0"
                step="0.01"
                value={value.currentBid}
                onChange={(event) => update("currentBid", event.target.value)}
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              Image path or URL
              <input
                value={value.image}
                onChange={(event) => {
                  update("image", event.target.value);
                  clearSelectedImage();
                }}
                className={inputClass}
                placeholder="/products/item.jpg or https://…"
              />
            </label>
            <label className={labelClass}>
              Upload product image
              <input
                key={imageInputKey}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setImageError("");
                  if (file && file.size > 8 * 1024 * 1024) {
                    clearSelectedImage();
                    setImageError("Choose an image smaller than 8 MB.");
                    return;
                  }
                  setImageFile(file);
                }}
                className="mt-1 block w-full cursor-pointer rounded-lg border border-black/10 bg-white text-sm text-[#59636d] file:mr-3 file:border-0 file:bg-[#f2f4f5] file:px-3 file:py-2.5 file:text-sm file:font-medium file:text-[#303940]"
              />
              <span className="mt-1 block font-normal text-[#76818b]">
                JPG, PNG, WEBP, or GIF · max 8 MB. It uploads when you save.
              </span>
              {imageFile && (
                <span className="mt-2 flex items-center justify-between gap-2 rounded-md bg-[#0f766e]/5 px-3 py-2 text-xs text-[#42645f]">
                  <span className="truncate">Selected: {imageFile.name}</span>
                  <button
                    type="button"
                    onClick={clearSelectedImage}
                    className="shrink-0 font-semibold underline"
                  >
                    Clear
                  </button>
                </span>
              )}
            </label>
            <label className={labelClass}>
              Accent color
              <span className="mt-1 flex h-[42px] items-center gap-3 rounded-lg border border-black/10 bg-white px-3">
                <input
                  type="color"
                  value={/^#[0-9a-f]{6}$/i.test(value.accent) ? value.accent : "#0f766e"}
                  onChange={(event) => update("accent", event.target.value)}
                  className="h-7 w-9 cursor-pointer rounded border-0 bg-transparent p-0"
                  aria-label="Choose accent color"
                />
                <span className="text-sm text-[#59636d]">{value.accent}</span>
              </span>
            </label>

            <label className={`${labelClass} sm:col-span-2`}>
              Description
              <textarea
                rows={3}
                value={value.description}
                onChange={(event) => update("description", event.target.value)}
                className={inputClass}
                placeholder="Describe this auction item"
              />
            </label>

            <label className={labelClass}>
              Item details
              <span className="mt-1 block font-normal text-[#76818b]">
                One detail per line
              </span>
              <textarea
                rows={6}
                value={value.details}
                onChange={(event) => update("details", event.target.value)}
                className={inputClass}
                placeholder={"Condition: Like new\nIncludes: Original box"}
              />
            </label>
            <label className={labelClass}>
              Specifications
              <span className="mt-1 block font-normal text-[#76818b]">
                One “label: value” pair per line. Lot is managed by order.
              </span>
              <textarea
                rows={6}
                value={value.specs}
                onChange={(event) => update("specs", event.target.value)}
                className={inputClass}
                placeholder={"Included: Full set\nOrigin price: $50"}
              />
            </label>
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          {imageError && (
            <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {imageError}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-black/10 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-lg border border-black/10 bg-white px-5 text-sm font-medium text-[#303940] hover:bg-[#f2f4f5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="min-h-11 rounded-lg bg-[#0f766e] px-5 text-sm font-semibold text-white transition hover:bg-[#0d625b] disabled:cursor-wait disabled:opacity-60"
            >
              {saving ? "Saving…" : product ? "Save changes" : "Add product"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function LiveBidPanel({
  product,
  currentLot,
  totalProducts,
  auctionStatus,
  auctionBusy,
  auctionError,
  focusBidInput,
  onBidInputFocusChange,
  onBidSaved,
  onAuctionAction,
}: {
  product: AdminProduct;
  currentLot: number;
  totalProducts: number;
  auctionStatus: string;
  auctionBusy: boolean;
  auctionError: string;
  focusBidInput: boolean;
  onBidInputFocusChange: (productId: string, focused: boolean) => void;
  onBidSaved: (id: string, currentBid: string) => void;
  onAuctionAction: (lot: number, status: "stopped" | "sold") => void;
}) {
  const [draftBid, setDraftBid] = useState(product.currentBid);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  // Refs hold the newest values for timers and in-flight requests so fast
  // typing always wins: saves are serialized one at a time, a save never
  // clobbers newer keystrokes, and the last write carries the latest draft.
  const draftRef = useRef(product.currentBid);
  const lastSavedRef = useRef(product.currentBid);
  const dirtyRef = useRef(false);
  const saveTimerRef = useRef<number | null>(null);
  const inFlightRef = useRef(false);
  const requeueRef = useRef(false);

  const flushSave = useCallback(async () => {
    const bidText = draftRef.current;
    const bid = Number(bidText);

    if (bidText.trim() === "" || !Number.isFinite(bid) || bid < 0) return;
    if (bid === Number(lastSavedRef.current)) return;

    inFlightRef.current = true;
    setSaveStatus("saving");
    setError("");
    try {
      const response = await fetch(
        `/api/admin/products/${encodeURIComponent(product.id)}/bid`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ current_bid: bid }),
        }
      );

      if (!response.ok) throw new Error(await responseError(response));

      const result = (await response.json()) as { current_bid: string };
      lastSavedRef.current = result.current_bid;
      if (draftRef.current === result.current_bid) dirtyRef.current = false;
      onBidSaved(product.id, result.current_bid);
      setSaveStatus("saved");
    } catch (saveError) {
      setSaveStatus("error");
      setError(saveError instanceof Error ? saveError.message : "Could not save the bid.");
    } finally {
      inFlightRef.current = false;
      // The admin typed a new amount while this save was in flight; flush the
      // newest draft right away instead of leaving it behind.
      if (requeueRef.current) {
        requeueRef.current = false;
        void flushSave();
      }
    }
  }, [onBidSaved, product.id]);

  const scheduleSave = useCallback(() => {
    if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(() => {
      saveTimerRef.current = null;
      if (inFlightRef.current) {
        requeueRef.current = true;
        return;
      }
      void flushSave();
    }, 300);
  }, [flushSave]);

  useEffect(
    () => () => {
      if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current);
    },
    []
  );

  // Follow external bid changes (another admin or the SSE echo) only while the
  // admin is not mid-edit, so in-progress typing is never overwritten.
  useEffect(() => {
    if (!dirtyRef.current && product.currentBid !== draftRef.current) {
      draftRef.current = product.currentBid;
      lastSavedRef.current = product.currentBid;
      setDraftBid(product.currentBid);
      setSaveStatus("idle");
    }
  }, [product.currentBid]);

  return (
    <section className="mt-7 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      <div className="border-b border-black/[0.06] px-5 py-4 sm:px-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
          Live auction
        </p>
        <h2 className="mt-1 text-lg font-semibold text-[#101316]">
          Item currently on the screen
        </h2>
        <p className="mt-1 text-sm text-[#76818b]">
          This follows the current lot selected on the public auction screen.
        </p>
      </div>

      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.75fr)] lg:items-center">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative grid h-24 w-28 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#eef2f1] sm:h-32 sm:w-40">
            {product.image ? (
              <Image
                src={product.image}
                alt={`${product.name} product image`}
                fill
                unoptimized={!canOptimizeProductImage(product.image)}
                sizes="160px"
                className="object-contain p-2"
              />
            ) : (
              <span className="text-xs text-[#8a949c]">No image</span>
            )}
          </div>
          <div className="min-w-0">
            <span className="inline-flex rounded-md bg-[#101316] px-2.5 py-1 text-xs font-semibold text-white">
              LOT {currentLot}
            </span>
            <h3 className="mt-3 text-xl font-semibold leading-snug text-[#101316] sm:text-2xl">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-[#76818b]">{product.code || "No product code"}</p>
          </div>
        </div>

        <div className="rounded-xl bg-[#f7f8fb] p-5 sm:p-6">
          <label htmlFor="live-current-bid" className="block text-sm font-semibold text-[#303940]">
            Current bid ($)
          </label>
          <input
            id="live-current-bid"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={draftBid}
            autoFocus={focusBidInput}
            onFocus={() => onBidInputFocusChange(product.id, true)}
            onBlur={() => {
              // Save whatever is drafted immediately instead of waiting out
              // the debounce, so the display updates as soon as possible.
              if (saveTimerRef.current !== null) {
                window.clearTimeout(saveTimerRef.current);
                saveTimerRef.current = null;
                if (inFlightRef.current) {
                  requeueRef.current = true;
                } else {
                  void flushSave();
                }
              }
              if (draftRef.current === lastSavedRef.current) dirtyRef.current = false;
              onBidInputFocusChange(product.id, false);
            }}
            onChange={(event) => {
              const next = event.target.value;
              draftRef.current = next;
              dirtyRef.current = true;
              setDraftBid(next);
              setSaveStatus("idle");
              setError("");
              scheduleSave();
            }}
            className="mt-2 h-14 w-full rounded-lg border border-black/10 bg-white px-4 text-2xl font-semibold text-[#101316] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/15"
          />
          <div className="mt-3 flex min-h-5 items-center justify-between gap-3 text-xs">
            <span className="text-[#76818b]">Changes save automatically.</span>
            <span aria-live="polite" className="font-medium">
              {saveStatus === "saving" && <span className="text-[#0f766e]">Saving…</span>}
              {saveStatus === "saved" && <span className="text-[#0f766e]">Live · saved</span>}
              {saveStatus === "error" && <span className="text-red-700">Not saved</span>}
            </span>
          </div>
          {error && (
            <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="mt-6 border-t border-black/10 pt-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-[#303940]">Auction controls</h3>
              <span className={`text-xs font-semibold ${auctionStatus === "sold" ? "text-[#0f766e]" : "text-[#76818b]"}`}>
                {auctionStatus === "sold" ? "Marked SOLD" : "Bidding open"}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                type="button"
                disabled={auctionBusy || currentLot <= 1}
                onClick={() => onAuctionAction(currentLot - 1, "stopped")}
                className="inline-flex min-h-11 items-center justify-center gap-1 rounded-lg border border-black/10 bg-white px-2 text-xs font-semibold text-[#303940] hover:bg-[#f2f4f5] disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
              >
                <ArrowLeft size={15} /> Previous
              </button>
              <button
                type="button"
                disabled={auctionBusy || auctionStatus === "sold"}
                onClick={() => onAuctionAction(currentLot, "sold")}
                className="min-h-11 rounded-lg bg-[#0f766e] px-2 text-xs font-semibold text-white hover:bg-[#0d625b] disabled:cursor-not-allowed disabled:opacity-45 sm:text-sm"
              >
                {auctionBusy ? "Updating…" : "SOLD"}
              </button>
              <button
                type="button"
                disabled={auctionBusy || auctionStatus !== "sold" || currentLot >= totalProducts}
                onClick={() => onAuctionAction(currentLot + 1, "stopped")}
                className="inline-flex min-h-11 items-center justify-center gap-1 rounded-lg bg-[#101316] px-2 text-xs font-semibold text-white hover:bg-[#263039] disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
              >
                Next <ArrowRight size={15} />
              </button>
            </div>
            {auctionError && (
              <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {auctionError}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductAdmin({
  initialProducts,
  initialCurrentLot,
  initialAuctionStatus,
}: {
  initialProducts: CatalogProduct[];
  initialCurrentLot: number;
  initialAuctionStatus: string;
}) {
  const router = useRouter();
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [currentLot, setCurrentLot] = useState(initialCurrentLot);
  const [auctionStatus, setAuctionStatus] = useState(initialAuctionStatus);
  const [auctionBusy, setAuctionBusy] = useState(false);
  const [auctionError, setAuctionError] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "liveBid">("products");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [editorProduct, setEditorProduct] = useState<AdminProduct | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [productToDelete, setProductToDelete] = useState<AdminProduct | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);
  const [deleteAllError, setDeleteAllError] = useState("");
  const [editorError, setEditorError] = useState("");
  const [pageError, setPageError] = useState("");
  const [storageUsage, setStorageUsage] = useState<StorageUsage | null>(null);
  const [storageLoading, setStorageLoading] = useState(true);
  const [storageError, setStorageError] = useState("");
  const [focusedBidProductId, setFocusedBidProductId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [offlineStatus, setOfflineStatus] = useState<OfflineStatus | null>(null);
  const [offlineBusy, setOfflineBusy] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deletingSelected, setDeletingSelected] = useState(false);
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);
  const [bulkDeleteError, setBulkDeleteError] = useState("");
  // Newest bid timestamp per product, used to drop out-of-order SSE events.
  const lastBidAtRef = useRef(new Map<string, number>());

  const loadStorageUsage = useCallback(async () => {
    setStorageLoading(true);
    setStorageError("");
    try {
      const response = await fetch("/api/admin/products/storage", { cache: "no-store" });
      if (response.status === 401) {
        router.replace("/login?returnTo=%2Fadmin%2Fproducts");
        return;
      }
      if (!response.ok) throw new Error(await responseError(response));
      setStorageUsage((await response.json()) as StorageUsage);
    } catch (error) {
      setStorageError(error instanceof Error ? error.message : "Could not load storage usage.");
    } finally {
      setStorageLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadStorageUsage(), 0);
    return () => window.clearTimeout(timer);
  }, [loadStorageUsage]);

  const loadOfflineStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/offline", { cache: "no-store" });
      if (response.status === 401) {
        router.replace("/login?returnTo=%2Fadmin%2Fproducts");
        return;
      }
      if (!response.ok) throw new Error(await responseError(response));
      setOfflineStatus((await response.json()) as OfflineStatus);
    } catch {
      // The offline card just stays unknown when the status cannot load.
      setOfflineStatus(null);
    }
  }, [router]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadOfflineStatus(), 0);
    return () => window.clearTimeout(timer);
  }, [loadOfflineStatus]);

  async function downloadOfflineData() {
    if (offlineBusy) return;
    setOfflineBusy(true);
    setPageError("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/offline", { method: "POST" });
      if (response.status === 401) {
        router.replace("/login?returnTo=%2Fadmin%2Fproducts");
        return;
      }
      if (!response.ok) throw new Error(await responseError(response));

      const result = (await response.json()) as {
        count: number;
        warnings?: string[];
      };
      setNotice(
        `Offline auction data is ready: ${result.count} items with images stored on the server. /mazad and Live bid now work without Supabase.` +
          (result.warnings && result.warnings.length > 0
            ? ` Warnings: ${result.warnings.join(" ")}`
            : "")
      );
      await loadOfflineStatus();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not download the offline data.");
    } finally {
      setOfflineBusy(false);
    }
  }

  async function removeOfflineData() {
    if (offlineBusy) return;
    setOfflineBusy(true);
    setPageError("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/offline", { method: "DELETE" });
      if (response.status === 401) {
        router.replace("/login?returnTo=%2Fadmin%2Fproducts");
        return;
      }
      if (!response.ok) throw new Error(await responseError(response));

      setNotice("Offline mode is off. The live auction reads from Supabase again.");
      await loadOfflineStatus();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not remove the offline data.");
    } finally {
      setOfflineBusy(false);
    }
  }

  const updateLiveBid = useCallback((id: string, currentBid: string) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id ? { ...product, currentBid } : product
      )
    );
  }, []);

  async function updateAuction(lot: number, status: "stopped" | "sold") {
    if (auctionBusy) return;
    setAuctionBusy(true);
    setAuctionError("");
    try {
      const response = await fetch("/api/admin/auction", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_lot: lot, status }),
      });
      if (!response.ok) throw new Error(await responseError(response));

      const updated = (await response.json()) as { current_lot: number; status: string };
      setCurrentLot(updated.current_lot);
      setAuctionStatus(updated.status);
    } catch (error) {
      setAuctionError(error instanceof Error ? error.message : "Could not update auction controls.");
    } finally {
      setAuctionBusy(false);
    }
  }

  const liveProduct = products.find((product) => product.lot === currentLot) ?? products[0];

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setPageError("");
    try {
      const response = await fetch("/api/admin/products", { cache: "no-store" });
      if (response.status === 401) {
        router.replace("/login?returnTo=%2Fadmin%2Fproducts");
        return;
      }
      if (!response.ok) throw new Error(await responseError(response));
      const fetched = (await response.json()) as AdminProduct[];
      setProducts(fetched);
      setSelectedIds((current) => {
        const next = new Set([...current].filter((id) =>
          fetched.some((product) => product.id === id)
        ));
        return next.size === current.size ? current : next;
      });
      void loadStorageUsage();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not load products.");
    } finally {
      setLoading(false);
    }
  }, [loadStorageUsage, router]);

  useEffect(() => {
    const source = new EventSource("/api/auction/stream");

    source.onmessage = (message) => {
      let event: unknown;
      try {
        event = JSON.parse(message.data);
      } catch {
        return;
      }

      if (event && typeof event === "object" && "kind" in event) {
        if (event.kind === "bid" && "id" in event && typeof event.id === "string") {
          const updated = event as { id: string; lot?: number; currentBid?: string; at?: number };

          // Drop out-of-order bid events so an older save can never overwrite
          // a newer amount in the admin list either.
          const at = typeof updated.at === "number" ? updated.at : 0;
          const lastAt = lastBidAtRef.current.get(updated.id) ?? 0;
          if (at && at <= lastAt) return;
          if (at) lastBidAtRef.current.set(updated.id, at);

          setProducts((currentProducts) => {
            const index = currentProducts.findIndex((product) => product.id === updated.id);
            if (index < 0) return currentProducts;

            const existing = currentProducts[index];
            const product = {
              ...existing,
              lot: typeof updated.lot === "number" ? updated.lot : existing.lot,
              currentBid:
                updated.currentBid == null ? existing.currentBid : String(updated.currentBid),
            };
            const next = [...currentProducts];
            next[index] = product;

            return product.lot === existing.lot
              ? next
              : next.sort((a, b) => a.lot - b.lot);
          });
        }

        if (event.kind === "auction") {
          const updated = event as { currentLot?: number; status?: string };
          if (typeof updated.currentLot === "number") setCurrentLot(updated.currentLot);
          if (typeof updated.status === "string") setAuctionStatus(updated.status);
        }

        if (event.kind === "catalog") {
          void loadProducts();
        }
      }
    };

    return () => {
      source.close();
    };
  }, [loadProducts]);

  const visibleProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.code.toLowerCase().includes(term) ||
        String(product.lot).includes(term)
    );
  }, [products, query]);

  const selectedCount = selectedIds.size;
  const allVisibleSelected =
    visibleProducts.length > 0 && visibleProducts.every((product) => selectedIds.has(product.id));
  const someVisibleSelected = visibleProducts.some((product) => selectedIds.has(product.id));

  const selectAllRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someVisibleSelected && !allVisibleSelected;
    }
  });

  function toggleSelected(id: string, checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  function toggleSelectAll() {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (allVisibleSelected) {
        visibleProducts.forEach((product) => next.delete(product.id));
      } else {
        visibleProducts.forEach((product) => next.add(product.id));
      }
      return next;
    });
  }

  async function deleteSelectedProducts() {
    if (deletingSelected || selectedCount === 0) return;
    setDeletingSelected(true);
    setBulkDeleteError("");
    setPageError("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/products/bulk", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [...selectedIds] }),
      });
      if (response.status === 401) {
        router.replace("/login?returnTo=%2Fadmin%2Fproducts");
        return;
      }
      if (!response.ok) throw new Error(await responseError(response));

      const result = (await response.json()) as { deleted: number };
      setConfirmBulkDelete(false);
      setSelectedIds(new Set());
      setNotice(
        `${result.deleted} ${result.deleted === 1 ? "product was" : "products were"} deleted. Remaining lots were renumbered.`
      );
      await loadProducts();
    } catch (error) {
      setBulkDeleteError(error instanceof Error ? error.message : "Could not delete the selected products.");
    } finally {
      setDeletingSelected(false);
    }
  }

  function openCreate() {
    setEditorProduct(null);
    setEditorError("");
    setCreating(true);
  }

  function openEdit(product: AdminProduct) {
    setEditorProduct(product);
    setEditorError("");
    setCreating(false);
  }

  function closeEditor() {
    if (saving) return;
    setEditorProduct(null);
    setCreating(false);
    setEditorError("");
  }

  async function saveProduct(
    value: EditorValue,
    imageFile: File | null,
    onImageUploaded: (url: string) => void
  ) {
    setSaving(true);
    setEditorError("");

    const isEditing = Boolean(editorProduct);
    let image = value.image;
    try {
      if (imageFile) {
        const uploadForm = new FormData();
        uploadForm.set("file", imageFile);
        const uploadResponse = await fetch("/api/admin/products/upload", {
          method: "POST",
          body: uploadForm,
        });
        if (!uploadResponse.ok) throw new Error(await responseError(uploadResponse));
        const uploaded = (await uploadResponse.json()) as { url: string };
        image = uploaded.url;
        onImageUploaded(image);
        void loadStorageUsage();
      }

      const body = {
      ...(isEditing ? { lot: Number(value.lot) } : {}),
      name: value.name,
      code: value.code,
      current_bid: value.currentBid,
      image,
      accent: value.accent,
      description: value.description,
      details: value.details.split("\n").map((detail) => detail.trim()).filter(Boolean),
      specs: parseSpecs(value.specs),
      };

      const response = await fetch(
        isEditing
          ? `/api/admin/products/${encodeURIComponent(editorProduct!.id)}`
          : "/api/admin/products",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) throw new Error(await responseError(response));

      setEditorProduct(null);
      setCreating(false);
      setNotice(isEditing ? "Product changes saved." : "Product added to the auction.");
      await loadProducts();
    } catch (error) {
      setEditorError(error instanceof Error ? error.message : "Could not save product.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct() {
    if (!productToDelete || deleting) return;
    const product = productToDelete;
    setDeleting(true);
    setPageError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/products/${encodeURIComponent(product.id)}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(await responseError(response));
      setProductToDelete(null);
      setNotice(`“${product.name}” was deleted. Remaining lots were renumbered.`);
      await loadProducts();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not delete product.");
    } finally {
      setDeleting(false);
    }
  }

  async function deleteAllProducts() {
    if (deletingAll || products.length === 0) return;
    setDeletingAll(true);
    setDeleteAllError("");
    setPageError("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/products", { method: "DELETE" });
      if (!response.ok) throw new Error(await responseError(response));

      setConfirmDeleteAll(false);
      setProducts([]);
      setNotice("All products were deleted. The auction has been stopped.");
      await loadProducts();
    } catch (error) {
      setDeleteAllError(error instanceof Error ? error.message : "Could not delete all products.");
    } finally {
      setDeletingAll(false);
    }
  }

  async function persistOrder(nextProducts: AdminProduct[]) {
    if (savingOrder) return;
    const previous = products;
    const renumbered = nextProducts.map((product, index) => ({
      ...product,
      lot: index + 1,
      specs: [["Lot", String(index + 1)] as [string, string], ...product.specs.filter(([label]) => label.toLowerCase() !== "lot")],
    }));

    setProducts(renumbered);
    setSavingOrder(true);
    setPageError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: renumbered.map(({ id }) => id) }),
      });
      if (!response.ok) throw new Error(await responseError(response));
      setNotice("Product order saved. Lot numbers now match the list order.");
    } catch (error) {
      setProducts(previous);
      setPageError(error instanceof Error ? error.message : "Could not save product order.");
    } finally {
      setSavingOrder(false);
      setDraggedId(null);
    }
  }

  function moveProduct(productId: string, direction: -1 | 1) {
    if (query || savingOrder) return;
    const index = products.findIndex((product) => product.id === productId);
    const targetIndex = index + direction;
    if (index < 0 || targetIndex < 0 || targetIndex >= products.length) return;

    const next = [...products];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    void persistOrder(next);
  }

  function dropOnProduct(targetId: string) {
    if (!draggedId || draggedId === targetId || query || savingOrder) return;
    const next = [...products];
    const sourceIndex = next.findIndex((product) => product.id === draggedId);
    const targetIndex = next.findIndex((product) => product.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    void persistOrder(next);
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" }).catch(() => undefined);
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f7f8fb]">
      <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
              Auction control
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#101316] sm:text-4xl">
              Manage products
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#647079]">
              Edit your catalog, add new lots, and arrange the auction order. Lot numbers always follow the list position.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {activeTab === "products" && (
              <>
                <button
                  type="button"
                  onClick={() => exportProductsAsPdf(products)}
                  disabled={products.length === 0}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-4 text-sm font-semibold text-[#303940] shadow-sm transition hover:bg-[#f2f4f5] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Download size={16} /> Export PDF
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBulkDeleteError("");
                    setConfirmBulkDelete(true);
                  }}
                  disabled={selectedCount === 0 || deletingSelected || savingOrder}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 size={16} /> Delete selected ({selectedCount})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteAllError("");
                    setConfirmDeleteAll(true);
                  }}
                  disabled={products.length === 0 || deletingAll}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 size={16} /> Delete all items
                </button>
                <button
                  type="button"
                  onClick={openCreate}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0f766e] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d625b]"
                >
                  <Plus size={17} /> Add product
                </button>
              </>
            )}
            <button
              type="button"
              onClick={logout}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-4 text-sm font-medium text-[#303940] transition hover:bg-[#f2f4f5]"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

        <div role="tablist" aria-label="Admin tools" className="mt-7 flex gap-2 rounded-xl border border-black/10 bg-white p-1.5 shadow-sm sm:w-fit">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "products"}
            onClick={() => setActiveTab("products")}
            className={`min-h-10 rounded-lg px-4 text-sm font-semibold transition ${activeTab === "products" ? "bg-[#101316] text-white" : "text-[#59636d] hover:bg-[#f2f4f5]"}`}
          >
            Products
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "liveBid"}
            onClick={() => setActiveTab("liveBid")}
            className={`min-h-10 rounded-lg px-4 text-sm font-semibold transition ${activeTab === "liveBid" ? "bg-[#101316] text-white" : "text-[#59636d] hover:bg-[#f2f4f5]"}`}
          >
            Live bid
          </button>
        </div>

        {activeTab === "products" ? (
          <>
        <section
          aria-labelledby="image-storage-title"
          className="mt-7 rounded-xl border border-black/10 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 id="image-storage-title" className="text-sm font-semibold text-[#101316]">
                  Image storage
                </h2>
                <span className="text-xs text-[#76818b]">
                  {storageUsage ? `Bucket: ${storageUsage.bucket}` : "Product image bucket"}
                </span>
              </div>
              {storageLoading && !storageUsage ? (
                <p className="mt-3 text-sm text-[#76818b]">Checking bucket usage…</p>
              ) : storageError ? (
                <p role="alert" className="mt-3 text-sm text-red-700">{storageError}</p>
              ) : storageUsage ? (
                <>
                  {storageUsage.capacityBytes !== null && storageUsage.remainingBytes !== null ? (
                    <>
                      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-sm">
                        <p className="font-medium text-[#303940]">
                          {formatStorage(storageUsage.remainingBytes)} remaining
                        </p>
                        <p className="text-xs text-[#76818b]">
                          {formatStorage(storageUsage.usedBytes)} used of {formatStorage(storageUsage.capacityBytes)}
                        </p>
                      </div>
                      <div
                        role="progressbar"
                        aria-label="Image bucket storage used"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.min(
                          100,
                          Math.round((storageUsage.usedBytes / storageUsage.capacityBytes) * 100)
                        )}
                        className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#e8edec]"
                      >
                        <div
                          className={`h-full rounded-full transition-all ${storageUsage.usedBytes >= storageUsage.capacityBytes ? "bg-red-600" : "bg-[#0f766e]"}`}
                          style={{
                            width: `${Math.min(100, (storageUsage.usedBytes / storageUsage.capacityBytes) * 100)}%`,
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="mt-3 text-sm text-[#59636d]">
                      {formatStorage(storageUsage.usedBytes)} used. Set <code className="rounded bg-[#f2f4f5] px-1 py-0.5 text-xs">SUPABASE_PRODUCT_BUCKET_CAPACITY_MB</code> to show remaining capacity.
                    </p>
                  )}
                </>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => void loadStorageUsage()}
              disabled={storageLoading}
              className="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-xs font-semibold text-[#303940] hover:bg-[#f2f4f5] disabled:cursor-wait disabled:opacity-50"
            >
              <RefreshCw size={14} className={storageLoading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </section>

        <section
          aria-labelledby="offline-data-title"
          className="mt-7 rounded-xl border border-black/10 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <h2 id="offline-data-title" className="text-sm font-semibold text-[#101316]">
                Offline auction data
              </h2>
              <p className="mt-1 text-xs text-[#76818b]">
                Downloads every item and its image from Supabase onto this server. /mazad and Live bid
                then run from the local copy, so bid changes are instant and no internet is needed
                during the auction.
              </p>

              {offlineStatus === null ? (
                <p className="mt-3 text-sm text-[#76818b]">Checking offline data…</p>
              ) : offlineBusy ? (
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-[#0f766e]">
                  <RefreshCw size={14} className="animate-spin" />
                  Preparing offline data…
                </p>
              ) : offlineStatus.enabled ? (
                <p className="mt-3 text-sm text-[#0d625b]">
                  <span className="font-semibold">Ready.</span>{" "}
                  {offlineStatus.count} items stored on this server, generated{" "}
                  {offlineStatus.generatedAt
                    ? new Date(offlineStatus.generatedAt).toLocaleString()
                    : "—"}
                  . Regenerate after changing the catalog so the copy stays current.
                </p>
              ) : (
                <p className="mt-3 text-sm text-[#59636d]">
                  Not downloaded yet. Without it, the live auction needs an internet connection.
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void downloadOfflineData()}
                disabled={offlineBusy}
                className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-[#0f766e] px-3 text-xs font-semibold text-white hover:bg-[#0d625b] disabled:cursor-wait disabled:opacity-50"
              >
                <Download size={14} />
                {offlineStatus?.enabled ? "Update offline data" : "Download offline data"}
              </button>
              {offlineStatus?.enabled && (
                <button
                  type="button"
                  onClick={() => void removeOfflineData()}
                  disabled={offlineBusy}
                  className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-xs font-semibold text-[#303940] hover:bg-[#f2f4f5] disabled:cursor-wait disabled:opacity-50"
                >
                  <X size={14} /> Turn off
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-[#76818b]">Products</p>
            <p className="mt-2 text-2xl font-semibold text-[#101316]">{products.length}</p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-[#76818b]">First lot</p>
            <p className="mt-2 text-2xl font-semibold text-[#101316]">
              {products[0]?.name ?? "—"}
            </p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-[#76818b]">Last lot</p>
            <p className="mt-2 text-2xl font-semibold text-[#101316]">
              {products.at(-1)?.lot ?? "—"}
            </p>
          </div>
        </div>

        <div className="mt-7 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-black/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="font-semibold text-[#101316]">Auction products</h2>
              <p className="mt-1 text-xs text-[#76818b]">
                Drag rows to reorder, or use the arrows. Lots are updated when you save the order.
              </p>
            </div>
            <label className="relative block w-full sm:max-w-xs">
              <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a949c]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search name, code, or lot"
                className="h-10 w-full rounded-lg border border-black/10 bg-[#fbfcfd] pl-9 pr-3 text-sm outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/15"
              />
            </label>
          </div>

          {pageError && (
            <div role="alert" className="m-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {pageError}
            </div>
          )}
          {notice && !pageError && (
            <div role="status" className="m-4 rounded-lg bg-[#0f766e]/8 px-4 py-3 text-sm text-[#0d625b]">
              {notice}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black/10 bg-[#fbfcfd] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#76818b]">
                  <th className="w-10 px-4 py-3">
                    <input
                      ref={selectAllRef}
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleSelectAll}
                      disabled={loading || visibleProducts.length === 0}
                      aria-label="Select all visible products"
                      className="h-4 w-4 cursor-pointer accent-[#0f766e]"
                    />
                  </th>
                  <th className="w-24 px-4 py-3">Lot</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="w-32 px-4 py-3">Current bid</th>
                  <th className="w-32 px-4 py-3">Order</th>
                  <th className="w-36 px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center text-sm text-[#76818b]">
                      Loading products…
                    </td>
                  </tr>
                ) : visibleProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center text-sm text-[#76818b]">
                      {products.length ? "No products match your search." : "No products yet. Add your first product to get started."}
                    </td>
                  </tr>
                ) : (
                  visibleProducts.map((product) => {
                    const index = products.findIndex((item) => item.id === product.id);
                    const canReorder = !query && !savingOrder;
                    return (
                      <tr
                        key={product.id}
                        draggable={canReorder}
                        onDragStart={(event) => {
                          setDraggedId(product.id);
                          event.dataTransfer.effectAllowed = "move";
                          event.dataTransfer.setData("text/plain", product.id);
                        }}
                        onDragOver={(event) => {
                          if (!query && draggedId) event.preventDefault();
                        }}
                        onDrop={(event) => {
                          event.preventDefault();
                          dropOnProduct(product.id);
                        }}
                        onDragEnd={() => setDraggedId(null)}
                        className={`border-b border-black/[0.06] last:border-0 hover:bg-[#fbfcfd] ${selectedIds.has(product.id) ? "bg-[#0f766e]/[0.04]" : ""} ${draggedId === product.id ? "opacity-40" : ""}`}
                      >
                        <td className="px-4 py-3.5 align-middle">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(product.id)}
                            onChange={(event) => toggleSelected(product.id, event.target.checked)}
                            disabled={deletingSelected || loading}
                            aria-label={`Select ${product.name}`}
                            className="h-4 w-4 cursor-pointer accent-[#0f766e]"
                          />
                        </td>
                        <td className="px-4 py-3.5 align-middle">
                          <span className="inline-flex min-w-12 items-center justify-center rounded-md bg-[#101316] px-2 py-1.5 text-sm font-semibold text-white">
                            {product.lot}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex min-w-72 items-center gap-3">
                            <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-md bg-[#eef2f1]">
                              {product.image ? (
                                <Image
                                  src={product.image}
                                  alt=""
                                  fill
                                  sizes="56px"
                                  unoptimized={!canOptimizeProductImage(product.image)}
                                  className="object-contain p-1"
                                />
                              ) : (
                                <span className="grid h-full place-items-center text-[10px] text-[#8a949c]">No image</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-[#101316]">{product.name}</p>
                              <p className="mt-1 truncate text-xs text-[#76818b]">{product.code || "No product code"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-sm font-medium text-[#303940]">
                          ${Number(product.currentBid || 0).toFixed(2)}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={!canReorder || index === 0}
                              onClick={() => moveProduct(product.id, -1)}
                              aria-label={`Move ${product.name} up`}
                              title={query ? "Clear search to reorder" : "Move up"}
                              className="grid h-8 w-8 place-items-center rounded-md border border-black/10 bg-white text-[#59636d] hover:bg-[#f2f4f5] disabled:cursor-not-allowed disabled:opacity-35"
                            >
                              <ArrowUp size={15} />
                            </button>
                            <button
                              type="button"
                              disabled={!canReorder || index === products.length - 1}
                              onClick={() => moveProduct(product.id, 1)}
                              aria-label={`Move ${product.name} down`}
                              title={query ? "Clear search to reorder" : "Move down"}
                              className="grid h-8 w-8 place-items-center rounded-md border border-black/10 bg-white text-[#59636d] hover:bg-[#f2f4f5] disabled:cursor-not-allowed disabled:opacity-35"
                            >
                              <ArrowDown size={15} />
                            </button>
                            <span className="ml-1 hidden items-center gap-1 text-[11px] text-[#9aa3aa] lg:inline-flex">
                              <GripVertical size={14} /> drag
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openEdit(product)}
                              aria-label={`Edit ${product.name}`}
                              className="grid h-9 w-9 place-items-center rounded-md border border-black/10 bg-white text-[#59636d] transition hover:border-[#0f766e]/30 hover:bg-[#0f766e]/5 hover:text-[#0f766e]"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setProductToDelete(product)}
                              aria-label={`Delete ${product.name}`}
                              className="grid h-9 w-9 place-items-center rounded-md border border-black/10 bg-white text-[#59636d] transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {savingOrder && (
            <p className="border-t border-black/[0.06] px-5 py-3 text-xs font-medium text-[#0f766e]">
              Saving new order and updating lot numbers…
            </p>
          )}
        </div>
          </>
        ) : liveProduct ? (
          <LiveBidPanel
            // Remount only when the lot changes, not when the bid changes;
            // remounting on every bid reset the draft mid-typing and turned
            // quick edits into values like "10" or "1090".
            key={liveProduct.id}
            product={liveProduct}
            currentLot={currentLot}
            totalProducts={products.length}
            auctionStatus={auctionStatus}
            auctionBusy={auctionBusy}
            auctionError={auctionError}
            focusBidInput={focusedBidProductId === liveProduct.id}
            onBidInputFocusChange={(productId, focused) => {
              if (focused) {
                setFocusedBidProductId(productId);
              } else {
                setFocusedBidProductId((current) =>
                  current === productId ? null : current
                );
              }
            }}
            onBidSaved={updateLiveBid}
            onAuctionAction={(lot, status) => void updateAuction(lot, status)}
          />
        ) : (
          <div className="mt-7 rounded-xl border border-black/10 bg-white p-8 text-center text-sm text-[#76818b] shadow-sm">
            Add a product before using the live bid controls.
          </div>
        )}
      </section>

      {(creating || editorProduct) && (
        <ProductEditor
          key={editorProduct?.id ?? "new-product"}
          product={editorProduct ?? undefined}
          saving={saving}
          error={editorError}
          totalProducts={products.length}
          onClose={closeEditor}
          onSave={(value, imageFile, onImageUploaded) =>
            void saveProduct(value, imageFile, onImageUploaded)
          }
        />
      )}

      {productToDelete && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#101316]/55 p-4">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-product-title"
            aria-describedby="delete-product-description"
            aria-busy={deleting}
            className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-2xl sm:p-7"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-red-700">
              <Trash2 size={21} />
            </div>
            <h2 id="delete-product-title" className="mt-5 text-xl font-semibold text-[#101316]">
              Delete this product?
            </h2>
            <p id="delete-product-description" className="mt-2 text-sm leading-6 text-[#647079]">
              Delete <span className="font-semibold text-[#303940]">{productToDelete.name}</span>? This can’t be undone, and the remaining products will be renumbered.
            </p>

            {pageError && (
              <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {pageError}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={deleting}
                onClick={() => {
                  setProductToDelete(null);
                  setPageError("");
                }}
                className="min-h-11 rounded-lg border border-black/10 bg-white px-5 text-sm font-medium text-[#303940] hover:bg-[#f2f4f5] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={() => void deleteProduct()}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-700 px-5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-wait disabled:opacity-70"
              >
                {deleting ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                    Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 size={15} />
                    Delete product
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      )}

      {confirmBulkDelete && (
        <div className="fixed inset-0 z-[75] flex items-center justify-center bg-[#101316]/60 p-4">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-selected-title"
            aria-describedby="delete-selected-description"
            aria-busy={deletingSelected}
            className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-6 shadow-2xl sm:p-7"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-red-700">
              <Trash2 size={21} />
            </div>
            <h2 id="delete-selected-title" className="mt-5 text-xl font-semibold text-[#101316]">
              Delete selected products?
            </h2>
            <p id="delete-selected-description" className="mt-2 text-sm leading-6 text-[#647079]">
              This will permanently delete{" "}
              <span className="font-semibold text-red-700">
                {selectedCount} {selectedCount === 1 ? "product" : "products"}
              </span>{" "}
              with their uploaded images, and renumber the remaining lots. This can’t be undone.
            </p>

            {bulkDeleteError && (
              <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {bulkDeleteError}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={deletingSelected}
                onClick={() => setConfirmBulkDelete(false)}
                className="min-h-11 rounded-lg border border-black/10 bg-white px-5 text-sm font-medium text-[#303940] hover:bg-[#f2f4f5] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingSelected}
                onClick={() => void deleteSelectedProducts()}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-700 px-5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-wait disabled:opacity-70"
              >
                {deletingSelected ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                    Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 size={15} />
                    Delete {selectedCount === 1 ? "product" : `${selectedCount} products`}
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      )}

      {confirmDeleteAll && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#101316]/60 p-4">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-all-title"
            aria-describedby="delete-all-description"
            aria-busy={deletingAll}
            className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-6 shadow-2xl sm:p-7"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-red-700">
              <Trash2 size={21} />
            </div>
            <h2 id="delete-all-title" className="mt-5 text-xl font-semibold text-[#101316]">
              Delete all auction items?
            </h2>
            <p id="delete-all-description" className="mt-2 text-sm leading-6 text-[#647079]">
              This will permanently delete all <span className="font-semibold text-red-700">{products.length} products</span> from the database and stop the auction. This can’t be undone.
            </p>

            {deleteAllError && (
              <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {deleteAllError}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={deletingAll}
                onClick={() => setConfirmDeleteAll(false)}
                className="min-h-11 rounded-lg border border-black/10 bg-white px-5 text-sm font-medium text-[#303940] hover:bg-[#f2f4f5] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingAll}
                onClick={() => void deleteAllProducts()}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-700 px-5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-wait disabled:opacity-70"
              >
                {deletingAll ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                    Deleting all…
                  </>
                ) : (
                  <>
                    <Trash2 size={15} />
                    Delete all items
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
