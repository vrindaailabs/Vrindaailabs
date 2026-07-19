import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

import { CONTENT } from "@/constants/content";

export default function MissionVision() {
  return (
    <section className="py-24">
      <Container>
        <div className="grid gap-10 md:grid-cols-2">
          <Card>
            <h2 className="text-3xl font-bold">
              Our Mission
            </h2>

            <p className="mt-5 text-gray-600">
              {CONTENT.about.mission}
            </p>
          </Card>

          <Card>
            <h2 className="text-3xl font-bold">
              Our Vision
            </h2>

            <p className="mt-5 text-gray-600">
              {CONTENT.about.vision}
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}