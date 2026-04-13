import { Property } from "@/types/property";

const API_KEY = process.env.PROPSTACK_API_KEY || "";
const API_URL = process.env.PROPSTACK_API_URL || "https://api.propstack.de/v1";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string, any>;

/**
 * Unwrap Propstack values - detail endpoint wraps fields as {label, value},
 * list endpoint returns plain values.
 */
function unwrap(val: unknown): unknown {
  if (val && typeof val === "object" && "value" in (val as AnyObject)) {
    return (val as AnyObject).value;
  }
  return val;
}

function unwrapString(val: unknown): string | undefined {
  const v = unwrap(val);
  return typeof v === "string" ? v : undefined;
}

function unwrapNumber(val: unknown): number | undefined {
  const v = unwrap(val);
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = parseFloat(v);
    return isNaN(n) ? undefined : n;
  }
  return undefined;
}

function unwrapBool(val: unknown): boolean {
  const v = unwrap(val);
  return v === true || v === "true" || v === "Ja";
}

/**
 * Extract images - list endpoint uses {original, big, medium, thumb},
 * detail endpoint uses {url, big_url, medium_url, thumb_url}
 */
function extractImages(images: AnyObject[] | undefined | null): string[] {
  if (!images || !Array.isArray(images)) return [];
  return images
    .filter((img) => !img.is_floorplan && !img.is_private)
    .map((img) =>
      img.big_url || img.big || img.url || img.original || img.medium_url || img.medium || ""
    )
    .filter(Boolean);
}

function extractThumbnail(images: AnyObject[] | undefined | null): string {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return "/images/properties/placeholder.svg";
  }
  const first = images.find((img) => !img.is_floorplan && !img.is_private) || images[0];
  return first.medium_url || first.medium || first.big_url || first.big || first.url || first.original || "/images/properties/placeholder.svg";
}

function mapPropertyType(unit: AnyObject): Property["type"] {
  const rsType = (unwrapString(unit.rs_type) || "").toUpperCase();
  const objectType = (unwrapString(unit.object_type) || "").toUpperCase();

  if (rsType === "HOUSE") return "Haus";
  if (rsType === "APARTMENT") return "Wohnung";
  if (rsType === "TRADE_SITE") return "Grundstück";
  if (rsType.includes("OFFICE") || rsType.includes("STORE") || rsType.includes("GASTRONOMY") || rsType.includes("INDUSTRY")) return "Gewerbe";
  if (objectType === "COMMERCIAL" || objectType === "INVESTMENT") return "Gewerbe";

  // Fallback based on title/name
  const title = ((unwrapString(unit.title) || unwrapString(unit.name)) || "").toLowerCase();
  if (title.includes("haus") || title.includes("villa") || title.includes("reihen") || title.includes("doppel")) return "Haus";
  if (title.includes("wohnung") || title.includes("apartment") || title.includes("penthouse") || title.includes("etage") || title.includes("maisonette")) return "Wohnung";
  if (title.includes("grundstück") || title.includes("grundstueck") || title.includes("bauland")) return "Grundstück";
  if (title.includes("gewerbe") || title.includes("büro") || title.includes("laden")) return "Gewerbe";

  return "Wohnung";
}

function getStatusName(status: unknown): string | undefined {
  if (!status) return undefined;
  if (typeof status === "object" && status !== null) {
    const s = status as AnyObject;
    return s.name || undefined;
  }
  return undefined;
}

function mapStatus(status: unknown): Property["status"] {
  const name = getStatusName(status);
  if (!name) return "Verfügbar";
  const s = name.toLowerCase();
  if (s.includes("vorbereitung")) return "In Vorbereitung";
  if (s.includes("reserviert")) return "Reserviert";
  if (s.includes("verkauft")) return "Verkauft";
  return "Verfügbar";
}

/**
 * Only allow properties with an explicitly public status.
 * "In Vorbereitung" = coming soon, "In Vermarktung" = actively marketed,
 * "Reserviert" = reserved, "Verkauft" = sold.
 * Everything else (Akquise, Aktiv, Neuer Lead, Verloren, etc.)
 * are internal workflow stages and must not appear on the website.
 */
function isPublishedStatus(status: unknown): boolean {
  const name = getStatusName(status);
  if (!name) return false;
  const s = name.toLowerCase();
  return s.includes("vorbereitung") || s.includes("vermarktung") || s.includes("reserviert") || s.includes("verkauft");
}

function mapMarketingLabel(marketingType?: string): string {
  if (!marketingType) return "Kaufpreis";
  return marketingType.toUpperCase() === "RENT" ? "Kaltmiete" : "Kaufpreis";
}

