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

          <p>
            <strong>Handelsregister:</strong> HRB [NUMMER]
            <br />
            <strong>Registergericht:</strong> Amtsgericht Düsseldorf
            <br />
            <strong>USt-IdNr.:</strong> DE [NUMMER]
          </p>

          <h2>Vertreten durch</h2>
          <p>
            Geschäftsführer: {siteConfig.owner.name}
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: {siteConfig.contact.phone}
            <br />
            E-Mail: {siteConfig.contact.email}
            <br />
            Website: {siteConfig.url}
          </p>

          <h2>Aufsichtsbehörde</h2>
          <p>
            Stadt Monheim am Rhein – Ordnungsamt
            <br />
            Rathausplatz 2, 40789 Monheim am Rhein
          </p>

          <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
          <p>
            <strong>Berufsbezeichnung:</strong> Immobilienmakler (IHK)
            <br />
            <strong>Zuständige Kammer:</strong> Industrie- und Handelskammer zu Düsseldorf
            <br />
            <strong>Verliehen in:</strong> Bundesrepublik Deutschland
          </p>

          <h2>Erlaubnis nach § 34c GewO</h2>
          <p>
            Die Erlaubnis nach § 34c der Gewerbeordnung wurde erteilt durch
            die Stadt Monheim am Rhein.
          </p>

          <h2>Berufshaftpflichtversicherung</h2>
          <p>
            <strong>Versicherer:</strong> [Name der Versicherung]
            <br />
            <strong>Geltungsbereich:</strong> Deutschland
          </p>

          <h2>EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            <br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>

          <h2>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
            Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
            verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
            gespeicherte fremde Informationen zu überwachen oder nach
            Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
            hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
            Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
            hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab
            dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
            möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
            werden wir diese Inhalte umgehend entfernen.
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf
            deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
            diese fremden Inhalte auch keine Gewähr übernehmen. Für die
            Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
            oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
            wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
            überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
            Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle
            der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
            Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
            Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht
            kommerziellen Gebrauch gestattet.
          </p>
        </div>
      </Container>
    </section>
  );
}
