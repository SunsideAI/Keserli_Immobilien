"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/types/blog";

export default function FAQSection({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="mt-10 pt-8 border-t border-gray-100">
      <h2 className="text-2xl font-bold text-slate-dark mb-6">
        Häufig gestellte Fragen
      </h2>
      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border border-gray-100 rounded-xl overflow-hidden transition-shadow hover:shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left font-semibold text-slate-dark hover:text-primary transition-colors"
              >
                <span className="text-[15px] sm:text-base">{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-slate-body transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-[15px] text-slate-body leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
