export interface RatgeberOption {
  id: string;
  label: string;
  icon: string;
  description?: string;
}

export interface RatgeberQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: RatgeberOption[];
}

export const ratgeberQuestions: RatgeberQuestion[] = [
  {
    id: "intention",
    question: "Was möchten Sie tun?",
    subtitle: "Wählen Sie aus, wobei wir Ihnen helfen können.",
    options: [
      {
        id: "sell",
        label: "Immobilie verkaufen",
        icon: "Home",
        description: "Sie möchten Ihre Immobilie zum besten Preis verkaufen.",
      },
      {
        id: "buy",
        label: "Immobilie kaufen",
        icon: "Search",
        description: "Sie suchen eine passende Immobilie zum Kauf.",
      },
      {
        id: "evaluate",
        label: "Wert ermitteln",
        icon: "TrendingUp",
        description: "Sie möchten den aktuellen Marktwert Ihrer Immobilie erfahren.",
      },
      {
        id: "consult",
        label: "Beratung gewünscht",
        icon: "MessageCircle",
        description: "Sie haben Fragen rund um das Thema Immobilien.",
      },
    ],
  },
  {
    id: "property_type",
    question: "Um welche Art von Immobilie handelt es sich?",
    subtitle: "Wählen Sie den Immobilientyp aus.",
    options: [
      {
        id: "house",
        label: "Haus",
        icon: "Home",
        description: "Einfamilienhaus, Doppelhaushälfte, Reihenhaus",
      },
      {
        id: "apartment",
        label: "Wohnung",
        icon: "Building2",
        description: "Eigentumswohnung, Penthouse, Maisonette",
      },
      {
        id: "multi_family",
        label: "Mehrfamilienhaus",
        icon: "Building",
        description: "Mehrfamilienhaus, Zinshaus, Wohnanlage",
      },
      {
        id: "land",
        label: "Grundstück",
        icon: "Map",
        description: "Baugrundstück, Ackerland, Waldstück",
      },
    ],
  },
  {
    id: "timeline",
    question: "Wann möchten Sie starten?",
    subtitle: "Ihr gewünschter Zeitrahmen hilft uns bei der Planung.",
    options: [
      {
        id: "asap",
        label: "So schnell wie möglich",
        icon: "Zap",
        description: "Innerhalb der nächsten Wochen",
      },
      {
        id: "3months",
        label: "In 1–3 Monaten",
        icon: "Calendar",
        description: "Ich plane schon konkret",
      },
      {
        id: "6months",
        label: "In 3–6 Monaten",
        icon: "Clock",
        description: "Ich orientiere mich noch",
      },
      {
        id: "later",
        label: "Noch unentschlossen",
        icon: "HelpCircle",
        description: "Erstmal nur informieren",
      },
    ],
  },
  {
    id: "situation",
    question: "Wie ist Ihre aktuelle Situation?",
    subtitle: "Damit wir Sie bestmöglich beraten können.",
    options: [
      {
        id: "owner",
        label: "Eigentümer",
        icon: "Key",
        description: "Ich bin Eigentümer der Immobilie",
      },
      {
        id: "heir",
        label: "Erbe / Erbgemeinschaft",
        icon: "Users",
        description: "Ich habe die Immobilie geerbt",
      },
      {
        id: "divorce",
        label: "Scheidung / Trennung",
        icon: "HeartCrack",
        description: "Verkauf aufgrund von Trennung",
      },
      {
        id: "investor",
        label: "Kapitalanleger",
        icon: "BarChart3",
        description: "Ich suche Renditeimmobilien",
      },
    ],
  },
];

export const ratgeberResults: Record<string, { title: string; text: string }> = {
  sell: {
    title: "Verkaufen mit homefin",
    text: "Wir verkaufen Ihre Immobilie zum bestmöglichen Preis – transparent, professionell und mit der fairsten Provision der Region. Lassen Sie sich jetzt kostenlos beraten!",
  },
  buy: {
    title: "Ihre Traumimmobilie finden",
    text: "Mit Zugang zu unserer exklusiven Käuferdatenbank und Off-Market-Angeboten finden wir die passende Immobilie für Sie. Kontaktieren Sie uns für eine persönliche Beratung!",
  },
  evaluate: {
    title: "Kostenlose Wertermittlung",
    text: "Erfahren Sie den aktuellen Marktwert Ihrer Immobilie – kostenlos und unverbindlich. Unsere Experten erstellen eine fundierte Bewertung basierend auf aktuellen Marktdaten.",
  },
  consult: {
    title: "Persönliche Beratung",
    text: "Ob Verkauf, Kauf oder Bewertung – unsere Experten stehen Ihnen mit Rat und Tat zur Seite. Vereinbaren Sie jetzt ein unverbindliches Beratungsgespräch!",
  },
};
