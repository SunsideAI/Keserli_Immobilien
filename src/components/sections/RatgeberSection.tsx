import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollAnimator from "@/components/ui/ScrollAnimator";
import RatgeberWizard from "@/components/ratgeber/RatgeberWizard";

export default function RatgeberSection() {
  return (
    <section id="ratgeber" className="section-padding bg-gradient-to-b from-mint-light to-white">
      <Container>
        <ScrollAnimator>
          <SectionHeading
            badge="RATGEBER"
            title="Ihr persönlicher Immobilien-Ratgeber"
            subtitle="Beantworten Sie wenige Fragen und erhalten Sie eine individuelle Empfehlung – kostenlos und unverbindlich."
          />
        </ScrollAnimator>

        <ScrollAnimator>
          <div className="max-w-3xl mx-auto">
            <RatgeberWizard />
          </div>
        </ScrollAnimator>
      </Container>
    </section>
  );
}
