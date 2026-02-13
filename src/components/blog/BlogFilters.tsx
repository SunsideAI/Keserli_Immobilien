"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import { BlogPost, BlogCategory } from "@/types/blog";
import { cn } from "@/lib/utils";

interface BlogFiltersProps {
  posts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogFilters({ posts, categories }: BlogFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Alle");

  const filtered =
    activeCategory === "Alle"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("Alle")}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeCategory === "Alle"
              ? "bg-primary text-white"
              : "bg-white text-slate-body hover:bg-gray-100"
          )}
        >
          Alle
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeCategory === cat
                ? "bg-primary text-white"
                : "bg-white text-slate-body hover:bg-gray-100"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-body">
            Keine Artikel in dieser Kategorie gefunden.
          </p>
        </div>
      )}
    </div>
  );
}
