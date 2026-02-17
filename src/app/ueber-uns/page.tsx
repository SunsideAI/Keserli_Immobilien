import type { Metadata } from "next";
import { CheckCircle, Award, MapPin, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Über uns – Orhan Keserli & homefin GmbH",
  description:
    "Lernen Sie homefin GmbH und Orhan Keserli kennen – Ihr IHK-zertifizierter Immobilienmakler in Monheim am Rhein. Über 10 Jahre Erfahrung, 1.000+ vermittelte Immobilien und 4,9 Sterne bei Google.",
  alternates: { canonical: "https://www.myhomefin.de/ueber-uns" },
  openGraph: {
    title: "Über homefin GmbH – Ihr Makler im Rheinland",
    description: "IHK-zertifizierter Immobilienmakler mit über 10 Jahren Erfahrung.",
    url: "https://www.myhomefin.de/ueber-uns",
    type: "website",
    locale: "de_DE",
    siteName: "homefin GmbH",
  },
};

export default function UeberUnsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-mint-light to-mint py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              ÜBER UNS
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-dark mb-6">
              Ihr lokaler Partner{" "}
              <span className="text-primary">für Immobilien</span>
            </h1>
            <p className="text-lg text-slate-body">
              Seit über 10 Jahren begleiten wir Eigentümer und Käufer im
              Rheinland bei einem der wichtigsten Geschäfte ihres Lebens.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: siteConfig.stats.propertiesSold, label: "Vermittelte Immobilien" },
              { value: siteConfig.stats.yearsExperience, label: "Jahre Erfahrung" },
              { value: `€${siteConfig.stats.volumeTransacted}`, label: "Transaktionsvolumen" },
              { value: `${siteConfig.stats.googleRating}/5`, label: "Google Bewertung" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
                <div className="text-sm text-slate-body mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-dark mb-6">
                Die Geschichte von Homefin
              </h2>
              <div className="space-y-4 text-slate-body leading-relaxed">
                <p>
                  homefin wurde mit einer klaren Mission gegründet: den
                  Immobilienmarkt im Rheinland fairer und transparenter zu
                  machen. Als lokaler Makler kennen wir jeden Stadtteil, jede
                  Straße und den aktuellen Markt in Ihrer Region.
                </p>
                <p>
                  Unter der Leitung von {siteConfig.owner.name},
                  IHK-zertifizierter Immobilienmakler, haben wir über 1.000
                  Immobilien erfolgreich vermittelt. Unser Erfolgsgeheimnis:
                  faire Provisionen, persönliche Betreuung und tiefe
                  Marktkenntnis.
                </p>
                <p>
                  Wir sind in {siteConfig.regions.join(", ")} tätig und kennen
                  die Besonderheiten jedes Marktes. Das ermöglicht uns,
                  Immobilien optimal zu bewerten und effektiv zu vermarkten.
                </p>
              </div>
            </div>

            <div className="bg-mint rounded-card p-8">
              <div className="text-center mb-6">
                <img
                  src={siteConfig.owner.photo}
                  alt={siteConfig.owner.name}
                  className="w-24 h-24 rounded-full object-cover object-top border-3 border-primary/20 mx-auto mb-4"
                />

                <h3 className="text-xl font-bold text-slate-dark">
                  {siteConfig.owner.name}
                </h3>
                <p className="text-slate-body">{siteConfig.owner.title}</p>
                <p className="text-sm text-slate-body">Geschäftsführer, {siteConfig.name}</p>
              </div>
              <StarRating rating={siteConfig.stats.googleRating} size={20} className="justify-center mb-4" />
              <div className="flex items-center justify-center gap-2 text-gold">
                <Award size={20} />
                <span className="text-sm font-semibold text-slate-dark">
                  IDA Award Träger
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-slate-dark text-center mb-12">
            Unsere Werte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Lokale Expertise",
                description:
                  "Wir kennen den Markt in Ihrer Region wie kein anderer. Diese Expertise fließt in jede Bewertung und Vermarktung ein.",
              },
              {
                icon: Users,
                title: "Persönliche Betreuung",
                description:
                  "Bei uns sind Sie keine Nummer. Sie haben einen festen Ansprechpartner, der Sie durch den gesamten Prozess begleitet.",
              },
              {
                icon: CheckCircle,
                title: "Transparenz & Fairness",
                description:
                  "Klare Kommunikation, faire Provisionen und keine versteckten Kosten – das ist unser Versprechen an Sie.",
              },
            ].map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={26} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-dark mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-body">{value.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-primary">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Bereit für ein Gespräch?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Wir beraten Sie gerne persönlich und unverbindlich zu Ihrem
              Immobilienvorhaben.
            </p>
            <Button href="/kontakt" variant="white" size="lg">
              Kontakt aufnehmen
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
