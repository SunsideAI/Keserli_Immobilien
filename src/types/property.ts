export interface Property {
  id: string;
  title: string;
  slug: string;
  type: "Wohnung" | "Haus" | "Grundstück" | "Gewerbe";
  status: "Verfügbar" | "Reserviert" | "Verkauft";
  price: number;
  priceLabel?: string;
  address: {
    street?: string;
    city: string;
    zip: string;
    region: string;
  };
  features: {
    rooms: number;
    bedrooms?: number;
    bathrooms?: number;
    livingArea: number;
    plotArea?: number;
    floors?: number;
    yearBuilt?: number;
    garage?: boolean;
    balcony?: boolean;
    garden?: boolean;
    elevator?: boolean;
    energyClass?: string;
  };
  description: string;
  shortDescription: string;
  images: string[];
  thumbnailImage: string;
  highlights: string[];
  createdAt: string;
  featured?: boolean;
}
