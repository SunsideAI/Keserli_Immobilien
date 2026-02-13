import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der homefin GmbH – Angaben gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="max-w-3xl mx-auto prose-homefin">
          <h1>Impressum</h1>

          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            {siteConfig.name}
            <br />
            {siteConfig.contact.address.street}
            <br />
            {siteConfig.contact.address.zip} {siteConfig.contact.address.city}
          </p>

          <h2>Vertreten durch</h2>
          <p>
            {siteConfig.owner.name}
            <br />
            {siteConfig.owner.title}
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: {siteConfig.contact.phone}
            <br />
            E-Mail: {siteConfig.contact.email}
          </p>

          <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
          <p>
            Berufsbezeichnung: Immobilienmakler (IHK)
            <br />
            Zuständige Kammer: Industrie- und Handelskammer zu Düsseldorf
            <br />
            Verliehen in: Deutschland
          </p>

          <h2>Erlaubnis nach § 34c GewO</h2>
          <p>
            Die Erlaubnis nach § 34c der Gewerbeordnung wurde erteilt durch die
            zuständige Behörde.
          </p>

          <h2>EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit. Unsere E-Mail-Adresse finden
            Sie oben im Impressum.
          </p>

          <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>

          <h2>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
            Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
            verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
            Diensteanbieter jedoch nicht unter der allgemeinen Überwachungs-
            oder Nachforschungspflicht nach Umständen, die auf eine
            rechtswidrige Tätigkeit hinweisen.
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf
            deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
            diese fremden Inhalte auch keine Gewähr übernehmen.
          </p>
        </div>
      </Container>
    </section>
  );
}
