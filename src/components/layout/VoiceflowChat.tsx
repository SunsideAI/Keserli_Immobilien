"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: Record<string, unknown>) => Promise<void>;
        open: () => void;
        proactive: {
          clear: () => void;
          push: (msg: Record<string, unknown>) => void;
        };
      };
    };
  }
}

export default function VoiceflowChat() {
  const pathname = usePathname();

  useEffect(() => {
    // Prevent loading the script twice
    if (document.querySelector('script[src*="voiceflow.com/widget-next/bundle.mjs"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.type = "text/javascript";

    script.onload = () => {
      window.voiceflow?.chat
        .load({
          verify: { projectID: "69b1401debe70d737b8a750c" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
          voice: {
            url: "https://runtime-api.voiceflow.com",
          },
        })
        .then(() => {
          const isPropertyPage = pathname.startsWith("/angebote/");

          // Proaktive Nachricht je nach Seitenart
          setTimeout(() => {
            window.voiceflow?.chat.proactive.clear();
            if (isPropertyPage) {
              window.voiceflow?.chat.proactive.push({
                type: "text",
                payload: {
                  message:
                    "Diese Immobilie könnte Ihr neues Zuhause sein! Ich beantworte alle Fragen und sende Ihnen alle Details – starten Sie jetzt! 🏡😊",
                },
              });
            } else {
              window.voiceflow?.chat.proactive.push({
                type: "text",
                payload: {
                  message:
                    "Ich bin Ihre intelligente Assistentin Sophia! Immobilien kaufen, verkaufen oder bewerten? Ich helfe Ihnen sofort – starten Sie jetzt! 🏡😊",
                },
              });
            }
          }, 1000);

          // Chat-Öffnungszähler aus localStorage
          const openCount = parseInt(
            localStorage.getItem("chatOpenCount") || "0",
            10
          );

          if (openCount < 1) {
            setTimeout(() => {
              window.voiceflow?.chat.open();
              localStorage.setItem("chatOpenCount", String(openCount + 1));
            }, 6000);
          } else if (openCount < 2) {
            setTimeout(() => {
              window.voiceflow?.chat.open();
              localStorage.setItem("chatOpenCount", String(openCount + 1));
            }, 12000);
          }

          // chatOpenCount nach 5 Minuten zurücksetzen
          setInterval(() => {
            localStorage.removeItem("chatOpenCount");
          }, 300000);
        });
    };

    document.body.appendChild(script);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
