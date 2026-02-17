import {
  Home,
  TrendingUp,
  Banknote,
  BarChart3,
  Lightbulb,
  Scale,
} from "lucide-react";
import { BlogCategory } from "@/types/blog";

export interface CategoryConfig {
  icon: typeof Home;
  gradientClass: string;
  label: string;
}

export const categoryConfig: Record<BlogCategory, CategoryConfig> = {
  Immobilienverkauf: {
    icon: Home,
    gradientClass: "bg-gradient-to-br from-primary-600 to-primary-900",
    label: "Immobilienverkauf",
  },
  Immobilienbewertung: {
    icon: TrendingUp,
    gradientClass: "bg-gradient-to-br from-primary-500 to-primary-700",
    label: "Immobilienbewertung",
  },
  Finanzierung: {
    icon: Banknote,
    gradientClass: "bg-gradient-to-br from-primary-400 to-primary-600",
    label: "Finanzierung",
  },
  Marktbericht: {
    icon: BarChart3,
    gradientClass: "bg-gradient-to-br from-primary-700 to-primary-950",
    label: "Marktbericht",
  },
  "Tipps & Ratgeber": {
    icon: Lightbulb,
    gradientClass: "bg-gradient-to-br from-primary-300 to-primary-600",
    label: "Tipps & Ratgeber",
  },
  "Recht & Steuern": {
    icon: Scale,
    gradientClass: "bg-gradient-to-br from-primary-800 to-primary-950",
    label: "Recht & Steuern",
  },
};

export function getCategoryConfig(category: BlogCategory): CategoryConfig {
  return categoryConfig[category] || categoryConfig["Tipps & Ratgeber"];
}
