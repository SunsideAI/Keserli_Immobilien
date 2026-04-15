import type { Metadata } from "next";
import {
  Home,
  TrendingUp,
  Camera,
  Users,
  FileText,
  Handshake,
  Check,
  ArrowRight,
  Shield,
  Clock,
  Star,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import { siteConfig } from "@/data/site-config";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Immobilie verkaufen – Ihr Makler in Monheim & Umgebung",
  description:
    "Immobilie verkaufen in Monheim am Rhein, Langenfeld, Leverkusen, Köln & Düsseldorf. Faire Provision ab 1,95% inkl. MwSt. Kostenlose Bewertung in 48h.",
  keywords: [
    "Immobilie verkaufen",
    "Haus verkaufen",
    "Wohnung verkaufen",
    "Makler Monheim",
    "Immobilienmakler Langenfeld",
    "Immobilienmakler Leverkusen",
    "Immobilienmakler Köln",
    "Immobilienmakler Düsseldorf",
    "faire Provision",
    "Immobilienbewertung kostenlos",
  ],
  alternates: {
    canonical: "https://www.myhomefin.de/verkauf",
  },
  openGraph: {
    title: "Immobilie verkaufen – Ihr Makler in Monheim & Umgebung | homefin",
    description:
      "Faire Provision ab 1,95% inkl. MwSt. Persönlicher Rundum-Service vom Erstgespräch bis zum Notartermin.",
    url: "https://www.myhomefin.de/verkauf",
    type: "website",
    locale: "de_DE",
    siteName: "homefin GmbH",
  },
};

const verkaufProcess = [
  {
    icon: Home,
    step: "1",
    title: "Kostenlose Bewertung",
    description:
      "Wir ermitteln den realistischen Marktwert Ihrer Immobilie – persönlich vor Ort und fundiert auf Basis aktueller Vergleichsdaten.",
  },
  {
    icon: Camera,
    step: "2",
    title: "Professionelles Exposé",
    description:
      "Hochwertige Fotos, ansprechende Texte und alle wichtigen Informationen – Ihr Exposé wird zum Verkaufsargument.",
  },
  {
    icon: TrendingUp,
    step: "3",
    title: "Gezielte Vermarktung",
    description:
      "Ihr Objekt wird auf allen relevanten Portalen, in unserer Käuferdatenbank und über unser Netzwerk platziert.",
  },
  {
    icon: Users,
    step: "4",
    title: "Besichtigungen",
    description:
      "Wir organisieren und führen alle Besichtigungen durch – vorqualifizierte Interessenten, professionelle Präsentation.",
  },
  {
    icon: FileText,
    step: "5",
    title: "Verhandlung",
    description:
      "Mit Erfahrung und Fingerspitzengefühl verhandeln wir den besten Preis für Sie – transparent und in Ihrem Interesse.",
  },
  {
    icon: Handshake,
    step: "6",
    title: "Notartermin & Übergabe",
    description:
      "Wir begleiten Sie bis zum Abschluss – Vertragsprüfung, Notartermin und strukturierte Übergabe inklusive.",
  },
];

const propertyTypes = [
  {
    title: "Einfamilienhaus",
    description: "Häuser in allen Größen und Lagen – vom Reihenhaus bis zur Villa.",
  },
  {
    title: "Eigentumswohnung",
    description: "Wohnungen jeder Größe – ob Kapitalanlage oder selbstgenutzt.",
  },
  {
    title: "Mehrfamilienhaus",
    description: "Renditeimmobilien und Zinshäuser – professionell bewertet und vermarktet.",
  },
  {
    title: "Grundstück",
    description: "Baugrundstücke und Bauland – wir finden den richtigen Käufer.",
  },
];

const verkaufFAQ = [
  {
    question: "Wie lange dauert der Verkauf einer Immobilie?",
    answer:
      "Im Durchschnitt dauert ein Immobilienverkauf mit homefin 3–6 Monate. Die Dauer hängt von der Immobilienart, dem Preis und der Marktlage ab. Durch unsere große Käuferdatenbank können wir oft schneller vermitteln.",
  },
  {
    question: "Was kostet mich der Verkauf über homefin?",
    answer:
      "Unsere Provision beginnt bei fairen 1,95% inkl. MwSt. – das ist deutlich unter dem Branchendurchschnitt. Sie zahlen nur bei erfolgreichem Verkauf. Keine Vorabkosten, keine versteckten Gebühren.",
  },
  {
    question: "Welche Unterlagen brauche ich für den Verkauf?",
    answer:
      "Die wichtigsten Unterlagen sind: Grundbuchauszug, Energieausweis, Grundrisse, Wohnflächenberechnung und bei Eigentumswohnungen die Teilungserklärung. Wir helfen Ihnen gerne bei der Beschaffung aller notwendigen Dokumente.",
  },
  {
    question: "Muss ich die Maklerprovision alleine zahlen?",
    answer:
      "Nein. Seit Dezember 2020 gilt gesetzlich, dass die Provision in der Regel hälftig zwischen Käufer und Verkäufer geteilt wird. Bei homefin profitieren beide Seiten von einer der fairsten Provisionen der Region.",
  },
  {
    question: "Was unterscheidet homefin von anderen Maklern?",
    answer:
      "Unsere Provision ist mit ab 1,95% inkl. MwSt. eine der fairsten in der Region – bei vollem Maklerservice. Dazu kommen persönliche Betreuung durch Orhan Keserli, tiefe lokale Marktkenntnis und eine große Käuferdatenbank.",
  },
];

