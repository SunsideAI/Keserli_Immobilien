import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, Phone, ChevronRight, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ratgeberDownloads } from "@/data/ratgeber-downloads";
import { siteConfig } from "@/data/site-config";

interface PageProps {
  params: { slug: string };
}

function getRatgeber(slug: string) {
  return ratgeberDownloads.find((r) => r.slug === slug);
}

export function generateStaticParams() {
  return ratgeberDownloads.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const ratgeber = getRatgeber(params.slug);
  if (!ratgeber) return { title: "Ratgeber nicht gefunden" };

  const url = `${siteConfig.url}/wissenswertes/ratgeber/${ratgeber.slug}`;

  return {
    title: ratgeber.seo.metaTitle,
    description: ratgeber.seo.metaDescription,
    keywords: ratgeber.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: ratgeber.seo.metaTitle,
      description: ratgeber.seo.metaDescription,
      url,
      type: "article",
      locale: "de_DE",
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${ratgeber.coverImage}`,
          width: 800,
          height: 600,
          alt: ratgeber.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ratgeber.seo.metaTitle,
      description: ratgeber.seo.metaDescription,
    },
  };
}

export default function RatgeberLandingPage({ params }: PageProps) {
  const ratgeber = getRatgeber(params.slug);
  if (!ratgeber) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ratgeber",
        item: `${siteConfig.url}/wissenswertes/ratgeber`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: ratgeber.title,
        item: `${siteConfig.url}/wissenswertes/ratgeber/${ratgeber.slug}`,
      },
    ],
  };

  const faqSchema =
    ratgeber.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ratgeber.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumb */}
      <section className="bg-gray-50 py-3 sm:py-4">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-body overflow-x-auto"
          >
            <Link href="/" className="hover:text-primary transition-colors whitespace-nowrap">
              Startseite
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link
              href="/wissenswertes/ratgeber"
              className="hover:text-primary transition-colors whitespace-nowrap"
            >
              Ratgeber
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-slate-dark font-medium line-clamp-1">
              {ratgeber.title}
            </span>
          </nav>
        </Container>
      </section>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-teal-dark py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <Badge variant="gold" className="mb-4">
                {ratgeber.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                {ratgeber.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/80 mb-3">
                {ratgeber.subtitle}
              </p>
              <p className="text-base text-white/70 mb-6 max-w-xl">
                {ratgeber.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={ratgeber.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-btn hover:bg-gray-50 transition-colors shadow-btn text-base"
                >
                  <Download size={18} />
                  Kostenlos herunterladen
                </a>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-btn hover:bg-white/10 transition-colors text-base"
                >
                  <Phone size={18} />
                  Beratung anrufen
                </a>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {ratgeber.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white/15 text-white/80 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-64 sm:w-72 lg:w-80">
                <Image
                  src={ratgeber.coverImage}
                  alt={`Ratgeber: ${ratgeber.title}`}
                  width={400}
                  height={520}
                  className="rounded-xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Content Sections */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-8 text-center">
              Was Sie in diesem Ratgeber erwartet
            </h2>
            <div className="space-y-8">
              {ratgeber.sections.map((section, index) => (
                <div
                  key={index}
                  className="flex gap-4 sm:gap-6"
                >
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary font-bold text-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-dark mb-2">
                      {section.heading}
                    </h3>
                    <p className="text-slate-body leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Mid CTA */}
      <section className="py-10 sm:py-14 bg-mint-light">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-3">
              Jetzt kostenlos herunterladen
            </h2>
            <p className="text-slate-body mb-6">
              {ratgeber.pages} Seiten geballtes Expertenwissen – verständlich aufbereitet und sofort umsetzbar.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-dark">
                <CheckCircle2 size={18} className="text-primary" />
                Kostenloser PDF-Download
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-dark">
                <CheckCircle2 size={18} className="text-primary" />
                Sofort verfügbar
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-dark">
                <CheckCircle2 size={18} className="text-primary" />
                Von Experten erstellt
              </div>
            </div>
            <a
              href={ratgeber.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-btn hover:bg-primary-800 transition-colors shadow-btn text-base"
            >
              <Download size={18} />
              Ratgeber herunterladen ({ratgeber.pages} Seiten)
            </a>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      {ratgeber.faq.length > 0 && (
        <section className="section-padding bg-white">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-8 text-center">
                Häufig gestellte Fragen
              </h2>
              <div className="space-y-4">
                {ratgeber.faq.map((item, index) => (
                  <details
                    key={index}
                    className="group bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 font-semibold text-slate-dark hover:text-primary transition-colors list-none">
                      <span className="pr-4">{item.question}</span>
                      <ChevronRight
                        size={20}
                        className="shrink-0 transition-transform group-open:rotate-90 text-primary"
                      />
                    </summary>
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-body leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="section-padding bg-gradient-to-br from-primary to-teal-dark">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Persönliche Beratung gewünscht?
            </h2>
            <p className="text-white/80 mb-6">
              Unser Ratgeber gibt Ihnen einen fundierten Überblick. Für eine individuelle
              Beratung stehen wir Ihnen jederzeit zur Verfügung.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/kontakt" variant="white">
                Jetzt Kontakt aufnehmen
              </Button>
              <Button href="/immobilienbewertung" variant="secondary" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                Kostenlose Bewertung
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Ratgeber */}
      <section className="section-padding bg-gray-50">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-8 text-center">
            Weitere Ratgeber entdecken
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ratgeberDownloads
              .filter((r) => r.slug !== ratgeber.slug)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/wissenswertes/ratgeber/${item.slug}`}
                  className="group bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 duration-300 flex flex-col"
                >
                  <div className="p-5 flex flex-col items-center text-center">
                    <div className="w-36 h-44 relative mb-4">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="font-bold text-slate-dark group-hover:text-primary transition-colors mb-2">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                      Mehr erfahren <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </Container>
      </section>
    </>
  );
}
