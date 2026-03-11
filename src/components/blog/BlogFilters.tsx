"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import BlogCard from "./BlogCard";
import { BlogPost, BlogCategory } from "@/types/blog";
import { cn } from "@/lib/utils";

interface BlogFiltersProps {
  posts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogFilters({ posts, categories }: BlogFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Alle");
  const [search, setSearch] = useState("");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Alle: posts.length };
    posts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [posts]);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory !== "Alle") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, activeCategory, search]);

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-body/50"
        />
        <input
          type="text"
          placeholder="Ratgeber durchsuchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-slate-dark placeholder:text-slate-body/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {/* Category Tabs — horizontal scroll on mobile */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        <button
          onClick={() => setActiveCategory("Alle")}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            activeCategory === "Alle"
              ? "bg-primary text-white shadow-btn"
              : "bg-white text-slate-body hover:bg-gray-100 border border-gray-200"
          )}
        >
          Alle
          <span className="ml-1.5 text-xs opacity-70">
            {categoryCounts.Alle}
          </span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
              activeCategory === cat
                ? "bg-primary text-white shadow-btn"
                : "bg-white text-slate-body hover:bg-gray-100 border border-gray-200"
            )}
          >
            {cat}
            <span className="ml-1.5 text-xs opacity-70">
              {categoryCounts[cat] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-sm text-slate-body mb-5">
        {filtered.length} {filtered.length === 1 ? "Artikel" : "Artikel"}{" "}
        {activeCategory !== "Alle" && (
          <>
            in <span className="font-medium text-slate-dark">{activeCategory}</span>
          </>
        )}
        {search.trim() && (
          <>
            {" "}für &ldquo;
            <span className="font-medium text-slate-dark">{search}</span>&rdquo;
          </>
        )}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-body text-lg mb-2">
            Keine Artikel gefunden.
          </p>
          <p className="text-sm text-slate-body/70">
            Versuchen Sie einen anderen Suchbegriff oder wählen Sie eine andere Kategorie.
          </p>
        </div>
      )}
    </div>
  );
}
