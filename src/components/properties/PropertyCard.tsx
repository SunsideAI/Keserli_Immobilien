import Link from "next/link";
import { Home, Maximize2, MapPin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Property } from "@/types/property";
import { formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const statusVariant =
    property.status === "Verfügbar"
      ? "success"
      : property.status === "Reserviert"
      ? "gold"
      : "neutral";

  return (
    <Link
      href={`/angebote/${property.id}`}
      className="group block bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
    >
      {/* Image */}
      <div className="relative h-52 bg-primary/10 overflow-hidden">
        <img
          src={property.thumbnailImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge variant={statusVariant} className="absolute top-3 left-3">
          {property.status}
        </Badge>
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-primary font-bold text-sm px-3 py-1 rounded-full">
            {property.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-slate-dark mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-sm text-slate-body mb-3">
          <MapPin size={14} />
          <span>
            {property.address.zip} {property.address.city}
          </span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-body">
          {property.features.rooms > 0 && (
            <div className="flex items-center gap-1">
              <Home size={14} className="text-primary" />
              <span>{property.features.rooms} Zi.</span>
            </div>
          )}
          {property.features.livingArea > 0 && (
            <div className="flex items-center gap-1">
              <Maximize2 size={14} className="text-primary" />
              <span>{property.features.livingArea} m²</span>
            </div>
          )}
          {property.features.plotArea && property.features.plotArea > 0 && (
            <div className="flex items-center gap-1">
              <Maximize2 size={14} className="text-primary" />
              <span>{property.features.plotArea} m² Grund</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="pt-3 border-t border-gray-100">
          <div className="text-xl font-bold text-primary">
            {property.price > 0 ? formatCurrency(property.price) : "Preis auf Anfrage"}
          </div>
        </div>
      </div>
    </Link>
  );
}
