"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

const SCRIPT_ID = "btm-widget-script";
const SCRIPT_SRC =
  "https://components.bottimmo.com/components/6752dc924a83ff4efdcf6324/btm-widget/de-DE";

interface BottimmoEmbedProps {
  /** Widget type: "valuation", "plot-valuation", "property-request", "life-annuity", "return-call", "download", "quizzard" */
  widget: string;
  /** Slug for download/quizzard widgets */
  slug?: string;
  className?: string;
}

export default function BottimmoEmbed({ widget, slug, className }: BottimmoEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load script once globally
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.defer = true;
      script.onload = () => setLoading(false);
      document.head.appendChild(script);
    } else {
      setLoading(false);
    }

    // Fallback: hide loading after 3s
    const fallback = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 size={32} className="text-primary animate-spin mb-3" />
          <p className="text-sm text-slate-body">Tool wird geladen...</p>
        </div>
      )}
      {/* @ts-expect-error btm-widget is a custom element */}
      <btm-widget widget={widget} {...(slug ? { slug } : {})} />
    </div>
  );
}
