import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import KontaktToggle from "@/components/kontakt/KontaktToggle";
import MapWrapper from "@/components/map/MapWrapper";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Kontakt – Kostenlose Beratung anfordern",
  description:
    "Kontaktieren Sie homefin GmbH – Ihren Immobilienmakler (IHK) in Monheim am Rhein. Kostenlose Beratung unter 0800 5888 015 oder per E-Mail an info@myhomefin.de.",
  alternates: { canonical: "https://www.myhomefin.de/kontakt" },
  openGraph: {
    title: "Kontakt | homefin GmbH – Immobilienmakler (IHK)",
    description: "Kostenlose und unverbindliche Beratung – rufen Sie uns an oder schreiben Sie uns.",
    url: "https://www.myhomefin.de/kontakt",
    type: "website",
    locale: "de_DE",
    siteName: "homefin GmbH",
  },
};

export default function KontaktPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-mint-light to-mint py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              KONTAKT
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-dark mb-6">
              Sprechen Sie{" "}
              <span className="text-primary">mit uns</span>
            </h1>
            <p className="text-lg text-slate-body">
              Wir beraten Sie gerne persönlich und unverbindlich zu Ihrem
              Immobilienvorhaben.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-white pt-12 pb-4">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-slate-body">Telefon</div>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-slate-body">E-Mail</div>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-slate-body">Adresse</div>
                <div className="text-sm font-semibold text-slate-dark">
                  {siteConfig.contact.address.street}, {siteConfig.contact.address.zip} {siteConfig.contact.address.city}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-slate-body">Öffnungszeiten</div>
                <div className="text-sm font-semibold text-slate-dark">
                  Mo–Fr 09–18 Uhr
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Centered Toggle: Termin buchen / Nachricht senden */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <KontaktToggle />
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="bg-white pb-16">
        <Container>
          <MapWrapper className="h-[450px] w-full rounded-card shadow-card" />
        </Container>
      </section>
    </>
  );
}
