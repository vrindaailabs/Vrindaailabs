"use client";

import { useEffect, useState } from "react";

import ProductTable from "@/components/admin/products/ProductTable";
import ProductDialog from "@/components/admin/products/ProductDialog";
import DeleteProductDialog from "@/components/admin/products/DeleteProductDialog";

import { productService } from "@/services/product.service";

import type {
  Product,
  ProductRequest,
} from "@/types/product";

export default function ProductsPage() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  useEffect(() => {

    let cancelled = false;

    async function fetchProducts() {

      try {

        const response =
          await productService.getAll();

        if (!cancelled) {

          setProducts(response.data);

        }

      } catch (error) {

        console.error(error);

      } finally {

        if (!cancelled) {

          setLoading(false);

        }

      }

    }

    fetchProducts();

    return () => {

      cancelled = true;

    };

  }, []);

  async function refreshProducts() {

    const response =
      await productService.getAll();

    setProducts(response.data);

  }

  function handleCreate() {

    setSelectedProduct(null);

    setDialogOpen(true);

  }

  function handleEdit(product: Product) {

    setSelectedProduct(product);

    setDialogOpen(true);

  }

  function handleDelete(product: Product) {

    setSelectedProduct(product);

    setDeleteOpen(true);

  }

  async function handleSubmit(
    request: ProductRequest
  ) {

    try {

      if (selectedProduct) {

        await productService.update(
          selectedProduct.id,
          request
        );

      } else {

        await productService.create(
          request
        );

      }

      setDialogOpen(false);

      await refreshProducts();

    } catch (error) {

      console.error(error);

    }

  }

  async function confirmDelete() {

    if (!selectedProduct) return;

    try {

      await productService.delete(
        selectedProduct.id
      );

      setDeleteOpen(false);

      await refreshProducts();

    } catch (error) {

      console.error(error);

    }

  }

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        Loading Products...

      </div>

    );

  }

  return (

    <div className="space-y-8 p-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Product Management

          </h1>

          <p className="mt-2 text-gray-500">

            Create, edit and delete products.

          </p>

        </div>

        <button
          onClick={handleCreate}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >

          + Add Product

        </button>

      </div>

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductDialog
        open={dialogOpen}
        product={selectedProduct}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />

      <DeleteProductDialog
        open={deleteOpen}
        product={selectedProduct}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />

    </div>

  );

}