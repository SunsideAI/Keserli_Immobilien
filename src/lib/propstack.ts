import { Property } from "@/types/property";

const API_KEY = process.env.PROPSTACK_API_KEY || "";
const API_URL = process.env.PROPSTACK_API_URL || "https://api.propstack.de/v1";

interface PropstackImage {
  original?: string;
  big?: string;
  medium?: string;
  thumb?: string;
}

interface PropstackUnit {
  id: number;
  title?: string;
  name?: string;
  street?: string;
  house_number?: string;
  zip_code?: string;
  city?: string;
  lat?: number;
  lng?: number;
  number_of_rooms?: number;
  number_of_bed_rooms?: number;
  number_of_bath_rooms?: number;
  living_space?: number;
  plot_area?: number;
  number_of_floors?: number;
  price?: number;
  price_per_sqm?: number;
  courtage?: string;
  images?: PropstackImage[];
  status?: { name?: string };
  marketing_type?: string;
  rs_type?: string;
  object_type?: string;
  description_note?: string;
  location_note?: string;
  furnishing_note?: string;
  other_note?: string;
  hide_address?: boolean;
  fields?: {
    construction_year?: number;
    [key: string]: unknown;
  };
  furnishings?: {
    lift?: boolean;
    balcony?: boolean;
    garden?: boolean;
    built_in_kitchen?: boolean;
    terrace?: boolean;
    guest_toilet?: boolean;
    cellar?: boolean;
    garage?: boolean;
    [key: string]: unknown;
  };
  created_at?: string;
  updated_at?: string;
}

function mapPropertyType(unit: PropstackUnit): Property["type"] {
  const rsType = (unit.rs_type || "").toUpperCase();
  const objectType = (unit.object_type || "").toUpperCase();

  if (rsType === "HOUSE" || rsType === "HAUS") return "Haus";
  if (rsType === "APARTMENT" || rsType === "WOHNUNG") return "Wohnung";
  if (rsType === "LIVING" && objectType === "LIVING") return "Wohnung";
  if (rsType === "TRADE_SITE" || rsType === "GRUNDSTUECK" || rsType === "PLOT") return "Grundstück";
  if (objectType === "TRADE" || objectType === "GEWERBE") return "Gewerbe";

  // Fallback based on title/name
  const title = (unit.title || unit.name || "").toLowerCase();
  if (title.includes("haus") || title.includes("villa") || title.includes("reihen") || title.includes("doppel")) return "Haus";
  if (title.includes("wohnung") || title.includes("apartment") || title.includes("penthouse") || title.includes("etage")) return "Wohnung";
  if (title.includes("grundstück") || title.includes("grundstueck") || title.includes("bauland")) return "Grundstück";
  if (title.includes("gewerbe") || title.includes("büro") || title.includes("laden")) return "Gewerbe";

  return "Wohnung";
}

function mapStatus(statusName?: string): Property["status"] {
  if (!statusName) return "Verfügbar";
  const s = statusName.toLowerCase();
  if (s.includes("reserviert")) return "Reserviert";
  if (s.includes("verkauft") || s.includes("verloren")) return "Verkauft";
  // "In Vermarktung", "Aktiv", "Akquise", "In Vorbereitung", "Neuer Lead" → Verfügbar
  return "Verfügbar";
}

