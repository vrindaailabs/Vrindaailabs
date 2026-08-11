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

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-4xl rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">

            {product
              ? "Edit Product"
              : "Create Product"}

          </h2>

          <button

            onClick={onClose}

            className="text-3xl"

          >

            ×

          </button>

        </div>

        <div className="p-6">

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