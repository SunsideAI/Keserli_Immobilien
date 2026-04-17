"use client";

import { useState, useCallback, useRef } from "react";
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

/* ---------- Single property card (used for every slide) ---------- */
function PropertyCard({
  property,
  isActive,
  onClick,
}: {
  property: Property;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={!isActive ? onClick : undefined}
      className={cn(
        "bg-white rounded-card shadow-card overflow-hidden border border-gray-100 transition-all duration-500 h-full",
        !isActive && "cursor-pointer opacity-60 scale-[0.92] hover:opacity-80"
      )}
    >
      {/* Landscape card with image left, info right */}
      <div className={cn("grid h-full", isActive ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1")}>
        {/* Image */}
        <div className="relative bg-primary/10 overflow-hidden">
          <div className={cn(isActive ? "h-64 lg:h-full min-h-[300px]" : "h-48 lg:h-56")}>
            <img
              src={property.thumbnailImage}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          <Badge
            variant={statusVariant(property.status)}
            className="absolute top-3 left-3"
          >
            {property.status}
          </Badge>
        </div>

        {/* Info */}
        <div className={cn("flex flex-col", isActive ? "p-6 sm:p-8" : "p-4")}>
          <h3
            className={cn(
              "font-bold text-slate-dark mb-1",
              isActive ? "text-xl sm:text-2xl mb-2" : "text-sm line-clamp-2"
            )}
          >
            {property.title}
          </h3>

          {isActive && (
            <p className="text-slate-body mb-5 text-sm sm:text-base">
              {property.shortDescription}
            </p>
          )}

          {isActive && property.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
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

          {/* Stats row */}
          <div
            className={cn(
              "flex items-center gap-4",
              isActive
                ? "mb-5 pb-5 border-b border-gray-100 flex-wrap"
                : "mb-3 text-xs"
            )}
          >
            {property.features.rooms > 0 && (
              <div className={cn("flex items-center gap-1.5", isActive && "flex-col text-center")}>
                <Home size={isActive ? 18 : 14} className="text-primary" />
                <span className={cn("font-semibold text-slate-dark", isActive ? "text-sm" : "text-xs")}>
                  {property.features.rooms} {isActive ? "Zimmer" : "Zi."}
                </span>
              </div>
            )}
            {property.features.livingArea > 0 && (
              <div className={cn("flex items-center gap-1.5", isActive && "flex-col text-center")}>
                <Maximize2 size={isActive ? 18 : 14} className="text-primary" />
                <span className={cn("font-semibold text-slate-dark", isActive ? "text-sm" : "text-xs")}>
                  {property.features.livingArea} m²
                </span>
              </div>
            )}
            {isActive && property.features.yearBuilt && (
              <div className="flex flex-col items-center text-center">
                <Calendar size={18} className="text-primary" />
                <span className="text-sm font-semibold text-slate-dark">
                  Bj. {property.features.yearBuilt}
                </span>
              </div>
            )}
            {isActive && property.features.garage && (
              <div className="flex flex-col items-center text-center">
                <Car size={18} className="text-primary" />
                <span className="text-sm font-semibold text-slate-dark">Garage</span>
              </div>
            )}
          </div>

          {/* Price + CTAs */}
          <div className={cn("mt-auto", isActive ? "" : "")}>
            <div className={cn(isActive ? "text-sm" : "text-xs")} >
              <span className="text-slate-body">{property.priceLabel || "Kaufpreis"}</span>
            </div>
            <div
              className={cn(
                "font-bold text-primary",
                isActive ? "text-2xl" : "text-base"
              )}
            >
              {property.price > 0
                ? formatCurrency(property.price)
                : "Preis auf Anfrage"}
            </div>

            {isActive && (
              <div className="flex gap-3 mt-4">
                <Button href={`/angebote/${property.id}`} size="sm">
                  Exposé anfordern
                </Button>
                <Button href="/kontakt" variant="secondary" size="sm">
                  Besichtigung
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Carousel wrapper ---------- */
interface PropertyCarouselProps {
  properties: Property[];
}

export default function PropertyCarousel({ properties }: PropertyCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? properties.length - 1 : i - 1));
  }, [properties.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === properties.length - 1 ? 0 : i + 1));
  }, [properties.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null) return;
    const threshold = 50;
    if (touchDeltaX.current > threshold) goPrev();
    else if (touchDeltaX.current < -threshold) goNext();
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  if (properties.length === 0) return null;

  // Build the visible 3-card set (left, center, right) with wrapping
  const prevIndex =
    activeIndex === 0 ? properties.length - 1 : activeIndex - 1;
  const nextIndex =
    activeIndex === properties.length - 1 ? 0 : activeIndex + 1;

  // For single property, no carousel needed
  if (properties.length === 1) {
    return <PropertyCard property={properties[0]} isActive />;
  }

  return (
    <div className="relative">
      {/* ---- Desktop: 3-column layout with side peeks ---- */}
      <div
        className="hidden lg:grid lg:grid-cols-[1fr_3fr_1fr] gap-5 items-stretch touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <PropertyCard
          property={properties[prevIndex]}
          isActive={false}
          onClick={goPrev}
        />
        <PropertyCard property={properties[activeIndex]} isActive />
        <PropertyCard
          property={properties[nextIndex]}
          isActive={false}
          onClick={goNext}
        />
      </div>

      {/* ---- Mobile: single card with swipe area ---- */}
      <div
        className="lg:hidden touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <PropertyCard property={properties[activeIndex]} isActive />
      </div>

      {/* Navigation arrows (desktop) */}
      <button
        onClick={goPrev}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-11 h-11 rounded-full bg-white shadow-lg items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors z-10"
        aria-label="Vorherige Immobilie"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={goNext}
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-11 h-11 rounded-full bg-white shadow-lg items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors z-10"
        aria-label="Nächste Immobilie"
      >
        <ChevronRight size={22} />
      </button>

      {/* Navigation (all screens) */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={goPrev}
          className="lg:hidden w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-primary transition-colors hover:bg-primary hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {properties.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-8 h-2.5 bg-primary"
                  : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          className="lg:hidden w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-primary transition-colors hover:bg-primary hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
