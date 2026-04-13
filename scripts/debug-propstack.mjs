#!/usr/bin/env node
/**
 * Propstack API Debug Script
 *
 * Usage:
 *   PROPSTACK_API_KEY=your_key node scripts/debug-propstack.mjs
 *   PROPSTACK_API_KEY=your_key PROPSTACK_API_URL=https://api.propstack.de/v1 node scripts/debug-propstack.mjs
 */

const API_KEY = process.env.PROPSTACK_API_KEY || "";
const API_URL = process.env.PROPSTACK_API_URL || "https://api.propstack.de/v1";

if (!API_KEY) {
  console.error("❌ PROPSTACK_API_KEY nicht gesetzt!");
  console.error("   Usage: PROPSTACK_API_KEY=your_key node scripts/debug-propstack.mjs");
  process.exit(1);
}

console.log(`\n🔑 API URL: ${API_URL}`);
console.log(`🔑 API Key: ${API_KEY.slice(0, 6)}...${API_KEY.slice(-4)}\n`);

// Published status allowlist (must match src/lib/propstack.ts)
const PUBLISHED_KEYWORDS = ["vorbereitung", "vermarktung", "reserviert", "verkauft"];

function getStatusName(status) {
  if (!status) return null;
  if (typeof status === "object" && status !== null) return status.name || null;
  return null;
}

function isPublished(status) {
  const name = getStatusName(status);
  if (!name) return false;
  const s = name.toLowerCase();
  return PUBLISHED_KEYWORDS.some((kw) => s.includes(kw));
}

async function main() {
  try {
    // Fetch all units
    const url = `${API_URL}/units?per_page=100`;
    console.log(`📡 Fetching: ${url}\n`);

    const res = await fetch(url, {
      headers: {
        "X-API-KEY": API_KEY,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error(`❌ API Fehler: ${res.status} ${res.statusText}`);
      const body = await res.text();
      console.error(body.slice(0, 500));
      process.exit(1);
    }

    const units = await res.json();
    console.log(`📊 Gesamt Units von API: ${units.length}\n`);

    // Analyze each unit
    console.log("━".repeat(120));
    console.log(
      "ID".padEnd(8) +
        "Status".padEnd(25) +
        "Published?".padEnd(12) +
        "Marketing".padEnd(10) +
        "Preis".padEnd(12) +
        "Titel"
    );
    console.log("━".repeat(120));

    let publishedCount = 0;
    let hiddenCount = 0;
    const statusCounts = {};

    for (const unit of units) {
      const status = unit.property_status || unit.status;
      const statusName = getStatusName(status) || "(kein Status)";
      const published = isPublished(status);
      const price = unit.price || 0;
      const title = unit.title || unit.name || "(kein Titel)";
      const marketing = unit.marketing_type || "?";

      // Count statuses
      statusCounts[statusName] = (statusCounts[statusName] || 0) + 1;

      if (published) publishedCount++;
      else hiddenCount++;

      const pubIcon = published ? "✅" : "❌";

      console.log(
        String(unit.id).padEnd(8) +
          statusName.padEnd(25) +
          `${pubIcon}`.padEnd(12) +
          String(marketing).padEnd(10) +
          String(price ? `${price}€` : "k.A.").padEnd(12) +
          title.slice(0, 50)
      );
    }

    console.log("━".repeat(120));
    console.log(`\n📈 Zusammenfassung:`);
    console.log(`   Gesamt: ${units.length}`);
    console.log(`   ✅ Auf Website sichtbar: ${publishedCount}`);
    console.log(`   ❌ Versteckt (interner Status): ${hiddenCount}`);

    console.log(`\n📋 Status-Verteilung:`);
    for (const [status, count] of Object.entries(statusCounts).sort(
      (a, b) => b[1] - a[1]
    )) {
      const pub = PUBLISHED_KEYWORDS.some((kw) =>
        status.toLowerCase().includes(kw)
      );
      console.log(`   ${pub ? "✅" : "❌"} ${status}: ${count}`);
    }

    console.log("");
  } catch (err) {
    console.error("❌ Fehler:", err.message);
    process.exit(1);
  }
}

main();
