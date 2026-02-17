import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "homefin GmbH – Immobilienmakler Monheim am Rhein | Faire Provision ab 1,95%",
    template: "%s | homefin GmbH – Immobilienmakler",
  },
  description:
    "Ihr lokaler Immobilienmakler in Monheim am Rhein, Langenfeld, Leverkusen, Köln & Düsseldorf. Professioneller Maklerservice ab 1,95% inkl. MwSt. Kostenlose Immobilienbewertung in 48h.",
  keywords: [
    "Immobilienmakler Monheim am Rhein",
    "Immobilienmakler Langenfeld",
    "Immobilienmakler Leverkusen",
    "Immobilienmakler Köln",
    "Immobilienmakler Düsseldorf",
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
    title: "homefin GmbH – Immobilienmakler | Faire Provision ab 1,95%",
    description:
      "Professioneller Maklerservice ab 1,95% inkl. MwSt. Kostenlose Immobilienbewertung in Monheim, Langenfeld, Leverkusen, Köln & Düsseldorf.",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "homefin GmbH – Immobilienmakler | Faire Provision ab 1,95%",
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
      </body>
    </html>
  );
}
