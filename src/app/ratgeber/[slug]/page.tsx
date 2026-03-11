import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedPosts from "@/components/blog/RelatedPosts";
import TableOfContents from "@/components/blog/TableOfContents";
import AuthorBox from "@/components/blog/AuthorBox";
import FAQSection from "@/components/blog/FAQSection";
import KeyFacts from "@/components/blog/KeyFacts";
import { getPostBySlug, getAllSlugs, getAllPosts } from "@/lib/blog";
import { getCategoryConfig } from "@/lib/blog-categories";
import { addHeadingIds } from "@/lib/add-heading-ids";
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
    title: `${post.title} | ${siteConfig.name} Ratgeber`,
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
  const contentWithIds = addHeadingIds(post.content);

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

  // FAQ structured data
  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
            <span>/</span>
            <Link
              href="/ratgeber"
              className="hover:text-primary transition-colors whitespace-nowrap"
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
      <section className={`${config.gradientClass} py-10 sm:py-14 lg:py-16`}>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs sm:text-sm font-semibold uppercase tracking-wide mb-4">
              <Icon size={16} />
              {post.category}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white mb-4 text-balance leading-tight">
              {post.title}
            </h1>
            <p className="text-white/80 text-base sm:text-lg mb-5 max-w-2xl mx-auto">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/70">
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

      {/* Article content with sidebar */}
      <article className="section-padding bg-white">
        <Container>
          <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[1fr_280px] lg:gap-10 xl:gap-14">
            {/* Main content */}
            <div className="max-w-3xl">
              {/* Key Facts */}
              {post.keyFacts && <KeyFacts facts={post.keyFacts} />}

              {/* TOC on mobile only */}
              <div className="lg:hidden mb-8">
                <TableOfContents html={contentWithIds} />
              </div>

              {/* Share top */}
              <div className="mb-8 pb-5 border-b border-gray-100">
                <ShareButtons
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
              </div>

              {/* Content */}
              <div
                className="prose-homefin"
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />

              {/* FAQ Section */}
              {post.faq && post.faq.length > 0 && (
                <FAQSection items={post.faq} />
              )}

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

              {/* Author Box */}
              <div className="mt-8">
                <AuthorBox />
              </div>

              {/* CTA */}
              <div className="mt-10 p-6 sm:p-8 bg-gradient-to-br from-mint-light to-mint rounded-xl text-center">
                <h3 className="text-xl font-bold text-slate-dark mb-2">
                  Haben Sie Fragen?
                </h3>
                <p className="text-slate-body mb-5">
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

            {/* Sidebar — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* TOC */}
                <TableOfContents html={contentWithIds} />

                {/* Quick CTA */}
                <div className="bg-gradient-to-br from-primary to-teal-dark rounded-xl p-5 text-white text-center">
                  <div className="text-base font-bold mb-2">
                    Kostenlose Beratung
                  </div>
                  <p className="text-sm text-white/80 mb-4">
                    Wir helfen Ihnen gerne weiter – unverbindlich und persönlich.
                  </p>
                  <Button
                    href="/immobilienbewertung"
                    variant="white"
                    size="sm"
                    className="w-full mb-3"
                  >
                    Jetzt bewerten lassen
                  </Button>
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="flex items-center justify-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
                  >
                    <Phone size={14} />
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
            </aside>
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