function mapKategorie(marketingType?: string): Property["kategorie"] {
  if (!marketingType) return "Kaufen";
  return marketingType.toUpperCase() === "RENT" ? "Mieten" : "Kaufen";
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

function buildHighlights(unit: AnyObject): string[] {
  const highlights: string[] = [];
  const f = unit.furnishings;

  if (f && typeof f === "object") {
    if (unwrapBool(f.built_in_kitchen)) highlights.push("Einbauküche");
    if (unwrapBool(f.balcony)) highlights.push("Balkon");
    if (unwrapBool(f.terrace)) highlights.push("Terrasse");
    if (unwrapBool(f.garden)) highlights.push("Garten");
    if (unwrapBool(f.garage)) highlights.push("Garage");
    if (unwrapBool(f.lift)) highlights.push("Aufzug");
    if (unwrapBool(f.guest_toilet)) highlights.push("Gäste-WC");
    if (unwrapBool(f.cellar)) highlights.push("Keller");
  }

  // Parse highlights from furnishing_note if furnishings object is empty
  if (highlights.length === 0) {
    const furnNote = unwrapString(unit.furnishing_note) || "";
    if (furnNote.toLowerCase().includes("balkon")) highlights.push("Balkon");
    if (furnNote.toLowerCase().includes("terrasse")) highlights.push("Terrasse");
    if (furnNote.toLowerCase().includes("garten")) highlights.push("Garten");
    if (furnNote.toLowerCase().includes("aufzug") || furnNote.toLowerCase().includes("fahrstuhl")) highlights.push("Aufzug");
    if (furnNote.toLowerCase().includes("einbauküche") || furnNote.toLowerCase().includes("ebk")) highlights.push("Einbauküche");
    if (furnNote.toLowerCase().includes("parkett")) highlights.push("Parkett");
    if (furnNote.toLowerCase().includes("fußbodenheizung")) highlights.push("Fußbodenheizung");
    if (furnNote.toLowerCase().includes("garage") || furnNote.toLowerCase().includes("stellplatz")) highlights.push("Stellplatz");
    if (furnNote.toLowerCase().includes("keller")) highlights.push("Keller");
  }

  return highlights.slice(0, 6);
}

function buildTitle(unit: AnyObject): string {
  const title = unwrapString(unit.title);
  if (title) return title;
  const name = unwrapString(unit.name);
  if (name) return name;
  return "Immobilie";
}

function buildShortDescription(unit: AnyObject, title: string): string {
  const city = unit.city || "";
  const rooms = unwrapNumber(unit.number_of_rooms);
  const area = unwrapNumber(unit.living_space);

  let desc = title;
  if (city && !desc.includes(city)) desc += ` in ${city}`;
  if (rooms && !desc.includes("Zimmer") && !desc.includes("Zi")) desc += ` – ${Math.floor(rooms)} Zimmer`;
  if (area && !desc.includes("m²")) desc += `, ${Math.floor(area)} m²`;
  return desc + ".";
}


function unwrapStringArray(val: unknown): string[] | undefined {
  const v = unwrap(val);
  if (Array.isArray(v) && v.length > 0) return v.filter((x): x is string => typeof x === "string");
  return undefined;
}

function mapSubType(unit: AnyObject): string | undefined {
  const cat = unwrapString(unit.rs_category);
  const aptType = unwrapString(unit.apartment_type);
  return aptType || cat || undefined;
}

function mapPropstackToProperty(unit: AnyObject): Property {
  const title = buildTitle(unit);
  const images = extractImages(unit.images);
  const thumbnail = extractThumbnail(unit.images);
  const price = unwrapNumber(unit.price) || 0;
  const rooms = unwrapNumber(unit.number_of_rooms) || 0;
  const livingArea = unwrapNumber(unit.living_space) || unwrapNumber(unit.property_space_value) || 0;

  // Detail endpoint uses property_status, list endpoint uses status
  const status = unit.property_status || unit.status;

  const street = unit.street
    ? `${unit.street}${unit.house_number ? ` ${unit.house_number}` : ""}`
    : undefined;

  const hideAddress = unwrap(unit.hide_address) === true;

  // Furnishings - can be null or an object
  const furn = unit.furnishings && typeof unit.furnishings === "object" ? unit.furnishings : {};

  return {
    id: String(unit.id),
    title,
    slug: slugify(`${title}-${unit.id}`),
    type: mapPropertyType(unit),
    subType: mapSubType(unit),
    kategorie: mapKategorie(unit.marketing_type),
    status: mapStatus(status),
    price,
    priceLabel: price > 0 ? mapMarketingLabel(unit.marketing_type) : "Preis auf Anfrage",
    pricePerSqm: unwrapNumber(unit.price_per_sqm),
    courtage: unwrapString(unit.courtage),
    courtageNote: unwrapString(unit.courtage_note),
    address: {
      street: hideAddress ? undefined : street,
      city: unit.city || "",
      zip: unit.zip_code || "",
      district: unwrapString(unit.district),
      region: unit.city || "",
      lat: typeof unit.lat === "number" ? unit.lat : undefined,
      lng: typeof unit.lng === "number" ? unit.lng : undefined,
    },
    features: {
      rooms: Math.floor(rooms),
      bedrooms: unwrapNumber(unit.number_of_bed_rooms),
      bathrooms: unwrapNumber(unit.number_of_bath_rooms),
      livingArea: Math.floor(livingArea),
      plotArea: unwrapNumber(unit.plot_area),
      floor: unwrapNumber(unit.floor),
      floors: unwrapNumber(unit.number_of_floors),
      yearBuilt: unwrapNumber(unit.construction_year) || unwrapNumber(unit.fields?.construction_year),
      garage: unwrapBool(furn.garage) || unwrapBool(unit.garage),
      balcony: unwrapBool(furn.balcony) || unwrapBool(unit.balcony),
      balconyArea: unwrapNumber(unit.balcony_space),
      garden: unwrapBool(furn.garden) || unwrapBool(unit.garden),
      elevator: unwrapBool(furn.lift) || unwrapBool(unit.lift),
      cellar: unwrapBool(furn.cellar) || unwrapBool(unit.cellar) || unwrapBool(unit.storeroom),
      builtInKitchen: unwrapBool(furn.built_in_kitchen) || unwrapBool(unit.built_in_kitchen),
      parkingSpaces: unwrapNumber(unit.number_of_parking_spaces),
      parkingType: unwrapString(unit.parking_space_type),
      energyClass: unwrapString(unit.energy_efficiency_class),
      energyValue: unwrapNumber(unit.energy_efficiency_value) || unwrapNumber(unit.thermal_characteristic),
      energyCertificateType: unwrapString(unit.building_energy_rating_type),
      heatingType: unwrapString(unit.heating_type),
      condition: unwrapString(unit.condition),
      flooring: unwrapStringArray(unit.flooring_type),
      bathroomFeatures: unwrapStringArray(unit.bathroom),
    },
    description: unwrapString(unit.description_note) || title,
    locationDescription: unwrapString(unit.location_note),
    furnishingDescription: unwrapString(unit.furnishing_note),
    otherDescription: unwrapString(unit.other_note),
    shortDescription: buildShortDescription(unit, title),
    images: images.length > 0 ? images : ["/images/properties/placeholder.svg"],
    thumbnailImage: thumbnail,
    highlights: buildHighlights(unit),
    freeFrom: unwrapString(unit.free_from),
    createdAt: unit.created_at || new Date().toISOString(),
    featured: false,
    exposeUrl: unwrapString(unit.public_expose_url),
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
    const data = await fetchFromPropstack("/units?per_page=100") as AnyObject[];

    const properties = data
      .filter((unit) => isPublishedStatus(unit.property_status || unit.status))
      .map(mapPropstackToProperty);

    // Mark the first available property with highest price as featured
    const available = properties
      .filter((p) => p.status === "Verfügbar" && p.price > 0)
      .sort((a, b) => b.price - a.price);
    if (available.length > 0) available[0].featured = true;

    // Sort: featured first, then by price (properties with price before those without)
    properties.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      if (a.price > 0 && b.price === 0) return -1;
      if (a.price === 0 && b.price > 0) return 1;
      return b.price - a.price;
    });

    if (properties.length === 0) {
      console.warn("No properties from Propstack, using fallback data");
      const { properties: fallback } = await import("@/data/properties");
      return fallback;
    }

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
    const unit = await fetchFromPropstack(`/units/${id}?new=1`) as AnyObject;
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
    const data = await fetchFromPropstack("/units?per_page=100") as AnyObject[];
    return data
      .filter((unit) => isPublishedStatus(unit.property_status || unit.status))
      .map((unit) => String(unit.id));
  } catch (error) {
    console.error("Failed to fetch property IDs:", error);
    const { properties } = await import("@/data/properties");
    return properties.map((p) => p.id);
  }
}
