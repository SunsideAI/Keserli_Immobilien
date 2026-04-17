import { NavItem } from "@/types";

export const mainNavItems: NavItem[] = [
  { label: "Verkauf", href: "/verkauf" },
  {
    label: "Bewertung",
    href: "/immobilienbewertung",
    children: [
      { label: "Immobilienbewertung", href: "/immobilienbewertung" },
      { label: "Grundstücksbewertung", href: "/grundstuecksbewertung" },
    ],
  },
  {
    label: "Finanzierung",
    href: "/finanzierung",
    children: [
      { label: "Budgetrechner", href: "/finanzierung/budgetrechner" },
      { label: "Zinsrechner", href: "/finanzierung/zinsrechner" },
      { label: "Tilgungsrechner", href: "/finanzierung/tilgungsrechner" },
      { label: "Sollzinsbindung", href: "/finanzierung/sollzinsbindung" },
    ],
  },
  { label: "Angebote", href: "/angebote" },
  {
    label: "Wissenswertes",
    href: "/wissenswertes",
    children: [
      { label: "Blog", href: "/ratgeber" },
      { label: "Ratgeber", href: "/wissenswertes/ratgeber" },
      { label: "Checklisten", href: "/wissenswertes/checklisten" },
    ],
  },
];

export const footerNavItems = {
  service: [
    { label: "Immobilie verkaufen", href: "/verkauf" },
    { label: "Immobilienbewertung", href: "/immobilienbewertung" },
    { label: "Grundstücksbewertung", href: "/grundstuecksbewertung" },
    { label: "Finanzierung", href: "/finanzierung" },
    { label: "Immobilienangebote", href: "/angebote" },
    { label: "Preise & Leistungen", href: "/preise" },
    { label: "Blog", href: "/ratgeber" },
    { label: "Ratgeber", href: "/wissenswertes/ratgeber" },
    { label: "Checklisten", href: "/wissenswertes/checklisten" },
  ],
  company: [
    { label: "Kontakt", href: "/kontakt" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
};
