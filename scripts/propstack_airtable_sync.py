#!/usr/bin/env python3
"""
Propstack → Airtable Sync
Liest Immobilien aus der Propstack API und synchronisiert sie mit Airtable.
Nur veröffentlichte Immobilien (Status: In Vermarktung, Reserviert, Verkauft)
werden übertragen.

Env-Variablen:
  PROPSTACK_API_KEY   – Propstack API Key
  AIRTABLE_TOKEN      – Airtable Personal Access Token
  AIRTABLE_BASE       – Airtable Base ID (z.B. appXXXXXX)
  AIRTABLE_TABLE_ID   – Airtable Table ID (z.B. tblXXXXXX)
  OPENAI_API_KEY      – (Optional) OpenAI Key für Kurzbeschreibungen
"""

import os
import sys
import json
import time
import hashlib
from typing import List, Dict, Optional, Tuple

try:
    import requests
except ImportError:
    print("[ERROR] requests nicht installiert: pip install requests")
    sys.exit(1)

# ===========================================================================
# KONFIGURATION
# ===========================================================================

PROPSTACK_API_KEY = os.getenv("PROPSTACK_API_KEY", "")
PROPSTACK_API_URL = os.getenv("PROPSTACK_API_URL", "https://api.propstack.de/v1")

AIRTABLE_TOKEN = os.getenv("AIRTABLE_TOKEN", "")
AIRTABLE_BASE = os.getenv("AIRTABLE_BASE", "")
AIRTABLE_TABLE_ID = os.getenv("AIRTABLE_TABLE_ID", "")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

# Nur Immobilien mit diesen Status synchronisieren
PUBLISHED_STATUSES = {"in vorbereitung", "in vermarktung", "reserviert", "verkauft"}

# Base-URL der eigenen Website (für Airtable "Webseite"-Feld)
WEBSITE_BASE_URL = os.getenv("WEBSITE_BASE_URL", "https://myhomefin.de")

# ===========================================================================
# PROPSTACK API
# ===========================================================================

def propstack_headers() -> dict:
    return {
        "X-API-KEY": PROPSTACK_API_KEY,
        "Accept": "application/json",
    }


def fetch_propstack_units() -> List[dict]:
    """Alle Units aus Propstack laden (paginiert, max 20 pro Seite)"""
    all_units: List[dict] = []
    page = 1
    while page <= 20:  # safety limit
        url = f"{PROPSTACK_API_URL}/units?per_page=20&page={page}"
        r = requests.get(url, headers=propstack_headers(), timeout=30)
        r.raise_for_status()
        data = r.json()
        if not isinstance(data, list) or len(data) == 0:
            break
        all_units.extend(data)
        if len(data) < 20:
            break  # last page
        page += 1
    return all_units


def fetch_propstack_detail(unit_id: int) -> dict:
    """Detail-Daten einer Unit laden (mehr Felder als List-Endpoint)"""
    url = f"{PROPSTACK_API_URL}/units/{unit_id}?new=1"
    r = requests.get(url, headers=propstack_headers(), timeout=30)
    r.raise_for_status()
    return r.json()


def is_published(unit: dict) -> bool:
    """Prüfe ob die Immobilie veröffentlicht ist"""
    status = unit.get("property_status") or unit.get("status") or {}
    if isinstance(status, dict):
        name = (status.get("name") or "").lower()
    else:
        name = ""
    return any(s in name for s in PUBLISHED_STATUSES)


def get_status_name(unit: dict) -> str:
    """Status-Name extrahieren"""
    status = unit.get("property_status") or unit.get("status") or {}
    if isinstance(status, dict):
        return status.get("name") or ""
    return ""


# ===========================================================================
# PROPSTACK → AIRTABLE MAPPING
# ===========================================================================

def unwrap(val):
    """Propstack Detail-Endpoint wraps fields as {label, value}"""
    if isinstance(val, dict) and "value" in val:
        return val["value"]
    return val


def safe_str(val) -> str:
    v = unwrap(val)
    if v is None:
        return ""
    return str(v).strip()


def safe_float(val) -> Optional[float]:
    v = unwrap(val)
    if v is None:
        return None
    if isinstance(v, (int, float)):
        return float(v)
    try:
        return float(str(v).replace(",", ".").replace(" ", ""))
    except (ValueError, TypeError):
        return None


def safe_int(val) -> Optional[int]:
    f = safe_float(val)
    return int(f) if f is not None else None


