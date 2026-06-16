# Propstack Integration – Claude Code Instruction

> **Zweck:** Diese Anleitung ermöglicht es Claude Code, eine vollständige Propstack-Integration für eine Next.js Immobilienmakler-Website aufzubauen. Die Integration umfasst: Immobilienanzeigen (SSG), Lead-Erfassung (CRM + E-Mail), und optionale Airtable-Synchronisation.

---

## Architektur-Überblick

```
Propstack API ──► src/lib/propstack.ts ──► Next.js SSG (Build-Time)
                                              │
                                              ├── /angebote/          (Listing)
                                              └── /angebote/[id]/     (Detail)

User-Formular ──► /.netlify/functions/submit-contact
                      │
                      ├── POST Propstack /contacts  (CRM-Eintrag)
                      └── POST Resend API           (E-Mail-Benachrichtigung)
```

**Stack:** Next.js 14 (`output: "export"`), Netlify (Hosting + Functions), Propstack API v1, Resend (E-Mail)

---

## 1. Umgebungsvariablen

| Variable | Pflicht | Beschreibung |
|----------|---------|-------------|
| `PROPSTACK_API_KEY` | Ja | API-Key aus Propstack Dashboard → Einstellungen → API |
| `RESEND_API_KEY` | Ja | API-Key von resend.com für E-Mail-Versand |
| `RESEND_FROM_EMAIL` | Nein | Absender-E-Mail (Default: `noreply@sunsideai.de`) |
| `AIRTABLE_TOKEN` | Nein | Nur für Airtable-Sync |
| `AIRTABLE_BASE` | Nein | Airtable Base ID (z.B. `appXXXXXX`) |
| `AIRTABLE_TABLE_ID` | Nein | Airtable Table ID (z.B. `tblXXXXXX`) |
| `OPENAI_API_KEY` | Nein | Nur für automatische Beschreibungen im Airtable-Sync |

In Netlify unter **Site Settings → Environment Variables** setzen.

---

## 2. Next.js Konfiguration

```js
// next.config.mjs
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
```

- `output: "export"` → Statischer HTML-Export, kein Node.js-Server nötig
- `images: { unoptimized: true }` → next/image funktioniert, aber ohne Server-Optimierung
- `trailingSlash: true` → URLs enden mit `/` (SEO-Standard)

---

## 3. Property-Typ (`src/types/property.ts`)

```typescript
export interface Property {
  id: string;
  title: string;
  slug: string;
  type: "Wohnung" | "Haus" | "Grundstück" | "Gewerbe";
  subType?: string;
  kategorie: "Kaufen" | "Mieten";
  status: string;
  price: number;
  priceLabel: string;
  pricePerSqm?: number;
  courtage?: string;
  courtageNote?: string;
  address: {
    street?: string;
    city: string;
    zip: string;
    district?: string;
    region: string;
    lat?: number;
    lng?: number;
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
    terrace?: boolean;
    garden?: boolean;
    elevator?: boolean;
    builtInKitchen?: boolean;
    cellar?: boolean;
    guestToilet?: boolean;
    barrierFree?: boolean;
    parkingSpaces?: number;
    parkingType?: string;
  };
  highlights: string[];
  description?: string;
  shortDescription: string;
  images: string[];
  thumbnailImage: string;
  floorPlans?: string[];
  energyCertificate?: {
    type?: string;
    value?: number;
    class?: string;
    validUntil?: string;
    heatingType?: string;
  };
  exposeUrl?: string;
  featured?: boolean;
}
```

---

## 4. Propstack API Client (`src/lib/propstack.ts`)

### API-Endpoints

| Endpoint | Methode | Verwendung |
|----------|---------|-----------|
| `GET /units?per_page=20&page=N` | Listing | Alle Immobilien paginiert abrufen |
| `GET /units/{id}?new=1` | Detail | Einzelne Immobilie mit allen Feldern |
| `POST /contacts` | CRM | Kontakt/Lead anlegen |

### Authentifizierung

