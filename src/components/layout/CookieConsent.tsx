"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export type ConsentState = {
  necessary: true;
  functional: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "cookie_consent";
const CONSENT_VERSION = "1";

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed.consent as ConsentState;
  } catch {
    return null;
  }
}

function storeConsent(consent: ConsentState) {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ consent, version: CONSENT_VERSION, timestamp: Date.now() })
  );
  window.dispatchEvent(new CustomEvent("cookie-consent-update", { detail: consent }));
}

export function getConsent(): ConsentState | null {
  return getStoredConsent();
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = useCallback((consent: ConsentState) => {
    storeConsent(consent);
    setVisible(false);
  }, []);

  const acceptAll = () =>
    accept({ necessary: true, functional: true, marketing: true });

  const acceptSelected = () =>
    accept({ necessary: true, functional, marketing });

  const rejectAll = () =>
    accept({ necessary: true, functional: false, marketing: false });

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => {}}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-dark mb-2">
          Cookie-Einstellungen
        </h3>
        <p className="text-sm text-slate-body mb-4 leading-relaxed">
          Wir verwenden Cookies und ähnliche Technologien, um Ihnen ein optimales
          Erlebnis zu bieten. Einige sind technisch notwendig, andere helfen uns,
          die Website zu verbessern. Mehr dazu in unserer{" "}
          <Link href="/datenschutz" className="underline text-primary">
            Datenschutzerklärung
          </Link>
          .
        </p>

        {showDetails && (
          <div className="space-y-3 mb-5 border-t border-gray-100 pt-4">
            <label className="flex items-start gap-3 cursor-not-allowed">
              <input
                type="checkbox"
                checked
                disabled
                className="mt-0.5 accent-primary"
              />
              <div>
                <span className="text-sm font-semibold text-slate-dark">
                  Notwendig
                </span>
                <span className="text-xs text-gray-400 ml-1">(immer aktiv)</span>
                <p className="text-xs text-slate-body mt-0.5">
                  Erforderlich für Grundfunktionen wie Seitennavigation,
                  Formulare und Sicherheit.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={functional}
                onChange={(e) => setFunctional(e.target.checked)}
                className="mt-0.5 accent-primary"
              />
              <div>
                <span className="text-sm font-semibold text-slate-dark">
                  Funktional
                </span>
                <p className="text-xs text-slate-body mt-0.5">
                  Ermöglicht erweiterte Funktionen wie den Chatbot (Voiceflow),
                  Terminbuchung (Cal.com) und Kartenanzeige (OpenStreetMap).
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-0.5 accent-primary"
              />
              <div>
                <span className="text-sm font-semibold text-slate-dark">
                  Marketing &amp; Analyse
                </span>
                <p className="text-xs text-slate-body mt-0.5">
                  Hilft uns, die Website zu verbessern und relevante Inhalte
                  anzuzeigen. Derzeit nicht aktiv.
                </p>
              </div>
            </label>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={acceptAll}
            className="flex-1 px-5 py-2.5 bg-primary text-white font-semibold rounded-btn hover:bg-primary-800 transition-colors text-sm"
          >
            Alle akzeptieren
          </button>
          {showDetails ? (
            <button
              onClick={acceptSelected}
              className="flex-1 px-5 py-2.5 bg-gray-100 text-slate-dark font-semibold rounded-btn hover:bg-gray-200 transition-colors text-sm"
            >
              Auswahl bestätigen
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="flex-1 px-5 py-2.5 bg-gray-100 text-slate-dark font-semibold rounded-btn hover:bg-gray-200 transition-colors text-sm"
            >
              Einstellungen
            </button>
          )}
          <button
            onClick={rejectAll}
            className="flex-1 px-5 py-2.5 border border-gray-200 text-slate-body font-medium rounded-btn hover:bg-gray-50 transition-colors text-sm"
          >
            Nur notwendige
          </button>
        </div>
      </div>
    </div>
  );
}
