import { ArrowRight, CheckCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export default function UeberHomefinSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-dark mb-4">
              Über Homefin
            </h2>
            <p className="text-lg text-slate-body mb-6 leading-relaxed">
              Als lokaler Immobilienmakler in {siteConfig.contact.address.city}{" "}
              kennen wir den Markt wie unsere Westentasche. Seit über 10 Jahren
              begleiten wir Eigentümer und Käufer in{" "}
              {siteConfig.regions.join(", ")} bei einem der wichtigsten
              Geschäfte ihres Lebens.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Lokale Marktführer mit tiefem Regionswissen",
                "Individuelle Lösungen für jeden Kunden",
                "Höchste Kundenzufriedenheit (4,9/5 Google)",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle
                    size={18}
                    className="text-primary flex-shrink-0"
                  />
                  <span className="text-slate-dark">{item}</span>
                </li>
              ))}
            </ul>

            <Button href="/ueber-uns" variant="secondary">
              Mehr über uns erfahren
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-mint rounded-card h-48 flex items-center justify-center">
                <span className="text-primary text-sm font-medium">
                  Monheim am Rhein
                </span>
              </div>
              <div className="bg-primary-100 rounded-card h-32 flex items-center justify-center">
                <span className="text-primary text-sm font-medium">
                  Langenfeld
                </span>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-primary-100 rounded-card h-32 flex items-center justify-center">
                <span className="text-primary text-sm font-medium">
                  Leverkusen
                </span>
              </div>
              <div className="bg-mint rounded-card h-48 flex items-center justify-center">
                <span className="text-primary text-sm font-medium">
                  Köln & Düsseldorf
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
