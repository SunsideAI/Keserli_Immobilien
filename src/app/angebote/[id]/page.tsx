import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Home,
  Maximize2,
  Calendar,
  MapPin,
  Building2,
  Trees,
  Bath,
  BedDouble,
  Layers,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import ContactForm from "@/components/ui/ContactForm";
import PropertyMapWrapper from "@/components/properties/PropertyMapWrapper";
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

  const hasCoordinates = property.address.lat && property.address.lng;
  const hideExactLocation = !property.address.street;

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
                {property.subType && (
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary font-bold text-sm px-3 py-1 rounded-full">
                    {property.subType}
                  </span>
                )}
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
                        {property.address.district && ` (${property.address.district})`}
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
                    {property.pricePerSqm && property.pricePerSqm > 0 && (
                      <div className="text-sm text-slate-body mt-1">
                        {formatCurrency(Math.round(property.pricePerSqm))}/m²
                      </div>
                    )}
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

                {/* Key Features Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-btn">
                  {property.features.rooms > 0 && (
                    <FeatureItem icon={Home} label="Zimmer" value={`${property.features.rooms}`} />
                  )}
                  {property.features.livingArea > 0 && (
                    <FeatureItem icon={Maximize2} label="Wohnfläche" value={`${property.features.livingArea} m²`} />
                  )}
                  {property.features.plotArea && property.features.plotArea > 0 && (
                    <FeatureItem icon={Trees} label="Grundstück" value={`${property.features.plotArea} m²`} />
                  )}
                  {property.features.yearBuilt && (
                    <FeatureItem icon={Calendar} label="Baujahr" value={`${property.features.yearBuilt}`} />
                  )}
                  {property.features.bedrooms && (
                    <FeatureItem icon={BedDouble} label="Schlafzimmer" value={`${property.features.bedrooms}`} />
                  )}
                  {property.features.bathrooms && (
                    <FeatureItem icon={Bath} label="Badezimmer" value={`${property.features.bathrooms}`} />
                  )}
                  {property.features.floor !== undefined && property.features.floor > 0 && (
                    <FeatureItem icon={Layers} label="Etage" value={`${property.features.floor}. OG`} />
                  )}
                  {property.features.floors && (
                    <FeatureItem icon={Building2} label="Etagen" value={`${property.features.floors}`} />
                  )}
                </div>
              </div>

              {/* Detailed Info Table */}
              <div className="bg-white rounded-card shadow-card p-6">
                <h2 className="text-xl font-bold text-slate-dark mb-4">
                  Objektdetails
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  <DetailRow label="Objekttyp" value={`${property.type}${property.subType ? ` – ${property.subType}` : ""}`} />
                  {property.features.rooms > 0 && <DetailRow label="Zimmer" value={`${property.features.rooms}`} />}
                  {property.features.livingArea > 0 && <DetailRow label="Wohnfläche" value={`${property.features.livingArea} m²`} />}
                  {property.features.plotArea && property.features.plotArea > 0 && <DetailRow label="Grundstücksfläche" value={`${property.features.plotArea} m²`} />}
                  {property.features.bedrooms && <DetailRow label="Schlafzimmer" value={`${property.features.bedrooms}`} />}
                  {property.features.bathrooms && <DetailRow label="Badezimmer" value={`${property.features.bathrooms}`} />}
                  {property.features.floor !== undefined && property.features.floor > 0 && <DetailRow label="Etage" value={`${property.features.floor}. Obergeschoss`} />}
                  {property.features.yearBuilt && <DetailRow label="Baujahr" value={`${property.features.yearBuilt}`} />}
                  {property.features.condition && <DetailRow label="Zustand" value={property.features.condition} />}
                  {property.features.builtInKitchen && <DetailRow label="Einbauküche" value="Ja" />}
                  {property.features.balcony && <DetailRow label="Balkon" value={property.features.balconyArea ? `Ja (${property.features.balconyArea} m²)` : "Ja"} />}
                  {property.features.garden && <DetailRow label="Garten" value="Ja" />}
                  {property.features.elevator && <DetailRow label="Aufzug" value="Ja" />}
                  {property.features.cellar && <DetailRow label="Keller/Abstellraum" value="Ja" />}
                  {property.features.parkingType && <DetailRow label="Stellplatz" value={`${property.features.parkingType}${property.features.parkingSpaces ? ` (${property.features.parkingSpaces}x)` : ""}`} />}
                  {property.features.flooring && property.features.flooring.length > 0 && <DetailRow label="Bodenbelag" value={property.features.flooring.join(", ")} />}
                  {property.features.bathroomFeatures && property.features.bathroomFeatures.length > 0 && <DetailRow label="Bad" value={property.features.bathroomFeatures.join(", ")} />}
                  {property.freeFrom && <DetailRow label="Verfügbar ab" value={property.freeFrom} />}
                </div>
              </div>

              {/* Price & Commission */}
              {(property.price > 0 || property.courtage) && (
                <div className="bg-white rounded-card shadow-card p-6">
                  <h2 className="text-xl font-bold text-slate-dark mb-4">
                    Preisdetails
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {property.price > 0 && <DetailRow label={property.priceLabel || "Kaufpreis"} value={formatCurrency(property.price)} />}
                    {property.pricePerSqm && property.pricePerSqm > 0 && <DetailRow label="Preis pro m²" value={formatCurrency(Math.round(property.pricePerSqm))} />}
                    {property.courtage && <DetailRow label="Provision" value={`${property.courtage}${property.courtageNote ? ` ${property.courtageNote}` : ""}`} />}
                  </div>
                </div>
              )}

              {/* Energy */}
              {(property.features.energyClass || property.features.energyValue || property.features.heatingType) && (
                <div className="bg-white rounded-card shadow-card p-6">
                  <h2 className="text-xl font-bold text-slate-dark mb-4">
                    Energie & Heizung
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {property.features.energyCertificateType && <DetailRow label="Energieausweis" value={property.features.energyCertificateType} />}
                    {property.features.energyClass && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-slate-body">Energieeffizienzklasse</span>
                        <span className="font-semibold text-slate-dark">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                            {property.features.energyClass}
                          </span>
                        </span>
                      </div>
                    )}
                    {property.features.energyValue && <DetailRow label="Energieverbrauch" value={`${property.features.energyValue} kWh/(m²·a)`} />}
                    {property.features.heatingType && <DetailRow label="Heizungsart" value={property.features.heatingType} />}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="bg-white rounded-card shadow-card p-6">
                <h2 className="text-xl font-bold text-slate-dark mb-4">
                  Beschreibung
                </h2>
                <div className="text-slate-body leading-relaxed whitespace-pre-line">
                  {property.description}
                </div>
              </div>

              {/* Location Description */}
              {property.locationDescription && (
                <div className="bg-white rounded-card shadow-card p-6">
                  <h2 className="text-xl font-bold text-slate-dark mb-4">
                    Lage
                  </h2>
                  <div className="text-slate-body leading-relaxed whitespace-pre-line">
                    {property.locationDescription}
                  </div>
                </div>
              )}

              {/* Furnishing Description */}
              {property.furnishingDescription && (
                <div className="bg-white rounded-card shadow-card p-6">
                  <h2 className="text-xl font-bold text-slate-dark mb-4">
                    Ausstattung
                  </h2>
                  <div className="text-slate-body leading-relaxed whitespace-pre-line">
                    {property.furnishingDescription}
                  </div>
                </div>
              )}

              {/* Map */}
              {hasCoordinates && (
                <div className="bg-white rounded-card shadow-card p-6">
                  <h2 className="text-xl font-bold text-slate-dark mb-4">
                    Standort
                  </h2>
                  <PropertyMapWrapper
                    lat={property.address.lat!}
                    lng={property.address.lng!}
                    title={property.title}
                    city={property.address.city}
                    hideExactLocation={hideExactLocation}
                  />
                  {hideExactLocation && (
                    <p className="text-xs text-slate-body mt-2">
                      Die genaue Adresse wird nach einer Kontaktaufnahme mitgeteilt.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Form */}
              <div className="bg-white rounded-card shadow-card p-6 sticky top-24">
                <h3 className="text-lg font-bold text-slate-dark mb-2">
                  Interesse an dieser Immobilie?
                </h3>
                <p className="text-sm text-slate-body mb-4">
                  Kontaktieren Sie uns für ein Exposé oder einen
                  Besichtigungstermin.
                </p>

                {/* Quick Info */}
                <div className="bg-mint rounded-btn p-4 mb-6 space-y-2">
                  {property.price > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-body">{property.priceLabel || "Kaufpreis"}</span>
                      <span className="font-bold text-primary">{formatCurrency(property.price)}</span>
                    </div>
                  )}
                  {property.features.livingArea > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-body">Wohnfläche</span>
                      <span className="font-semibold text-slate-dark">{property.features.livingArea} m²</span>
                    </div>
                  )}
                  {property.features.rooms > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-body">Zimmer</span>
                      <span className="font-semibold text-slate-dark">{property.features.rooms}</span>
                    </div>
                  )}
                  {property.courtage && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-body">Provision</span>
                      <span className="font-semibold text-slate-dark">{property.courtage}</span>
                    </div>
                  )}
                </div>

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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-slate-body">{label}</span>
      <span className="font-semibold text-slate-dark text-right">{value}</span>
    </div>
  );
}