```
Header: X-API-KEY: {PROPSTACK_API_KEY}
Header: Accept: application/json
```

### Kernfunktionen

**`fetchProperties(): Promise<Property[]>`**
- Paginiert durch `/units` (20 pro Seite, max 20 Seiten)
- Filtert nach veröffentlichten Status
- Markiert teuerstes verfügbares Objekt als `featured: true`
- Sortiert: Featured zuerst, dann nach Preis absteigend
- **Fallback:** Bei fehlendem API-Key oder Fehler → hardcodierte Demo-Daten

**`fetchProperty(id: string): Promise<Property | null>`**
- Ruft `/units/{id}?new=1` ab (Detail-Endpoint mit mehr Feldern)
- Detail-Endpoint verpackt Werte als `{ label, value }` → `unwrap()` nötig

**`fetchPropertyIds(): Promise<string[]>`**
- Gibt alle veröffentlichten Property-IDs zurück
- Wird von `generateStaticParams()` für SSG verwendet

### Mapping: Propstack → Property

**Objekttyp (`mapPropertyType`):**
```
rs_type "HOUSE"      → "Haus"
rs_type "APARTMENT"  → "Wohnung"
rs_type "TRADE_SITE" → "Grundstück"
rs_type mit OFFICE/STORE/GASTRONOMY/INDUSTRY → "Gewerbe"
Fallback: Textanalyse des Titels
Default: "Wohnung"
```

**Sub-Typ (`mapSubType`) mit Übersetzung:**
```
SEMIDETACHED_HOUSE  → "Doppelhaushälfte"
DETACHED_HOUSE      → "Einfamilienhaus"
TERRACED_HOUSE      → "Reihenhaus"
MULTI_FAMILY_HOUSE  → "Mehrfamilienhaus"
PENTHOUSE           → "Penthouse"
MAISONETTE          → "Maisonette"
... (alle gängigen Typen)
Unbekannt: Unterstriche → Leerzeichen, capitalize
```

**Status (`mapStatus`):**
```
"In Vermarktung" → "Verfügbar"
"In Vorbereitung" → "In Vorbereitung"
"Reserviert" → "Reserviert"
"Verkauft" → "Verkauft"
```

**Nur diese Status werden auf der Website angezeigt:**
- In Vorbereitung, In Vermarktung, Reserviert, Verkauft
- Interne Status (Akquise, Neuer Lead, etc.) werden ausgeblendet

**Slug-Generierung (`slugify`):**
- Umlaute: ä→ae, ö→oe, ü→ue, ß→ss
- Sonderzeichen entfernen, Leerzeichen → Bindestriche
- Format: `{title-slug}-{id}`

**Highlights (`buildHighlights`):**
- Max 6 aus Furnishings: Einbauküche, Balkon, Terrasse, Garten, Garage, Aufzug, Keller, Gäste-WC, Barrierefrei
- Nur wenn `true` im Propstack-Objekt

**Detail-Endpoint `unwrap()`:**
- Propstack Detail gibt Werte als `{ label: "Zimmer", value: 3 }` zurück
- `unwrap()` extrahiert den `value`
- `unwrapString()`, `unwrapNumber()`, `unwrapBool()` für typsichere Extraktion

### Bilder

```typescript
// Filtert Grundrisse und private Bilder aus
images.filter(img => !img.is_floorplan && !img.is_private)

// Beste verfügbare Auflösung
img.big_url || img.big || img.url || img.original || img.medium_url || img.medium

// Thumbnail: Erstes nicht-Grundriss-Bild in medium-Auflösung
// Fallback: /images/properties/placeholder.svg
```

---

## 5. Seiten-Struktur

### Listing-Seite (`src/app/angebote/page.tsx`)

```typescript
// Server Component
export default async function AngebotePage() {
  const properties = await fetchProperties();
  return <PropertyFilters properties={properties} />;
}
```

### Detail-Seite (`src/app/angebote/[id]/page.tsx`)

