# Propstack API – Referenzdokumentation für Website-Integration

> Ziel: Immobilien (Objekte) aus Propstack per API laden und als Übersichts- + Detailseiten auf einer Website darstellen.

---

## 1. Grundlagen

### Basis-URL

```
https://api.propstack.de/v1
```

Es existiert auch eine API V2 (`https://api.propstack.de/docs/index.html`), die bei großen Datenmengen effizienter ist (Scroll-Endpunkte), aber noch nicht alle V1-Endpunkte abdeckt. Für den Website-Anwendungsfall reicht V1 vollkommen aus.

### Authentifizierung

Jeder Propstack-Account hat genau **einen API-Key**. Er wird erstellt unter:
`Verwaltung → API-Schlüssel` → https://crm.propstack.de/app/admin/api_keys

Der Key muss bei **jedem Request** mitgesendet werden – es gibt zwei Wege:

**Option A – Query-Parameter:**
```
GET https://api.propstack.de/v1/units?api_key=DEIN_API_KEY
```

**Option B – Header (empfohlen):**
```
GET https://api.propstack.de/v1/units
Header: X-API-KEY: DEIN_API_KEY
```

> **Sicherheitshinweis:** Den API-Key niemals im Frontend / Client-Code exponieren. Immer über ein serverseitiges Backend oder eine Serverless Function (z.B. Astro SSR, Next.js API Route, Edge Function) proxyen.

---

## 2. Paginierung

Gilt für: Objekte, Kontakte, Suchprofile, Deals, Termine, Aufgaben.

| Parameter | Typ | Default | Beschreibung |
|-----------|-----|---------|--------------|
| `page` | integer | `1` | Seitennummer (1-basiert) |
| `per` | integer | `20` oder `25` | Einträge pro Seite (max. empfohlen: `500`, sonst Timeout-Gefahr) |

Die Response enthält bei `?with_meta=1` ein `meta`-Objekt:
```json
{
  "data": [...],
  "meta": { "total_count": 150 }
}
```

**Alle Seiten iterieren:**
```
Seite 1: /v1/units?page=1&per=25&with_meta=1
Seite 2: /v1/units?page=2&per=25
...
Letzte Seite: ceil(total_count / per)
```

---

## 3. Objekte laden (Listenansicht)

### Endpoint: Alle Objekte

```
GET https://api.propstack.de/v1/units?with_meta=1
```

### Wichtige Query-Parameter

| Parameter | Typ | Beschreibung | Beispiel |
|-----------|-----|--------------|----------|
| `expand` | boolean | Ausführliches JSON inkl. Custom-Felder | `expand=1` |
| `status` | string | Status-ID(s), kommagetrennt | `status=274` |
| `marketing_type` | string | `BUY` oder `RENT` | `marketing_type=BUY` |
| `rs_type` | string | Objekttyp (siehe Enum unten) | `rs_type=APARTMENT` |
| `object_type` | string | Oberkategorie | `object_type=LIVING` |
| `project_id` | integer | Nur Einheiten eines Projekts | `project_id=123` |
| `q` | string | Volltextsuche (unit_id, street, zip_code, city, Bezirk, exposee_id) | `q=Berlin` |
| `country` | string | 2-stelliger ISO-Code | `country=DE` |
| `archived` | string | `-1` = alle, `1` = nur archivierte, Standard = nicht-archivierte | `archived=-1` |
| `property_ids` | string | Kommagetrennte Propstack-IDs | `property_ids=1986,1987` |
| `sort_by` | string | Sortierfeld (Default: `unit_id.raw`) | `sort_by=price` |
| `order` | string | `asc` oder `desc` | `order=desc` |
| `locale` | string | Sprache(n) der Texte | `locale=de,en` |
| `include_translations` | string | Übersetzungen einschließen | `include_translations=en` |
| `new` | integer | Zugriff auf erweiterte Felder | `new=1` |

### Preis- und Flächen-Filter (Range)

Anhängsel `_from` / `_to` an diese Felder:

