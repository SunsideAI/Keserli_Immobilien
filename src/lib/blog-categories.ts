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
  gradient: string;
  iconColor: string;
  bgLight: string;
  label: string;
}

export const categoryConfig: Record<BlogCategory, CategoryConfig> = {
  Immobilienverkauf: {
    icon: Home,
    gradient: "from-teal-500 to-emerald-600",
    iconColor: "text-white",
    bgLight: "bg-teal-50",
    label: "Immobilienverkauf",
  },
  Immobilienbewertung: {
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-600",
    iconColor: "text-white",
    bgLight: "bg-blue-50",
    label: "Immobilienbewertung",
  },
  Finanzierung: {
    icon: Banknote,
    gradient: "from-emerald-500 to-green-600",
    iconColor: "text-white",
    bgLight: "bg-emerald-50",
    label: "Finanzierung",
  },
  Marktbericht: {
    icon: BarChart3,
    gradient: "from-violet-500 to-purple-600",
    iconColor: "text-white",
    bgLight: "bg-violet-50",
    label: "Marktbericht",
  },
  "Tipps & Ratgeber": {
    icon: Lightbulb,
    gradient: "from-amber-400 to-orange-500",
    iconColor: "text-white",
    bgLight: "bg-amber-50",
    label: "Tipps & Ratgeber",
  },
  "Recht & Steuern": {
    icon: Scale,
    gradient: "from-slate-500 to-indigo-600",
    iconColor: "text-white",
    bgLight: "bg-slate-50",
    label: "Recht & Steuern",
  },
};

export function getCategoryConfig(category: BlogCategory): CategoryConfig {
  return categoryConfig[category] || categoryConfig["Tipps & Ratgeber"];
}
