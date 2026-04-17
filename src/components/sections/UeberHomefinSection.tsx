import { ArrowRight, CheckCircle, MapPin, Award, TrendingUp, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ScrollAnimator from "@/components/ui/ScrollAnimator";
import { siteConfig } from "@/data/site-config";

const regionCards = [
  { name: "Monheim am Rhein", label: "Hauptstandort", accent: true },
  { name: "Langenfeld", label: "Rheinland" },
  { name: "Leverkusen", label: "Rheinisch-Bergischer Kreis" },
  { name: "Köln", label: "Großraum" },
  { name: "Düsseldorf", label: "Landeshauptstadt" },
];

export default function UeberHomefinSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollAnimator>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-dark mb-4">
                Über Homefin
              </h2>
              <p className="text-lg text-slate-body mb-6 leading-relaxed">
                Als Immobilienmakler (IHK) in {siteConfig.contact.address.city}{" "}
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

              <Button href="/kontakt" variant="secondary">
                Jetzt Kontakt aufnehmen
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </ScrollAnimator>

          <ScrollAnimator>
            <div className="space-y-6">
              {/* Owner card */}
              <div className="flex items-center gap-4 p-5 bg-mint rounded-card">
                <img
                  src={siteConfig.owner.photo}
                  alt={siteConfig.owner.name}
                  className="w-16 h-16 rounded-full object-cover object-top border-2 border-primary/20 flex-shrink-0"
                />
                <div>
                  <div className="font-bold text-slate-dark text-lg">{siteConfig.owner.name}</div>
                  <div className="text-sm text-slate-body">{siteConfig.owner.title}</div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-primary/5 rounded-xl p-4 text-center">
                  <TrendingUp size={20} className="mx-auto text-primary mb-2" />
                  <div className="text-xl font-extrabold text-slate-dark">{siteConfig.stats.volumeTransacted}€</div>
                  <div className="text-xs text-slate-body mt-1">Transaktionsvolumen</div>
                </div>
                <div className="bg-primary/5 rounded-xl p-4 text-center">
                  <Users size={20} className="mx-auto text-primary mb-2" />
                  <div className="text-xl font-extrabold text-slate-dark">{siteConfig.stats.propertiesSold}</div>
                  <div className="text-xs text-slate-body mt-1">Immobilien vermittelt</div>
                </div>
                <div className="bg-primary/5 rounded-xl p-4 text-center">
                  <Award size={20} className="mx-auto text-primary mb-2" />
                  <div className="text-xl font-extrabold text-slate-dark">{siteConfig.stats.yearsExperience}</div>
                  <div className="text-xs text-slate-body mt-1">Jahre Erfahrung</div>
                </div>
              </div>

              {/* Regions */}
              <div>
                <h3 className="text-sm font-bold text-slate-dark uppercase tracking-wider mb-3">Unsere Regionen</h3>
                <div className="flex flex-wrap gap-2">
                  {regionCards.map((r) => (
                    <span
                      key={r.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                        r.accent
                          ? "bg-primary text-white"
                          : "bg-primary/5 text-primary hover:bg-primary/10"
                      }`}
                    >
                      <MapPin size={14} />
                      {r.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </Container>
    </section>
  );
}
