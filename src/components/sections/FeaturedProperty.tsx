import { ArrowRight, Home, Maximize2, Calendar, Car } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ScrollAnimator from "@/components/ui/ScrollAnimator";
import { fetchProperties } from "@/lib/propstack";
import { formatCurrency } from "@/lib/utils";

export default async function FeaturedProperty() {
  const properties = await fetchProperties();
  const featured = properties.find((p) => p.featured) || properties[0];

  if (!featured) return null;

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
          <div className="bg-white rounded-card shadow-card overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto min-h-[300px] bg-primary/10">
                <img
                  src={featured.thumbnailImage}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  variant={featured.status === "Verfügbar" ? "success" : "neutral"}
                  className="absolute top-4 left-4"
                >
                  {featured.status}
                </Badge>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-slate-dark mb-2">
                  {featured.title}
                </h3>
                <p className="text-slate-body mb-6">{featured.shortDescription}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1 bg-mint text-primary text-sm rounded-full font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-100">
                  {featured.features.rooms > 0 && (
                    <div className="text-center">
                      <Home size={18} className="mx-auto text-primary mb-1" />
                      <div className="text-sm font-semibold text-slate-dark">
                        {featured.features.rooms} Zimmer
                      </div>
                    </div>
                  )}
                  {featured.features.livingArea > 0 && (
                    <div className="text-center">
                      <Maximize2 size={18} className="mx-auto text-primary mb-1" />
                      <div className="text-sm font-semibold text-slate-dark">
                        {featured.features.livingArea} m²
                      </div>
                    </div>
                  )}
                  {featured.features.yearBuilt && (
                    <div className="text-center">
                      <Calendar size={18} className="mx-auto text-primary mb-1" />
                      <div className="text-sm font-semibold text-slate-dark">
                        Bj. {featured.features.yearBuilt}
                      </div>
                    </div>
                  )}
                  {featured.features.garage && (
                    <div className="text-center">
                      <Car size={18} className="mx-auto text-primary mb-1" />
                      <div className="text-sm font-semibold text-slate-dark">
                        Garage
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-slate-body">
                      {featured.priceLabel || "Kaufpreis"}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {featured.price > 0 ? formatCurrency(featured.price) : "Preis auf Anfrage"}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button href={`/angebote/${featured.id}`} size="sm">
                      Exposé anfordern
                    </Button>
                    <Button href="/kontakt" variant="secondary" size="sm">
                      Besichtigung
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
