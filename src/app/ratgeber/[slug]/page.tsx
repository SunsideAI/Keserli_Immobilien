import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Artikel nicht gefunden" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function RatgeberDetailPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <section className="bg-gray-50 py-6">
        <Container>
          <Link
            href="/ratgeber"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Zurück zum Ratgeber
          </Link>
        </Container>
      </section>

      <article className="section-padding bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Badge variant="primary" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-dark mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-body">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readingTime} Min. Lesezeit</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className="prose-homefin"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-12 p-8 bg-mint rounded-card text-center">
              <h3 className="text-xl font-bold text-slate-dark mb-2">
                Haben Sie Fragen?
              </h3>
              <p className="text-slate-body mb-4">
                Wir beraten Sie gerne persönlich und unverbindlich.
              </p>
              <Button href="/kontakt">Kontakt aufnehmen</Button>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