| Feld | Beschreibung |
|------|--------------|
| `price` | Kaufpreis |
| `base_rent` | Kaltmiete |
| `total_rent` | Warmmiete |
| `property_space_value` | Fläche |
| `living_space` | Wohnfläche |
| `plot_area` | Grundstücksfläche |
| `number_of_rooms` | Zimmer |
| `number_of_bed_rooms` | Schlafzimmer |
| `number_of_bath_rooms` | Badezimmer |
| `floor` | Etage |
| `construction_year` | Baujahr |

**Beispiel:** `?price_from=300000&price_to=500000&number_of_rooms_from=3`

### Sortieroptionen (`sort_by`)

`exposee_id`, `construction_year`, `unit_id.raw`, `floor`, `created_at`, `property_space_value`, `plot_area`, `base_rent`, `price`, `object_price`, `price_per_sqm`, `property_status_position`, `street_number.raw`, `sold_date`, `total_rent`, `number_of_rooms`, `updated_at`

---

## 4. Einzelnes Objekt laden (Detailseite)

### Endpoint

```
GET https://api.propstack.de/v1/units/:id?new=1
```

> **Wichtig:** Den Parameter `new=1` immer verwenden – damit erhält man deutlich mehr Felder als ohne.

### Response-Struktur (Detailansicht)

```json
{
  "id": 5,
  "name": "001",
  "title": {
    "label": "Überschrift",
    "value": "Traumhafte Familienwohnung im klassischen Altbau"
  },
  "unit_id": "001",
  "exposee_id": "",
  "project_id": 2,
  "broker_id": 1,
  "archived": false,

  // --- ADRESSE ---
  "street": "Gottschalkstraße",
  "house_number": "7",
  "zip_code": "13359",
  "city": "Berlin",
  "address": "Gottschalkstraße 7, 13359 Berlin, Deutschland",
  "short_address": "Gottschalkstraße 7, 13359 Berlin",
  "lat": null,
  "lng": null,

  // --- KLASSIFIZIERUNG ---
  "marketing_type": "RENT",       // "BUY" | "RENT"
  "object_type": "LIVING",        // "LIVING" | "COMMERCIAL" | "INVESTMENT"
  "rs_type": "APARTMENT",         // Objekttyp (siehe Enum)
  "rs_category": "PENTHOUSE",     // Objektart (siehe Enum)

  // --- KENNZAHLEN ---
  "number_of_rooms": 3,
  "number_of_bed_rooms": 2,
  "number_of_bath_rooms": 2,
  "living_space": 77,
  "property_space_value": 77,
  "price": null,
  "base_rent": 400,

  // --- BESCHREIBUNGSTEXTE ---
  "description_note": {
    "label": "Beschreibung",
    "value": "Die bezugsfreie Eigentumswohnung befindet sich..."
  },
  // Analog: location_note, furnishing_note, other_note, courtage, courtage_note
  // Langversionen: long_description_note, long_location_note, long_furnishing_note, long_other_note

  // --- BILDER ---
  "images": [
    {
      "id": 8,
      "is_floorplan": false,
      "is_private": false,
      "title": "Objekt",
      "tags": null,
      "position": 1,
      "url": "https://...amazonaws.com/.../Objekt.jpg",
      "big_url": "https://...big_Objekt.jpg",
      "medium_url": "https://...medium_Objekt.jpg",
      "thumb_url": "https://...thumb_Objekt.jpg",
      "small_thumb_url": "https://...small_thumb_Objekt.jpg",
      "square_url": "https://...square_Objekt.jpg"
    }
  ],

  // --- GRUNDRISSE ---
  "floorplans": [
    {
      "id": 5,
      "name": "grundriss.pdf",
      "title": "grundriss.pdf",
      "url": "https://...grundriss.pdf",
      "position": 1
    }
  ],

  // --- DOKUMENTE ---
  "documents": [],

  // --- LINKS ---
  "links": [],

  // --- MAKLER / ANSPRECHPARTNER ---
  "broker": {
    "id": 1,
    "salutation": "mr",
    "first_name": "Max",
    "last_name": "Mustermann",
    "name": "Max Mustermann",
    "avatar_url": "https://...profilbild.jpg",
    "position": "CEO",
    "email": "max@example.com",
    "phone": "+49 030 399 282 39"
  },

  // --- PROJEKT ---
  "project": {
    "title": "Colors of Reinickendorf"
  },

  // --- MERKMALE / TAGS ---
  "property_groups": [
    { "id": 23, "name": "foo", "super_group_id": null }
  ],

  // --- CUSTOM FELDER ---
  "custom_fields": {
    "gebaudeversicherung": {
      "value": null,
      "pretty_value": null
    }
  },

  // --- TIMESTAMPS ---
  "created_at": "2019-06-04T17:09:21.109+02:00",
  "updated_at": "2019-10-08T14:16:29.488+02:00"
}
```

