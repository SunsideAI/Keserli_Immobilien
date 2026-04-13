"use client";

import { useEffect } from "react";

export default function CalEmbed() {
  useEffect(() => {
    // Inject the exact Cal.com snippet as an inline script
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
        "cssVarsPerTheme":{
          "light":{"cal-brand":"#2D7A7A"}
        },
        "hideEventTypeDetails":false,
        "layout":"month_view"
      });
    `;
    document.body.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, []);

  return (
    <div
      id="my-cal-inline-15min"
      className="w-full min-h-[600px] overflow-auto rounded-card"
    />
  );
}