```typescript
// SSG: Generiert eine statische Seite pro Immobilie
export async function generateStaticParams() {
  const ids = await fetchPropertyIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const property = await fetchProperty(params.id);
  return { title: property.title, description: property.shortDescription };
}

export default async function PropertyDetailPage({ params }) {
  const property = await fetchProperty(params.id);
  // Zeigt: Bilder, Daten, Karte, Kontaktformular
  // Kontaktformular bekommt propertyId + propertyTitle als Props
}
```

### Komponenten

| Komponente | Typ | Funktion |
|-----------|-----|----------|
| `PropertyCard` | Server | Karte mit Bild, Titel, Preis, Features |
| `PropertyFilters` | Client | Filter (Typ, Region, Status), Sortierung, Pagination |
| `ContactForm` | Client | Kontaktformular mit Dual-Submission |
| `PropertyMapWrapper` | Client | Leaflet/OSM Karte mit Standort |

---

## 6. Lead-Erfassung (Kontaktformular)

### Frontend: Dual-Submission (`ContactForm.tsx`)

```typescript
// Beide parallel absenden, Erfolg wenn mindestens einer klappt
const [netlifyRes, propstackRes] = await Promise.all([
  // 1. Netlify Forms (Backup)
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  }).catch(() => null),

  // 2. Propstack CRM + E-Mail (Primary)
  fetch("/.netlify/functions/submit-contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      vorname, nachname, email, telefon, nachricht,
      adresse, propertyId, propertyTitle, formType,
    }),
  }).catch(() => null),
]);

if ((propstackRes && propstackRes.ok) || (netlifyRes && netlifyRes.ok)) {
  setSubmitted(true);
} else {
  setError(true);
}
```

### Form-Varianten

| `formType` | Felder | Verwendung |
|-----------|--------|-----------|
| `"kontakt"` | Vorname, Nachname, E-Mail, Telefon, Nachricht | Allgemeines Kontaktformular |
| `"bewertung"` | + Immobilienadresse | Bewertungsanfrage |
| `"download"` | + Ratgeber-Name | Ratgeber-/Checklisten-Download |

### Netlify Forms: Hidden Form Detection

Netlify erkennt Formulare nur im statischen HTML. In `layout.tsx` müssen hidden Forms definiert werden:

```html
<form name="kontakt" data-netlify="true" hidden>
  <input type="hidden" name="form-name" value="kontakt" />
  <input name="vorname" /><input name="nachname" />
  <input name="email" /><input name="telefon" />
  <textarea name="nachricht" />
</form>
```

Ein hidden Form pro `formType` (kontakt, bewertung, download, suchprofil).

---

## 7. Netlify Function: Contact Submission (`netlify/functions/submit-contact.ts`)

### Flow

1. **CORS Headers** setzen (für Frontend-Requests)
2. **Validierung:** `vorname`, `nachname`, `email` sind Pflicht
3. **Propstack Contact erstellen:**
   ```
   POST https://api.propstack.de/v1/contacts
   Header: X-API-KEY: {key}
   Body: {
     "client": {
       "first_name": "...",
       "last_name": "...",
       "email": "...",
       "home_phone": "...",
       "description": "Anfrage: Kontaktformular Website\nNachricht: ..."
     }
   }
   ```
4. **E-Mail senden** (fire-and-forget, blockiert Response nicht)
5. **Response:** `{ success: true, contactId: contact.id }`

### FormPayload Interface

```typescript
interface FormPayload {
  vorname: string;
  nachname: string;
  email: string;
  telefon?: string;
  nachricht?: string;
  adresse?: string;
  ratgeber?: string;
  propertyId?: string;
  propertyTitle?: string;
  formType: "kontakt" | "bewertung" | "download";
}
```

---

## 8. E-Mail-Benachrichtigungen (`netlify/functions/email.ts`)

### Konfiguration

```typescript
const NOTIFICATION_RECIPIENTS = [
  'makler@kundendomain.de',     // ← Anpassen pro Kunde
  'contact@sunsideai.de',       // ← SunsideAI CC
];
const SENDER_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@sunsideai.de';
const SENDER_NAME = 'Firmenname Website';  // ← Anpassen
```

