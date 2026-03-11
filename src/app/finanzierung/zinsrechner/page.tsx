import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import ZinsrechnerCalc from "@/components/finanzierung/ZinsrechnerCalc";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Zinsrechner – Monatliche Rate berechnen | homefin",
  description:
    "Berechnen Sie Ihre monatliche Kreditrate, Zinskosten und Restschuld. Kostenloser Zinsrechner für Ihre Baufinanzierung von homefin.",
  keywords: ["Zinsrechner Baufinanzierung", "Monatliche Rate berechnen", "Kreditrate Immobilie", "Bauzinsen Rechner"],
  alternates: { canonical: `${siteConfig.url}/finanzierung/zinsrechner` },
};

export default function ZinsrechnerPage() {
  return (
    <>
      <section className="bg-gray-50 py-3 sm:py-4">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-body">
            <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/finanzierung" className="hover:text-primary transition-colors">Finanzierung</Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-slate-dark font-medium">Zinsrechner</span>
          </nav>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <Badge variant="gold" className="mb-4">ZINSRECHNER</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-dark mb-3">
              Monatliche Rate berechnen
            </h1>
            <p className="text-slate-body mb-8 max-w-2xl">
              Berechnen Sie Ihre monatliche Kreditrate, die gezahlten Zinsen und die verbleibende Restschuld nach Ende der Zinsbindung.
            </p>
            <ZinsrechnerCalc />
          </div>
        </Container>
      </section>

      <section className="py-10 bg-gradient-to-br from-primary to-teal-dark">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Bessere Konditionen sichern</h2>
            <p className="text-white/80 text-sm mb-5">Wir vergleichen über 700 Banken und finden den besten Zins für Sie – kostenlos und unverbindlich.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-btn hover:bg-gray-50 transition-colors shadow-btn text-sm">Beratung anfragen</Link>
              <a href={`tel:${siteConfig.contact.phoneRaw}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-btn hover:bg-white/10 transition-colors text-sm">
                <Phone size={16} />{siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
