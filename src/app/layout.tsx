import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export const metadata: Metadata = {
  title: {
    default: "homefin GmbH – Fairste Provision der Region | Immobilienmakler",
    template: "%s | homefin GmbH",
  },
  description:
    "Ihr lokaler Immobilienmakler in Monheim am Rhein, Langenfeld, Leverkusen, Köln & Düsseldorf. Professioneller Maklerservice ab 1,95% inkl. MwSt. Kostenlose Immobilienbewertung.",
  keywords: [
    "Immobilienmakler",
    "Monheim am Rhein",
    "Langenfeld",
    "Leverkusen",
    "Köln",
    "Düsseldorf",
    "Immobilienbewertung",
    "Haus verkaufen",
    "Wohnung verkaufen",
    "faire Provision",
    "homefin",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "homefin GmbH",
    title: "homefin GmbH – Fairste Provision der Region",
    description:
      "Professioneller Maklerservice ab 1,95% inkl. MwSt. Kostenlose Immobilienbewertung in Monheim, Langenfeld, Leverkusen, Köln & Düsseldorf.",
  },
  robots: {
    index: true,
    follow: true,
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
