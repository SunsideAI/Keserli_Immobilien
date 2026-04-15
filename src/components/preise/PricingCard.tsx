"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { PricingTier } from "@/types";

interface PricingCardProps {
  tier: PricingTier;
  onSelect?: () => void;
}

export default function PricingCard({ tier, onSelect }: PricingCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "bg-white rounded-card p-6 sm:p-8 relative flex flex-col",
        tier.highlighted
          ? "ring-2 ring-primary shadow-card-hover scale-[1.02]"
          : "shadow-card border border-gray-100"
      )}
    >
      {/* Badges */}
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-2">
          <span className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
            EMPFOHLEN
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-slate-dark mb-2">{tier.name}</h3>
        <div className="text-4xl font-extrabold text-primary">{tier.price}</div>
        <div className="text-sm text-slate-body mt-1">{tier.priceNote}</div>
        {tier.badge && (
          <span className="inline-block mt-3 bg-gold-light text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            {tier.badge}
          </span>
        )}
        <p className="text-sm text-slate-body mt-3">{tier.description}</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6 flex-1">
        {tier.features.map((feature) => (
          <li key={feature.text} className="flex items-start gap-2">
            <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm text-slate-body">{feature.text}</span>
          </li>
        ))}

        {/* Expandable section */}
        {tier.expandable && expanded && (
          <>
            {tier.expandable.items.map((item) => (
              <li key={item.text} className="flex items-start gap-2">
                <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-body">{item.text}</span>
              </li>
            ))}
          </>
        )}
      </ul>

      {/* Expand toggle */}
      {tier.expandable && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center gap-1.5 text-sm text-primary font-semibold mb-6 hover:text-primary-800 transition-colors w-full"
        >
          {expanded ? "Weniger anzeigen" : tier.expandable.label}
          <ChevronDown
            size={16}
            className={cn(
              "transition-transform duration-200",
              expanded && "rotate-180"
            )}
          />
        </button>
      )}

      {/* Note */}
      {tier.note && (
        <p className="text-xs text-slate-body text-center mb-6 -mt-2">
          {tier.note}
        </p>
      )}

      {/* CTA */}
      <Button
        href={onSelect ? undefined : tier.ctaHref}
        onClick={onSelect}
        variant={tier.highlighted ? "primary" : "secondary"}
        className="w-full"
      >
        {tier.ctaText}
      </Button>
    </div>
  );
}
