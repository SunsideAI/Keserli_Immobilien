import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ScrollAnimator from "@/components/ui/ScrollAnimator";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/utils";

export default function PricingSection() {
  return (
    <section className="section-padding bg-mint-light">
      <Container>
        <ScrollAnimator>
          <SectionHeading
            badge="PREISE"
            title="Fairste Provision in Ihrer Region"
            subtitle="Transparente Preise ohne versteckte Kosten. Wählen Sie das Paket, das zu Ihnen passt."
          />
        </ScrollAnimator>

        <ScrollAnimator stagger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  "bg-white rounded-card p-6 sm:p-8 relative flex flex-col",
                  tier.highlighted
                    ? "ring-2 ring-primary shadow-card-hover scale-[1.02]"
                    : "shadow-card"
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
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold text-primary">
                      {tier.price}
                    </span>
                  </div>
                  <div className="text-sm text-slate-body mt-1">
                    {tier.priceNote}
                  </div>
                  <p className="text-sm text-slate-body mt-3">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
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
                  className="w-full mt-auto"
                >
                  {tier.ctaText}
                </Button>
              </div>
            ))}
          </div>
        </ScrollAnimator>
      </Container>
    </section>
  );
}
