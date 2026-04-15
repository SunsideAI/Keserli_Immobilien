import {
  BarChart3,
  MapPin,
  Home,
  Camera,
  Calculator,
  Handshake,
  Key,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollAnimator from "@/components/ui/ScrollAnimator";

const services = [
  {
    icon: BarChart3,
    title: "Immobilienbewertung",
    description:
      "Kostenlose Marktwertermittlung Ihrer Immobilie – fundiert und unverbindlich.",
    href: "/immobilienbewertung",
  },
  {
    icon: MapPin,
    title: "Grundstücksbewertung",
    description:
      "Erfahren Sie den aktuellen Marktwert Ihres Grundstücks – schnell und kostenlos.",
    href: "/grundstuecksbewertung",
  },
  {
    icon: Home,
    title: "Immobilienverkauf",
    description:
      "Professioneller Verkauf Ihrer Immobilie mit fairer Provision ab 1,95 % inkl. MwSt.",
    href: "/verkauf",
  },
  {
    icon: Camera,
    title: "Vermarktung & Exposé",
    description:
      "Profi-Fotos, 360°-Touren, Drohnenaufnahmen und hochwertige Exposés für maximale Reichweite.",
    href: "/verkauf",
  },
  {
    icon: Calculator,
    title: "Finanzierungsberatung",
    description:
      "Budget-, Zins- und Tilgungsrechner sowie persönliche Beratung mit über 700 Partnerbanken.",
    href: "/finanzierung",
  },
  {
    icon: Handshake,
    title: "Kaufberatung",
    description:
      "Wir begleiten Sie beim Immobilienkauf – von der Suche bis zum Notartermin.",
    href: "/kontakt",
  },
  {
    icon: Key,
    title: "Bestandsimmobilien",
    description:
      "Aktuelle Immobilienangebote in Monheim, Langenfeld, Leverkusen, Köln und Düsseldorf.",
    href: "/angebote",
  },
];

export default function ServicePillarsSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <ScrollAnimator>
          <SectionHeading
            badge="UNSERE SERVICES"
            title="Alles aus einer Hand"
            subtitle="Von der Bewertung bis zur Schlüsselübergabe – wir begleiten Sie bei jedem Schritt."
          />
        </ScrollAnimator>

        <ScrollAnimator stagger>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group bg-gray-50 rounded-card p-5 hover:shadow-card-hover hover:bg-white transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon
                      size={22}
                      className="text-primary group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-dark mb-1.5 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-body flex-1 mb-3 leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary font-semibold text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Mehr erfahren <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </ScrollAnimator>
      </Container>
    </section>
  );
}
