import { NavItem } from "@/types";

export const mainNavItems: NavItem[] = [
  { label: "Verkauf", href: "/verkauf" },
  { label: "Bewertung", href: "/immobilienbewertung" },
  { label: "Angebote", href: "/angebote" },
  {
    label: "Wissenswertes",
    href: "/wissenswertes",
    children: [
      { label: "Blog", href: "/ratgeber" },
      { label: "Ratgeber", href: "/wissenswertes/ratgeber" },
    ],
  },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerNavItems = {
  service: [
    { label: "Immobilie verkaufen", href: "/verkauf" },
    { label: "Immobilienbewertung", href: "/immobilienbewertung" },
    { label: "Immobilienangebote", href: "/angebote" },
    { label: "Preise & Leistungen", href: "/preise" },
    { label: "Blog", href: "/ratgeber" },
    { label: "Ratgeber", href: "/wissenswertes/ratgeber" },
  ],
  company: [
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
};
