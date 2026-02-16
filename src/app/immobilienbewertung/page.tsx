import type { Metadata } from "next";
import { CheckCircle, Clock, Award, Shield } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import ContactForm from "@/components/ui/ContactForm";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Kostenlose Immobilienbewertung",
  description:
    "Kostenlose Immobilienbewertung in Monheim am Rhein, Langenfeld, Leverkusen, Köln & Düsseldorf. Professionelle Marktwertanalyse innerhalb von 48 Stunden.",
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
              <span className="text-primary">in 48 Stunden</span>
            </h1>
            <p className="text-lg text-slate-body max-w-2xl mx-auto">
              Erfahren Sie den aktuellen Marktwert Ihrer Immobilie – professionell
              bewertet von Ihrem lokalen Experten in der Region.
            </p>
          </div>
        </Container>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: CheckCircle,
                step: "1",
                title: "Anfrage stellen",
                description:
                  "Füllen Sie unser Formular aus oder rufen Sie uns an. Teilen Sie uns die wichtigsten Eckdaten Ihrer Immobilie mit.",
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
                  "Innerhalb von 48 Stunden erhalten Sie eine fundierte Marktwertanalyse mit ausführlicher Dokumentation.",
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

      {/* Form Section */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-dark mb-4">
                Jetzt Bewertung anfordern
              </h2>
              <p className="text-lg text-slate-body mb-8">
                Füllen Sie das Formular aus und wir melden uns innerhalb von 24
                Stunden bei Ihnen für einen Besichtigungstermin.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "IHK-zertifizierter Immobilienmakler",
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

            <div className="bg-white rounded-card shadow-card p-6 sm:p-8">
              <ContactForm variant="bewertung" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
