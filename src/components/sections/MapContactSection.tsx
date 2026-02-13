import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MapWrapper from "@/components/map/MapWrapper";
import { siteConfig } from "@/data/site-config";

export default function MapContactSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          badge="STANDORT"
          title="So finden Sie uns"
          subtitle="Besuchen Sie uns in unserem Büro in Monheim am Rhein oder kontaktieren Sie uns direkt."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-dark mb-1">Telefon</h3>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="text-primary hover:underline"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-dark mb-1">E-Mail</h3>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-primary hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-dark mb-1">Adresse</h3>
                <p className="text-slate-body">
                  {siteConfig.contact.address.street}
                  <br />
                  {siteConfig.contact.address.zip}{" "}
                  {siteConfig.contact.address.city}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-dark mb-1">
                  Öffnungszeiten
                </h3>
                <p className="text-slate-body">
                  Mo – Fr: 09:00 – 18:00 Uhr
                  <br />
                  Sa: nach Vereinbarung
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <MapWrapper className="h-[400px] w-full rounded-card shadow-card" />
          </div>
        </div>
      </Container>
    </section>
  );
}
