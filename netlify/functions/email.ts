/**
 * Email Notification Service – homefin GmbH
 *
 * Uses Resend REST API to send branded lead notification emails.
 * Recipients: keserli@myhomefin.de + contact@sunsideai.de
 */

const RESEND_API_URL = 'https://api.resend.com/emails'

interface ResendEmailPayload {
  from: string
  to: string[]
  subject: string
  html: string
  reply_to?: string
}

async function sendViaResendApi(payload: ResendEmailPayload, retries = 2): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured – skipping email')
    return { success: true }
  }

  let lastError = 'Unknown error'

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok || data.error) {
        const errorMessage = data.error?.message || `HTTP ${response.status}`
        console.error('Resend API error:', errorMessage)
        return { success: false, error: errorMessage }
      }

      console.log('Email sent successfully via Resend, id:', data.id)
      return { success: true }
    } catch (error) {
      const isTimeout = error instanceof Error && error.name === 'AbortError'
      const isNetwork = error instanceof Error && (
        error.message.includes('ETIMEDOUT') ||
        error.message.includes('fetch failed') ||
        error.message.includes('network')
      )

      lastError = isTimeout ? 'Request timeout' : (error instanceof Error ? error.message : 'Network error')
      console.error(`Resend attempt ${attempt + 1}/${retries + 1} failed:`, lastError)

      if ((isTimeout || isNetwork) && attempt < retries) {
        const delay = Math.pow(2, attempt) * 1000
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }
      break
    }
  }

  return { success: false, error: lastError }
}

// ─── Configuration ──────────────────────────────────────────────────────────

const NOTIFICATION_RECIPIENTS = [
  'keserli@myhomefin.de',
  'contact@sunsideai.de',
]

const SENDER_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@sunsideai.de'
const SENDER_NAME = 'homefin GmbH Website'

// ─── Brand ──────────────────────────────────────────────────────────────────

const PRIMARY = '#2D7A7A'
const PRIMARY_DARK = '#1a5c5c'
const SLATE_DARK = '#1e293b'
const MINT = '#e6f7f5'
const GOLD = '#d4a853'
const LOGO_URL = 'https://myhomefin.de/Homefin_Logo.png'

// ─── Email Template ─────────────────────────────────────────────────────────

