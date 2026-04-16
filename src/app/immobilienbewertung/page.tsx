import type { Metadata } from "next";
import { CheckCircle, Clock, Award, Shield } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { siteConfig } from "@/data/site-config";
import BewertungToggle from "@/components/bewertung/BewertungToggle";
import ImmoScoutWidget from "@/components/ui/ImmoScoutWidget";
import BottimmoEmbed from "@/components/ui/BottimmoEmbed";

export const metadata: Metadata = {
  title: "Kostenlose Immobilienbewertung mit Sofortergebnis – Was ist Ihre Immobilie wert?",
  description:
    "Kostenlose Immobilienbewertung in Monheim am Rhein, Langenfeld, Leverkusen, Köln & Düsseldorf. Professionelle Marktwertanalyse mit Sofortergebnis – online oder persönlich, unverbindlich und kostenlos.",
  keywords: [
    "Immobilienbewertung kostenlos",
    "Haus bewerten lassen",
    "Wohnung bewerten",
    "Marktwertanalyse",
    "Was ist meine Immobilie wert",
    "Immobilienwert ermitteln",
  ],
  alternates: { canonical: "https://www.myhomefin.de/immobilienbewertung" },
  openGraph: {
    title: "Kostenlose Immobilienbewertung mit Sofortergebnis | homefin",
    description: "Professionelle Marktwertanalyse – kostenlos und unverbindlich.",
    url: "https://www.myhomefin.de/immobilienbewertung",
    type: "website",
    locale: "de_DE",
    siteName: "homefin GmbH",
  },
};

export default function ImmobilienbewertungPage() {
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
              Kostenlose Immobilienbewertung{" "}
              <span className="text-primary">mit Sofortergebnis</span>
            </h1>
            <p className="text-lg text-slate-body max-w-2xl mx-auto">
              Erfahren Sie den aktuellen Marktwert Ihrer Immobilie – professionell
              bewertet von Ihrem lokalen Experten in der Region.
            </p>
          </div>
        </Container>
      </section>

      {/* Bottimmo Bewertungs-Funnel */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-3">
                Jetzt Immobilie bewerten
              </h2>
              <p className="text-slate-body">
                In wenigen Schritten erhalten Sie eine erste Einschätzung zum
                Marktwert Ihrer Immobilie.
              </p>
            </div>
            <BottimmoEmbed widget="valuation" className="min-h-[400px]" />
          </div>
        </Container>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-3">
              So läuft die professionelle Bewertung ab
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                step: "1",
                title: "Anfrage stellen",
                description:
                  "Nutzen Sie unseren Bewertungsrechner oben oder buchen Sie direkt einen Termin.",
              },
              {
                icon: Clock,
                step: "2",
                title: "Besichtigung & Analyse",
                description:
                  "Wir besichtigen Ihre Immobilie persönlich vor Ort und erfassen alle wertrelevanten Faktoren.",
              },
              {
                icon: Award,
                step: "3",
                title: "Bewertung erhalten",
                description:
                  "Sie erhalten eine fundierte Marktwertanalyse – online sofort oder nach persönlicher Besichtigung.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={28} className="text-primary" />
                  </div>
                  <div className="text-sm font-bold text-primary mb-2">
                    Schritt {item.step}
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

      {/* Booking / Contact Section */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-4">
                Persönlichen Termin vereinbaren
              </h2>
              <p className="text-lg text-slate-body">
                Sie möchten eine ausführliche Bewertung vor Ort? Buchen Sie direkt
                einen Termin oder senden Sie uns eine Nachricht.
              </p>
            </div>
            <BewertungToggle />
          </div>
        </Container>
      </section>

      {/* Trust & Credentials */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-dark mb-6">
                  Warum homefin?
                </h2>
                <div className="space-y-4 mb-8">
                  {[
                    "Immobilienmakler (IHK)",
                    "Über 1.000 erfolgreiche Bewertungen",
                    "Tiefe lokale Marktkenntnis",
                    "100% kostenlos und unverbindlich",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Shield size={18} className="text-primary flex-shrink-0" />
                      <span className="text-slate-dark">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-card shadow-card">
                  <img
                    src={siteConfig.owner.photo}
                    alt={siteConfig.owner.name}
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-primary/20"
                  />
                  <div>
                    <div className="font-semibold text-slate-dark">
                      {siteConfig.owner.name}
                    </div>
                    <div className="text-sm text-slate-body">
                      {siteConfig.owner.title}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ImmoScoutWidget />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
