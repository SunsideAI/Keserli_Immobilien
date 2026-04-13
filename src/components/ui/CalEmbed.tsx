"use client";

import { useEffect } from "react";

export default function CalEmbed() {
  useEffect(() => {
    // Cal.com embed – adapted from their official snippet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    if (!win.__calLoaded) {
      const script = document.createElement("script");
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        initCal(win);
      };

      win.__calLoaded = true;
    } else {
      // Script already loaded, just init
      initCal(win);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function initCal(w: any) {
      // Wait for Cal to be ready
      const check = setInterval(() => {
        if (w.Cal) {
          clearInterval(check);
          w.Cal("init", "15min", { origin: "https://app.cal.com" });

          w.Cal.ns["15min"]("inline", {
            elementOrSelector: "#my-cal-inline-15min",
            config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
            calLink: "homefin-gmbh-zzd9t6/15min",
          });

          w.Cal.ns["15min"]("ui", {
            cssVarsPerTheme: {
              light: { "cal-brand": "#2F7D77" },
              dark: { "cal-brand": "#E6F2F1" },
            },
            hideEventTypeDetails: false,
            layout: "month_view",
          });
        }
      }, 100);

      // Safety: stop checking after 10s
      setTimeout(() => clearInterval(check), 10000);
    }
  }, []);

  return (
    <div
      id="my-cal-inline-15min"
      className="w-full min-h-[600px] overflow-auto rounded-card"
    />
  );
}