### Unterschied Listen- vs. Detail-Response

In der **Listenansicht** (ohne `new=1`) sind die Felder flach:
```json
{
  "title": "Traumhafte Familienwohnung...",
  "images": [
    { "original": "...", "big": "...", "medium": "...", "thumb": "..." }
  ],
  "status": { "id": 2, "name": "In Vorbereitung", "color": "#ed892b" }
}
```

In der **Detailansicht** (`new=1`) sind Textfelder als `{ label, value }` strukturiert und Bilder haben mehr URL-Varianten (`big_url`, `medium_url`, `thumb_url`, `small_thumb_url`, `square_url`).

---

## 5. Bilder-Varianten

Propstack liefert Bilder in mehreren Größen. Nutze die passende Variante je nach Kontext:

| Variante | Verwendung |
|----------|------------|
| `url` / `original` | Vollauflösung (Lightbox, Download) |
| `big_url` / `big` | Hero-/Header-Bild |
| `medium_url` / `medium` | Galerie-Ansicht |
| `thumb_url` / `thumb` | Thumbnail / Karten |
| `small_thumb_url` | Kleine Vorschauen |
| `square_url` | Quadratische Ansicht (Grid) |

**Floorplans filtern:** `images.filter(img => img.is_floorplan === true)` für Grundrisse, `false` für reguläre Bilder.

**Private Bilder:** `is_private === true` → nicht auf Website anzeigen.

---

## 6. Objekt-Stati

### Endpoint

```
GET https://api.propstack.de/v1/property_statuses
```

### Response

```json
{
  "data": [
    { "id": 274, "name": "Verfügbar", "position": 1, "color": "#009cde", "nonpublic": false },
    { "id": 276, "name": "Reserviert", "position": 3, "color": "#f55753", "nonpublic": false },
    { "id": 278, "name": "Verkauft",   "position": 5, "color": "#10cfbd", "nonpublic": true }
  ]
}
```

> **Wichtig:** `nonpublic: true` bedeutet: Diesen Status NICHT auf der Website zeigen. Zum Filtern auf der Website: Nur Objekte mit einem öffentlichen Status anzeigen oder per `status=274` (o.ä.) gezielt nur verfügbare Objekte laden.

---

## 7. Projekte (optional)

Projekte sind "Über-Objekte" – ein Projekt umfasst mehrere Einheiten/Objekte.

```
GET https://api.propstack.de/v1/projects          # Alle Projekte
GET https://api.propstack.de/v1/projects/:id       # Einzelnes Projekt
```

Einheiten eines Projekts laden:
```
GET https://api.propstack.de/v1/units?project_id=123
```

---

## 8. Dokumente eines Objekts

```
GET https://api.propstack.de/v1/documents?property_id=123
```

Response enthält Dokumente mit `url`, `is_floorplan`, `is_exposee`, `is_private`, `tags`.

---

## 9. Enums / Referenzwerte

### `marketing_type` (Vermarktungsart)
- `BUY` – Kauf
- `RENT` – Miete

### `object_type` (Oberkategorie)
- `LIVING` – Wohnen
- `COMMERCIAL` – Gewerbe
- `INVESTMENT` – Investment/Anlage

### `rs_type` (Objekttyp)
- `APARTMENT` – Wohnung
- `HOUSE` – Haus
- `TRADE_SITE` – Grundstück
- `GARAGE` – Garage/Stellplatz
- `SHORT_TERM_ACCOMODATION` – Ferienwohnung
- `OFFICE` – Büro
- `GASTRONOMY` – Gastronomie
- `INDUSTRY` – Industrie
- `STORE` – Laden
- `SPECIAL_PURPOSE` – Spezialimmobilie
- `INVESTMENT` – Anlageobjekt

