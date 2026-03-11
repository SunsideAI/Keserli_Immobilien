import type { Handler } from "@netlify/functions";

const PROPSTACK_API_KEY = process.env.PROPSTACK_API_KEY || "";
const PROPSTACK_API_URL = "https://api.propstack.de/v1";

interface FormPayload {
  vorname: string;
  nachname: string;
  email: string;
  telefon?: string;
  nachricht?: string;
  adresse?: string;
  formType: "kontakt" | "bewertung";
}

const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  let data: FormPayload;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }

  // Validation
  if (!data.vorname || !data.nachname || !data.email) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Vorname, Nachname und E-Mail sind Pflichtfelder." }),
    };
  }

  if (!PROPSTACK_API_KEY) {
    console.error("PROPSTACK_API_KEY not configured");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server configuration error" }),
    };
  }

  // Build description from form data
  const descParts: string[] = [];
  if (data.formType === "bewertung") {
    descParts.push("Anfrage: Kostenlose Immobilienbewertung");
    if (data.adresse) descParts.push(`Immobilienadresse: ${data.adresse}`);
  } else {
    descParts.push("Anfrage: Kontaktformular Website");
  }
  if (data.nachricht) descParts.push(`Nachricht: ${data.nachricht}`);

  // Create contact in Propstack
  try {
    const response = await fetch(`${PROPSTACK_API_URL}/contacts`, {
      method: "POST",
      headers: {
        "X-API-KEY": PROPSTACK_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client: {
          first_name: data.vorname,
          last_name: data.nachname,
          email: data.email,
          home_phone: data.telefon || undefined,
          description: descParts.join("\n"),
        },
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`Propstack API error ${response.status}: ${errBody}`);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: "Kontakt konnte nicht angelegt werden." }),
      };
    }

    const contact = await response.json();
    console.log(`Contact created/updated in Propstack: ID ${contact.id}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, contactId: contact.id }),
    };
  } catch (err) {
    console.error("Propstack request failed:", err);
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: "Verbindung zu Propstack fehlgeschlagen." }),
    };
  }
};

export { handler };
