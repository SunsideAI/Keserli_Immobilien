"use client";

import { useState } from "react";
import {
  Home,
  Building2,
  LandPlot,
  Store,
  ChevronRight,
  ChevronLeft,
  Check,
  MapPin,
  Euro,
  Maximize2,
  BedDouble,
  Sparkles,
  User,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */

interface SearchProfile {
  // Step 1
  intention: "Kaufen" | "Mieten" | "";
  propertyType: string;
  // Step 2
  regions: string[];
  roomsMin: string;
  roomsMax: string;
  areaMin: string;
  areaMax: string;
  budgetMin: string;
  budgetMax: string;
  // Step 3
  features: string[];
  // Step 4
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

const INITIAL: SearchProfile = {
  intention: "",
  propertyType: "",
  regions: [],
  roomsMin: "",
  roomsMax: "",
  areaMin: "",
  areaMax: "",
  budgetMin: "",
  budgetMax: "",
  features: [],
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
};

/* ─── Options ─── */

const PROPERTY_TYPES = [
  { value: "Wohnung", label: "Wohnung", icon: Building2 },
  { value: "Haus", label: "Haus", icon: Home },
  { value: "Grundstück", label: "Grundstück", icon: LandPlot },
  { value: "Gewerbe", label: "Gewerbe", icon: Store },
];

const REGIONS = [
  "Monheim am Rhein",
  "Langenfeld (Rheinland)",
  "Leverkusen",
  "Köln",
  "Düsseldorf",
  "Hilden",
  "Dormagen",
  "Solingen",
  "Sonstige",
];

const FEATURES_WOHNUNG = [
  "Balkon",
  "Terrasse",
  "Einbauküche",
  "Aufzug",
  "Gäste-WC",
  "Keller",
  "Stellplatz/Garage",
  "Fußbodenheizung",
  "Parkett",
  "Barrierefrei",
];

const FEATURES_HAUS = [
  "Garten",
  "Garage",
  "Einbauküche",
  "Keller",
  "Terrasse",
  "Balkon",
  "Fußbodenheizung",
  "Kamin",
  "Pool",
  "Einliegerwohnung",
];

const FEATURES_GRUNDSTUECK = [
  "Erschlossen",
  "Baugenehmigung",
  "Eckgrundstück",
  "Südausrichtung",
  "Ruhige Lage",
  "Stadtrandlage",
];

const FEATURES_GEWERBE = [
  "Stellplätze",
  "Aufzug",
  "Klimaanlage",
  "Serverraum",
  "Lager",
  "Schaufenster",
];

function getFeaturesForType(type: string): string[] {
  switch (type) {
    case "Haus": return FEATURES_HAUS;
    case "Grundstück": return FEATURES_GRUNDSTUECK;
    case "Gewerbe": return FEATURES_GEWERBE;
    default: return FEATURES_WOHNUNG;
  }
}

const STEPS = [
  { label: "Art & Typ", short: "Art" },
  { label: "Kriterien", short: "Kriterien" },
  { label: "Ausstattung", short: "Extras" },
  { label: "Kontakt", short: "Kontakt" },
];

/* ─── Component ─── */

export default function SuchprofilFunnel() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<SearchProfile>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof SearchProfile>(key: K, value: SearchProfile[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleRegion(region: string) {
    setData((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }));
  }

  function toggleFeature(feature: string) {
    setData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  }

  function canAdvance(): boolean {
    if (step === 0) return data.intention !== "" && data.propertyType !== "";
    if (step === 1) return data.regions.length > 0;
    if (step === 2) return true;
    if (step === 3) return data.firstName !== "" && data.lastName !== "" && data.email !== "";
    return false;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");

    const descParts = [
      "Suchprofil über Website",
      `Intention: ${data.intention}`,
      `Immobilientyp: ${data.propertyType}`,
      `Regionen: ${data.regions.join(", ")}`,
    ];
    if (data.roomsMin || data.roomsMax) descParts.push(`Zimmer: ${data.roomsMin || "?"} – ${data.roomsMax || "?"}`);
    if (data.areaMin || data.areaMax) descParts.push(`Fläche: ${data.areaMin || "?"} – ${data.areaMax || "?"} m²`);
    if (data.budgetMin || data.budgetMax) descParts.push(`Budget: ${data.budgetMin || "?"} – ${data.budgetMax || "?"} €`);
    if (data.features.length > 0) descParts.push(`Ausstattung: ${data.features.join(", ")}`);
    if (data.notes) descParts.push(`Anmerkungen: ${data.notes}`);

    try {
      const res = await fetch("/.netlify/functions/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vorname: data.firstName,
          nachname: data.lastName,
          email: data.email,
          telefon: data.phone,
          nachricht: descParts.join("\n"),
          formType: "kontakt",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
      }
    } catch {
      setError("Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-card shadow-card p-8 sm:p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-dark mb-3">
            Suchprofil erfolgreich erstellt!
          </h2>
          <p className="text-slate-body mb-6">
            Vielen Dank, {data.firstName}! Wir haben Ihr Suchprofil gespeichert
            und informieren Sie über passende Immobilienangebote.
          </p>
          <a
            href="/angebote"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-btn hover:bg-primary-800 transition-colors"
          >
            Aktuelle Angebote ansehen
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-10">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                  i < step
                    ? "bg-primary text-white"
                    : i === step
                    ? "bg-primary text-white ring-4 ring-primary/20"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {i < step ? <Check size={18} /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-xs mt-1.5 font-medium hidden sm:block",
                  i <= step ? "text-primary" : "text-gray-400"
                )}
              >
                {s.label}
              </span>
              <span
                className={cn(
                  "text-xs mt-1.5 font-medium sm:hidden",
                  i <= step ? "text-primary" : "text-gray-400"
                )}
              >
                {s.short}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 sm:mx-4 transition-colors",
                  i < step ? "bg-primary" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-card shadow-card p-6 sm:p-8">
        {/* Step 0: Art & Typ */}
        {step === 0 && (
          <div>
            <h2 className="text-xl font-bold text-slate-dark mb-2">
              Was suchen Sie?
            </h2>
            <p className="text-slate-body text-sm mb-6">
              Wählen Sie, ob Sie kaufen oder mieten möchten, und den gewünschten
              Immobilientyp.
            </p>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-dark mb-3">
                Kauf oder Miete
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Kaufen", "Mieten"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("intention", opt as "Kaufen" | "Mieten")}
                    className={cn(
                      "px-4 py-3 rounded-btn border-2 font-semibold text-center transition-all",
                      data.intention === opt
                        ? "border-primary bg-primary-100 text-primary"
                        : "border-gray-200 text-slate-body hover:border-gray-300"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-dark mb-3">
                Immobilientyp
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PROPERTY_TYPES.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => update("propertyType", value)}
                    className={cn(
                      "flex flex-col items-center gap-2 px-4 py-4 rounded-btn border-2 font-medium transition-all",
                      data.propertyType === value
                        ? "border-primary bg-primary-100 text-primary"
                        : "border-gray-200 text-slate-body hover:border-gray-300"
                    )}
                  >
                    <Icon size={24} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Kriterien */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-slate-dark mb-2">
              Ihre Kriterien
            </h2>
            <p className="text-slate-body text-sm mb-6">
              Wo und wie groß soll die Immobilie sein?
            </p>

            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-dark mb-3">
                <MapPin size={16} className="text-primary" />
                Regionen (Mehrfachauswahl)
              </label>
              <div className="flex flex-wrap gap-2">
                {REGIONS.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => toggleRegion(region)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                      data.regions.includes(region)
                        ? "border-primary bg-primary-100 text-primary"
                        : "border-gray-200 text-slate-body hover:border-gray-300"
                    )}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-dark mb-2">
                  <BedDouble size={16} className="text-primary" />
                  Zimmer (min)
                </label>
                <input
                  type="number"
                  min="1"
                  value={data.roomsMin}
                  onChange={(e) => update("roomsMin", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="z.B. 2"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-dark mb-2">
                  <BedDouble size={16} className="text-primary" />
                  Zimmer (max)
                </label>
                <input
                  type="number"
                  min="1"
                  value={data.roomsMax}
                  onChange={(e) => update("roomsMax", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="z.B. 5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-dark mb-2">
                  <Maximize2 size={16} className="text-primary" />
                  Fläche min (m²)
                </label>
                <input
                  type="number"
                  min="1"
                  value={data.areaMin}
                  onChange={(e) => update("areaMin", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="z.B. 60"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-dark mb-2">
                  <Maximize2 size={16} className="text-primary" />
                  Fläche max (m²)
                </label>
                <input
                  type="number"
                  min="1"
                  value={data.areaMax}
                  onChange={(e) => update("areaMax", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="z.B. 150"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-dark mb-2">
                  <Euro size={16} className="text-primary" />
                  Budget min (€)
                </label>
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={data.budgetMin}
                  onChange={(e) => update("budgetMin", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="z.B. 200.000"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-dark mb-2">
                  <Euro size={16} className="text-primary" />
                  Budget max (€)
                </label>
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={data.budgetMax}
                  onChange={(e) => update("budgetMax", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="z.B. 500.000"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Ausstattung */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-slate-dark mb-2">
              Gewünschte Ausstattung
            </h2>
            <p className="text-slate-body text-sm mb-6">
              Welche Ausstattungsmerkmale sind Ihnen wichtig? (optional)
            </p>

            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm font-semibold text-slate-dark">
                Merkmale für {data.propertyType || "Wohnung"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {getFeaturesForType(data.propertyType).map((feature) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => toggleFeature(feature)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-btn border text-sm font-medium transition-all text-left",
                    data.features.includes(feature)
                      ? "border-primary bg-primary-100 text-primary"
                      : "border-gray-200 text-slate-body hover:border-gray-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0",
                      data.features.includes(feature)
                        ? "bg-primary border-primary"
                        : "border-gray-300"
                    )}
                  >
                    {data.features.includes(feature) && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  {feature}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Kontakt */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-slate-dark mb-2">
              Ihre Kontaktdaten
            </h2>
            <p className="text-slate-body text-sm mb-6">
              Damit wir Sie über passende Angebote informieren können.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-dark mb-2">
                  <User size={16} className="text-primary" />
                  Vorname *
                </label>
                <input
                  type="text"
                  value={data.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Ihr Vorname"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-dark mb-2">
                  <User size={16} className="text-primary" />
                  Nachname *
                </label>
                <input
                  type="text"
                  value={data.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Ihr Nachname"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-dark mb-2">
                  <Mail size={16} className="text-primary" />
                  E-Mail *
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="ihre@email.de"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-dark mb-2">
                  <Phone size={16} className="text-primary" />
                  Telefon
                </label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="+49 ..."
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-dark mb-2">
                Anmerkungen
              </label>
              <textarea
                value={data.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                placeholder="Besondere Wünsche oder Hinweise..."
              />
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-btn p-4 mb-2">
              <h3 className="text-sm font-semibold text-slate-dark mb-2">
                Zusammenfassung Ihres Suchprofils
              </h3>
              <div className="text-sm text-slate-body space-y-1">
                <p>{data.intention} – {data.propertyType}</p>
                <p>Regionen: {data.regions.join(", ")}</p>
                {(data.roomsMin || data.roomsMax) && (
                  <p>Zimmer: {data.roomsMin || "–"} bis {data.roomsMax || "–"}</p>
                )}
                {(data.areaMin || data.areaMax) && (
                  <p>Fläche: {data.areaMin || "–"} bis {data.areaMax || "–"} m²</p>
                )}
                {(data.budgetMin || data.budgetMax) && (
                  <p>Budget: {data.budgetMin || "–"} bis {data.budgetMax || "–"} €</p>
                )}
                {data.features.length > 0 && (
                  <p>Ausstattung: {data.features.join(", ")}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-btn p-3 mt-4 text-sm text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-btn border border-gray-300 text-sm font-semibold text-slate-dark hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={16} />
              Zurück
            </button>
          ) : (
            <div />
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance()}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-btn text-sm font-semibold transition-all",
                canAdvance()
                  ? "bg-primary text-white hover:bg-primary-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              Weiter
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canAdvance() || submitting}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-btn text-sm font-semibold transition-all",
                canAdvance() && !submitting
                  ? "bg-primary text-white hover:bg-primary-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              {submitting ? (
                "Wird gesendet..."
              ) : (
                <>
                  Suchprofil absenden
                  <Send size={16} />
                </>
              )}
            </button>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Mit dem Absenden stimmen Sie unserer{" "}
          <a href="/datenschutz" className="underline">Datenschutzerklärung</a> zu.
        </p>
      </div>
    </div>
  );
}
