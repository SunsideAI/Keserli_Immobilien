import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import VoiceflowChat from "@/components/layout/VoiceflowChat";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  icons: {
    icon: "/Homefin_Favicon.png",
    apple: "/Homefin_Favicon.png",
  },
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "homefin GmbH – Immobilienmakler (IHK) Monheim am Rhein | Faire Provision ab 1,95%",
    template: "%s | homefin GmbH – Immobilienmakler (IHK)",
  },
  description:
    "Ihr Immobilienmakler (IHK) in Monheim am Rhein, Langenfeld, Leverkusen, Köln & Düsseldorf. Professioneller Maklerservice ab 1,95% inkl. MwSt. Kostenlose Immobilienbewertung mit Sofortergebnis.",
  keywords: [
    "Immobilienmakler (IHK) Monheim am Rhein",
    "Immobilienmakler (IHK) Langenfeld",
    "Immobilienmakler (IHK) Leverkusen",
    "Immobilienmakler (IHK) Köln",
    "Immobilienmakler (IHK) Düsseldorf",
    "Immobilie verkaufen",
    "Haus verkaufen",
    "Wohnung verkaufen",
    "Immobilienbewertung kostenlos",
    "faire Maklerprovision",
    "Makler NRW",
    "homefin",
    "Orhan Keserli",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "homefin GmbH",
    title: "homefin GmbH – Immobilienmakler (IHK) | Faire Provision ab 1,95%",
    description:
      "Professioneller Maklerservice ab 1,95% inkl. MwSt. Kostenlose Immobilienbewertung in Monheim, Langenfeld, Leverkusen, Köln & Düsseldorf.",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "homefin GmbH – Immobilienmakler (IHK) | Faire Provision ab 1,95%",
    description:
      "Professioneller Maklerservice ab 1,95% inkl. MwSt. Kostenlose Immobilienbewertung in der Region.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "YOUR_GOOGLE_VERIFICATION_CODE", // TODO: Add after Google Search Console setup
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="font-sans">
        <SchemaMarkup />
        <Header />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer />
        {/* Hidden Netlify form detection */}
        <form name="kontakt" data-netlify="true" hidden>
          <input type="hidden" name="form-name" value="kontakt" />
          <input name="vorname" />
          <input name="nachname" />
          <input name="email" />
          <input name="telefon" />
          <input name="paket" />
          <textarea name="nachricht" />
        </form>
        <form name="bewertung" data-netlify="true" hidden>
          <input type="hidden" name="form-name" value="bewertung" />
          <input name="vorname" />
          <input name="nachname" />
          <input name="email" />
          <input name="telefon" />
          <input name="adresse" />
          <textarea name="nachricht" />
        </form>
        <form name="suchprofil" data-netlify="true" hidden>
          <input type="hidden" name="form-name" value="suchprofil" />
          <input name="vorname" />
          <input name="nachname" />
          <input name="email" />
          <input name="telefon" />
          <textarea name="suchprofil" />
        </form>
        <form name="download" data-netlify="true" hidden>
          <input type="hidden" name="form-name" value="download" />
          <input name="vorname" />
          <input name="nachname" />
          <input name="email" />
          <input name="telefon" />
          <input name="ratgeber" />
        </form>
        <VoiceflowChat />
      </body>
    </html>
  );
}
