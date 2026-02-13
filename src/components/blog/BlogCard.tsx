import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/ratgeber/${post.slug}`}
      className="group block bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
    >
      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <span className="text-primary/40 text-6xl font-bold">
          {post.title.charAt(0)}
        </span>
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
