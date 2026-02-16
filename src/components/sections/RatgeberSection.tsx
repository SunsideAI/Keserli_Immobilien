import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollAnimator from "@/components/ui/ScrollAnimator";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export default function RatgeberSection() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <section id="ratgeber" className="section-padding bg-white">
      <Container>
        <ScrollAnimator>
          <SectionHeading
            badge="RATGEBER"
            title="Wissen rund um Immobilien"
            subtitle="Expertentipps und Leitfäden für Käufer und Verkäufer – verständlich und praxisnah."
          />
        </ScrollAnimator>

        <ScrollAnimator stagger>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Featured Post */}
            <Link
              href={`/ratgeber/${featured.slug}`}
              className="group block bg-gradient-to-br from-teal-dark to-primary rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all lg:row-span-2"
            >
              <div className="p-8 sm:p-10 flex flex-col justify-between h-full min-h-[360px]">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-white/20 text-white mb-4">
                    {featured.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-primary-200 transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-primary-200/80 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-primary-300/70">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(featured.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {featured.readingTime} Min.
                    </span>
                  </div>
                  <span className="text-white font-medium flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
                    Lesen <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>

            {/* Other Posts */}
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/ratgeber/${post.slug}`}
                className="group block bg-gray-50 rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all"
              >
                <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
                  <div>
                    <Badge variant="primary" className="mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-lg font-bold text-slate-dark mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-body leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readingTime} Min.
                      </span>
                    </div>
                    <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
                      Lesen <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollAnimator>

        <ScrollAnimator>
          <div className="text-center">
            <Button href="/ratgeber" variant="secondary">
              <BookOpen size={18} className="mr-2" />
              Alle Artikel ansehen
            </Button>
          </div>
        </ScrollAnimator>
      </Container>
    </section>
  );
}
