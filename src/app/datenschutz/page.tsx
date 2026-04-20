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
          <h1>Datenschutzerkl&auml;rung</h1>

          <h2>1. Datenschutz auf einen Blick</h2>
          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen &Uuml;berblick dar&uuml;ber, was
            mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
            besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            pers&ouml;nlich identifiziert werden k&ouml;nnen. Ausf&uuml;hrliche Informationen
            zum Thema Datenschutz entnehmen Sie unserer unter diesem Text
            aufgef&uuml;hrten Datenschutzerkl&auml;rung.
          </p>

          <h3>Datenerfassung auf dieser Website</h3>
          <p>
            <strong>Wer ist verantwortlich f&uuml;r die Datenerfassung auf dieser Website?</strong>
          </p>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den
            Websitebetreiber. Dessen Kontaktdaten k&ouml;nnen Sie dem Abschnitt
            &bdquo;Hinweis zur verantwortlichen Stelle&ldquo; in dieser
            Datenschutzerkl&auml;rung entnehmen.
          </p>
          <p>
            <strong>Wie erfassen wir Ihre Daten?</strong>
          </p>
          <p>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
            mitteilen. Hierbei kann es sich z.&nbsp;B. um Daten handeln, die Sie
            in ein Kontaktformular eingeben. Andere Daten werden automatisch oder
            nach Ihrer Einwilligung beim Besuch der Website durch unsere
            IT-Systeme erfasst. Das sind vor allem technische Daten (z.&nbsp;B.
            Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>
          <p>
            <strong>Wof&uuml;r nutzen wir Ihre Daten?</strong>
          </p>
          <p>
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung
            der Website zu gew&auml;hrleisten. Andere Daten k&ouml;nnen zur Analyse Ihres
            Nutzerverhaltens verwendet werden. Sofern &uuml;ber die Website Vertr&auml;ge
            geschlossen oder angebahnt werden k&ouml;nnen, werden die &uuml;bermittelten
            Daten auch f&uuml;r Vertragsangebote, Bestellungen oder sonstige
            Auftragsanfragen verarbeitet.
          </p>
          <p>
            <strong>Welche Rechte haben Sie bez&uuml;glich Ihrer Daten?</strong>
          </p>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft &uuml;ber Herkunft,
            Empf&auml;nger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
            erhalten. Sie haben au&szlig;erdem ein Recht, die Berichtigung oder
            L&ouml;schung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
            Datenverarbeitung erteilt haben, k&ouml;nnen Sie diese Einwilligung
            jederzeit f&uuml;r die Zukunft widerrufen. Au&szlig;erdem haben Sie das Recht,
            unter bestimmten Umst&auml;nden die Einschr&auml;nkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein
            Beschwerderecht bei der zust&auml;ndigen Aufsichtsbeh&ouml;rde zu.
          </p>
          <p>
            Hierzu sowie zu weiteren Fragen zum Thema Datenschutz k&ouml;nnen Sie
            sich jederzeit an uns wenden.
          </p>

          <h2>2. Hosting</h2>
          <h3>Netlify</h3>
          <p>
            Wir hosten unsere Website bei Netlify Inc., 2325 3rd Street, Suite
            296, San Francisco, CA 94107, USA. Wenn Sie unsere Website besuchen,
            werden Ihre personenbezogenen Daten auf den Servern von Netlify
            verarbeitet. Hierbei k&ouml;nnen auch personenbezogene Daten an den
            Serverstandort in die USA &uuml;bermittelt werden. Die &Uuml;bermittlung in die
            USA wird auf die EU-Standardvertragsklauseln gest&uuml;tzt.
          </p>
          <p>
            Weitere Informationen entnehmen Sie der Datenschutzerkl&auml;rung von
            Netlify:{" "}
            <a
              href="https://www.netlify.com/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              https://www.netlify.com/privacy/
            </a>
          </p>
          <p>
            Die Verwendung von Netlify erfolgt auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer
            m&ouml;glichst zuverl&auml;ssigen Darstellung unserer Website.
          </p>

          <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3>Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen
            Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
            vertraulich und entsprechend den gesetzlichen
            Datenschutzvorschriften sowie dieser Datenschutzerkl&auml;rung.
          </p>
          <p>
            Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet
            (z.&nbsp;B. bei der Kommunikation per E-Mail) Sicherheitsl&uuml;cken
            aufweisen kann. Ein l&uuml;ckenloser Schutz der Daten vor dem Zugriff
            durch Dritte ist nicht m&ouml;glich.
          </p>

          <h3>Hinweis zur verantwortlichen Stelle</h3>
          <p>
            Die verantwortliche Stelle f&uuml;r die Datenverarbeitung auf dieser
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
          <p>
            Verantwortliche Stelle ist die nat&uuml;rliche oder juristische Person,
            die allein oder gemeinsam mit anderen &uuml;ber die Zwecke und Mittel der
            Verarbeitung von personenbezogenen Daten entscheidet.
          </p>

          <h3>Speicherdauer</h3>
          <p>
            Soweit innerhalb dieser Datenschutzerkl&auml;rung keine speziellere
            Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten
            bei uns, bis der Zweck f&uuml;r die Datenverarbeitung entf&auml;llt. Wenn Sie
            ein berechtigtes L&ouml;schersuchen geltend machen oder eine Einwilligung
            zur Datenverarbeitung widerrufen, werden Ihre Daten gel&ouml;scht, sofern
            wir keine anderen rechtlich zul&auml;ssigen Gr&uuml;nde f&uuml;r die Speicherung
            Ihrer personenbezogenen Daten haben; in einem solchen Fall erfolgt
            die L&ouml;schung nach Fortfall dieser Gr&uuml;nde.
          </p>

          <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
          <p>
            Viele Datenverarbeitungsvorg&auml;nge sind nur mit Ihrer ausdr&uuml;cklichen
            Einwilligung m&ouml;glich. Sie k&ouml;nnen eine bereits erteilte Einwilligung
            jederzeit f&uuml;r die Zukunft widerrufen. Die Rechtm&auml;&szlig;igkeit der bis zum Widerruf
            erfolgten Datenverarbeitung bleibt vom Widerruf unber&uuml;hrt.
          </p>

          <h3>Widerspruchsrecht gegen die Datenerhebung in besonderen F&auml;llen (Art. 21 DSGVO)</h3>
          <p>
            <strong>
              Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e
              oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gr&uuml;nden,
              die sich aus Ihrer besonderen Situation ergeben, gegen die
              Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen.
              Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht,
              entnehmen Sie dieser Datenschutzerkl&auml;rung. Wenn Sie Widerspruch
              einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht
              mehr verarbeiten, es sei denn, wir k&ouml;nnen zwingende schutzw&uuml;rdige
              Gr&uuml;nde f&uuml;r die Verarbeitung nachweisen, die Ihre Interessen, Rechte
              und Freiheiten &uuml;berwiegen oder die Verarbeitung dient der
              Geltendmachung, Aus&uuml;bung oder Verteidigung von Rechtsanspr&uuml;chen
              (Widerspruch nach Art. 21 Abs. 1 DSGVO).
            </strong>
          </p>

          <h3>Beschwerderecht bei der zust&auml;ndigen Aufsichtsbeh&ouml;rde</h3>
          <p>
            Im Falle von Verst&ouml;&szlig;en gegen die DSGVO steht den Betroffenen ein
            Beschwerderecht bei einer Aufsichtsbeh&ouml;rde zu. Die f&uuml;r uns
            zust&auml;ndige Aufsichtsbeh&ouml;rde ist:
          </p>
          <p>
            Landesbeauftragte f&uuml;r Datenschutz und Informationsfreiheit
            Nordrhein-Westfalen
            <br />
            Postfach 20 04 44, 40102 D&uuml;sseldorf
            <br />
            <a
              href="https://www.ldi.nrw.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              https://www.ldi.nrw.de
            </a>
          </p>

          <h3>Recht auf Daten&uuml;bertragbarkeit</h3>
          <p>
            Sie haben das Recht, Daten, die wir auf Grundlage Ihrer
            Einwilligung oder in Erf&uuml;llung eines Vertrags automatisiert
            verarbeiten, an sich oder an einen Dritten in einem g&auml;ngigen,
            maschinenlesbaren Format aush&auml;ndigen zu lassen.
          </p>

          <h3>Auskunft, Berichtigung und L&ouml;schung</h3>
          <p>
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
            jederzeit das Recht auf unentgeltliche Auskunft &uuml;ber Ihre
            gespeicherten personenbezogenen Daten, deren Herkunft und Empf&auml;nger
            und den Zweck der Datenverarbeitung und ggf. ein Recht auf
            Berichtigung oder L&ouml;schung dieser Daten.
          </p>

          <h3>Recht auf Einschr&auml;nkung der Verarbeitung</h3>
          <p>
            Sie haben das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen. Hierzu k&ouml;nnen Sie sich
            jederzeit an uns wenden.
          </p>

          <h3>SSL- bzw. TLS-Verschl&uuml;sselung</h3>
          <p>
            Diese Seite nutzt aus Sicherheitsgr&uuml;nden und zum Schutz der
            &Uuml;bertragung vertraulicher Inhalte eine SSL- bzw.
            TLS-Verschl&uuml;sselung. Eine verschl&uuml;sselte Verbindung erkennen Sie
            daran, dass die Adresszeile des Browsers von &bdquo;http://&ldquo; auf
            &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
          </p>

          <h2>4. Datenerfassung auf dieser Website</h2>

          <h3>Cookies</h3>
          <p>
            Unsere Internetseiten verwenden so genannte &bdquo;Cookies&ldquo;. Cookies sind
            kleine Datenpakete und richten auf Ihrem Endger&auml;t keinen Schaden an.
            Sie werden entweder vor&uuml;bergehend f&uuml;r die Dauer einer Sitzung
            (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem
            Endger&auml;t gespeichert.
          </p>
          <p>
            Technisch notwendige Cookies werden automatisch gesetzt, um die
            Grundfunktionalit&auml;t der Website zu gew&auml;hrleisten. Funktionale
            Cookies und Cookies von Drittanbieterdiensten werden erst nach Ihrer
            ausdr&uuml;cklichen Einwilligung &uuml;ber unser Cookie-Banner gesetzt.
          </p>
          <p>
            Sie k&ouml;nnen Ihre Cookie-Einstellungen jederzeit &uuml;ber den Link
            &bdquo;Cookie-Einstellungen&ldquo; im Footer unserer Website anpassen oder
            widerrufen.
          </p>
          <p>
            Die Speicherung von technisch notwendigen Cookies erfolgt auf
            Grundlage von &sect; 25 Abs. 2 TDDDG. Die Speicherung sonstiger Cookies
            erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO i.&nbsp;V.&nbsp;m.
            &sect; 25 Abs. 1 TDDDG.
          </p>

          <h3>Server-Log-Dateien</h3>
          <p>
            Der Provider der Seiten erhebt und speichert automatisch
            Informationen in so genannten Server-Log-Dateien, die Ihr Browser
            automatisch an uns &uuml;bermittelt. Dies sind:
          </p>
          <ul>
            <li>Browsertyp und Browserversion</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p>
            Eine Zusammenf&uuml;hrung dieser Daten mit anderen Datenquellen wird
            nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage
            von Art. 6 Abs. 1 lit. f DSGVO.
          </p>

          <h3>Kontaktformular</h3>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
            Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
            angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und f&uuml;r den
            Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir
            nicht ohne Ihre Einwilligung weiter.
          </p>
          <p>
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
            Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erf&uuml;llung eines
            Vertrags zusammenh&auml;ngt oder zur Durchf&uuml;hrung vorvertraglicher
            Ma&szlig;nahmen erforderlich ist. In allen &uuml;brigen F&auml;llen beruht die
            Verarbeitung auf unserem berechtigten Interesse an der effektiven
            Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f
            DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
          </p>
          <p>
            Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei
            uns, bis Sie uns zur L&ouml;schung auffordern, Ihre Einwilligung zur
            Speicherung widerrufen oder der Zweck f&uuml;r die Datenspeicherung
            entf&auml;llt. Zwingende gesetzliche Bestimmungen &ndash; insbesondere
            Aufbewahrungsfristen &ndash; bleiben unber&uuml;hrt.
          </p>

          <h3>Anfrage per E-Mail oder Telefon</h3>
          <p>
            Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre
            Anfrage inklusive aller daraus hervorgehenden personenbezogenen
            Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens
            bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht
            ohne Ihre Einwilligung weiter.
          </p>

          <h2>5. Drittanbieter-Dienste und Integrationen</h2>

          <h3>Propstack CRM</h3>
          <p>
            Wir nutzen Propstack (Propstack GmbH, Deutschland) als
            Customer-Relationship-Management-System (CRM). Wenn Sie ein
            Kontaktformular auf unserer Website ausf&uuml;llen, werden Ihre Daten
            (Vorname, Nachname, E-Mail, Telefon, Nachricht) an Propstack
            &uuml;bermittelt, um Ihre Anfrage effizient bearbeiten zu k&ouml;nnen.
          </p>
          <p>
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
            DSGVO (vorvertragliche Ma&szlig;nahmen) bzw. Art. 6 Abs. 1 lit. f
            DSGVO (berechtigtes Interesse an effizienter Kundenbetreuung).
          </p>
          <p>
            Weitere Informationen:{" "}
            <a
              href="https://www.propstack.de/datenschutz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              https://www.propstack.de/datenschutz
            </a>
          </p>

          <h3>E-Mail-Benachrichtigungen (Resend)</h3>
          <p>
            F&uuml;r den Versand von internen E-Mail-Benachrichtigungen bei neuen
            Kontaktanfragen nutzen wir den Dienst Resend (Resend Inc., USA).
            Hierbei werden die im Formular angegebenen Daten an Resend zur
            E-Mail-Zustellung &uuml;bermittelt. Es handelt sich ausschlie&szlig;lich um
            interne Benachrichtigungen an unser Team &ndash; es werden keine
            Marketing-E-Mails an Sie versendet.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an der zeitnahen Bearbeitung von Anfragen). Die
            &Uuml;bermittlung in die USA wird auf EU-Standardvertragsklauseln
            gest&uuml;tzt.
          </p>

          <h3>Netlify Forms</h3>
          <p>
            Zus&auml;tzlich nutzen wir Netlify Forms als Backup-System f&uuml;r
            Kontaktformulare. Ihre eingegebenen Daten werden dabei auf den
            Servern von Netlify gespeichert.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an einer zuverl&auml;ssigen Anfragebearbeitung).
          </p>

          <h3>Voiceflow Chatbot</h3>
          <p>
            Auf unserer Website setzen wir einen KI-gest&uuml;tzten Chatbot
            (&bdquo;Jana&ldquo;) des Anbieters Voiceflow Inc. (Kanada) ein. Der Chatbot
            wird erst nach Ihrer Einwilligung &uuml;ber unser Cookie-Banner geladen
            (Kategorie &bdquo;Funktional&ldquo;).
          </p>
          <p>
            Wenn Sie den Chatbot nutzen, werden Ihre Eingaben (Textnachrichten)
            an die Server von Voiceflow &uuml;bermittelt und dort verarbeitet. Es
            werden dabei auch technische Daten (IP-Adresse, Browser-Typ)
            erfasst.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            Sie k&ouml;nnen Ihre Einwilligung jederzeit &uuml;ber die
            Cookie-Einstellungen widerrufen.
          </p>
          <p>
            Weitere Informationen:{" "}
            <a
              href="https://www.voiceflow.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              https://www.voiceflow.com/privacy
            </a>
          </p>

          <h3>Cal.com (Terminbuchung)</h3>
          <p>
            F&uuml;r die Online-Terminbuchung nutzen wir Cal.com (Cal.com Inc.,
            USA). Das Buchungs-Widget wird auf unserer Kontaktseite eingebunden.
            Wenn Sie einen Termin buchen, werden die von Ihnen eingegebenen
            Daten (Name, E-Mail, gew&uuml;nschter Termin) an Cal.com &uuml;bermittelt.
          </p>
          <p>
            Rechtsgrundlage f&uuml;r die Einbindung ist Art. 6 Abs. 1 lit. a
            DSGVO (Einwilligung) bzw. Art. 6 Abs. 1 lit. b DSGVO
            (vorvertragliche Ma&szlig;nahmen). Die &Uuml;bermittlung in die USA wird auf
            EU-Standardvertragsklauseln gest&uuml;tzt.
          </p>
          <p>
            Weitere Informationen:{" "}
            <a
              href="https://cal.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              https://cal.com/privacy
            </a>
          </p>

          <h3>OpenStreetMap</h3>
          <p>
            Wir nutzen den Kartendienst OpenStreetMap (OSM) zur Darstellung
            von Immobilienstandorten. Beim Laden der Karte werden
            Kartenkacheln von den Servern der OpenStreetMap Foundation
            (Gro&szlig;britannien) abgerufen. Dabei wird Ihre IP-Adresse an die OSM-Server
            &uuml;bermittelt.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an der Darstellung von Standortinformationen).
          </p>
          <p>
            Weitere Informationen:{" "}
            <a
              href="https://wiki.osmfoundation.org/wiki/Privacy_Policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              https://wiki.osmfoundation.org/wiki/Privacy_Policy
            </a>
          </p>

          <h3>Trustpilot</h3>
          <p>
            Auf unserer Website binden wir Bewertungswidgets von Trustpilot
            A/S (D&auml;nemark) ein. Beim Laden dieser Widgets k&ouml;nnen Daten
            (IP-Adresse, Browser-Informationen) an Trustpilot &uuml;bermittelt
            werden.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an der Darstellung von Kundenbewertungen).
          </p>

          <h2>6. Ihre Rechte im &Uuml;berblick</h2>
          <p>
            Als betroffene Person haben Sie folgende Rechte nach der DSGVO:
          </p>
          <ul>
            <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO)</li>
            <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
            <li><strong>Recht auf L&ouml;schung</strong> (Art. 17 DSGVO)</li>
            <li><strong>Recht auf Einschr&auml;nkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
            <li><strong>Recht auf Daten&uuml;bertragbarkeit</strong> (Art. 20 DSGVO)</li>
            <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)</li>
            <li><strong>Recht auf Widerruf erteilter Einwilligungen</strong> (Art. 7 Abs. 3 DSGVO)</li>
            <li><strong>Beschwerderecht bei der Aufsichtsbeh&ouml;rde</strong> (Art. 77 DSGVO)</li>
          </ul>
          <p>
            Zur Aus&uuml;bung Ihrer Rechte wenden Sie sich bitte an:{" "}
            {siteConfig.contact.email}
          </p>
        </div>
      </Container>
    </section>
  );
}