### Funktionen

| Funktion | Trigger | E-Mail-Betreff |
|----------|---------|----------------|
| `sendContactNotification()` | Kontakt-/Bewertungsformular | "Kontaktanfrage: Name – Immobilientitel" |
| `sendDownloadNotification()` | Ratgeber-Download | "Ratgeber-Download: Name – Ratgebername" |

### Template-Struktur

```
┌─────────────────────────┐
│ Header: Logo (weiß)     │
│ Titel + Untertitel      │
├─────────────────────────┤
│ Kontaktdaten            │
│ • Name, E-Mail, Telefon │
├─────────────────────────┤
│ Immobilien-Info         │  ← nur wenn propertyId vorhanden
│ • Titel + ID + Link     │
├─────────────────────────┤
│ Nachricht               │  ← wenn vorhanden
├─────────────────────────┤
│ Action-Buttons          │
│ • Antworten / Anrufen   │
├─────────────────────────┤
│ Footer: Makler-Info     │
│ Adresse, Zeitstempel    │
└─────────────────────────┘
```

### Resend API Call

```typescript
POST https://api.resend.com/emails
Authorization: Bearer {RESEND_API_KEY}
Body: {
  from: "Firmenname <noreply@domain.de>",
  to: ["makler@...", "contact@sunsideai.de"],
  subject: "...",
  html: "...",
  reply_to: "user@email.de"
}
```

- 2 Retries mit exponentiellem Backoff
- 10s Timeout per Request
- Fehler blockiert nicht die Form-Response

---

## 9. Anpassung pro Kunde

### Checkliste für neuen Makler

| Was | Wo | Ändern zu |
|-----|-----|----------|
| **Firmenname** | `src/data/site-config.ts` → `name` | z.B. "Mustermann Immobilien" |
| **Inhaber** | `site-config.ts` → `owner.name`, `owner.title` | Name + Titel |
| **Kontakt** | `site-config.ts` → `contact.*` | Telefon, E-Mail, Adresse |
| **Domain** | `site-config.ts` → `url` | "https://www.kundendomain.de" |
| **Regionen** | `site-config.ts` → `regions[]` | Lokale Regionen |
| **API-Key** | Netlify Env → `PROPSTACK_API_KEY` | Kunden-API-Key |
| **E-Mail-Empfänger** | `email.ts` → `NOTIFICATION_RECIPIENTS` | Kunden-E-Mail |
| **E-Mail-Absender** | Netlify Env → `RESEND_FROM_EMAIL` | Kunden-Domain |
| **E-Mail-Template** | `email.ts` → Farben, Logo-URL, Footer | Kunden-Branding |
| **Logo** | `public/` | Kunden-Logo-Dateien |
| **Farben** | `tailwind.config.ts` → `colors.primary` | Kunden-CI |
| **Favicon** | `public/` + `layout.tsx` → `metadata.icons` | Kunden-Favicon |
| **Impressum** | `src/app/impressum/page.tsx` | HRB, USt-IdNr, Aufsichtsbehörde |
| **Datenschutz** | `src/app/datenschutz/page.tsx` | Firmenname, Aufsichtsbehörde |
| **Demo-Daten** | `src/data/properties.ts` | Fallback-Immobilien anpassen |
| **Airtable-Sync** | `scripts/propstack_airtable_sync.py` → `WEBSITE_BASE_URL` | Kunden-Domain |

### Branding-Farben (Tailwind)

```js
// tailwind.config.ts
colors: {
  primary: {
    DEFAULT: "#2D7A7A",  // ← Hauptfarbe anpassen
    800: "#245f5f",      // ← Hover-Variante
  },
  mint: "#E8F5F0",       // ← Hintergrund-Akzent
  gold: "#D4A853",       // ← Sekundärfarbe
}
```

---

## 10. Airtable-Sync (Optional)

### Script: `scripts/propstack_airtable_sync.py`

