"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

export default function CalEmbed() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const containerId = "my-cal-inline-15min";
    const scriptId = "cal-inline-init";

    // Remove old init script if navigating back
    const old = document.getElementById(scriptId);
    if (old) old.remove();

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "text/javascript";
    script.textContent = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", "15min", {origin:"https://app.cal.com"});

      Cal.ns["15min"]("inline", {
        elementOrSelector:"#${containerId}",
        config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
        calLink: "homefin-gmbh-zzd9t6/15min",
      });

      Cal.ns["15min"]("ui", {
        "theme":"light",
        "styles":{"branding":{"brandColor":"#2D7A7A"}},
        "cssVarsPerTheme":{
          "light":{"cal-brand":"#2D7A7A","cal-bg":"transparent","cal-bg-emphasis":"#f9fafb"}
        },
        "hideEventTypeDetails":false,
        "layout":"month_view"
      });
    `;
    document.body.appendChild(script);

    // Hide loading skeleton once iframe appears
    const observer = new MutationObserver(() => {
      const container = document.getElementById(containerId);
      if (container && container.querySelector("iframe")) {
        setLoading(false);
        observer.disconnect();
      }
    });
    const container = document.getElementById(containerId);
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }

    // Fallback: hide after 5s regardless
    const fallback = setTimeout(() => setLoading(false), 5000);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="relative">
      {/* Loading skeleton */}
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white min-h-[600px]">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 animate-pulse">
            <CalendarDays size={24} className="text-primary" />
          </div>
          <p className="text-sm text-slate-body">Kalender wird geladen...</p>
        </div>
      )}
      <div
        id="my-cal-inline-15min"
        className="w-full min-h-[600px] overflow-hidden rounded-card"
      />
    </div>
  );
}