def format_price(price: Optional[float]) -> str:
    """Preis als deutscher String: 350.000 €"""
    if price is None or price == 0:
        return "Preis auf Anfrage"
    return f"{price:,.0f} €".replace(",", ".")


def extract_images(unit: dict) -> List[str]:
    """Alle Bild-URLs extrahieren"""
    images = unit.get("images") or []
    urls = []
    for img in images:
        if img.get("is_floorplan") or img.get("is_private"):
            continue
        url = (
            img.get("big_url") or img.get("big")
            or img.get("url") or img.get("original")
            or img.get("medium_url") or img.get("medium")
        )
        if url:
            urls.append(url)
    return urls


def map_objektart(unit: dict) -> str:
    """Objektart aus Propstack-Feldern ableiten"""
    rs_type = safe_str(unit.get("rs_type")).upper()
    apt_type = safe_str(unit.get("apartment_type"))

    if rs_type == "HOUSE":
        return "Haus"
    if rs_type == "APARTMENT":
        return apt_type or "Wohnung"
    if rs_type == "TRADE_SITE":
        return "Grundstück"
    if rs_type in ("OFFICE", "STORE", "GASTRONOMY", "INDUSTRY"):
        return "Gewerbe"

    title = safe_str(unit.get("title")).lower()
    if any(w in title for w in ("haus", "villa", "reihen", "doppel")):
        return "Haus"
    if any(w in title for w in ("wohnung", "apartment", "penthouse", "etage", "maisonette")):
        return "Wohnung"
    if "grundstück" in title:
        return "Grundstück"
    return apt_type or "Wohnung"


def map_kategorie(unit: dict) -> str:
    """Kaufen oder Mieten"""
    mt = safe_str(unit.get("marketing_type")).upper()
    return "Mieten" if mt == "RENT" else "Kaufen"


def build_address(unit: dict) -> str:
    """Vollständige Adresse zusammenbauen"""
    parts = []
    street = safe_str(unit.get("street"))
    hn = safe_str(unit.get("house_number"))
    if street:
        parts.append(f"{street} {hn}".strip())
    zip_code = safe_str(unit.get("zip_code"))
    city = safe_str(unit.get("city"))
    if zip_code or city:
        parts.append(f"{zip_code} {city}".strip())
    return ", ".join(parts)


