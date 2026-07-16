export default function Services() {

    const services = [
        {
            title: "AI Automation",
            description:
                "Automate repetitive business processes and save hundreds of working hours."
        },
        {
            title: "Custom Software",
            description:
                "Modern web and enterprise applications built for your business."
        },
        {
            title: "AI Chatbots",
            description:
                "24/7 intelligent assistants for customer support and internal teams."
        },
        {
            title: "Cloud Solutions",
            description:
                "Scalable cloud-native applications using modern architecture."
        }
    ];

    return (

        <section className="bg-gray-50 py-24">

            <div className="mx-auto max-w-7xl px-8">

                <h2 className="text-4xl font-bold text-center">
                    Our Services
                </h2>

                <p className="text-center mt-4 text-gray-600">
                    Helping businesses transform with software and AI.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

                    {services.map((service) => (

                        <div
                            key={service.title}
                            className="rounded-xl border bg-white p-8 shadow-sm hover:shadow-lg transition">

                            <h3 className="text-xl font-semibold">
                                {service.title}
                            </h3>

                            <p className="mt-4 text-gray-600">
                                {service.description}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );
}