import type { Metadata } from "next";
import { Download, FileText, Star, Award, BookOpen } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { ratgeberDownloads } from "@/data/ratgeber-downloads";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Kostenlose Immobilien-Ratgeber zum Download",
  description:
    "Laden Sie unsere ausführlichen Ratgeber kostenlos herunter: Immobilie verkaufen, Bewertung, Erbimmobilie, Scheidung und mehr. PDF-Leitfäden mit Checklisten.",
  keywords: [
    "Immobilien Ratgeber PDF",
    "Haus verkaufen Ratgeber",
    "Immobilienbewertung Ratgeber",
    "Erbimmobilie Ratgeber",
    "kostenloser Ratgeber",
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
              Kostenlose Ratgeber{" "}
              <span className="text-primary">zum Download</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ratgeberDownloads.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 duration-300 flex flex-col"
              >
                {/* Visual header */}
                <div className="h-44 bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <FileText
                      size={160}
                      className="absolute -bottom-4 -right-4 text-white"
                      strokeWidth={1}
                    />
                  </div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 mb-3">
                      <FileText size={32} className="text-white" />
                    </div>
                    <span className="text-white/80 text-xs font-medium">
                      PDF · {item.pages} Seiten
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <Badge variant="gold" className="mb-3 self-start">
                    {item.category}
                  </Badge>
                  <h2 className="font-bold text-slate-dark mb-2 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-slate-body line-clamp-3 mb-4 flex-1">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Download Button */}
                  <a
                    href={item.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white text-sm font-semibold rounded-btn hover:bg-primary-700 transition-colors shadow-btn"
                  >
                    <Download size={16} />
                    Kostenlos herunterladen
                  </a>
                </div>
              </div>
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