def map_propstack_to_airtable(unit: dict) -> dict:
    """Propstack Unit → Airtable Record (gleiche Spalten wie Krings-Scraper)"""
    title = safe_str(unit.get("title")) or safe_str(unit.get("name")) or "Immobilie"
    price = safe_float(unit.get("price"))
    living_space = safe_float(unit.get("living_space")) or safe_float(unit.get("property_space_value"))
    rooms = safe_float(unit.get("number_of_rooms"))

    # Bilder – Fallback auf Website-Placeholder wenn kein Bild vorhanden
    images = extract_images(unit)
    fallback_image = f"{WEBSITE_BASE_URL}/images/properties/placeholder.svg"
    bild_url = images[0] if images else fallback_image

    # Status-Mapping
    status_name = get_status_name(unit)
    status_lower = status_name.lower()
    if "vorbereitung" in status_lower:
        status = "IN VORBEREITUNG"
    elif "reserviert" in status_lower:
        status = "RESERVIERT"
    elif "verkauft" in status_lower:
        status = "VERKAUFT"
    elif "vermarktung" in status_lower:
        status = "VERFÜGBAR"
    else:
        status = ""

    # Adresse (respektiere hide_address)
    hide_addr = unwrap(unit.get("hide_address")) is True
    if hide_addr:
        adresse = f"{safe_str(unit.get('zip_code'))} {safe_str(unit.get('city'))}".strip()
    else:
        adresse = build_address(unit)

    # Beschreibungstexte
    desc_parts = []
    for field in ["description_note", "location_note", "furnishing_note", "other_note"]:
        text = safe_str(unit.get(field))
        if text:
            desc_parts.append(text)
    beschreibung = "\n\n".join(desc_parts)

    # Energieausweis
    energy_parts = []
    energy_class = safe_str(unit.get("energy_efficiency_class"))
    energy_val = safe_float(unit.get("energy_efficiency_value")) or safe_float(unit.get("thermal_characteristic"))
    cert_type = safe_str(unit.get("building_energy_rating_type"))
    heating = safe_str(unit.get("heating_type"))
    if cert_type:
        energy_parts.append(cert_type)
    if energy_class:
        energy_parts.append(f"Klasse {energy_class}")
    if energy_val:
        energy_parts.append(f"{energy_val} kWh/(m²·a)")
    energieausweis = ", ".join(energy_parts)

    # Parking
    parking_type = safe_str(unit.get("parking_space_type"))
    parking_count = safe_int(unit.get("number_of_parking_spaces"))
    garage = ""
    if parking_type:
        garage = parking_type
        if parking_count and parking_count > 1:
            garage += f" ({parking_count}x)"
    elif parking_count:
        garage = f"{parking_count} Stellplatz/-plätze"

    # Keller
    has_cellar = unwrap(unit.get("cellar")) is True or unwrap(unit.get("storeroom")) is True
    keller = "Ja" if has_cellar else ""

    # Balkon
    has_balcony = unwrap(unit.get("balcony")) is True
    balcony_area = safe_float(unit.get("balcony_space"))
    balkon = ""
    if has_balcony:
        balkon = f"Ja ({balcony_area} m²)" if balcony_area else "Ja"

    # Provision
    courtage = safe_str(unit.get("courtage"))
    courtage_note = safe_str(unit.get("courtage_note"))
    provision = f"{courtage} {courtage_note}".strip() if courtage else ""

    record = {
        "Titel": title,
        "Webseite": f"{WEBSITE_BASE_URL}/angebote/{unit.get('id', '')}/",
        "Objektnummer": str(unit.get("id", "")),
        "Objektart": map_objektart(unit),
        "Kategorie": map_kategorie(unit),
        "Status": status,
        "Standort": safe_str(unit.get("city")),
        "Adresse": adresse,
        "Beschreibung": beschreibung,
        "Bild": bild_url,
        "Wohnfläche": f"{living_space:.0f} m²" if living_space else "",
        "Zimmer": f"{rooms:.0f}" if rooms else "",
        "Schlafzimmer": str(safe_int(unit.get("number_of_bed_rooms")) or ""),
        "Badezimmer": str(safe_int(unit.get("number_of_bath_rooms")) or ""),
        "Grundstücksfläche": f"{safe_float(unit.get('plot_area')):.0f} m²" if safe_float(unit.get("plot_area")) else "",
        "Nutzfläche": "",
        "Baujahr": str(safe_int(unit.get("construction_year")) or ""),
        "Zustand": safe_str(unit.get("condition")),
        "Bezugsfrei": safe_str(unit.get("free_from")),
        "Garage": garage,
        "Keller": keller,
        "Etage": str(safe_int(unit.get("floor")) or ""),
        "Heizungsart": heating,
        "Provision": provision,
        "Energieausweis": energieausweis,
        "Balkon": balkon,
        "Preis_Text": format_price(price),
    }

    # Preis als Zahl (für Airtable Number-Feld)
    if price is not None and price > 0:
        record["Preis"] = price

    # Leere Felder entfernen
    return {k: v for k, v in record.items() if v not in (None, "", [], 0)}


# ===========================================================================
# KURZBESCHREIBUNG (OpenAI)
# ===========================================================================

_kurz_cache: Dict[str, str] = {}


def load_kurzbeschreibung_cache():
    """Lade vorhandene Kurzbeschreibungen aus Airtable"""
    if not (AIRTABLE_TOKEN and AIRTABLE_BASE and AIRTABLE_TABLE_ID):
        return
    try:
        _, all_fields = airtable_list_all()
        for f in all_fields:
            obj_nr = (f.get("Objektnummer") or "").strip()
            kurz = (f.get("Kurzbeschreibung") or "").strip()
            if obj_nr and kurz:
                _kurz_cache[obj_nr] = kurz
        print(f"[CACHE] {len(_kurz_cache)} Kurzbeschreibungen geladen")
    except Exception as e:
        print(f"[WARN] Cache-Laden fehlgeschlagen: {e}")


