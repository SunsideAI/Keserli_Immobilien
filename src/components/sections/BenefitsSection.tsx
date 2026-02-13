import {
  Star,
  Clock,
  TrendingUp,
  MapPin,
  Shield,
  Eye,
  Percent,
  Check,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { benefits } from "@/data/benefits";

const iconMap: Record<string, React.ElementType> = {
  Star,
  Clock,
  TrendingUp,
  MapPin,
  Shield,
  Eye,
  Percent,
};

export default function BenefitsSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          badge="VORTEILE"
          title="Warum Homefin Ihr bester Partner ist"
          subtitle="Lokale Expertise, faire Konditionen und persönliche Betreuung – dafür stehen wir."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.slice(0, 3).map((benefit) => {
            const Icon = iconMap[benefit.icon] || Star;
            return (
              <Card key={benefit.title} hover className="p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                {benefit.stat && (
                  <div className="text-3xl font-bold text-primary mb-2">
                    {benefit.stat}
                  </div>
                )}
                <h3 className="font-semibold text-slate-dark mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-body">{benefit.description}</p>
              </Card>
            );
          })}

          <Card hover className="p-6 bg-primary text-white sm:col-span-2 lg:col-span-1">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-white mb-4">Unser Versprechen</h3>
              <ul className="text-sm text-left space-y-2">
                {benefits.slice(3).map((b) => (
                  <li key={b.title} className="flex items-start gap-2">
                    <Check size={14} className="text-primary-200 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">{b.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
