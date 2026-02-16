import { Search, Target, Users, CheckCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollAnimator from "@/components/ui/ScrollAnimator";
import { processSteps } from "@/data/process-steps";

const iconMap: Record<string, React.ElementType> = {
  Search,
  Target,
  Users,
  CheckCircle,
};

export default function ProcessSection() {
  return (
    <section className="section-padding bg-teal-dark">
      <Container>
        <ScrollAnimator>
          <SectionHeading
            title="So verkaufen Sie Ihre Immobilie"
            subtitle="In vier einfachen Schritten zum erfolgreichen Verkauf Ihrer Immobilie."
            light
          />
        </ScrollAnimator>

        <ScrollAnimator stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => {
              const Icon = iconMap[step.icon] || Search;
              return (
                <div
                  key={step.number}
                  className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/10 hover:bg-white/15 transition-colors relative"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-primary-300" />
                    </div>
                    <span className="text-primary-300 text-xs font-semibold tracking-widest uppercase">
                      Schritt {index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-primary-100/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollAnimator>
      </Container>
    </section>
  );
}