_KURZ_SYSTEM_PROMPT = """\
# Rolle
Du bist ein präziser Immobilien-Datenanalyst und Parser. Deine Aufgabe ist es, \
aus unstrukturierten Immobilienanzeigen ausschließlich objektive, explizit \
genannte Fakten zu extrahieren und streng strukturiert auszugeben. Du arbeitest \
regelbasiert, deterministisch und formatgenau. Kreative Ergänzungen sind untersagt.

# Aufgabe
1. Analysiere die bereitgestellte Immobilienanzeige vollständig.
2. Extrahiere nur eindeutig genannte, objektive Fakten.
3. Gib die strukturierte Kurzbeschreibung exakt im vorgegebenen Zeilenformat aus.
4. Lasse jedes Feld vollständig weg, zu dem keine eindeutige Angabe vorliegt.

# Erlaubte Felder (Whitelist – verbindlich)
Es dürfen ausschließlich die folgenden Felder verwendet werden. \
Jedes andere Feld ist strikt verboten.
Objekttyp Baujahr Wohnfläche Grundstück Zimmer Preis Standort \
Energieeffizienz Besonderheiten

# Ausgabeformat (verbindlich)
Die Ausgabe muss exakt diesem Muster folgen. Jede Eigenschaft steht in einer \
eigenen Zeile. Keine Leerzeilen, keine zusätzlichen Texte, keine \
Markdown-Formatierung.
Objekttyp: [Einfamilienhaus | Mehrfamilienhaus | Eigentumswohnung | \
Baugrundstück | Reihenhaus | Doppelhaushälfte | Sonstiges]
Baujahr: [Jahr]
Wohnfläche: [Zahl in m²]
Grundstück: [Zahl in m²]
Zimmer: [Anzahl]
Preis: [Zahl in €]
Standort: [Ort oder PLZ Ort]
Energieeffizienz: [Klasse]
Besonderheiten: [kommaseparierte Liste]

# Strikte Regeln (bindend)
• Es ist strengstens untersagt, eigene Felder zu erfinden.
• Felder wie „Schlafzimmer", „Kategorie", „Etage", „Ausstattung", \
„Kauf/Miete" oder ähnliche sind ausnahmslos verboten.
• Es dürfen keine Platzhalter verwendet werden (z. B. „-", „—", „k. A.", \
„unbekannt").
• Wenn ein Feld nicht eindeutig ermittelbar ist, darf die gesamte Zeile \
nicht ausgegeben werden.
• Die Reihenfolge der Zeilen muss exakt der Vorgabe entsprechen.
• Es darf niemals mehr als ein Feld pro Zeile stehen.
• Verwende ausschließlich arabische Ziffern.
• Einheiten exakt wie folgt anhängen:
  – Wohnfläche und Grundstück: m²
  – Preis: €
• Keine Interpretationen, keine Schätzungen, keine Ableitungen.
• Im Zweifel gilt: lieber weniger Felder ausgeben, niemals mehr.

# Ziel
Die Ausgabe wird automatisiert weiterverarbeitet (z. B. Airtable, Voiceflow, \
Such- und Filterlogiken). Jede Abweichung vom Format gilt als Fehler."""


def generate_kurzbeschreibung(record: dict) -> str:
    """Erzeuge Kurzbeschreibung via OpenAI mit regelbasiertem System-Prompt"""
    obj_nr = record.get("Objektnummer", "")
    if obj_nr and obj_nr in _kurz_cache:
        return _kurz_cache[obj_nr]

    if not OPENAI_API_KEY:
        return ""

    try:
        import openai
        client = openai.OpenAI(api_key=OPENAI_API_KEY)

        titel = record.get("Titel", "")
        kategorie = record.get("Kategorie", "")
        preis = record.get("Preis_Text", "")
        ort = record.get("Standort", "")
        beschreibung = record.get("Beschreibung", "")

        user_prompt = (
            f"TITEL: {titel}\n"
            f"KATEGORIE: {kategorie}\n"
            f"PREIS: {preis}\n"
            f"STANDORT: {ort}\n"
            f"BESCHREIBUNG: {beschreibung[:3000]}"
        )

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": _KURZ_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            max_tokens=300,
            temperature=0.0,
        )
        result = response.choices[0].message.content.strip()
        # Zeilenumbrüche durch " | " ersetzen (Voiceflow kann keine \n darstellen)
        result = " | ".join(line.strip() for line in result.splitlines() if line.strip())
        if obj_nr:
            _kurz_cache[obj_nr] = result
        return result
    except Exception as e:
        print(f"[WARN] OpenAI Fehler: {e}")
        return ""


# ===========================================================================
# AIRTABLE API
# ===========================================================================

def _at_url() -> str:
    return f"https://api.airtable.com/v0/{AIRTABLE_BASE}/{AIRTABLE_TABLE_ID}"


def _at_headers() -> dict:
    return {
        "Authorization": f"Bearer {AIRTABLE_TOKEN}",
        "Content-Type": "application/json",
    }


