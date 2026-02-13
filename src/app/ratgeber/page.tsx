import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import BlogFilters from "@/components/blog/BlogFilters";
import { getAllPosts, getAllCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Ratgeber",
  description:
    "Ratgeber und Tipps rund um Immobilienverkauf, Bewertung, Finanzierung und mehr. Expertenwissen von Ihrem lokalen Makler.",
};

export default function RatgeberPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
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
              Expertentipps und Leitfäden für Käufer und Verkäufer – verständlich
              und praxisnah.
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
