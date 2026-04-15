"use client";

import { useState } from "react";
import {
  Home,
  Maximize2,
  Calendar,
  Car,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn, formatCurrency } from "@/lib/utils";
import { Property } from "@/types/property";

function statusVariant(status: Property["status"]) {
  if (status === "Verfügbar") return "success" as const;
  if (status === "In Vorbereitung") return "primary" as const;
  if (status === "Reserviert") return "gold" as const;
  return "neutral" as const;
}

function CompactCard({
  property,
  onClick,
  side,
}: {
  property: Property;
  onClick: () => void;
  side: "left" | "right";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "hidden lg:flex flex-col bg-white rounded-card shadow-card overflow-hidden border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 w-full text-left",
        side === "left" ? "opacity-70 hover:opacity-100" : "opacity-70 hover:opacity-100"
      )}
    >
      <div className="relative h-40 bg-primary/10">
        <img
          src={property.thumbnailImage}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <Badge
          variant={statusVariant(property.status)}
          className="absolute top-3 left-3 text-xs"
        >
          {property.status}
        </Badge>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="text-sm font-bold text-slate-dark mb-1 line-clamp-2">
          {property.title}
        </h4>
        <div className="flex items-center gap-3 text-xs text-slate-body mb-3 mt-auto">
          {property.features.rooms > 0 && (
            <span className="flex items-center gap-1">
              <Home size={12} className="text-primary" />
              {property.features.rooms} Zi.
            </span>
          )}
          {property.features.livingArea > 0 && (
            <span className="flex items-center gap-1">
              <Maximize2 size={12} className="text-primary" />
              {property.features.livingArea} m²
            </span>
          )}
        </div>
        <div className="text-base font-bold text-primary">
          {property.price > 0 ? formatCurrency(property.price) : "Auf Anfrage"}
        </div>
      </div>
    </button>
  );
}

interface PropertyCarouselProps {
  properties: Property[];
}

export default function PropertyCarousel({ properties }: PropertyCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (properties.length === 0) return null;

  const featured = properties[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < properties.length - 1;
  const prevProperty = hasPrev ? properties[activeIndex - 1] : null;
  const nextProperty = hasNext ? properties[activeIndex + 1] : null;

  function goPrev() {
    if (hasPrev) setActiveIndex((i) => i - 1);
  }

  function goNext() {
    if (hasNext) setActiveIndex((i) => i + 1);
  }

  return (
    <div>
      {/* Three-column layout: prev | featured | next */}
      <div className="flex gap-4 items-stretch">
        {/* Left preview card */}
        <div className="hidden lg:flex w-56 flex-shrink-0">
          {prevProperty ? (
            <CompactCard property={prevProperty} onClick={goPrev} side="left" />
          ) : (
            <div className="w-full" />
          )}
        </div>

        {/* Main featured card */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-card shadow-card overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto min-h-[300px] bg-primary/10">
                <img
                  src={featured.thumbnailImage}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  variant={statusVariant(featured.status)}
                  className="absolute top-4 left-4"
                >
                  {featured.status}
                </Badge>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-slate-dark mb-2">
                  {featured.title}
                </h3>
                <p className="text-slate-body mb-6">
                  {featured.shortDescription}
                </p>

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
                      <Maximize2
                        size={18}
                        className="mx-auto text-primary mb-1"
                      />
                      <div className="text-sm font-semibold text-slate-dark">
                        {featured.features.livingArea} m²
                      </div>
                    </div>
                  )}
                  {featured.features.yearBuilt && (
                    <div className="text-center">
                      <Calendar
                        size={18}
                        className="mx-auto text-primary mb-1"
                      />
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
                      {featured.price > 0
                        ? formatCurrency(featured.price)
                        : "Preis auf Anfrage"}
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

          {/* Mobile navigation arrows + dots */}
          {properties.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-4 lg:hidden">
              <button
                onClick={goPrev}
                disabled={!hasPrev}
                className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {properties.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-colors",
                      i === activeIndex ? "bg-primary" : "bg-gray-300"
                    )}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                disabled={!hasNext}
                className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Right preview card */}
        <div className="hidden lg:flex w-56 flex-shrink-0">
          {nextProperty ? (
            <CompactCard
              property={nextProperty}
              onClick={goNext}
              side="right"
            />
          ) : (
            <div className="w-full" />
          )}
        </div>
      </div>

      {/* Desktop dots */}
      {properties.length > 1 && (
        <div className="hidden lg:flex items-center justify-center gap-2 mt-6">
          {properties.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors",
                i === activeIndex ? "bg-primary" : "bg-gray-300"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
