import type { Metadata } from "next";

import { productService } from "@/services/product.service";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response =
      await productService.getById(Number(id));

    const product = response.data;

    return {
      title: `${product.name} | Vrinda AI Labs`,
      description: product.shortDescription,
    };
  } catch {
    return {
      title: "Product | Vrinda AI Labs",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  let product;

  try {
    const response =
      await productService.getById(Number(id));

    product = response.data;
  } catch {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">

          <h1 className="text-3xl font-bold text-slate-900">
            Product Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            The product you are looking for does not exist.
          </p>

          <a
            href="/products"
            className="mt-8 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Products
          </a>

        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">

      {/* Hero */}

      <section className="bg-slate-50">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {product.name}
              </h1>

              <p className="mt-6 text-xl leading-8 text-gray-600">
                {product.shortDescription}
              </p>

            </div>

            {product.imageUrl && (
              <div className="overflow-hidden rounded-2xl shadow-lg">

                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full max-h-[450px] w-full object-cover"
                />

              </div>
            )}

          </div>

        </div>

      </section>

      {/* Description */}

      <section className="mx-auto max-w-4xl px-6 py-20">

        <h2 className="text-3xl font-bold text-slate-900">
          About This Product
        </h2>

        <div className="mt-8 whitespace-pre-line text-lg leading-8 text-gray-600">
          {product.description}
        </div>

        <div className="mt-12">

          <a
            href="/contact"
            className="inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Talk to Us
          </a>

        </div>

      </section>

    </main>
  );
}