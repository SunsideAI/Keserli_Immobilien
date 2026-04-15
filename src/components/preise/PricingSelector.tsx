"use client";

import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import PricingCard from "./PricingCard";
import ContactForm from "@/components/ui/ContactForm";
import { PricingTier } from "@/types";

const paketFriendlyName: Record<string, string> = {
  basis: "Homefin Basis (1,95%)",
  premium: "Homefin Premium+ (2,49%)",
  select: "Homefin Select (ab 89€)",
};

interface PricingSelectorProps {
  tiers: PricingTier[];
}

export default function PricingSelector({ tiers }: PricingSelectorProps) {
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const selectedTier = tiers.find((t) => t.id === selectedTierId);

  if (selectedTier) {
    return (
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => setSelectedTierId(null)}
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
            <div className="font-bold text-slate-dark">{selectedTier.name}</div>
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
            Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>
          <ContactForm paket={paketFriendlyName[selectedTier.id] || ""} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
      {tiers.map((tier) => (
        <PricingCard
          key={tier.id}
          tier={tier}
          onSelect={() => setSelectedTierId(tier.id)}
        />
      ))}
    </div>
  );
}
