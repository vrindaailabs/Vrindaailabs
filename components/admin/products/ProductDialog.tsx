"use client";

import ProductForm from "./ProductForm";

import type {
  Product,
  ProductRequest,
} from "@/types/product";

interface ProductDialogProps {
  open: boolean;

  product?: Product | null;

  onClose: () => void;

  onSubmit: (
    request: ProductRequest
  ) => Promise<void>;
}

export default function ProductDialog({
  open,
  product,
  onClose,
  onSubmit,
}: ProductDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">

      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b bg-white p-6">

          <h2 className="text-2xl font-bold text-slate-900">
            {product
              ? "Edit Product"
              : "Create Product"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-3xl leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            ×
          </button>

        </div>

        {/* Scrollable Content */}

        <div className="min-h-0 flex-1 overflow-y-auto p-6">

          <ProductForm
            key={product?.id ?? "new"}
            initialData={product}
            onSubmit={onSubmit}
            onCancel={onClose}
          />

        </div>

      </div>

    </div>
  );
}