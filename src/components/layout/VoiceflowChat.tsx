"use client";

import { useEffect, useRef } from "react";
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

function initChat(pathname: string) {
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
}

export default function VoiceflowChat() {
  const pathname = usePathname();
  const scriptLoaded = useRef(false);

  // Load the script once
  useEffect(() => {
    if (scriptLoaded.current) return;
    if (document.querySelector('script[src*="voiceflow.com/widget-next/bundle.mjs"]')) {
      scriptLoaded.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.type = "text/javascript";
    script.onload = () => {
      scriptLoaded.current = true;
    };
    document.body.appendChild(script);
  }, []);

  // Re-initialize chat on every page change
  useEffect(() => {
    if (window.voiceflow) {
      initChat(pathname);
      return;
    }

    // Script may still be loading – wait for it
    const interval = setInterval(() => {
      if (window.voiceflow) {
        clearInterval(interval);
        initChat(pathname);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [pathname]);

  return null;
}
