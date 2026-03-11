import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import TilgungsrechnerCalc from "@/components/finanzierung/TilgungsrechnerCalc";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Tilgungsrechner mit Sondertilgung | homefin",
  description:
    "Erstellen Sie einen detaillierten Tilgungsplan mit Sondertilgungen. Sehen Sie Jahr für Jahr, wie sich Ihr Darlehen entwickelt. Kostenloser Tilgungsrechner.",
  keywords: ["Tilgungsrechner", "Tilgungsplan erstellen", "Sondertilgung Rechner", "Baufinanzierung Tilgung"],
  alternates: { canonical: `${siteConfig.url}/finanzierung/tilgungsrechner` },
};

export default function TilgungsrechnerPage() {
  return (
    <>
      <section className="bg-gray-50 py-3 sm:py-4">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-body">
            <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/finanzierung" className="hover:text-primary transition-colors">Finanzierung</Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-slate-dark font-medium">Tilgungsrechner</span>
          </nav>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <Badge variant="gold" className="mb-4">TILGUNGSRECHNER</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-dark mb-3">
              Tilgungsplan mit Sondertilgung
            </h1>
            <p className="text-slate-body mb-8 max-w-2xl">
              Erstellen Sie einen detaillierten Tilgungsplan und sehen Sie, wie sich Sondertilgungen auf die Laufzeit und die Gesamtkosten Ihres Darlehens auswirken.
            </p>
            <TilgungsrechnerCalc />
          </div>
        </Container>
      </section>

      <section className="py-10 bg-gradient-to-br from-primary to-teal-dark">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Tilgungsstrategie optimieren</h2>
            <p className="text-white/80 text-sm mb-5">Lassen Sie sich beraten, wie Sie mit der richtigen Tilgungsstrategie Tausende Euro sparen können.</p>
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