export default function VerkaufPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-mint-light to-mint py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="gold" className="mb-4">
              IMMOBILIE VERKAUFEN
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-dark mb-6">
              Ihre Immobilie verdient den{" "}
              <span className="text-primary">besten Preis</span>
            </h1>
            <p className="text-lg text-slate-body max-w-2xl mx-auto mb-8">
              Wir verkaufen Ihre Immobilie in Monheim am Rhein, Langenfeld,
              Leverkusen, Köln und Düsseldorf – mit fairer Provision ab 1,95%
              inkl. MwSt. und persönlichem Rundum-Service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/immobilienbewertung" size="lg">
                Kostenlose Bewertung anfordern
              </Button>
              <Button href="/kontakt" variant="secondary" size="lg">
                Unverbindlich beraten lassen
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Vorteile */}
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-4">IHRE VORTEILE</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-dark">
              Warum Eigentümer homefin vertrauen
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Faire Provision",
                text: "Ab 1,95% inkl. MwSt. – eine der fairsten Provisionen der Region.",
              },
              {
                icon: Clock,
                title: "Schneller Verkauf",
                text: "Durch unsere Käuferdatenbank finden wir oft schneller den passenden Käufer.",
              },
              {
                icon: Star,
                title: "Lokale Expertise",
                text: "Über 10 Jahre Erfahrung und tiefe Marktkenntnis im Rheinland.",
              },
              {
                icon: Users,
                title: "Persönlich betreut",
                text: "Ihr persönlicher Ansprechpartner von der Bewertung bis zur Übergabe.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-gray-50 rounded-card p-6 text-center"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-body">{item.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Verkaufsprozess */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-4">SO FUNKTIONIERT&apos;S</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-dark">
              In 6 Schritten zum erfolgreichen Verkauf
            </h2>
            <p className="text-lg text-slate-body max-w-2xl mx-auto mt-4">
              Wir begleiten Sie durch den gesamten Verkaufsprozess – persönlich,
              transparent und professionell.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {verkaufProcess.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white rounded-card p-6 shadow-card"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <div className="text-sm font-bold text-primary">
                      Schritt {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-body">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Immobilientypen */}
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-4">IMMOBILIENTYPEN</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-dark">
              Wir verkaufen jede Immobilienart
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {propertyTypes.map((type) => (
              <div
                key={type.title}
                className="border border-gray-200 rounded-card p-6 hover:shadow-card transition-shadow"
              >
                <h3 className="text-lg font-bold text-slate-dark mb-2">
                  {type.title}
                </h3>
                <p className="text-sm text-slate-body">{type.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Regionen */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-4">UNSERE REGIONEN</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-dark">
              Ihr lokaler Makler im Rheinland
            </h2>
            <p className="text-lg text-slate-body max-w-2xl mx-auto mt-4">
              Wir kennen den Markt in Ihrer Region und wissen, was Käufer suchen.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {siteConfig.regions.map((region) => (
              <div
                key={region}
                className="bg-white rounded-card p-4 text-center shadow-card"
              >
                <span className="font-semibold text-slate-dark text-sm">
                  {region}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Preise Kurzübersicht */}
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="gold" className="mb-4">
              FAIRE KONDITIONEN
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-dark">
              Transparente Preise, keine Überraschungen
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  "bg-white rounded-card p-6 sm:p-8 relative",
                  tier.highlighted
                    ? "ring-2 ring-primary shadow-card-hover scale-[1.02]"
                    : "shadow-card border border-gray-100"
                )}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                      EMPFOHLEN
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-slate-dark mb-2">
                    {tier.name}
                  </h3>
                  <div className="text-4xl font-extrabold text-primary">
                    {tier.price}
                  </div>
                  <div className="text-sm text-slate-body mt-1">
                    {tier.priceNote}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-2">
                      <Check
                        size={16}
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-slate-body">{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  href="/preise"
                  variant={tier.highlighted ? "primary" : "secondary"}
                  className="w-full"
                >
                  {tier.ctaText}
                </Button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/preise" variant="ghost">
              Alle Preise im Detail ansehen <ArrowRight size={16} className="ml-1 inline" />
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA mit Makler */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-600">
        <Container>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img
                src={siteConfig.owner.photo}
                alt={siteConfig.owner.name}
                className="w-28 h-28 rounded-full object-cover object-top border-4 border-white/30"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Lassen Sie uns über Ihre Immobilie sprechen
              </h2>
              <p className="text-white/80 mb-6">
                {siteConfig.owner.name}, {siteConfig.owner.title}, berät Sie
                persönlich und unverbindlich. Rufen Sie an oder schreiben Sie uns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  {siteConfig.contact.phone}
                </Button>
                <Button
                  href="/kontakt"
                  variant="secondary"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Kontakt aufnehmen
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4">HÄUFIGE FRAGEN</Badge>
              <h2 className="text-3xl font-bold text-slate-dark">
                Fragen zum Immobilienverkauf
              </h2>
            </div>
            <Accordion items={verkaufFAQ} />
          </div>
        </Container>
      </section>
    </>
  );
}
