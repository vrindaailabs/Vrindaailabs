export default function Products() {

    const products = [
        {
            name: "AI HR",
            description: "Smart hiring, employee management and HR automation."
        },
        {
            name: "AI Finance",
            description: "Financial analytics, budgeting and intelligent reporting."
        },
        {
            name: "AI Hospital",
            description: "Healthcare automation, patient management and AI assistance."
        },
        {
            name: "AI Education",
            description: "Learning management and AI-powered education platform."
        },
        {
            name: "Business AI Assistant",
            description: "An intelligent assistant for business operations and productivity."
        },
        {
            name: "Enterprise Platform",
            description: "A unified platform connecting all AI products."
        }
    ];

    return (
        <section className="py-24">

            <div className="mx-auto max-w-7xl px-8">

                <div className="text-center">

                    <h2 className="text-4xl font-bold">
                        Our Product Vision
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Building intelligent products that solve real-world business challenges.
                    </p>

                </div>

                <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {products.map((product) => (

                        <div
                            key={product.name}
                            className="rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                🚀
                            </div>

                            <h3 className="text-xl font-bold">
                                {product.name}
                            </h3>

                            <p className="mt-3 text-gray-600">
                                {product.description}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}