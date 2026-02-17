import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { getPostBySlug, getAllSlugs, getAllPosts } from "@/lib/blog";
import { getCategoryConfig } from "@/lib/blog-categories";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Artikel nicht gefunden" };

  const url = `${siteConfig.url}/ratgeber/${params.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      locale: "de_DE",
      siteName: siteConfig.name,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function RatgeberDetailPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const config = getCategoryConfig(post.category);
  const Icon = config.icon;

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: siteConfig.owner.title,
      worksFor: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/ratgeber/${params.slug}`,
    },
    wordCount: post.content.split(/\s+/).length,
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };

  // BreadcrumbList schema
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
        item: `${siteConfig.url}/ratgeber`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/ratgeber/${params.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-slate-body"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Startseite
            </Link>
            <span>/</span>
            <Link
              href="/ratgeber"
              className="hover:text-primary transition-colors"
            >
              Ratgeber
            </Link>
            <span>/</span>
            <span className="text-slate-dark font-medium line-clamp-1">
              {post.title}
            </span>
          </nav>
        </Container>
      </section>

      {/* Article hero with category gradient */}
      <section className={`${config.gradientClass} py-12 sm:py-16`}>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold uppercase tracking-wide mb-4">
              <Icon size={16} />
              {post.category}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 text-balance">
              {post.title}
            </h1>
            <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
              <div className="flex items-center gap-1.5">
                <User size={14} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{post.readingTime} Min. Lesezeit</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Article content */}
      <article className="section-padding bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Share top */}
            <div className="mb-8 pb-6 border-b border-gray-100">
              <ShareButtons
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            </div>

            {/* Content */}
            <div
              className="prose-homefin"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share bottom */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <ShareButtons
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-mint-light to-mint rounded-card text-center">
              <h3 className="text-xl font-bold text-slate-dark mb-2">
                Haben Sie Fragen?
              </h3>
              <p className="text-slate-body mb-4">
                Wir beraten Sie gerne persönlich und unverbindlich.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button href="/kontakt">Kontakt aufnehmen</Button>
                <Button href="/immobilienbewertung" variant="secondary">
                  Kostenlose Bewertung
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </article>

      {/* Related posts */}
      <RelatedPosts
        currentSlug={post.slug}
        currentCategory={post.category}
        allPosts={allPosts}
      />
    </>
  );
}
