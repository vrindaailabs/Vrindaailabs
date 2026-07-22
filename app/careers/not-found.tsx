import Link from "next/link";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center bg-slate-50 py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 text-8xl">🚫</div>

          <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-red-700">
            404 Error
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-slate-900 lg:text-6xl">
            Page Not Found
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Sorry, the page you are looking for does not exist, may have been
            moved, or the URL is incorrect.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="lg">
                Back to Home
              </Button>
            </Link>

            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Need Help?
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If you believe this is an error or need assistance finding the
              right information, our team is here to help.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}