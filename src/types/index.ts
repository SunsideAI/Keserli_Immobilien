export type { Property } from "./property";
export type { BlogPost, BlogCategory } from "./blog";

export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  rating: number;
  text: string;
  date?: string;
  source?: "Google" | "ProvenExpert" | "ImmobilienScout24";
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface PricingFeature {
  text: string;
  icon?: string;
}

export interface PricingExpandableSection {
  label: string;
  items: PricingFeature[];
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: PricingFeature[];
  expandable?: PricingExpandableSection;
  highlighted?: boolean;
  badge?: string;
  note?: string;
  ctaText: string;
  ctaHref: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
  stat?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}
