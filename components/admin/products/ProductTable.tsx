"use client";

import type { Product } from "@/types/product";

import ProductRow from "./ProductRow";

interface ProductTableProps {

  products: Product[];

  onEdit: (product: Product) => void;

  onDelete: (product: Product) => void;

}

export default function ProductTable({

  products,

  onEdit,

  onDelete,

}: ProductTableProps) {

  if (products.length === 0) {

    return (

      <div className="rounded-xl border bg-white p-12 text-center shadow">

        <h2 className="text-xl font-semibold">

          No Products Found

        </h2>

        <p className="mt-3 text-gray-500">

          Create your first product.

        </p>

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-xl border bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">

              Name

            </th>

            <th className="p-4 text-left">

              Short Description

            </th>

            <th className="p-4 text-left">

              Status

            </th>

            <th className="p-4 text-left">

              Created

            </th>

            <th className="p-4 text-center">

              Actions

            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <ProductRow

              key={product.id}

              product={product}

              onEdit={onEdit}

              onDelete={onDelete}

            />

          ))}

        </tbody>

      </table>

    </div>

  );

}