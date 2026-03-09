import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Home,
  Maximize2,
  Calendar,
  Car,
  Zap,
  MapPin,
  Building2,
  Trees,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import ContactForm from "@/components/ui/ContactForm";
import { fetchProperty, fetchPropertyIds } from "@/lib/propstack";
import { formatCurrency } from "@/lib/utils";

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const ids = await fetchPropertyIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const property = await fetchProperty(params.id);
  if (!property) return { title: "Immobilie nicht gefunden" };

  return {
    title: property.title,
    description: property.shortDescription,
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const property = await fetchProperty(params.id);
  if (!property) notFound();

  const statusVariant =
    property.status === "Verfügbar"
      ? "success"
      : property.status === "Reserviert"
      ? "gold"
      : "neutral";

  return (
    <>
      <section className="bg-gray-50 py-6">
        <Container>
          <Link
            href="/angebote"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Zurück zu allen Angeboten
          </Link>
        </Container>
      </section>

      <section className="bg-gray-50 pb-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <div className="relative rounded-card overflow-hidden h-[400px] bg-primary/10">
                <img
                  src={property.images[0] || property.thumbnailImage}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  variant={statusVariant}
                  className="absolute top-4 left-4"
                >
                  {property.status}
                </Badge>
              </div>

              {/* Additional images */}
              {property.images.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {property.images.slice(1, 4).map((img, i) => (
                    <div
                      key={i}
                      className="h-32 rounded-card overflow-hidden bg-primary/10"
                    >
                      <img
                        src={img}
                        alt={`${property.title} ${i + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Title & Price */}
              <div className="bg-white rounded-card shadow-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-2 text-slate-body">
                      <MapPin size={16} />
                      <span>
                        {property.address.street && `${property.address.street}, `}
                        {property.address.zip} {property.address.city}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-body">
                      {property.priceLabel || "Kaufpreis"}
                    </div>
                    <div className="text-3xl font-extrabold text-primary">
                      {property.price > 0 ? formatCurrency(property.price) : "Preis auf Anfrage"}
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                {property.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {property.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 bg-mint text-primary text-sm rounded-full font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* Features Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-btn">
                  {property.features.rooms > 0 && (
                    <FeatureItem icon={Home} label="Zimmer" value={`${property.features.rooms}`} />
                  )}
                  {property.features.livingArea > 0 && (
                    <FeatureItem
                      icon={Maximize2}
                      label="Wohnfläche"
                      value={`${property.features.livingArea} m²`}
                    />
                  )}
                  {property.features.plotArea && property.features.plotArea > 0 && (
                    <FeatureItem
                      icon={Trees}
                      label="Grundstück"
                      value={`${property.features.plotArea} m²`}
                    />
                  )}
                  {property.features.yearBuilt && (
                    <FeatureItem
                      icon={Calendar}
                      label="Baujahr"
                      value={`${property.features.yearBuilt}`}
                    />
                  )}
                  {property.features.floors && (
                    <FeatureItem
                      icon={Building2}
                      label="Etagen"
                      value={`${property.features.floors}`}
                    />
                  )}
                  {property.features.garage && (
                    <FeatureItem icon={Car} label="Garage" value="Ja" />
                  )}
                  {property.features.energyClass && (
                    <FeatureItem
                      icon={Zap}
                      label="Energieklasse"
                      value={property.features.energyClass}
                    />
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-card shadow-card p-6">
                <h2 className="text-xl font-bold text-slate-dark mb-4">
                  Beschreibung
                </h2>
                <div className="text-slate-body leading-relaxed whitespace-pre-line">
                  {property.description}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-card shadow-card p-6 sticky top-24">
                <h3 className="text-lg font-bold text-slate-dark mb-4">
                  Interesse an dieser Immobilie?
                </h3>
                <p className="text-sm text-slate-body mb-6">
                  Kontaktieren Sie uns für ein Exposé oder einen
                  Besichtigungstermin.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function FeatureItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="text-center">
      <Icon size={18} className="mx-auto text-primary mb-1" />
      <div className="text-xs text-slate-body">{label}</div>
      <div className="text-sm font-semibold text-slate-dark">{value}</div>
    </div>
  );
}
