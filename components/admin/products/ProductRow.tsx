"use client";

import type { Product } from "@/types/product";

interface ProductRowProps {

  product: Product;

  onEdit: (product: Product) => void;

  onDelete: (product: Product) => void;

}

export default function ProductRow({

  product,

  onEdit,

  onDelete,

}: ProductRowProps) {

  return (

    <tr className="border-b hover:bg-gray-50">

      <td className="p-4">

        {product.name}

      </td>

      <td className="p-4">

        {product.shortDescription}

      </td>

      <td className="p-4">

        <span
          className={`rounded-full px-3 py-1 text-sm ${
            product.active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >

          {product.active
            ? "Active"
            : "Inactive"}

        </span>

      </td>

      <td className="p-4">

        {new Date(product.createdAt)
          .toLocaleDateString()}

      </td>

      <td className="space-x-2 p-4">

        <button

          onClick={() => onEdit(product)}

          className="rounded bg-blue-600 px-3 py-2 text-white"

        >

          Edit

        </button>

        <button

          onClick={() => onDelete(product)}

          className="rounded bg-red-600 px-3 py-2 text-white"

        >

          Delete

        </button>

      </td>

    </tr>

  );

}