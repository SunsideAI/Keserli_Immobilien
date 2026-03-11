"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ html }: { html: string }) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const headings = doc.querySelectorAll("h2, h3");
    const tocItems: TOCItem[] = [];

    headings.forEach((heading) => {
      const text = heading.textContent || "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9äöüß\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

      tocItems.push({
        id,
        text,
        level: heading.tagName === "H2" ? 2 : 3,
      });
    });

    setItems(tocItems);
  }, [html]);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  return (
    <nav className="bg-gray-50 rounded-xl p-5 border border-gray-100">
      <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-dark uppercase tracking-wide">
        <List size={16} className="text-primary" />
        Inhaltsverzeichnis
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  history.replaceState(null, "", `#${item.id}`);
                }
              }}
              className={`block text-sm py-1 transition-colors duration-200 hover:text-primary ${
                item.level === 3 ? "pl-4" : ""
              } ${
                activeId === item.id
                  ? "text-primary font-semibold"
                  : "text-slate-body"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
