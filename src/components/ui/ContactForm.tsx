"use client";

import { useState } from "react";
import Button from "./Button";

interface ContactFormProps {
  variant?: "default" | "bewertung";
  className?: string;
}

export default function ContactForm({ variant = "default", className }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

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
      name={variant === "bewertung" ? "bewertung" : "kontakt"}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input type="hidden" name="form-name" value={variant === "bewertung" ? "bewertung" : "kontakt"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="vorname" className="block text-sm font-medium text-slate-dark mb-1">
            Vorname *
          </label>
          <input
            type="text"
            id="vorname"
            name="vorname"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="Ihr Vorname"
          />
        </div>
        <div>
          <label htmlFor="nachname" className="block text-sm font-medium text-slate-dark mb-1">
            Nachname *
          </label>
          <input
            type="text"
            id="nachname"
            name="nachname"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="Ihr Nachname"
          />
        </div>
      </div>

      {variant === "bewertung" && (
        <div className="mb-4">
          <label htmlFor="adresse" className="block text-sm font-medium text-slate-dark mb-1">
            Immobilienadresse *
          </label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="Straße, PLZ, Ort"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-dark mb-1">
            E-Mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="ihre@email.de"
          />
        </div>
        <div>
          <label htmlFor="telefon" className="block text-sm font-medium text-slate-dark mb-1">
            Telefon
          </label>
          <input
            type="tel"
            id="telefon"
            name="telefon"
            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="+49 ..."
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="nachricht" className="block text-sm font-medium text-slate-dark mb-1">
          Nachricht
        </label>
        <textarea
          id="nachricht"
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

      <Button type="submit" size="lg" className="w-full">
        {variant === "bewertung" ? "Bewertung anfordern" : "Nachricht senden"}
      </Button>

      <p className="text-xs text-gray-400 mt-3 text-center">
        Mit dem Absenden stimmen Sie unserer{" "}
        <a href="/datenschutz" className="underline">Datenschutzerklärung</a> zu.
      </p>
    </form>
  );
}
