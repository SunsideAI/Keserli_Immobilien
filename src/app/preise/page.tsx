import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Accordion from "@/components/ui/Accordion";
import { pricingTiers } from "@/data/pricing";
import PricingCard from "@/components/preise/PricingCard";
import PricingCTA from "@/components/preise/PricingCTA";

export const metadata: Metadata = {
  title: "Preise & Leistungen – Faire Maklerprovision ab 1,95%",
  description:
    "Transparente Maklerprovisionen ab 1,95% inkl. MwSt. – eine der fairsten in NRW. Vergleichen Sie unsere Leistungspakete für den Immobilienverkauf.",
  keywords: [
    "Maklerprovision",
    "faire Provision",
    "Maklerkosten",
    "Immobilienverkauf Kosten",
    "1,95% Provision",
  ],
  alternates: { canonical: "https://www.myhomefin.de/preise" },
  openGraph: {
    title: "Faire Maklerprovision ab 1,95% | homefin GmbH",
    description:
      "Transparente Preise, keine versteckten Kosten. Vergleichen Sie unsere Leistungspakete.",
    url: "https://www.myhomefin.de/preise",
    type: "website",
    locale: "de_DE",
    siteName: "homefin GmbH",
  },
};

const pricingFAQ = [
  {
    question: "Was ist in der Provision enthalten?",
    answer:
      "Unsere Provision deckt den kompletten Maklerservice ab: Immobilienbewertung, Exposé-Erstellung, Vermarktung auf allen relevanten Portalen, Organisation von Besichtigungen, Preisverhandlungen und die Begleitung bis zum Notartermin.",
  },
  {
    question: "Wann wird die Provision fällig?",
    answer:
      "Die Provision wird erst bei erfolgreichem Verkauf fällig – also nach der notariellen Beurkundung. Es fallen keine Vorabkosten oder Grundgebühren an.",
  },
  {
    question: "Kann ich das Paket wechseln?",
    answer:
      "Ja, Sie können jederzeit auf ein höheres Paket upgraden. Wir beraten Sie gerne, welches Paket am besten zu Ihrer Situation passt.",
  },
  {
    question: "Was bedeutet Bestpreisgarantie?",
    answer:
      "Mit unserer Bestpreisgarantie im Premium+ Paket setzen wir alle Hebel in Bewegung, um den bestmöglichen Verkaufspreis für Ihre Immobilie zu erzielen. Das umfasst professionelle Vermarktung, gezielte Käufer-Vorqualifizierung und strategische Verhandlungsführung.",
  },
  {
    question: "Kann ich einzelne Leistungen aus Select auch separat buchen?",
    answer:
      "Ja, genau dafür ist unser Select-Modell gedacht. Sie wählen nur die Leistungen, die Sie wirklich brauchen – z.B. nur Fotografie, nur eine Marktwertermittlung oder nur die Exposé-Erstellung. Die Preise besprechen wir individuell.",
  },
];

export default function PreisePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-mint-light to-mint py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="gold" className="mb-4">
              TRANSPARENTE PREISE
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-dark mb-6">
              Fairste Provision{" "}
              <span className="text-primary">in Ihrer Region</span>
            </h1>
            <p className="text-lg text-slate-body max-w-2xl mx-auto">
              Keine versteckten Kosten, keine Überraschungen. Wählen Sie das
              Paket, das zu Ihren Bedürfnissen passt.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      {/* Conversion Block */}
      <PricingCTA />

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle size={24} className="text-primary" />
              <h2 className="text-2xl font-bold text-slate-dark">
                Häufige Fragen zu unseren Preisen
              </h2>
            </div>
            <Accordion items={pricingFAQ} />
          </div>
        </Container>
      </section>
    </>
  );
}
