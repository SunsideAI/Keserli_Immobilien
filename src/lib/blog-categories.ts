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
    gradientClass: "bg-gradient-to-br from-teal-500 to-emerald-600",
    label: "Immobilienverkauf",
  },
  Immobilienbewertung: {
    icon: TrendingUp,
    gradientClass: "bg-gradient-to-br from-blue-500 to-cyan-600",
    label: "Immobilienbewertung",
  },
  Finanzierung: {
    icon: Banknote,
    gradientClass: "bg-gradient-to-br from-emerald-500 to-green-600",
    label: "Finanzierung",
  },
  Marktbericht: {
    icon: BarChart3,
    gradientClass: "bg-gradient-to-br from-violet-500 to-purple-600",
    label: "Marktbericht",
  },
  "Tipps & Ratgeber": {
    icon: Lightbulb,
    gradientClass: "bg-gradient-to-br from-amber-400 to-orange-500",
    label: "Tipps & Ratgeber",
  },
  "Recht & Steuern": {
    icon: Scale,
    gradientClass: "bg-gradient-to-br from-slate-500 to-indigo-600",
    label: "Recht & Steuern",
  },
};

export function getCategoryConfig(category: BlogCategory): CategoryConfig {
  return categoryConfig[category] || categoryConfig["Tipps & Ratgeber"];
}