### `rs_category` (Objektart) – Auszug der häufigsten

**Wohnungen:**
`ROOF_STOREY`, `LOFT`, `MAISONETTE`, `PENTHOUSE`, `TERRACED_FLAT`, `GROUND_FLOOR`, `APARTMENT`, `RAISED_GROUND_FLOOR`, `HALF_BASEMENT`, `OTHER`

**Häuser:**
`SINGLE_FAMILY_HOUSE`, `TWO_FAMILY_HOUSE`, `TERRACE_HOUSE`, `MID_TERRACE_HOUSE`, `TERRACE_END_HOUSE`, `MULTI_FAMILY_HOUSE`, `TOWNHOUSE`, `BUNGALOW`, `FARMHOUSE`, `SEMIDETACHED_HOUSE`, `VILLA`, `CASTLE_MANOR_HOUSE`, `SUMMER_RESIDENCE`

**Garagen:**
`GARAGE`, `STREET_PARKING`, `CARPORT`, `DUPLEX`, `CAR_PARK`, `UNDERGROUND_GARAGE`, `DOUBLE_GARAGE`

**Gewerbe/Büro:**
`OFFICE`, `OFFICE_FLOOR`, `OFFICE_BUILDING`, `OFFICE_CENTRE`, `SURGERY`, `COMMERCIAL_CENTRE`, `LIVING_AND_COMMERCIAL_BUILDING`

**Investment:**
`INVEST_LIVING_BUSINESS_HOUSE`, `INVEST_HOUSING_ESTATE`, `INVEST_MICRO_APARTMENTS`, `INVEST_OFFICE_BUILDING`, `INVEST_HOTEL`, `INVEST_NURSING_HOME`, etc.

(Vollständige Liste: siehe Propstack Docs → Objekte)

### Mehrsprachige Felder
Diese Felder können übersetzt werden:
`title`, `description_note`, `location_note`, `furnishing_note`, `other_note`, `long_description_note`, `long_location_note`, `long_furnishing_note`, `long_other_note`, `courtage`, `courtage_note`

---

## 10. Interessenten-Anfrage von der Website an Propstack senden

Wenn ein Besucher auf der Detailseite ein Kontaktformular ausfüllt, soll die Anfrage in Propstack landen. Es gibt drei Wege:

### Weg 1: Formatierte E-Mail (empfohlen, einfachster Weg)

Vom Server eine HTML-E-Mail an die in Propstack verbundene Adresse schicken. Der Body muss einen Container mit der ID `ps-kontaktanfrage` enthalten. Innerhalb des Containers Felder per `<span id="...">Wert</span>` zuordnen:

```html
<div id="ps-kontaktanfrage">
  <span id="client_salutation">mr</span>
  <span id="client_first_name">Max</span>
  <span id="client_last_name">Mustermann</span>
  <span id="client_email">max@example.com</span>
  <span id="client_phone">+49 123 456789</span>
  <span id="body">Ich interessiere mich für diese Wohnung.</span>
  <span id="property_id">5</span>
</div>
```

Wichtige IDs:
| ID | Beschreibung |
|----|-------------|
| `client_salutation` | `mr` oder `ms` |
| `client_first_name` | Vorname |
| `client_last_name` | Nachname |
| `client_email` | E-Mail |
| `client_phone` | Telefon |
| `client_street` | Straße + Hausnummer |
| `client_zip_code` | PLZ |
| `client_city` | Stadt |
| `client_locale` | Sprache (`de`, `en`, `es`) |
| `body` | Freitextnachricht |
| `property_id` | Propstack-ID des Objekts |
| `project_id` | Propstack-ID des Projekts |
| `client_cf_FELDNAME` | Custom-Feld-Wert |

**Voraussetzung:** Die Absender-E-Mail muss in Propstack als Kontaktquelle hinterlegt sein (`Verwaltung → Kontaktquellen`).

### Weg 2: XML-Anhang (OpenImmo-Format)

