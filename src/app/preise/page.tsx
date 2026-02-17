import type { Metadata } from "next";
import { Check, HelpCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/utils";

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
    description: "Transparente Preise, keine versteckten Kosten. Vergleichen Sie unsere Leistungspakete.",
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
];

export default function PreisePage() {
  return (
    <>
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

      <section className="section-padding bg-white">
        <Container>
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
                  <p className="text-sm text-slate-body mt-3">
                    {tier.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-body">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  href={tier.ctaHref}
                  variant={tier.highlighted ? "primary" : "secondary"}
                  className="w-full"
                >
                  {tier.ctaText}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

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
