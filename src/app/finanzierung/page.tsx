import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, TrendingDown, BarChart3, Clock, Phone, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Immobilienfinanzierung – Rechner & Beratung | homefin",
  description:
    "Immobilienfinanzierung berechnen: Budgetrechner, Zinsrechner, Tilgungsrechner und Sollzinsbindung. Finden Sie das passende Angebot aus über 700 Partnern.",
  keywords: [
    "Immobilienfinanzierung",
    "Baufinanzierung",
    "Budgetrechner",
    "Zinsrechner",
    "Tilgungsrechner",
  ],
  alternates: { canonical: `${siteConfig.url}/finanzierung` },
};

const calculators = [
  {
    title: "Budgetrechner",
    description: "Wie viel Immobilie können Sie sich leisten? Berechnen Sie Ihr maximales Budget anhand Ihres Einkommens und Eigenkapitals.",
    href: "/finanzierung/budgetrechner",
    icon: Calculator,
  },
  {
    title: "Zinsrechner",
    description: "Berechnen Sie Ihre monatliche Rate für ein Annuitätendarlehen – mit Zinskosten und Restschuld-Prognose.",
    href: "/finanzierung/zinsrechner",
    icon: TrendingDown,
  },
  {
    title: "Tilgungsrechner",
    description: "Erstellen Sie einen detaillierten Tilgungsplan mit Sondertilgungen und sehen Sie, wann Ihr Darlehen abbezahlt ist.",
    href: "/finanzierung/tilgungsrechner",
    icon: BarChart3,
  },
  {
    title: "Sollzinsbindung",
    description: "Vergleichen Sie verschiedene Zinsbindungszeiträume und finden Sie die optimale Strategie für Ihre Finanzierung.",
    href: "/finanzierung/sollzinsbindung",
    icon: Clock,
  },
];

export default function FinanzierungPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-teal-dark py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="gold" className="mb-4">FINANZIERUNG</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Ihre Immobilien&shy;finanzierung –{" "}
              <span className="text-primary-200">einfach berechnet</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Nutzen Sie unsere kostenlosen Rechner, um Ihre Finanzierung zu planen.
              Das passende Angebot finden wir aus über 700 Partnerbanken.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/finanzierung/budgetrechner" variant="white">
                <Calculator size={18} className="mr-2" />
                Budget berechnen
              </Button>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-btn hover:bg-white/10 transition-colors"
              >
                <Phone size={18} />
                Beratung anrufen
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Calculator Cards */}
      <section className="section-padding bg-gray-50">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-2 text-center">
            Unsere Finanzierungsrechner
          </h2>
          <p className="text-slate-body text-center mb-10 max-w-2xl mx-auto">
            Planen Sie Ihre Baufinanzierung Schritt für Schritt – kostenlos und unverbindlich.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="group bg-white rounded-card shadow-card p-6 hover:shadow-card-hover transition-shadow duration-300 flex flex-col"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <calc.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-slate-dark mb-2 group-hover:text-primary transition-colors">
                  {calc.title}
                </h3>
                <p className="text-sm text-slate-body flex-1 mb-4">{calc.description}</p>
                <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                  Jetzt berechnen <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary to-teal-dark">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Persönliche Finanzierungsberatung
            </h2>
            <p className="text-white/80 mb-6">
              Unsere Rechner geben Ihnen eine erste Orientierung. Für ein maßgeschneidertes Angebot
              beraten wir Sie persönlich – kostenlos und unverbindlich.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/kontakt" variant="white">
                Beratung anfragen
              </Button>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-btn hover:bg-white/10 transition-colors"
              >
                <Phone size={18} />
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