def airtable_list_all() -> Tuple[List[str], List[dict]]:
    """Alle Records aus Airtable laden"""
    all_records = []
    offset = None
    while True:
        params = {"pageSize": 100}
        if offset:
            params["offset"] = offset
        r = requests.get(_at_url(), headers=_at_headers(), params=params, timeout=30)
        r.raise_for_status()
        data = r.json()
        all_records.extend(data.get("records", []))
        offset = data.get("offset")
        if not offset:
            break
        time.sleep(0.2)
    ids = [rec["id"] for rec in all_records]
    fields = [rec.get("fields", {}) for rec in all_records]
    return ids, fields


def airtable_existing_fields() -> set:
    """Ermittle vorhandene Feldnamen über die Airtable Metadata API.

    Fällt auf Record-basierte Erkennung zurück, wenn Metadata API
    fehlschlägt (z.B. bei eingeschränkten Token-Berechtigungen).
    """
    # Methode 1: Metadata API (funktioniert auch bei leerer Tabelle)
    try:
        meta_url = f"https://api.airtable.com/v0/meta/bases/{AIRTABLE_BASE}/tables"
        r = requests.get(meta_url, headers=_at_headers(), timeout=30)
        if r.ok:
            for table in r.json().get("tables", []):
                if table.get("id") == AIRTABLE_TABLE_ID or table.get("name") == AIRTABLE_TABLE_ID:
                    fields = {f["name"] for f in table.get("fields", [])}
                    if fields:
                        return fields
    except Exception as e:
        print(f"[WARN] Metadata API fehlgeschlagen: {e}")

    # Methode 2: Fallback – Feldnamen aus vorhandenen Records ableiten
    _, all_fields = airtable_list_all()
    if not all_fields:
        return set()
    all_keys = set()
    for f in all_fields:
        all_keys.update(f.keys())
    return all_keys


def airtable_batch_create(records: List[dict]):
    for i in range(0, len(records), 10):
        batch = records[i:i + 10]
        payload = {
            "records": [{"fields": r} for r in batch],
            "typecast": True,
        }
        r = requests.post(_at_url(), headers=_at_headers(), json=payload, timeout=30)
        if not r.ok:
            print(f"[ERROR] Airtable CREATE {r.status_code}: {r.text}")
        r.raise_for_status()
        print(f"  → {min(i + 10, len(records))}/{len(records)} erstellt")
        time.sleep(0.2)


def airtable_batch_update(updates: List[dict]):
    for i in range(0, len(updates), 10):
        batch = updates[i:i + 10]
        payload = {"records": batch, "typecast": True}
        r = requests.patch(_at_url(), headers=_at_headers(), json=payload, timeout=30)
        if not r.ok:
            print(f"[ERROR] Airtable UPDATE {r.status_code}: {r.text}")
        r.raise_for_status()
        print(f"  → {min(i + 10, len(updates))}/{len(updates)} aktualisiert")
        time.sleep(0.2)


def airtable_batch_delete(record_ids: List[str]):
    for i in range(0, len(record_ids), 10):
        batch = record_ids[i:i + 10]
        r = requests.delete(_at_url(), headers=_at_headers(), params={"records[]": batch}, timeout=30)
        r.raise_for_status()
        time.sleep(0.2)


def sanitize_for_airtable(record: dict, allowed_fields: set) -> dict:
    """Nur Felder senden die in der Tabelle existieren"""
    ALWAYS_ALLOWED = {"Kurzbeschreibung"}
    if not allowed_fields:
        return record
    return {k: v for k, v in record.items() if k in allowed_fields or k in ALWAYS_ALLOWED}


def unique_key(fields: dict) -> str:
    """Eindeutiger Schlüssel für Dedup (Objektnummer = Propstack ID)"""
    obj = (fields.get("Objektnummer") or "").strip()
    if obj:
        return f"obj:{obj}"
    return f"hash:{hashlib.md5(json.dumps(fields, sort_keys=True).encode()).hexdigest()}"


# ===========================================================================
# MAIN
# ===========================================================================

