import type { Metadata } from "next";
import { MapPin, Ruler, TrendingUp, Shield } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import BottimmoEmbed from "@/components/ui/BottimmoEmbed";

export const metadata: Metadata = {
  title: "Kostenlose Grundstücksbewertung – Was ist Ihr Grundstück wert?",
  description:
    "Kostenlose Grundstücksbewertung in Monheim am Rhein, Langenfeld, Leverkusen, Köln & Düsseldorf. Erfahren Sie den aktuellen Marktwert Ihres Grundstücks – unverbindlich und kostenlos.",
  keywords: [
    "Grundstücksbewertung kostenlos",
    "Grundstück bewerten",
    "Grundstückswert ermitteln",
    "Bodenrichtwert",
    "Bauland bewerten",
  ],
  alternates: { canonical: "https://www.myhomefin.de/grundstuecksbewertung" },
  openGraph: {
    title: "Kostenlose Grundstücksbewertung | homefin GmbH",
    description:
      "Erfahren Sie den aktuellen Marktwert Ihres Grundstücks – kostenlos und unverbindlich.",
    url: "https://www.myhomefin.de/grundstuecksbewertung",
    type: "website",
    locale: "de_DE",
    siteName: "homefin GmbH",
  },
};

export default function GrundstuecksbewertungPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-mint-light to-mint py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="gold" className="mb-4">
              KOSTENLOS & UNVERBINDLICH
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-dark mb-6">
              Grundstücksbewertung{" "}
              <span className="text-primary">in wenigen Minuten</span>
            </h1>
            <p className="text-lg text-slate-body max-w-2xl mx-auto">
              Erfahren Sie den aktuellen Marktwert Ihres Grundstücks – schnell,
              kostenlos und unverbindlich.
            </p>
          </div>
        </Container>
      </section>

      {/* Bottimmo Grundstücksbewertung Funnel */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-3">
                Jetzt Grundstück bewerten
              </h2>
              <p className="text-slate-body">
                Beantworten Sie wenige Fragen zu Ihrem Grundstück und erhalten Sie
                eine erste Markteinschätzung.
              </p>
            </div>
            <BottimmoEmbed widget="plot-valuation" className="min-h-[400px]" />
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: MapPin,
                title: "Lokale Expertise",
                description:
                  "Wir kennen den regionalen Grundstücksmarkt in Monheim, Langenfeld, Leverkusen, Köln und Düsseldorf.",
              },
              {
                icon: Ruler,
                title: "Präzise Analyse",
                description:
                  "Bodenrichtwerte, Bebauungspläne und Erschließungskosten – alle Faktoren fließen in die Bewertung ein.",
              },
              {
                icon: TrendingUp,
                title: "Marktgerechter Preis",
                description:
                  "Ob Verkauf oder Bebauung – wir ermitteln den optimalen Wert für Ihre Entscheidung.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-body">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-800">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Persönliche Beratung gewünscht?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Für eine ausführliche Grundstücksbewertung vor Ort stehen wir Ihnen
              gerne zur Verfügung – kostenlos und unverbindlich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/kontakt" variant="white" className="gap-2">
                <Shield size={18} />
                Beratungstermin buchen
              </Button>
              <Button
                href="/immobilienbewertung"
                variant="ghost"
                className="text-white hover:bg-white/10 border border-white/30"
                shimmer={false}
              >
                Zur Immobilienbewertung
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
