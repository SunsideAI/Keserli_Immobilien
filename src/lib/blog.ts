import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlogPost, BlogCategory } from "@/types/blog";

const blogDirectory = path.join(process.cwd(), "src/content/blog");

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) return [];

  const fileNames = fs.readdirSync(blogDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getPostBySlug(slug);
    })
    .filter((post): post is BlogPost => post !== null);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(blogDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = remark().use(html).processSync(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || "",
    content: contentHtml,
    date: data.date || new Date().toISOString(),
    author: data.author || "Orhan Keserli",
    category: (data.category as BlogCategory) || "Tipps & Ratgeber",
    tags: data.tags || [],
    coverImage: data.coverImage,
    readingTime: calculateReadingTime(content),
    keyFacts: data.keyFacts || undefined,
    faq: data.faq || undefined,
  };
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getAllCategories(): BlogCategory[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) return [];

  return fs
    .readdirSync(blogDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}
