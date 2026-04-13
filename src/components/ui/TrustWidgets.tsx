"use client";

import { useEffect } from "react";

/**
 * Loads the Trustpilot bootstrap script once, then tells Trustpilot to scan
 * for new widgets every time this component mounts (SPA navigation).
 */
function useTrustpilot() {
  useEffect(() => {
    const id = "tp-widget-bootstrap";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
      s.async = true;
      document.head.appendChild(s);
    }
    // Re-scan for widgets after hydration / SPA nav
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).Trustpilot) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).Trustpilot.loadFromElement(
          document.querySelectorAll(".trustpilot-widget")
        );
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);
}

/**
 * Loads the Trustlocal (ProvenExpert) widget script once.
 */
function useTrustlocal() {
  useEffect(() => {
    const id = "trustlocal-widget-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://static.trustlocal.de/widget/widget_v2.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);
}

/* ─────────────── Trustpilot: Micro Review Count ─────────────── */
export function TrustpilotMicro() {
  useTrustpilot();
  return (
    <div
      className="trustpilot-widget"
      data-locale="de-DE"
      data-template-id="5419b6a8b0d04a076446a9ad"
      data-businessunit-id="6290e4d5bdfd41093cd9e1b5"
      data-style-height="28px"
      data-style-width="100%"
      data-token="6d9c77f2-0873-4e3f-87c2-f5fcae0583f9"
      data-min-review-count="10"
      data-style-alignment="center"
    >
      <a
        href="https://de.trustpilot.com/review/myhomefin.de"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </a>
    </div>
  );
}

/* ─────────────── Trustpilot: Review Collector ─────────────── */
export function TrustpilotReviewCollector() {
  useTrustpilot();
  return (
    <div
      className="trustpilot-widget"
      data-locale="de-DE"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="6290e4d5bdfd41093cd9e1b5"
      data-style-height="52px"
      data-style-width="100%"
      data-token="3c28cd36-46fb-4883-b4f6-e80d1774d6ad"
    >
      <a
        href="https://de.trustpilot.com/review/myhomefin.de"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </a>
    </div>
  );
}

/* ─────────────── Trustlocal: Portrait (small) ─────────────── */
export function TrustlocalPortrait() {
  useTrustlocal();
  return (
    <div
      className="trustlocal-widget"
      data-id="EDb-2JjKh2K3l9bvQmLducWP6URS0QDllDQNWK8wJSfsBw"
      data-language-code="de"
      data-country-code="DE"
      data-badge="default"
      data-quote="default"
      data-size="small"
      data-type="portrait"
      data-border="hidden"
      data-theme="light"
      data-background="transparent"
      data-google="hidden"
    />
  );
}

/* ─────────────── Trustlocal: Landscape (small) ─────────────── */
export function TrustlocalLandscape() {
  useTrustlocal();
  return (
    <div
      className="trustlocal-widget"
      data-id="2ErCAs8HgxD9gIImiTllL1cqc_2QtO54_JTPGOPdL4grFw"
      data-language-code="de"
      data-country-code="DE"
      data-badge="default"
      data-quote="default"
      data-size="small"
      data-type="landscape"
      data-border="hidden"
      data-theme="light"
      data-background="transparent"
      data-google="hidden"
    />
  );
}
