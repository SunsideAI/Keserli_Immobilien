"use client";

import { useEffect, useRef } from "react";

export default function CalEmbed() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    // Load Cal.com script
    const scriptId = "cal-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      document.head.appendChild(script);
    }

    function tryInit() {
      if (!win.Cal) return false;

      try {
        win.Cal("init", "15min", { origin: "https://app.cal.com" });

        win.Cal.ns["15min"]("inline", {
          elementOrSelector: "#my-cal-inline-15min",
          config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
          calLink: "homefin-gmbh-zzd9t6/15min",
        });

        win.Cal.ns["15min"]("ui", {
          cssVarsPerTheme: {
            light: { "cal-brand": "#2F7D77" },
            dark: { "cal-brand": "#E6F2F1" },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (e) {
        console.warn("Cal.com init error:", e);
        return false;
      }

      return true;
    }

    // Poll until Cal is available
    if (!tryInit()) {
      const interval = setInterval(() => {
        if (tryInit()) clearInterval(interval);
      }, 200);
      setTimeout(() => clearInterval(interval), 15000);
    }
  }, []);

  return (
    <div
      id="my-cal-inline-15min"
      className="w-full min-h-[600px] overflow-auto rounded-card"
    />
  );
}
