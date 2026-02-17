import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";
import { getCategoryConfig } from "@/lib/blog-categories";

interface RelatedPostsProps {
  currentSlug: string;
  currentCategory: string;
  allPosts: BlogPost[];
}

export default function RelatedPosts({
  currentSlug,
  currentCategory,
  allPosts,
}: RelatedPostsProps) {
  // Get posts from same category first, then fill with others
  const sameCategoryPosts = allPosts.filter(
    (p) => p.slug !== currentSlug && p.category === currentCategory
  );
  const otherPosts = allPosts.filter(
    (p) => p.slug !== currentSlug && p.category !== currentCategory
  );
  const relatedPosts = [...sameCategoryPosts, ...otherPosts].slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark">
            Weitere Themen
          </h2>
          <p className="text-slate-body mt-2">
            Entdecken Sie mehr Expertenwissen rund um Immobilien
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((post) => {
            const config = getCategoryConfig(post.category);
            const Icon = config.icon;

            return (
              <Link
                key={post.slug}
                href={`/ratgeber/${post.slug}`}
                className="group block bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 duration-300"
              >
                {/* Icon header */}
                <div
                  className={`h-32 bg-gradient-to-br ${config.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-10">
                    <Icon
                      size={120}
                      className="absolute -bottom-4 -right-4 text-white"
                      strokeWidth={1}
                    />
                  </div>
                  <div className="relative z-10 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                    <Icon size={28} className="text-white" />
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <Badge variant="primary" className="mb-2">
                    {post.category}
                  </Badge>
                  <h3 className="font-bold text-slate-dark mb-2 group-hover:text-primary transition-colors line-clamp-2 text-sm">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-body line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readingTime} Min.
                      </span>
                    </div>
                    <span className="text-primary text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lesen <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/ratgeber"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Alle Artikel ansehen <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
