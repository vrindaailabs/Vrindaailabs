import type { Metadata } from "next";
import Link from "next/link";
import type { Product } from "@/types/product";
import Image from "next/image";

import { productService } from "@/services/product.service";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore AI products developed by Vrinda AI Labs.",
};

export default async function ProductsPage() {

  let products: Product[] = [];

  try {

    const response =
      await productService.getAll();

    products = response.data;

  } catch (error) {

    console.error(error);

  }

  return (

    <main className="min-h-screen bg-gray-50">

      <section className="bg-blue-700 py-20 text-white">

        <div className="mx-auto max-w-7xl px-6">

          <h1 className="text-5xl font-bold">

            Our Products

          </h1>

          <p className="mt-6 max-w-3xl text-xl text-blue-100">

            Discover AI-powered software products designed
            to automate business operations, improve
            productivity, and accelerate digital
            transformation.

          </p>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">

        {products.length === 0 ? (

          <div className="rounded-2xl border bg-white p-20 text-center shadow">

            <h2 className="text-3xl font-bold">

              No Products Available

            </h2>

            <p className="mt-4 text-gray-500">

              Products will appear here after they are
              created by the administrator.

            </p>

          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {products.map((product) => (

              <div
                key={product.id}
                className="overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-xl"
              >

                {product.imageUrl && (

                  <Image
                    src={product.imageUrl || "/images/product-placeholder.png"}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="h-60 w-full object-cover"
                  />

                )}

                <div className="p-6">

                  <h2 className="text-2xl font-bold">

                    {product.name}

                  </h2>

                  <p className="mt-4 text-gray-600">

                    {product.shortDescription}

                  </p>

                  <Link
                    href={`/products/${product.id}`}
                    className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                  >

                    Learn More

                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>

  );

}