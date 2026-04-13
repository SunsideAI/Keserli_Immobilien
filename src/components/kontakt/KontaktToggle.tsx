"use client";

import { useState } from "react";
import { CalendarDays, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import ContactForm from "@/components/ui/ContactForm";
import CalEmbed from "@/components/ui/CalEmbed";

type Tab = "termin" | "nachricht";

export default function KontaktToggle() {
  const [tab, setTab] = useState<Tab>("termin");

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 rounded-btn p-1">
          <button
            onClick={() => setTab("termin")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-btn text-sm font-semibold transition-all duration-200",
              tab === "termin"
                ? "bg-primary text-white shadow-btn"
                : "text-slate-body hover:text-slate-dark"
            )}
          >
            <CalendarDays size={16} />
            Termin buchen
          </button>
          <button
            onClick={() => setTab("nachricht")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-btn text-sm font-semibold transition-all duration-200",
              tab === "nachricht"
                ? "bg-primary text-white shadow-btn"
                : "text-slate-body hover:text-slate-dark"
            )}
          >
            <Mail size={16} />
            Nachricht senden
          </button>
        </div>
      </div>

      {/* Content */}
      {tab === "termin" ? (
        <div>
          <h2 className="text-xl font-bold text-slate-dark mb-2 text-center">
            Termin vereinbaren
          </h2>
          <p className="text-sm text-slate-body mb-6 text-center">
            Wählen Sie einen passenden Termin für Ihr kostenloses Beratungsgespräch.
          </p>
          <CalEmbed />
        </div>
      ) : (
        <div className="bg-gray-50 rounded-card p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-dark mb-6">
            Nachricht senden
          </h2>
          <ContactForm />
        </div>
      )}
    </div>
  );
}
