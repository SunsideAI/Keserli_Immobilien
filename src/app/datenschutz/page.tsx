import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der homefin GmbH.",
};

export default function DatenschutzPage() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="max-w-3xl mx-auto prose-homefin">
          <h1>Datenschutzerklärung</h1>

          <h2>1. Datenschutz auf einen Blick</h2>
          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber,
            was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
            Website besuchen. Personenbezogene Daten sind alle Daten, mit
            denen Sie persönlich identifiziert werden können.
          </p>

          <h3>Datenerfassung auf dieser Website</h3>
          <p>
            <strong>
              Wer ist verantwortlich für die Datenerfassung auf dieser
              Website?
            </strong>
          </p>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den
            Websitebetreiber: {siteConfig.name},{" "}
            {siteConfig.contact.address.street},{" "}
            {siteConfig.contact.address.zip}{" "}
            {siteConfig.contact.address.city}. Telefon:{" "}
            {siteConfig.contact.phone}, E-Mail: {siteConfig.contact.email}.
          </p>

          <h2>2. Hosting</h2>
          <p>
            Diese Website wird bei einem externen Dienstleister gehostet
            (Hoster). Die personenbezogenen Daten, die auf dieser Website
            erfasst werden, werden auf den Servern des Hosters gespeichert.
          </p>

          <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3>Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
            Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
            vertraulich und entsprechend der gesetzlichen
            Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>

          <h3>Hinweis zur verantwortlichen Stelle</h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser
            Website ist:
          </p>
          <p>
            {siteConfig.name}
            <br />
            {siteConfig.owner.name}
            <br />
            {siteConfig.contact.address.street}
            <br />
            {siteConfig.contact.address.zip}{" "}
            {siteConfig.contact.address.city}
          </p>
          <p>
            Telefon: {siteConfig.contact.phone}
            <br />
            E-Mail: {siteConfig.contact.email}
          </p>

          <h2>4. Datenerfassung auf dieser Website</h2>
          <h3>Kontaktformular</h3>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
            Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
            angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für
            den Fall von Anschlussfragen bei uns gespeichert. Diese Daten
            geben wir nicht ohne Ihre Einwilligung weiter.
          </p>

          <h3>Anfrage per E-Mail oder Telefon</h3>
          <p>
            Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre
            Anfrage inklusive aller daraus hervorgehenden personenbezogenen
            Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens
            bei uns gespeichert und verarbeitet.
          </p>

          <h2>5. Ihre Rechte</h2>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über
            Herkunft, Empfänger und Zweck Ihrer gespeicherten
            personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht,
            die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu
            sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
            jederzeit an uns wenden.
          </p>

          <h2>6. Analyse-Tools und Tools von Drittanbietern</h2>
          <p>
            Diese Website verwendet derzeit keine Analyse-Tools oder
            Tracking-Dienste von Drittanbietern.
          </p>
        </div>
      </Container>
    </section>
  );
}