function mapMarketingLabel(marketingType?: string): string {
  if (!marketingType) return "Kaufpreis";
  return marketingType.toUpperCase() === "RENT" ? "Kaltmiete" : "Kaufpreis";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildHighlights(unit: PropstackUnit): string[] {
  const highlights: string[] = [];
  const f = unit.furnishings || {};

  if (f.built_in_kitchen) highlights.push("Einbauküche");
  if (f.balcony) highlights.push("Balkon");
  if (f.terrace) highlights.push("Terrasse");
  if (f.garden) highlights.push("Garten");
  if (f.garage) highlights.push("Garage");
  if (f.lift) highlights.push("Aufzug");
  if (f.guest_toilet) highlights.push("Gäste-WC");
  if (f.cellar) highlights.push("Keller");

  if (unit.fields?.construction_year && unit.fields.construction_year >= 2020) {
    highlights.push("Neubau");
  }

  return highlights.slice(0, 6);
}

function buildShortDescription(unit: PropstackUnit): string {
  const type = mapPropertyType(unit);
  const title = unit.title || unit.name || type;
  const city = unit.city || "";
  const rooms = unit.number_of_rooms;
  const area = unit.living_space;

  let desc = title;
  if (city && !desc.includes(city)) desc += ` in ${city}`;
  if (rooms && !desc.includes("Zimmer") && !desc.includes("Zi")) desc += ` – ${rooms} Zimmer`;
  if (area && !desc.includes("m²")) desc += `, ${area} m²`;
  return desc + ".";
}

function mapPropstackToProperty(unit: PropstackUnit): Property {
  const title = unit.title || unit.name || "Immobilie";
  const images = (unit.images || [])
    .map((img) => img.big || img.original || img.medium || "")
    .filter(Boolean);
  const thumbnail = images[0] ||
    (unit.images?.[0]?.thumb || unit.images?.[0]?.medium || "/images/properties/placeholder.svg");

  const street = unit.street
    ? `${unit.street}${unit.house_number ? ` ${unit.house_number}` : ""}`
    : undefined;

  return {
    id: String(unit.id),
    title,
    slug: slugify(`${title}-${unit.id}`),
    type: mapPropertyType(unit),
    status: mapStatus(unit.status?.name),
    price: unit.price || 0,
    priceLabel: mapMarketingLabel(unit.marketing_type),
    address: {
      street: unit.hide_address ? undefined : street,
      city: unit.city || "",
      zip: unit.zip_code || "",
      region: unit.city || "",
    },
    features: {
      rooms: unit.number_of_rooms || 0,
      bedrooms: unit.number_of_bed_rooms || undefined,
      bathrooms: unit.number_of_bath_rooms || undefined,
      livingArea: unit.living_space || 0,
      plotArea: unit.plot_area || undefined,
      floors: unit.number_of_floors || undefined,
      yearBuilt: unit.fields?.construction_year || undefined,
      garage: unit.furnishings?.garage || false,
      balcony: unit.furnishings?.balcony || false,
      garden: unit.furnishings?.garden || false,
      elevator: unit.furnishings?.lift || false,
      energyClass: undefined,
    },
    description: [unit.description_note, unit.location_note, unit.furnishing_note, unit.other_note]
      .filter(Boolean)
      .join("\n\n") || title,
    shortDescription: buildShortDescription(unit),
    images: images.length > 0 ? images : ["/images/properties/placeholder.svg"],
    thumbnailImage: thumbnail,
    highlights: buildHighlights(unit),
    createdAt: unit.created_at || new Date().toISOString(),
    featured: false,
  };
}

async function fetchFromPropstack(endpoint: string): Promise<unknown> {
  const url = `${API_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "X-API-KEY": API_KEY,
      "Accept": "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Propstack API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchProperties(): Promise<Property[]> {
  if (!API_KEY) {
    console.warn("PROPSTACK_API_KEY not set, using fallback data");
    const { properties } = await import("@/data/properties");
    return properties;
  }

  try {
    const data = await fetchFromPropstack("/units?per_page=100") as PropstackUnit[];

    const properties = data
      .filter((unit) => {
        const status = unit.status?.name?.toLowerCase() || "";
        // Exclude lost/inactive properties
        return !status.includes("verloren") && !status.includes("storniert");
      })
      .map(mapPropstackToProperty)
      .filter((p) => p.price > 0);

    // Mark the first available property as featured
    const firstAvailable = properties.find((p) => p.status === "Verfügbar");
    if (firstAvailable) firstAvailable.featured = true;

    return properties;
  } catch (error) {
    console.error("Failed to fetch from Propstack:", error);
    const { properties } = await import("@/data/properties");
    return properties;
  }
}

export async function fetchProperty(id: string): Promise<Property | null> {
  if (!API_KEY) {
    const { properties } = await import("@/data/properties");
    return properties.find((p) => p.id === id) || null;
  }

  try {
    const unit = await fetchFromPropstack(`/units/${id}`) as PropstackUnit;
    return mapPropstackToProperty(unit);
  } catch (error) {
    console.error(`Failed to fetch property ${id}:`, error);
    return null;
  }
}

export async function fetchPropertyIds(): Promise<string[]> {
  if (!API_KEY) {
    const { properties } = await import("@/data/properties");
    return properties.map((p) => p.id);
  }

  try {
    const data = await fetchFromPropstack("/units?per_page=100") as PropstackUnit[];
    return data
      .filter((unit) => {
        const status = unit.status?.name?.toLowerCase() || "";
        return !status.includes("verloren") && !status.includes("storniert");
      })
      .map((unit) => String(unit.id));
  } catch (error) {
    console.error("Failed to fetch property IDs:", error);
    const { properties } = await import("@/data/properties");
    return properties.map((p) => p.id);
  }
}
