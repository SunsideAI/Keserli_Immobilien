import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import PropertyFilters from "@/components/properties/PropertyFilters";

export const metadata: Metadata = {
  title: "Aktuelle Immobilienangebote",
  description:
    "Entdecken Sie unsere aktuellen Immobilienangebote in Monheim am Rhein, Langenfeld, Leverkusen, Köln & Düsseldorf. Häuser, Wohnungen und Grundstücke.",
};

export default function AngebotePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-mint-light to-mint py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              IMMOBILIEN
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-dark mb-6">
              Aktuelle{" "}
              <span className="text-primary">Immobilienangebote</span>
            </h1>
            <p className="text-lg text-slate-body">
              Finden Sie Ihre Traumimmobilie in der Region. Filtern Sie nach
              Typ, Lage und Preis.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-gray-50">
        <Container>
          <PropertyFilters />
        </Container>
      </section>
    </>
  );
}
