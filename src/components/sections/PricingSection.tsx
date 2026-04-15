import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollAnimator from "@/components/ui/ScrollAnimator";
import PricingSelector from "@/components/preise/PricingSelector";
import { pricingTiers } from "@/data/pricing";

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

        <PricingSelector tiers={pricingTiers} />
      </Container>
    </section>
  );
}