E-Mail mit XML-Datei im OpenImmo-Format als Anhang. Nutzt das gleiche Schema wie Immobilienportale (ImmobilienScout24, Immowelt etc.).

### Weg 3: API-Request

1. Kontakt erstellen: `POST /v1/contacts`
2. Notiz mit `client_source_id` erstellen → löst Portalanfrage-Trigger aus

---

## 11. Typische Implementierungs-Architektur

```
┌──────────────────────────────────────────────────┐
│                    WEBSITE                        │
│                                                   │
│  /immobilien          → Übersichtsseite (Liste)   │
│  /immobilien/[id]     → Detailseite               │
│                                                   │
├──────────────────────────────────────────────────┤
│               SERVER / API-ROUTE                  │
│                                                   │
│  GET /api/properties                              │
│    → fetch propstack /v1/units?with_meta=1&...    │
│    → Bilder: is_private filtern                   │
│    → Status: nonpublic filtern                    │
│    → Response cachen (z.B. 5 min)                 │
│                                                   │
│  GET /api/properties/[id]                         │
│    → fetch propstack /v1/units/:id?new=1          │
│                                                   │
│  POST /api/inquiry                                │
│    → Formatierte E-Mail an Propstack senden       │
│      ODER API-Request (Kontakt + Notiz)           │
│                                                   │
├──────────────────────────────────────────────────┤
│                   PROPSTACK                       │
│  api.propstack.de/v1/...                          │
│  Auth: X-API-KEY Header                           │
└──────────────────────────────────────────────────┘
```

---

## 12. Implementierungshinweise

### Caching
Die Propstack API hat keine dokumentierten Rate-Limits, aber es empfiehlt sich:
- Übersichtsliste alle 5–15 Minuten cachen (ISR/SSG mit Revalidation)
- Detailseiten bei Bedarf on-demand revalidieren (z.B. via Webhook)

### Webhooks
Propstack unterstützt Webhooks (Endpoint: `/v1/webhooks`). Damit kann man bei Änderungen an Objekten automatisch die Website-Cache-Invalidierung triggern.

### Bild-Optimierung
Die S3-URLs von Propstack sind direkte Bild-Links. Für optimale Performance:
- Über `next/image`, Astro `<Image>` oder Cloudinary/imgproxy als Proxy leiten
- Responsive Bilder mit `srcset` basierend auf den vorhandenen Varianten (thumb, medium, big, original)

### SEO-relevante Felder für Detailseiten
- `title` → `<title>` und `<h1>`
- `description_note` → Meta-Description (gekürzt)
- `images[0].big_url` → OG-Image
- `address` / `city` → Strukturierte Daten (Schema.org `RealEstateListing`)
- `price` / `base_rent` → Schema.org `offers.price`
- `living_space` → Schema.org `floorSize`
- `number_of_rooms` → Schema.org `numberOfRooms`

### Fehlendes Feld?
Laut Propstack-Doku: Bei Objekten den Parameter `new=1` verwenden für erweiterte Felder. Falls ein Feld trotzdem fehlt, Propstack unter dev@propstack.de kontaktieren.

---

## 13. Code-Beispiele

### TypeScript: Propstack API Client

```typescript
const PROPSTACK_BASE = "https://api.propstack.de/v1";
const API_KEY = process.env.PROPSTACK_API_KEY!;

interface PropstackListResponse<T> {
  data: T[];
  meta: { total_count: number };
}

async function propstackFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${PROPSTACK_BASE}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: { "X-API-KEY": API_KEY },
  });

  if (!res.ok) {
    throw new Error(`Propstack API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// --- Alle öffentlichen Objekte laden ---
async function getProperties(options?: {
  page?: number;
  per?: number;
  status?: string;
  marketing_type?: string;
  rs_type?: string;
  sort_by?: string;
  order?: string;
}) {
  const params: Record<string, string> = { with_meta: "1" };
  if (options?.page) params.page = String(options.page);
  if (options?.per) params.per = String(options.per);
  if (options?.status) params.status = options.status;
  if (options?.marketing_type) params.marketing_type = options.marketing_type;
  if (options?.rs_type) params.rs_type = options.rs_type;
  if (options?.sort_by) params.sort_by = options.sort_by;
  if (options?.order) params.order = options.order;

  return propstackFetch<PropstackListResponse<any>>("/units", params);
}

