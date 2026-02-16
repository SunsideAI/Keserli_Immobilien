import { CheckCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/ui/ContactForm";
import ScrollAnimator from "@/components/ui/ScrollAnimator";
import { siteConfig } from "@/data/site-config";

export default function BewertungSection() {
  return (
    <section id="bewertung" className="section-padding bg-mint">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ScrollAnimator>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-dark mb-4">
                Kostenlose Immobilienbewertung anfordern
              </h2>
              <p className="text-lg text-slate-body mb-8">
                Erfahren Sie den aktuellen Marktwert Ihrer Immobilie – kostenlos
                und unverbindlich von unseren Experten bewertet.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Professionelle Marktwertanalyse",
                  "Persönliche Besichtigung vor Ort",
                  "Ergebnis innerhalb von 48 Stunden",
                  "100% kostenlos & unverbindlich",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-primary flex-shrink-0" />
                    <span className="text-slate-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 p-4 bg-white rounded-card shadow-sm">
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
                    {siteConfig.owner.title}, {siteConfig.name}
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimator>

          <ScrollAnimator>
            <div className="bg-white rounded-card shadow-card p-6 sm:p-8">
              <ContactForm variant="bewertung" />
            </div>
          </ScrollAnimator>
        </div>
      </Container>
    </section>
  );
}
