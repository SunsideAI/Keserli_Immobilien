import type { Metadata } from "next";
import { BookOpen, Star, Award } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import BlogFilters from "@/components/blog/BlogFilters";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Immobilien-Ratgeber – Expertenwissen für Käufer und Verkäufer",
  description:
    "Ratgeber und Tipps rund um Immobilienverkauf, Bewertung, Finanzierung und mehr. Expertenwissen von Ihrem lokalen Makler in Monheim am Rhein und Umgebung.",
  keywords: [
    "Immobilien Ratgeber",
    "Haus verkaufen Tipps",
    "Immobilienbewertung",
    "Immobilienfinanzierung",
    "Grunderwerbsteuer NRW",
    "Maklerrecht",
    "Immobilienmarkt Rheinland",
  ],
  alternates: {
    canonical: `${siteConfig.url}/ratgeber`,
  },
  openGraph: {
    title: "Immobilien-Ratgeber – Expertenwissen für Käufer und Verkäufer",
    description:
      "Expertentipps und Leitfäden für Immobilienkäufer und -verkäufer – verständlich und praxisnah.",
    url: `${siteConfig.url}/ratgeber`,
    type: "website",
    locale: "de_DE",
    siteName: siteConfig.name,
  },
};

export default function RatgeberPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Immobilien-Ratgeber",
    description: "Expertenwissen rund um Immobilien",
    url: `${siteConfig.url}/ratgeber`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 10).map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteConfig.url}/ratgeber/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <section className="bg-gradient-to-br from-mint-light to-mint py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              RATGEBER
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-dark mb-4 leading-tight">
              Wissen rund um{" "}
              <span className="text-primary">Immobilien</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-body mb-6">
              {posts.length} Expertentipps und Leitfäden für Käufer und
              Verkäufer – verständlich und praxisnah von Ihrem lokalen Makler.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-body">
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={14} className="text-primary" />
                {posts.length} Ratgeber
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

      <section className="section-padding bg-gray-50">
        <Container>
          <BlogFilters posts={posts} categories={categories} />
        </Container>
      </section>
    </>
  );
}
