"use client";

import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import PricingCard from "./PricingCard";
import ContactForm from "@/components/ui/ContactForm";
import { PricingTier } from "@/types";
import { cn } from "@/lib/utils";

const paketFriendlyName: Record<string, string> = {
  basis: "Homefin Basic (1,95%)",
  premium: "Homefin Premium+ (2,94%)",
  select: "Homefin Select (ab 89€)",
};

interface PricingSelectorProps {
  tiers: PricingTier[];
}

export default function PricingSelector({ tiers }: PricingSelectorProps) {
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const [view, setView] = useState<"cards" | "form">("cards");

  const selectedTier = tiers.find((t) => t.id === selectedTierId);

  function handleSelect(tierId: string) {
    setSelectedTierId(tierId);
    setAnimating(true);
    // Fade out cards
    setTimeout(() => {
      setView("form");
      // Fade in form after short delay
      setTimeout(() => setAnimating(false), 50);
    }, 300);
  }

  function handleBack() {
    setAnimating(true);
    // Fade out form
    setTimeout(() => {
      setView("cards");
      setSelectedTierId(null);
      // Fade in cards after short delay
      setTimeout(() => setAnimating(false), 50);
    }, 300);
  }

  return (
    <div className="relative">
      {/* Cards View */}
      {view === "cards" && (
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start transition-all duration-300",
            animating
              ? "opacity-0 scale-95 translate-y-4"
              : "opacity-100 scale-100 translate-y-0"
          )}
        >
          {tiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              onSelect={() => handleSelect(tier.id)}
            />
          ))}
        </div>
      )}

      {/* Form View */}
      {view === "form" && selectedTier && (
        <div
          className={cn(
            "max-w-2xl mx-auto transition-all duration-300",
            animating
              ? "opacity-0 scale-95 translate-y-4"
              : "opacity-100 scale-100 translate-y-0"
          )}
        >
          {/* Back button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-body hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Zurück zur Paketauswahl
          </button>

          {/* Selected package summary */}
          <div className="bg-gray-50 rounded-card p-5 mb-8 flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Check size={20} className="text-primary" />
            </div>
            <div>
              <div className="font-bold text-slate-dark">
                {selectedTier.name}
              </div>
              <div className="text-sm text-slate-body">
                {selectedTier.price} {selectedTier.priceNote}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-card shadow-card p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-dark mb-2">
              Anfrage für {selectedTier.name}
            </h3>
            <p className="text-sm text-slate-body mb-6">
              Füllen Sie das Formular aus und wir melden uns innerhalb von 24
              Stunden bei Ihnen.
            </p>
            <ContactForm
              paket={paketFriendlyName[selectedTier.id] || ""}
            />
          </div>
        </div>
      )}
    </div>
  );
}
