import { NavItem } from "@/types";

export const mainNavItems: NavItem[] = [
  { label: "Immobilienbewertung", href: "/immobilienbewertung" },
  { label: "Angebote", href: "/angebote" },
  { label: "Preise", href: "/preise" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerNavItems = {
  service: [
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
