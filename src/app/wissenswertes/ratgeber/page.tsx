import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, Award, BookOpen } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { ratgeberDownloads } from "@/data/ratgeber-downloads";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Kostenlose Immobilien-Ratgeber zum Download",
  description:
    "Laden Sie unsere ausführlichen Ratgeber kostenlos herunter: Energetische Sanierung, Erbimmobilie, Scheidung, Finanzierung und mehr. PDF-Leitfäden mit Checklisten.",
  keywords: [
    "Immobilien Ratgeber PDF",
    "Haus verkaufen Ratgeber",
    "Immobilienbewertung Ratgeber",
    "Erbimmobilie Ratgeber",
    "kostenloser Ratgeber",
    "energetische Sanierung",
    "Immobilie finanzieren",
  ],
  alternates: {
    canonical: `${siteConfig.url}/wissenswertes/ratgeber`,
  },
  openGraph: {
    title: "Kostenlose Immobilien-Ratgeber zum Download",
    description:
      "Ausführliche PDF-Ratgeber mit Checklisten – kostenlos herunterladen.",
    url: `${siteConfig.url}/wissenswertes/ratgeber`,
    type: "website",
    locale: "de_DE",
    siteName: siteConfig.name,
  },
};

export default function RatgeberDownloadsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-mint-light to-mint py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="gold" className="mb-4">
              RATGEBER
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-dark mb-4 leading-tight">
              Profitieren Sie von unserer{" "}
              <span className="text-primary">Erfahrung</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-body mb-6">
              Ausführliche Leitfäden und Checklisten als PDF – erarbeitet von
              unseren Experten. Laden Sie sich Ihr Wissen kostenlos herunter.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-body">
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={14} className="text-primary" />
                {ratgeberDownloads.length} Ratgeber
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star size={14} className="text-gold fill-gold" />
                {siteConfig.stats.googleRating} Google
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award size={14} className="text-gold" />
                IDA Award
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Ratgeber Grid */}
      <section className="section-padding bg-gray-50">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-8">
            Ratgeber
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ratgeberDownloads.map((item) => (
              <Link
                key={item.id}
                href={`/wissenswertes/ratgeber/${item.slug}`}
                className="group bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 duration-300 flex flex-col"
              >
                <div className="p-6 flex flex-col items-center text-center flex-1">
                  <h3 className="font-bold text-lg text-primary mb-4 group-hover:text-primary-800 transition-colors min-h-[3.5rem] flex items-center">
                    {item.title}
                  </h3>
                  <div className="w-44 h-56 relative mb-5">
                    <Image
                      src={item.coverImage}
                      alt={`Ratgeber: ${item.title}`}
                      fill
                      className="object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <span className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white text-sm font-semibold rounded-btn group-hover:bg-primary-700 transition-colors shadow-btn mt-auto">
                    Mehr erfahren
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-4">
              Persönliche Beratung gewünscht?
            </h2>
            <p className="text-slate-body mb-6">
              Unsere Ratgeber geben Ihnen einen fundierten Überblick. Für eine
              individuelle Beratung stehen wir Ihnen jederzeit zur Verfügung.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/kontakt"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white text-sm font-semibold rounded-btn hover:bg-primary-700 transition-colors shadow-btn"
              >
                Jetzt Kontakt aufnehmen
              </a>
              <a
                href="/immobilienbewertung"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary text-sm font-semibold rounded-btn border-2 border-primary hover:bg-primary-50 transition-colors"
              >
                Kostenlose Bewertung
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
