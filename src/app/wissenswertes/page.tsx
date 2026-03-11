import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Download, ArrowRight, Star, Award } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Wissenswertes – Blog & Ratgeber rund um Immobilien",
  description:
    "Entdecken Sie unser Immobilien-Wissen: Blogartikel mit Expertentipps und kostenlose Ratgeber zum Download. Ihr Wissensvorsprung beim Kauf und Verkauf.",
  keywords: [
    "Immobilien Wissen",
    "Immobilien Blog",
    "Immobilien Ratgeber",
    "Haus verkaufen Tipps",
    "Immobilienbewertung",
    "Ratgeber Download",
  ],
  alternates: {
    canonical: `${siteConfig.url}/wissenswertes`,
  },
  openGraph: {
    title: "Wissenswertes – Blog & Ratgeber rund um Immobilien",
    description:
      "Blogartikel, Expertentipps und kostenlose Ratgeber zum Download – Ihr Wissensvorsprung bei Immobilien.",
    url: `${siteConfig.url}/wissenswertes`,
    type: "website",
    locale: "de_DE",
    siteName: siteConfig.name,
  },
};

export default function WissenswertesPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-mint-light to-mint py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              WISSENSWERTES
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-dark mb-4 leading-tight">
              Ihr Wissensvorsprung{" "}
              <span className="text-primary">rund um Immobilien</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-body mb-6">
              Expertenwissen aus der Praxis – als Blogartikel zum Lesen oder als
              ausführliche Ratgeber zum kostenlosen Download.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-body">
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={14} className="text-primary" />
                {posts.length} Blogartikel
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

      {/* Two sections */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Blog Card */}
            <Link
              href="/ratgeber"
              className="group bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <BookOpen
                    size={180}
                    className="absolute -bottom-6 -right-6 text-white"
                    strokeWidth={1}
                  />
                </div>
                <div className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                  <BookOpen size={36} className="text-white" />
                </div>
              </div>
              <div className="p-6">
                <Badge variant="primary" className="mb-3">
                  BLOG
                </Badge>
                <h2 className="text-xl font-bold text-slate-dark mb-2 group-hover:text-primary transition-colors">
                  Blog & Fachartikel
                </h2>
                <p className="text-sm text-slate-body mb-4">
                  {posts.length} Artikel zu Immobilienverkauf, Bewertung,
                  Finanzierung und mehr – verständlich und praxisnah von Ihrem
                  lokalen Makler.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Alle Artikel lesen
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>

            {/* Ratgeber Card */}
            <Link
              href="/wissenswertes/ratgeber"
              className="group bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <Download
                    size={180}
                    className="absolute -bottom-6 -right-6 text-white"
                    strokeWidth={1}
                  />
                </div>
                <div className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                  <Download size={36} className="text-white" />
                </div>
              </div>
              <div className="p-6">
                <Badge variant="gold" className="mb-3">
                  RATGEBER
                </Badge>
                <h2 className="text-xl font-bold text-slate-dark mb-2 group-hover:text-primary transition-colors">
                  Ratgeber zum Download
                </h2>
                <p className="text-sm text-slate-body mb-4">
                  Ausführliche Leitfäden und Checklisten als PDF – kostenlos
                  herunterladen und in Ruhe lesen. Ihr Wissensvorsprung beim
                  Immobilienkauf und -verkauf.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Zu den Ratgebern
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
