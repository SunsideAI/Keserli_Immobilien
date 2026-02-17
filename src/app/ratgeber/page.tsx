import type { Metadata } from "next";
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

      <section className="bg-gradient-to-br from-mint-light to-mint py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              RATGEBER
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-dark mb-6">
              Wissen rund um{" "}
              <span className="text-primary">Immobilien</span>
            </h1>
            <p className="text-lg text-slate-body">
              {posts.length} Expertentipps und Leitfäden für Käufer und
              Verkäufer – verständlich und praxisnah von Ihrem lokalen Makler.
            </p>
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
