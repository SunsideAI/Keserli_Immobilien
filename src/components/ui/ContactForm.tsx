"use client";

import { useState, useEffect } from "react";
import Button from "./Button";

interface ContactFormProps {
  variant?: "default" | "bewertung";
  paket?: string;
  className?: string;
}

const paketMap: Record<string, string> = {
  basis: "Homefin Basis (1,95%)",
  premium: "Homefin Premium+ (2,94%)",
  select: "Homefin Select (ab 99€/Monat)",
};

export default function ContactForm({ variant = "default", paket: paketProp, className }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPaket, setSelectedPaket] = useState(paketProp || "");

  // Read ?paket= from URL on mount
  useEffect(() => {
    if (typeof window !== "undefined" && !paketProp) {
      const params = new URLSearchParams(window.location.search);
      const p = params.get("paket");
      if (p && paketMap[p]) setSelectedPaket(paketMap[p]);
    }
  }, [paketProp]);

  const formName = variant === "bewertung" ? "bewertung" : "kontakt";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // 1. Netlify Forms (Backup / E-Mail-Benachrichtigung)
      const netlifyPromise = fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      // 2. Propstack CRM (Kontakt anlegen)
      const propstackPayload = {
        vorname: formData.get("vorname") || "",
        nachname: formData.get("nachname") || "",
        email: formData.get("email") || "",
        telefon: formData.get("telefon") || "",
        nachricht: formData.get("nachricht") || "",
        adresse: formData.get("adresse") || "",
        paket: formData.get("paket") || "",
        formType: formName,
      };

      const propstackPromise = fetch("/.netlify/functions/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propstackPayload),
      });

      // Beide parallel ausführen, Netlify Forms ist führend für Erfolg/Fehler
      const [netlifyRes] = await Promise.all([netlifyPromise, propstackPromise.catch((err) => {
        console.warn("Propstack submission failed:", err);
      })]);

      if (netlifyRes.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className={className}>
        <div className="bg-green-50 border border-green-200 rounded-card p-8 text-center">
          <div className="text-4xl mb-4">&#10003;</div>
          <h3 className="text-xl font-bold text-slate-dark mb-2">
            Vielen Dank für Ihre Anfrage!
          </h3>
          <p className="text-slate-body">
            Wir melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      className={className}
      data-netlify="true"
      name={formName}
      method="POST"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value={formName} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor={`${formName}-vorname`} className="block text-sm font-medium text-slate-dark mb-1">
            Vorname *
          </label>
          <input
            type="text"
            id={`${formName}-vorname`}
            name="vorname"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="Ihr Vorname"
          />
        </div>
        <div>
          <label htmlFor={`${formName}-nachname`} className="block text-sm font-medium text-slate-dark mb-1">
            Nachname *
          </label>
          <input
            type="text"
            id={`${formName}-nachname`}
            name="nachname"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="Ihr Nachname"
          />
        </div>
      </div>

      {variant === "bewertung" && (
        <div className="mb-4">
          <label htmlFor={`${formName}-adresse`} className="block text-sm font-medium text-slate-dark mb-1">
            Immobilienadresse *
          </label>
          <input
            type="text"
            id={`${formName}-adresse`}
            name="adresse"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="Straße, PLZ, Ort"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor={`${formName}-email`} className="block text-sm font-medium text-slate-dark mb-1">
            E-Mail *
          </label>
          <input
            type="email"
            id={`${formName}-email`}
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="ihre@email.de"
          />
        </div>
        <div>
          <label htmlFor={`${formName}-telefon`} className="block text-sm font-medium text-slate-dark mb-1">
            Telefon
          </label>
          <input
            type="tel"
            id={`${formName}-telefon`}
            name="telefon"
            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="+49 ..."
          />
        </div>
      </div>

      {variant === "default" && (
        <div className="mb-4">
          <label htmlFor={`${formName}-paket`} className="block text-sm font-medium text-slate-dark mb-1">
            Gewünschtes Paket
          </label>
          <select
            id={`${formName}-paket`}
            name="paket"
            value={selectedPaket}
            onChange={(e) => setSelectedPaket(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          >
            <option value="">Kein Paket ausgewählt</option>
            <option value="Homefin Basis (1,95%)">Homefin Basis (1,95%)</option>
            <option value="Homefin Premium+ (2,94%)">Homefin Premium+ (2,94%)</option>
            <option value="Homefin Select (ab 99€/Monat)">Homefin Select (ab 99€/Monat)</option>
          </select>
        </div>
      )}

      <div className="mb-6">
        <label htmlFor={`${formName}-nachricht`} className="block text-sm font-medium text-slate-dark mb-1">
          Nachricht
        </label>
        <textarea
          id={`${formName}-nachricht`}
          name="nachricht"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
          placeholder={
            variant === "bewertung"
              ? "Erzählen Sie uns mehr über Ihre Immobilie..."
              : "Wie können wir Ihnen helfen?"
          }
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-btn p-3 mb-4 text-sm text-red-700 text-center">
          Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting
          ? "Wird gesendet..."
          : variant === "bewertung"
          ? "Bewertung anfordern"
          : "Nachricht senden"}
      </Button>

      <p className="text-xs text-gray-400 mt-3 text-center">
        Mit dem Absenden stimmen Sie unserer{" "}
        <a href="/datenschutz" className="underline">Datenschutzerklärung</a> zu.
      </p>
    </form>
  );
}
