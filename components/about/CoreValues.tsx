import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import { CONTENT } from "@/constants/content";

export default function CoreValues() {
  return (
    <section className="bg-gray-50 py-24">
      <Container>
        <SectionTitle
          title="Core Values"
          subtitle="The principles that guide everything we build."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {CONTENT.about.values.map((value) => (
            <Card key={value} className="text-center">
              <h3 className="text-xl font-semibold">
                {value}
              </h3>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}