**Ausführung:**
```bash
PROPSTACK_API_KEY=xxx AIRTABLE_TOKEN=xxx AIRTABLE_BASE=appXXX AIRTABLE_TABLE_ID=tblXXX python scripts/propstack_airtable_sync.py
```

**Was es tut:**
1. Holt alle veröffentlichten Immobilien aus Propstack (paginiert + Detail)
2. Mapped Felder auf Airtable-Schema (Titel, Preis, Adresse, Bilder, etc.)
3. Optional: Generiert Kurzbeschreibungen via OpenAI GPT-4o-mini
4. Synct zu Airtable: CREATE / UPDATE / DELETE nach Objektnummer

**Airtable-Spalten:**
Titel, Webseite, Objektnummer, Objektart, Kategorie, Status, Standort, Adresse, Wohnfläche, Zimmer, Badezimmer, Grundstücksfläche, Baujahr, Garage, Keller, Provision, Energieausweis, Bild, Kurzbeschreibung

---

## 11. Debug & Verifizierung

### API-Konnektivität testen

```bash
PROPSTACK_API_KEY=xxx node scripts/debug-propstack.mjs
```

Zeigt: Alle Units mit Status, Preis, Marketing-Typ, ob veröffentlicht.

### Build testen

```bash
npm run build
```

Muss fehlerfrei durchlaufen. Alle Property-Detail-Seiten werden als statisches HTML generiert.

### Formular testen

1. Kontaktformular absenden
2. Propstack Dashboard → Kontakte → Neuer Eintrag prüfen
3. E-Mail-Eingang bei Empfängern prüfen
4. Netlify Dashboard → Forms → Eintrag prüfen

### Häufige Fehler

| Fehler | Ursache | Lösung |
|--------|---------|--------|
| Keine Immobilien auf der Seite | API-Key fehlt/falsch | `PROPSTACK_API_KEY` in Netlify setzen |
| Fallback-Daten werden angezeigt | API-Key nicht gesetzt | Env-Variable prüfen |
| Formular zeigt Fehler | Propstack + Netlify Forms beide fehlgeschlagen | API-Key + hidden Forms prüfen |
| Keine E-Mail | `RESEND_API_KEY` fehlt | In Netlify setzen, Domain verifizieren |
| `SEMIDETACHED_HOUSE` als Badge | SubType nicht übersetzt | `subTypeLabels` Map erweitern |
| Bilder fehlen | `is_private: true` in Propstack | Bilder in Propstack auf öffentlich setzen |

---

## 12. Projektstruktur (relevante Dateien)

```
├── netlify/functions/
│   ├── submit-contact.ts    # Lead-Erfassung → Propstack + E-Mail
│   └── email.ts             # Resend E-Mail-Templates
├── scripts/
│   ├── propstack_airtable_sync.py  # Airtable-Sync
│   └── debug-propstack.mjs         # API-Debug-Tool
├── src/
│   ├── app/
│   │   ├── angebote/
│   │   │   ├── page.tsx             # Listing-Seite
│   │   │   └── [id]/page.tsx        # Detail-Seite (SSG)
│   │   ├── datenschutz/page.tsx     # DSGVO (Propstack erwähnen!)
│   │   └── layout.tsx               # Hidden Netlify Forms
│   ├── components/
│   │   ├── properties/
│   │   │   ├── PropertyCard.tsx     # Immobilien-Karte
│   │   │   └── PropertyFilters.tsx  # Filter + Pagination
│   │   └── ui/
│   │       └── ContactForm.tsx      # Dual-Submission-Formular
│   ├── data/
│   │   ├── site-config.ts           # Firmendaten (anpassen!)
│   │   └── properties.ts            # Fallback-Demo-Daten
│   ├── lib/
│   │   ├── propstack.ts             # API-Client + Mapping
│   │   └── utils.ts                 # formatCurrency, cn, etc.
│   └── types/
│       └── property.ts              # Property Interface
└── next.config.mjs                  # Static Export Config
```
