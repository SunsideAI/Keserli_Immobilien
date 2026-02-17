import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";
import { getCategoryConfig } from "@/lib/blog-categories";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const config = getCategoryConfig(post.category);
  const Icon = config.icon;

  return (
    <Link
      href={`/ratgeber/${post.slug}`}
      className="group block bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 duration-300"
    >
      {/* Category visual header */}
      <div
        className={`h-48 bg-gradient-to-br ${config.gradient} flex items-center justify-center relative overflow-hidden`}
      >
        {/* Decorative background icons */}
        <div className="absolute inset-0 opacity-10">
          <Icon
            size={180}
            className="absolute -bottom-6 -right-6 text-white"
            strokeWidth={1}
          />
        </div>
        {/* Main icon */}
        <div className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
          <Icon size={36} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <Badge variant="primary" className="mb-3">
          {post.category}
        </Badge>
        <h3 className="font-bold text-slate-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-slate-body line-clamp-2 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{post.readingTime} Min. Lesezeit</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
