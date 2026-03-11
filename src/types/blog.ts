export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  coverImage?: string;
  readingTime: number;
  keyFacts?: string[];
  faq?: FAQItem[];
}

export type BlogCategory =
  | "Immobilienverkauf"
  | "Immobilienbewertung"
  | "Finanzierung"
  | "Marktbericht"
  | "Tipps & Ratgeber"
  | "Recht & Steuern";
