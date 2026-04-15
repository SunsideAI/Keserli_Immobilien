import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ScrollAnimator from "@/components/ui/ScrollAnimator";
import PropertyCarousel from "./PropertyCarousel";
import { fetchProperties } from "@/lib/propstack";

export default async function FeaturedProperty() {
  const allProperties = await fetchProperties();
  // Take up to 3 properties for the carousel
  const properties = allProperties.slice(0, 3);

  if (properties.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <Container>
        <ScrollAnimator>
          <SectionHeading
            badge="IMMOBILIEN"
            title="Aktuelle Immobilienangebote"
            subtitle="Entdecken Sie unsere exklusiven Immobilien in der Region."
          />
        </ScrollAnimator>

        <ScrollAnimator>
          <PropertyCarousel properties={properties} />

          <div className="text-center mt-8">
            <Button href="/angebote" variant="ghost">
              Alle Angebote ansehen
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </ScrollAnimator>
      </Container>
    </section>
  );
}
