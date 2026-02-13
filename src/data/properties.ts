import { Property } from "@/types/property";

export const properties: Property[] = [
  {
    id: "1",
    title: "Exklusives Einfamilienhaus in Top-Lage",
    slug: "einfamilienhaus-monheim-top-lage",
    type: "Haus",
    status: "Verfügbar",
    price: 595000,
    priceLabel: "Kaufpreis",
    address: {
      city: "Monheim am Rhein",
      zip: "40789",
      region: "Monheim am Rhein",
    },
    features: {
      rooms: 5,
      bedrooms: 3,
      bathrooms: 2,
      livingArea: 145,
      plotArea: 380,
      floors: 2,
      yearBuilt: 2005,
      garage: true,
      garden: true,
      energyClass: "B",
    },
    description:
      "Dieses exklusive Einfamilienhaus besticht durch seine hochwertige Ausstattung und die bevorzugte Wohnlage in Monheim am Rhein. Das Haus verfügt über eine moderne Einbauküche, einen großzügigen Garten und eine Garage. Die Raumaufteilung ist ideal für Familien.",
    shortDescription:
      "Hochwertiges Einfamilienhaus mit Garten und Garage in bevorzugter Lage.",
    images: [
      "https://placehold.co/800x600/2D7A7A/ffffff?text=Haus+1",
      "https://placehold.co/800x600/1a5c5c/ffffff?text=Garten",
      "https://placehold.co/800x600/0f766e/ffffff?text=Küche",
    ],
    thumbnailImage: "https://placehold.co/600x400/2D7A7A/ffffff?text=Haus+1",
    highlights: [
      "Einbauküche",
      "Garten",
      "Garage",
      "Ruhige Lage",
    ],
    createdAt: "2025-01-15",
    featured: true,
  },
  {
    id: "2",
    title: "Moderne Eigentumswohnung mit Balkon",
    slug: "eigentumswohnung-langenfeld-balkon",
    type: "Wohnung",
    status: "Verfügbar",
    price: 289000,
    priceLabel: "Kaufpreis",
    address: {
      city: "Langenfeld",
      zip: "40764",
      region: "Langenfeld (Rheinland)",
    },
    features: {
      rooms: 3,
      bedrooms: 2,
      bathrooms: 1,
      livingArea: 85,
      floors: 1,
      yearBuilt: 2018,
      balcony: true,
      elevator: true,
      energyClass: "A",
    },
    description:
      "Diese moderne 3-Zimmer-Wohnung in Langenfeld überzeugt mit zeitgemäßer Ausstattung und einem sonnigen Balkon. Der Aufzug und die Tiefgarage runden das Angebot ab. Ideal für Paare oder als Kapitalanlage.",
    shortDescription:
      "Moderne 3-Zimmer-Wohnung mit Balkon und Aufzug in Langenfeld.",
    images: [
      "https://placehold.co/800x600/2D7A7A/ffffff?text=Wohnung+1",
      "https://placehold.co/800x600/1a5c5c/ffffff?text=Balkon",
    ],
    thumbnailImage:
      "https://placehold.co/600x400/2D7A7A/ffffff?text=Wohnung+1",
    highlights: [
      "Balkon",
      "Aufzug",
      "Tiefgarage",
      "Energieeffizient",
    ],
    createdAt: "2025-02-01",
    featured: false,
  },
  {
    id: "3",
    title: "Geräumige Doppelhaushälfte mit Garten",
    slug: "doppelhaushaelfte-leverkusen",
    type: "Haus",
    status: "Verfügbar",
    price: 449000,
    priceLabel: "Kaufpreis",
    address: {
      city: "Leverkusen",
      zip: "51371",
      region: "Leverkusen",
    },
    features: {
      rooms: 4,
      bedrooms: 3,
      bathrooms: 1,
      livingArea: 120,
      plotArea: 250,
      floors: 2,
      yearBuilt: 1998,
      garage: true,
      garden: true,
      energyClass: "C",
    },
    description:
      "Diese gepflegte Doppelhaushälfte in Leverkusen bietet viel Platz für die ganze Familie. Mit großzügigem Garten, Garage und guter Anbindung an öffentliche Verkehrsmittel ist dieses Haus ideal für Familien.",
    shortDescription:
      "Gepflegte Doppelhaushälfte mit Garten und Garage in Leverkusen.",
    images: [
      "https://placehold.co/800x600/2D7A7A/ffffff?text=DHH+1",
      "https://placehold.co/800x600/1a5c5c/ffffff?text=Garten",
    ],
    thumbnailImage: "https://placehold.co/600x400/2D7A7A/ffffff?text=DHH+1",
    highlights: [
      "Garten",
      "Garage",
      "Familienfreundlich",
      "Gute Anbindung",
    ],
    createdAt: "2025-01-20",
    featured: false,
  },
  {
    id: "4",
    title: "Stilvolle Altbauwohnung im Herzen von Köln",
    slug: "altbauwohnung-koeln-zentrum",
    type: "Wohnung",
    status: "Reserviert",
    price: 375000,
    priceLabel: "Kaufpreis",
    address: {
      city: "Köln",
      zip: "50667",
      region: "Köln",
    },
    features: {
      rooms: 3,
      bedrooms: 2,
      bathrooms: 1,
      livingArea: 95,
      floors: 1,
      yearBuilt: 1925,
      balcony: true,
      energyClass: "D",
    },
    description:
      "Diese stilvolle Altbauwohnung im Herzen von Köln vereint historischen Charme mit modernem Komfort. Hohe Decken, Stuck und Dielen treffen auf eine renovierte Küche und ein modernes Bad.",
    shortDescription:
      "Stilvolle Altbauwohnung mit Charme im Kölner Zentrum.",
    images: [
      "https://placehold.co/800x600/2D7A7A/ffffff?text=Altbau+1",
    ],
    thumbnailImage:
      "https://placehold.co/600x400/2D7A7A/ffffff?text=Altbau+1",
    highlights: [
      "Altbaucharme",
      "Stuck & Dielen",
      "Zentrale Lage",
      "Balkon",
    ],
    createdAt: "2024-12-15",
    featured: false,
  },
  {
    id: "5",
    title: "Neubau-Penthouse mit Dachterrasse",
    slug: "penthouse-duesseldorf-dachterrasse",
    type: "Wohnung",
    status: "Verfügbar",
    price: 680000,
    priceLabel: "Kaufpreis",
    address: {
      city: "Düsseldorf",
      zip: "40215",
      region: "Düsseldorf",
    },
    features: {
      rooms: 4,
      bedrooms: 2,
      bathrooms: 2,
      livingArea: 130,
      floors: 1,
      yearBuilt: 2024,
      balcony: true,
      elevator: true,
      energyClass: "A+",
    },
    description:
      "Exklusives Neubau-Penthouse in Düsseldorf mit großzügiger Dachterrasse und Blick über die Stadt. Hochwertige Ausstattung mit Fußbodenheizung, Einbauküche und zwei Bädern. Aufzug direkt in die Wohnung.",
    shortDescription:
      "Exklusives Penthouse mit Dachterrasse in Düsseldorf.",
    images: [
      "https://placehold.co/800x600/2D7A7A/ffffff?text=Penthouse+1",
      "https://placehold.co/800x600/1a5c5c/ffffff?text=Terrasse",
      "https://placehold.co/800x600/0f766e/ffffff?text=Bad",
    ],
    thumbnailImage:
      "https://placehold.co/600x400/2D7A7A/ffffff?text=Penthouse+1",
    highlights: [
      "Dachterrasse",
      "Neubau",
      "Aufzug",
      "Premium-Ausstattung",
    ],
    createdAt: "2025-02-05",
    featured: true,
  },
  {
    id: "6",
    title: "Baugrundstück in ruhiger Wohnlage",
    slug: "baugrundstuck-monheim-wohnlage",
    type: "Grundstück",
    status: "Verfügbar",
    price: 320000,
    priceLabel: "Kaufpreis",
    address: {
      city: "Monheim am Rhein",
      zip: "40789",
      region: "Monheim am Rhein",
    },
    features: {
      rooms: 0,
      livingArea: 0,
      plotArea: 520,
    },
    description:
      "Attraktives Baugrundstück in ruhiger Wohnlage von Monheim am Rhein. Das Grundstück ist voll erschlossen und bietet ideale Voraussetzungen für ein Einfamilienhaus oder eine Doppelhaushälfte.",
    shortDescription:
      "Voll erschlossenes Baugrundstück in ruhiger Lage.",
    images: [
      "https://placehold.co/800x600/2D7A7A/ffffff?text=Grundstück",
    ],
    thumbnailImage:
      "https://placehold.co/600x400/2D7A7A/ffffff?text=Grundstück",
    highlights: [
      "Voll erschlossen",
      "Ruhige Lage",
      "520 m² Fläche",
    ],
    createdAt: "2025-01-10",
    featured: false,
  },
];
