export interface RatgeberDownload {
  id: string;
  title: string;
  description: string;
  pages: number;
  category: string;
  coverImage?: string;
  downloadUrl: string;
  tags: string[];
}

export const ratgeberDownloads: RatgeberDownload[] = [
  {
    id: "immobilie-verkaufen",
    title: "Der große Ratgeber: Immobilie erfolgreich verkaufen",
    description:
      "Alles, was Sie wissen müssen – von der Wertermittlung über die Vermarktung bis zum Notartermin. Mit Checklisten und Praxistipps.",
    pages: 24,
    category: "Verkauf",
    downloadUrl: "/ratgeber-downloads/immobilie-verkaufen.pdf",
    tags: ["Hausverkauf", "Wertermittlung", "Checkliste"],
  },
  {
    id: "immobilienbewertung",
    title: "Immobilienbewertung: So ermitteln Sie den richtigen Preis",
    description:
      "Erfahren Sie, welche Bewertungsverfahren es gibt, welche Faktoren den Wert beeinflussen und wie Sie typische Fehler vermeiden.",
    pages: 18,
    category: "Bewertung",
    downloadUrl: "/ratgeber-downloads/immobilienbewertung.pdf",
    tags: ["Bewertung", "Marktwert", "Verfahren"],
  },
  {
    id: "erbimmobilie",
    title: "Erbimmobilie: Erben, halten oder verkaufen?",
    description:
      "Steuerliche Aspekte, Erbrecht-Grundlagen und die wichtigsten Entscheidungshilfen für Erben einer Immobilie.",
    pages: 16,
    category: "Recht & Steuern",
    downloadUrl: "/ratgeber-downloads/erbimmobilie.pdf",
    tags: ["Erbe", "Erbschaftsteuer", "Immobilie"],
  },
  {
    id: "scheidungsimmobilie",
    title: "Immobilie bei Scheidung: Ihre Optionen im Überblick",
    description:
      "Welche Möglichkeiten haben Sie bei einer Trennung? Dieser Ratgeber erklärt alle Optionen – verständlich und neutral.",
    pages: 14,
    category: "Recht & Steuern",
    downloadUrl: "/ratgeber-downloads/scheidungsimmobilie.pdf",
    tags: ["Scheidung", "Trennung", "Zugewinn"],
  },
  {
    id: "kapitalanlage",
    title: "Immobilie als Kapitalanlage: Lohnt sich das?",
    description:
      "Renditeberechnung, Standortanalyse und Finanzierungsstrategien – der Einsteigerguide für Immobilien-Investments.",
    pages: 20,
    category: "Finanzierung",
    downloadUrl: "/ratgeber-downloads/kapitalanlage.pdf",
    tags: ["Kapitalanlage", "Rendite", "Investment"],
  },
  {
    id: "checkliste-hauskauf",
    title: "Checkliste Hauskauf: 50 Punkte, die Sie prüfen sollten",
    description:
      "Die ultimative Checkliste für Kaufinteressenten – von der Besichtigung über die Finanzierung bis zur Schlüsselübergabe.",
    pages: 12,
    category: "Kauf",
    downloadUrl: "/ratgeber-downloads/checkliste-hauskauf.pdf",
    tags: ["Hauskauf", "Checkliste", "Besichtigung"],
  },
];