def run():
    print("=" * 60)
    print("Propstack → Airtable Sync")
    print("=" * 60)

    if not PROPSTACK_API_KEY:
        print("[ERROR] PROPSTACK_API_KEY nicht gesetzt!")
        sys.exit(1)

    # 1. Propstack Units laden
    print("\n[PROPSTACK] Lade Immobilien...")
    units = fetch_propstack_units()
    print(f"[PROPSTACK] {len(units)} Units geladen")

    # 2. Nur veröffentlichte filtern
    published = [u for u in units if is_published(u)]
    print(f"[FILTER] {len(published)} veröffentlichte Immobilien")

    if not published:
        print("[WARN] Keine veröffentlichten Immobilien gefunden!")
        return

    # 3. Details laden (für mehr Felder)
    print("\n[DETAILS] Lade Detail-Daten...")
    detailed_units = []
    for i, unit in enumerate(published, 1):
        uid = unit["id"]
        try:
            print(f"  [{i}/{len(published)}] ID {uid}: {(unit.get('title') or unit.get('name') or '?')[:50]}")
            detail = fetch_propstack_detail(uid)
            detailed_units.append(detail)
            time.sleep(0.3)  # Rate limiting
        except Exception as e:
            print(f"  [ERROR] ID {uid}: {e}")
            detailed_units.append(unit)  # Fallback auf List-Daten

    # 4. Mapping zu Airtable-Records
    print("\n[MAPPING] Erstelle Airtable-Records...")
    at_records = []
    for unit in detailed_units:
        record = map_propstack_to_airtable(unit)
        title = record.get("Titel", "?")
        stadt = record.get("Standort", "?")
        preis = record.get("Preis_Text", "?")
        print(f"  → {title[:45]:45s} | {stadt:15s} | {preis}")
        at_records.append(record)

    # 5. Kurzbeschreibungen generieren
    if OPENAI_API_KEY:
        print("\n[OPENAI] Generiere Kurzbeschreibungen...")
        if AIRTABLE_TOKEN and AIRTABLE_BASE and AIRTABLE_TABLE_ID:
            load_kurzbeschreibung_cache()
        for record in at_records:
            kurz = generate_kurzbeschreibung(record)
            if kurz:
                record["Kurzbeschreibung"] = kurz
                print(f"  → {record.get('Titel', '?')[:40]}: {kurz[:60]}...")
    else:
        print("\n[OPENAI] Kein API Key – Kurzbeschreibungen übersprungen")

    # 6. Airtable-Sync
    if not (AIRTABLE_TOKEN and AIRTABLE_BASE and AIRTABLE_TABLE_ID):
        print("\n[AIRTABLE] ENV nicht gesetzt – nur Ausgabe:")
        for r in at_records:
            print(f"  {r.get('Objektnummer', '?'):>10} | {r.get('Titel', '?')}")
        print(f"\n[INFO] {len(at_records)} Records bereit für Airtable")
        return

    print(f"\n[AIRTABLE] Starte Synchronisation...")
    allowed = airtable_existing_fields()
    print(f"[AIRTABLE] Vorhandene Felder: {sorted(allowed)}")

    all_ids, all_fields = airtable_list_all()
    print(f"[AIRTABLE] {len(all_ids)} bestehende Records")

    # Bestehende Records indexieren
    existing: Dict[str, Tuple[str, dict]] = {}
    for rec_id, f in zip(all_ids, all_fields):
        k = unique_key(f)
        existing[k] = (rec_id, f)

    # Gewünschte Records indexieren
    desired: Dict[str, dict] = {}
    for r in at_records:
        # Preis_Text nicht an Airtable senden (nur intern genutzt)
        r_clean = {k: v for k, v in r.items() if k != "Preis_Text"}
        k = unique_key(r_clean)
        sanitized = sanitize_for_airtable(r_clean, allowed)
        desired[k] = sanitized

    # Diff berechnen
    to_create, to_update, keep = [], [], set()
    for k, fields in desired.items():
        if k in existing:
            rec_id, old = existing[k]
            diff = {fld: val for fld, val in fields.items() if old.get(fld) != val}
            if diff:
                to_update.append({"id": rec_id, "fields": diff})
            keep.add(k)
        else:
            to_create.append(fields)

    to_delete_ids = [rec_id for k, (rec_id, _) in existing.items() if k not in keep]

    print(f"\n[SYNC] Erstellen: {len(to_create)}, Aktualisieren: {len(to_update)}, Löschen: {len(to_delete_ids)}")

    if to_create:
        print(f"\n[CREATE] {len(to_create)} neue Records...")
        airtable_batch_create(to_create)
    if to_update:
        print(f"\n[UPDATE] {len(to_update)} Records...")
        airtable_batch_update(to_update)
    if to_delete_ids:
        print(f"\n[DELETE] {len(to_delete_ids)} veraltete Records...")
        airtable_batch_delete(to_delete_ids)

    print("\n" + "=" * 60)
    print(f"Sync abgeschlossen! {len(at_records)} Immobilien in Airtable.")
    print("=" * 60)


if __name__ == "__main__":
    run()
