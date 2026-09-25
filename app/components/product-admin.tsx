"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  GripVertical,
  LogOut,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import type { Product } from "@/app/data/products";
import type { CatalogProduct } from "@/app/lib/products";

type AdminProduct = Product & { lot: number };
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

export function ProductAdmin({ initialProducts }: { initialProducts: CatalogProduct[] }) {
  const router = useRouter();
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [editorProduct, setEditorProduct] = useState<AdminProduct | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [editorError, setEditorError] = useState("");
  const [pageError, setPageError] = useState("");
  const [notice, setNotice] = useState("");
  const [draggedId, setDraggedId] = useState<string | null>(null);

  async function loadProducts() {
    setLoading(true);
    setPageError("");
    try {
      const response = await fetch("/api/admin/products", { cache: "no-store" });
      if (response.status === 401) {
        router.replace("/login?returnTo=%2Fadmin%2Fproducts");
        return;
      }
      if (!response.ok) throw new Error(await responseError(response));
      setProducts((await response.json()) as AdminProduct[]);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not load products.");
    } finally {
      setLoading(false);
    }
  }

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

  async function deleteProduct(product: AdminProduct) {
    const confirmed = window.confirm(
      `Delete “${product.name}”? The remaining lots will be renumbered.`
    );
    if (!confirmed) return;

    setPageError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/products/${encodeURIComponent(product.id)}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(await responseError(response));
      setNotice(`“${product.name}” was deleted. Remaining lots were renumbered.`);
      await loadProducts();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not delete product.");
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
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0f766e] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d625b]"
            >
              <Plus size={17} /> Add product
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-4 text-sm font-medium text-[#303940] transition hover:bg-[#f2f4f5]"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

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
                    <td colSpan={5} className="px-5 py-16 text-center text-sm text-[#76818b]">
                      Loading products…
                    </td>
                  </tr>
                ) : visibleProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center text-sm text-[#76818b]">
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
                        className={`border-b border-black/[0.06] last:border-0 hover:bg-[#fbfcfd] ${draggedId === product.id ? "opacity-40" : ""}`}
                      >
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
                                  unoptimized
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
                              onClick={() => void deleteProduct(product)}
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
    </main>
  );
}
