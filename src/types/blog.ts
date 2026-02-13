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
}

export type BlogCategory =
  | "Immobilienverkauf"
  | "Immobilienbewertung"
  | "Finanzierung"
  | "Marktbericht"
  | "Tipps & Ratgeber"
  | "Recht & Steuern";
