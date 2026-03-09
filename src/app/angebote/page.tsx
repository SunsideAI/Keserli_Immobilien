import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import PropertyFilters from "@/components/properties/PropertyFilters";
import { fetchProperties } from "@/lib/propstack";

export const metadata: Metadata = {
  title: "Aktuelle Immobilienangebote – Häuser, Wohnungen & Grundstücke",
  description:
    "Entdecken Sie unsere aktuellen Immobilienangebote in Monheim am Rhein, Langenfeld, Leverkusen, Köln & Düsseldorf. Häuser, Wohnungen und Grundstücke zum Kauf.",
  keywords: [
    "Immobilien kaufen",
    "Haus kaufen Monheim",
    "Wohnung kaufen Langenfeld",
    "Grundstück kaufen",
    "Immobilienangebote Rheinland",
  ],
  alternates: { canonical: "https://www.myhomefin.de/angebote" },
  openGraph: {
    title: "Aktuelle Immobilienangebote | homefin GmbH",
    description: "Häuser, Wohnungen und Grundstücke in der Region Monheim, Langenfeld, Leverkusen, Köln & Düsseldorf.",
    url: "https://www.myhomefin.de/angebote",
    type: "website",
    locale: "de_DE",
    siteName: "homefin GmbH",
  },
};

export default async function AngebotePage() {
  const properties = await fetchProperties();

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
          <PropertyFilters properties={properties} />
        </Container>
      </section>
    </>
  );
}
