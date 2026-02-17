import { NavItem } from "@/types";

export const mainNavItems: NavItem[] = [
  { label: "Verkauf", href: "/verkauf" },
  { label: "Bewertung", href: "/immobilienbewertung" },
  { label: "Angebote", href: "/angebote" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerNavItems = {
  service: [
    { label: "Immobilie verkaufen", href: "/verkauf" },
    { label: "Immobilienbewertung", href: "/immobilienbewertung" },
    { label: "Immobilienangebote", href: "/angebote" },
    { label: "Preise & Leistungen", href: "/preise" },
    { label: "Ratgeber", href: "/ratgeber" },
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