// --- Einzelnes Objekt laden (Detailseite) ---
async function getProperty(id: number | string) {
  return propstackFetch<any>(`/units/${id}`, { new: "1" });
}

// --- Objekt-Stati laden ---
async function getPropertyStatuses() {
  return propstackFetch<{ data: any[] }>("/property_statuses");
}
```

### Filter: Nur öffentliche, nicht-private Bilder

```typescript
function getPublicImages(property: any) {
  return (property.images || []).filter(
    (img: any) => !img.is_private && !img.is_floorplan
  );
}

function getFloorplans(property: any) {
  return (property.images || []).filter(
    (img: any) => img.is_floorplan && !img.is_private
  );
}
```

### Helper: Preis formatieren

```typescript
function formatPrice(property: any): string {
  if (property.marketing_type === "RENT") {
    if (property.base_rent) return `${property.base_rent.toLocaleString("de-DE")} € Kaltmiete`;
    if (property.total_rent) return `${property.total_rent.toLocaleString("de-DE")} € Warmmiete`;
  }
  if (property.price) return `${property.price.toLocaleString("de-DE")} €`;
  return "Preis auf Anfrage";
}
```

### Helper: Objekttyp-Label

```typescript
const RS_TYPE_LABELS: Record<string, string> = {
  APARTMENT: "Wohnung",
  HOUSE: "Haus",
  TRADE_SITE: "Grundstück",
  GARAGE: "Garage/Stellplatz",
  OFFICE: "Büro",
  GASTRONOMY: "Gastronomie",
  INDUSTRY: "Industrie",
  STORE: "Laden",
  SPECIAL_PURPOSE: "Spezialimmobilie",
  INVESTMENT: "Anlageobjekt",
  SHORT_TERM_ACCOMODATION: "Ferienwohnung",
};

const RS_CATEGORY_LABELS: Record<string, string> = {
  SINGLE_FAMILY_HOUSE: "Einfamilienhaus",
  TWO_FAMILY_HOUSE: "Zweifamilienhaus",
  SEMIDETACHED_HOUSE: "Doppelhaushälfte",
  TERRACE_HOUSE: "Reihenhaus",
  MULTI_FAMILY_HOUSE: "Mehrfamilienhaus",
  VILLA: "Villa",
  BUNGALOW: "Bungalow",
  PENTHOUSE: "Penthouse",
  MAISONETTE: "Maisonette",
  APARTMENT: "Etagenwohnung",
  GROUND_FLOOR: "Erdgeschosswohnung",
  LOFT: "Loft",
  ROOF_STOREY: "Dachgeschoss",
  // ... bei Bedarf erweitern
};

function getPropertyTypeLabel(property: any): string {
  return RS_CATEGORY_LABELS[property.rs_category]
    || RS_TYPE_LABELS[property.rs_type]
    || "Immobilie";
}
```

---

## 14. Checkliste für die Umsetzung

- [ ] API-Key serverseitig speichern (`.env`)
- [ ] Proxy-Route / API-Route erstellen (Key nie im Browser exponieren)
- [ ] Übersichtsliste: `GET /v1/units?with_meta=1&status=VERFÜGBAR_STATUS_ID`
- [ ] Detailseite: `GET /v1/units/:id?new=1`
- [ ] Private Bilder filtern (`is_private`)
- [ ] Nicht-öffentliche Stati filtern (`nonpublic`)
- [ ] Grundrisse von Fotos trennen (`is_floorplan`)
- [ ] Paginierung implementieren (mind. für die Übersichtsseite)
- [ ] Anfrage-Formular → Formatierte E-Mail oder API-Kontakt erstellen
- [ ] Caching-Strategie (ISR / SWR / manuelle Revalidierung)
- [ ] Optional: Webhook für Cache-Invalidierung bei Objekt-Updates
- [ ] SEO: Schema.org RealEstateListing Structured Data
- [ ] Bildoptimierung (responsive, lazy-loading)