function getEmailWrapper(title: string, subtitle: string, content: string, timestamp: string): string {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header with Logo -->
          <tr>
            <td style="background-color: #ffffff; padding: 28px 32px; border-bottom: 1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <img src="${LOGO_URL}" alt="homefin" width="160" style="display: block; margin-bottom: 16px;" />
                    <h1 style="color: ${SLATE_DARK}; margin: 0; font-size: 22px; font-weight: 700;">${title}</h1>
                    <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 14px;">${subtitle}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: ${SLATE_DARK}; padding: 24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="middle">
                    <p style="color: #ffffff; margin: 0 0 2px 0; font-size: 14px; font-weight: 600;">Orhan Keserli</p>
                    <p style="color: #94a3b8; margin: 0; font-size: 12px;">homefin GmbH &middot; Immobilienmakler (IHK)</p>
                    <p style="color: #94a3b8; margin: 2px 0 0 0; font-size: 12px;">Niederstraße 18, 40789 Monheim am Rhein</p>
                  </td>
                  <td align="right" valign="top">
                    <p style="color: #64748b; margin: 0; font-size: 11px;">${timestamp}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Sub-footer -->
        <p style="color: #94a3b8; font-size: 11px; margin: 16px 0 0 0; text-align: center;">
          Diese E-Mail wurde automatisch von der homefin Website generiert.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

// ─── Contact Email ──────────────────────────────────────────────────────────

export interface ContactLeadData {
  vorname: string
  nachname: string
  email: string
  telefon?: string
  nachricht?: string
  adresse?: string
  propertyId?: string
  propertyTitle?: string
  formType: string
}

function getContactEmailHtml(data: ContactLeadData): string {
  const timestamp = new Date().toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' })
  const fullName = `${data.vorname} ${data.nachname}`

  const formTypeLabels: Record<string, string> = {
    kontakt: 'Kontaktformular',
    bewertung: 'Immobilienbewertung',
    download: 'Ratgeber-Download',
  }
  const formLabel = formTypeLabels[data.formType] || 'Kontaktanfrage'

  const content = `
    <!-- Contact Info -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td style="padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Name</p>
          <p style="color: ${SLATE_DARK}; margin: 0; font-size: 20px; font-weight: 700;">${fullName}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 16px 0; border-bottom: 1px solid #e2e8f0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%">
                <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">E-Mail</p>
                <a href="mailto:${data.email}" style="color: ${PRIMARY}; font-size: 15px; text-decoration: none; font-weight: 500;">${data.email}</a>
              </td>
              ${data.telefon ? `
              <td width="50%">
                <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Telefon</p>
                <a href="tel:${data.telefon}" style="color: ${PRIMARY}; font-size: 15px; text-decoration: none; font-weight: 500;">${data.telefon}</a>
              </td>
              ` : ''}
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${data.propertyTitle ? `
    <!-- Property Interest -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: ${MINT}; margin-bottom: 24px; border-radius: 8px;">
      <tr>
        <td style="padding: 16px; border-left: 4px solid ${PRIMARY}; border-radius: 8px;">
          <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Interessiert an Immobilie</p>
          <p style="color: ${SLATE_DARK}; margin: 0; font-size: 16px; font-weight: 600;">${data.propertyTitle}</p>
          ${data.propertyId ? `<p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Objekt-ID: ${data.propertyId} &middot; <a href="https://myhomefin.de/angebote/${data.propertyId}/" style="color: ${PRIMARY}; text-decoration: none;">Zum Angebot &rarr;</a></p>` : ''}
        </td>
      </tr>
    </table>
    ` : ''}

    ${data.adresse ? `
    <!-- Property Address -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: ${MINT}; margin-bottom: 24px; border-radius: 8px;">
      <tr>
        <td style="padding: 16px; border-left: 4px solid ${PRIMARY}; border-radius: 8px;">
          <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Immobilienadresse</p>
          <p style="color: ${SLATE_DARK}; margin: 0; font-size: 16px; font-weight: 600;">${data.adresse}</p>
        </td>
      </tr>
    </table>
    ` : ''}

    ${data.nachricht ? `
    <!-- Message -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td>
          <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Nachricht</p>
          <p style="color: ${SLATE_DARK}; margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.nachricht}</p>
        </td>
      </tr>
    </table>
    ` : ''}

    <!-- Action Buttons -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a href="mailto:${data.email}" style="display: inline-block; background-color: ${PRIMARY}; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px;">Antworten</a>
          ${data.telefon ? `<a href="tel:${data.telefon}" style="display: inline-block; background-color: ${SLATE_DARK}; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px; margin-left: 8px;">Anrufen</a>` : ''}
        </td>
      </tr>
    </table>

    <p style="color: #cbd5e1; margin: 24px 0 0 0; font-size: 12px;">Quelle: ${formLabel}</p>
  `

  return getEmailWrapper(
    data.formType === 'bewertung' ? 'Neue Bewertungsanfrage' : 'Neue Kontaktanfrage',
    formLabel,
    content,
    timestamp
  )
}

// ─── Download Email ─────────────────────────────────────────────────────────

export interface DownloadLeadData {
  vorname: string
  nachname: string
  email: string
  telefon?: string
  ratgeber: string
}

function getDownloadEmailHtml(data: DownloadLeadData): string {
  const timestamp = new Date().toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' })
  const fullName = `${data.vorname} ${data.nachname}`

  const content = `
    <!-- Contact Info -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td style="padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Name</p>
          <p style="color: ${SLATE_DARK}; margin: 0; font-size: 20px; font-weight: 700;">${fullName}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 16px 0; border-bottom: 1px solid #e2e8f0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%">
                <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">E-Mail</p>
                <a href="mailto:${data.email}" style="color: ${PRIMARY}; font-size: 15px; text-decoration: none; font-weight: 500;">${data.email}</a>
              </td>
              ${data.telefon ? `
              <td width="50%">
                <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Telefon</p>
                <a href="tel:${data.telefon}" style="color: ${PRIMARY}; font-size: 15px; text-decoration: none; font-weight: 500;">${data.telefon}</a>
              </td>
              ` : ''}
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Download Info -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: ${MINT}; margin-bottom: 24px; border-radius: 8px;">
      <tr>
        <td style="padding: 16px; border-left: 4px solid ${GOLD}; border-radius: 8px;">
          <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Heruntergeladener Ratgeber</p>
          <p style="color: ${SLATE_DARK}; margin: 0; font-size: 16px; font-weight: 600;">${data.ratgeber}</p>
        </td>
      </tr>
    </table>

    <!-- Action Buttons -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a href="mailto:${data.email}" style="display: inline-block; background-color: ${PRIMARY}; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px;">Antworten</a>
          ${data.telefon ? `<a href="tel:${data.telefon}" style="display: inline-block; background-color: ${SLATE_DARK}; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px; margin-left: 8px;">Anrufen</a>` : ''}
        </td>
      </tr>
    </table>

    <p style="color: #cbd5e1; margin: 24px 0 0 0; font-size: 12px;">Quelle: Ratgeber-Download</p>
  `

  return getEmailWrapper('Neuer Ratgeber-Download', data.ratgeber, content, timestamp)
}

// ─── Public Send Functions ──────────────────────────────────────────────────

export async function sendContactNotification(data: ContactLeadData): Promise<{ success: boolean; error?: string }> {
  const fullName = `${data.vorname} ${data.nachname}`
  const formTypeLabels: Record<string, string> = {
    kontakt: 'Kontaktanfrage',
    bewertung: 'Bewertungsanfrage',
  }
  const label = formTypeLabels[data.formType] || 'Kontaktanfrage'
  const subject = data.propertyTitle
    ? `${label}: ${fullName} – ${data.propertyTitle}`
    : `Neue ${label} von ${fullName}`

  return sendViaResendApi({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: NOTIFICATION_RECIPIENTS,
    subject,
    html: getContactEmailHtml(data),
    reply_to: data.email,
  })
}

export async function sendDownloadNotification(data: DownloadLeadData): Promise<{ success: boolean; error?: string }> {
  const fullName = `${data.vorname} ${data.nachname}`

  return sendViaResendApi({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: NOTIFICATION_RECIPIENTS,
    subject: `Ratgeber-Download: ${fullName} – ${data.ratgeber}`,
    html: getDownloadEmailHtml(data),
    reply_to: data.email,
  })
}
