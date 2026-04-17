import type { Metadata } from "next";
import Link from "next/link";
import { CheckSquare, FileText, Zap, Home, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import DownloadFormButton from "@/components/ratgeber/DownloadFormButton";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Immobilien-Checklisten zum Download | homefin",
  description:
    "Kostenlose Checklisten für den Immobilienverkauf: Aufbereitung, Energieausweis, Unterlagen und Exposé. PDF-Checklisten von homefin.",
  keywords: ["Immobilie Checkliste", "Haus verkaufen Checkliste", "Energieausweis Checkliste", "Exposé erstellen Checkliste"],
  alternates: { canonical: `${siteConfig.url}/wissenswertes/checklisten` },
};

const checklists = [
  {
    id: "aufbereitung",
    title: "Immobilie aufbereiten",
    subtitle: "Mit 5 Maßnahmen zum besseren Verkauf",
    description:
      "Kleine Maßnahmen, große Wirkung: Erfahren Sie, wie Sie Ihre Immobilie optimal für den Verkauf vorbereiten – von Home Staging bis zur Gartenpflege.",
    icon: Home,
    downloadUrl: "/checklisten-downloads/aufbereitung-der-immobilie.pdf",
    pages: 4,
    items: [
      "Entrümpeln und Depersonalisieren",
      "Kleine Reparaturen durchführen (Türklinken, Silikonfugen, Wandfarbe)",
      "Professionelle Reinigung von Küche, Bad und Fenstern",
      "Garten und Außenbereich pflegen",
      "Home Staging: Möbel rücken, Licht optimieren, Dekoration",
    ],
  },
  {
    id: "energieausweis",
    title: "Energieausweis",
    subtitle: "Was Sie wissen müssen",
    description:
      "Seit 2014 ist der Energieausweis bei Verkauf und Vermietung Pflicht. Unsere Checkliste zeigt, welchen Ausweis Sie brauchen und wie Sie ihn beantragen.",
    icon: Zap,
    downloadUrl: "/checklisten-downloads/energieausweis.pdf",
    pages: 12,
    items: [
      "Bedarfs- oder Verbrauchsausweis? Den richtigen Typ bestimmen",
      "Baujahr und Gebäudetyp für die Ausweispflicht prüfen",
      "Energieberater oder Schornsteinfeger beauftragen",
      "Heizungs- und Verbrauchsdaten der letzten 3 Jahre sammeln",
      "Ausweis rechtzeitig vor dem ersten Besichtigungstermin besorgen",
      "Energieeffizienzklasse in Inserate aufnehmen (gesetzlich vorgeschrieben)",
    ],
  },
  {
    id: "unterlagen",
    title: "Unterlagen für den Verkauf",
    subtitle: "Alle Dokumente beisammen?",
    description:
      "Ein vollständiger Unterlagen-Ordner beschleunigt den Verkauf und schafft Vertrauen. Diese Dokumente sollten Sie bereithalten.",
    icon: FileText,
    downloadUrl: "/checklisten-downloads/unterlagen-fuer-den-verkauf.pdf",
    pages: 4,
    items: [
      "Aktueller Grundbuchauszug (nicht älter als 3 Monate)",
      "Flurkarte / Liegenschaftskarte",
      "Energieausweis (Bedarfs- oder Verbrauchsausweis)",
      "Wohnflächenberechnung und Grundrisse",
      "Baubeschreibung und Baupläne",
      "Nebenkostenabrechnungen der letzten 3 Jahre",
      "Bei ETW: Teilungserklärung, Wirtschaftsplan, Protokolle",
      "Nachweise über Modernisierungen und Sanierungen",
      "Mietvertrag (bei vermieteten Objekten)",
      "Versicherungspolicen (Gebäudeversicherung)",
    ],
  },
  {
    id: "expose",
    title: "Das perfekte Immobilien-Exposé",
    subtitle: "Ein gutes Exposé verkauft",
    description:
      "Das Exposé ist die Visitenkarte Ihrer Immobilie. Erfahren Sie, welche Inhalte ein überzeugendes Exposé enthalten muss.",
    icon: CheckSquare,
    downloadUrl: "/checklisten-downloads/was-gehoert-in-ein-expose.pdf",
    pages: 4,
    items: [
      "Professionelle Fotos (mindestens 15–20 Bilder, inklusive Außenansicht)",
      "Aussagekräftige Überschrift mit den wichtigsten Merkmalen",
      "Detaillierte Objektbeschreibung (Räume, Ausstattung, Besonderheiten)",
      "Lage- und Umgebungsbeschreibung (Infrastruktur, ÖPNV, Schulen)",
      "Grundriss (professionell aufbereitet, möbliert)",
      "Energiedaten (Klasse, Verbrauch, Heizungsart)",
      "Kaufpreis und Kaufnebenkosten transparent darstellen",
      "Kontaktdaten und nächste Schritte klar benennen",
    ],
  },
];

export default function ChecklistenPage() {
  return (
    <>
      <section className="bg-gray-50 py-3 sm:py-4">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-body">
            <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/wissenswertes/ratgeber" className="hover:text-primary transition-colors">Ratgeber</Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-slate-dark font-medium">Checklisten</span>
          </nav>
        </Container>
      </section>

      {/* Hero */}
      <section className="bg-gradient-to-br from-mint-light to-mint py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="gold" className="mb-4">CHECKLISTEN</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-dark mb-4 leading-tight">
              Immobilien-Checklisten{" "}
              <span className="text-primary">für den Verkauf</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-body">
              Praktische Checklisten, damit Sie beim Immobilienverkauf nichts vergessen.
              Von der Aufbereitung bis zum perfekten Exposé.
            </p>
          </div>
        </Container>
      </section>

      {/* Checklists */}
      <section className="section-padding bg-white">
        <Container>
          <div className="space-y-10 max-w-4xl mx-auto">
            {checklists.map((cl) => (
              <div key={cl.id} id={cl.id} className="bg-gray-50 rounded-2xl p-6 sm:p-8 scroll-mt-24">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                    <cl.icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-dark">{cl.title}</h2>
                    <p className="text-sm text-primary font-medium">{cl.subtitle}</p>
                  </div>
                </div>
                <p className="text-slate-body mb-5">{cl.description}</p>
                <ul className="space-y-3">
                  {cl.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded border-2 border-primary/30 shrink-0 mt-0.5 flex items-center justify-center">
                        <span className="text-[10px] text-primary/50 font-bold">{i + 1}</span>
                      </div>
                      <span className="text-sm text-slate-body">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <DownloadFormButton
                    ratgeberTitle={cl.title}
                    downloadUrl={cl.downloadUrl}
                    pages={cl.pages}
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary to-teal-dark">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Unterstützung beim Verkauf?
            </h2>
            <p className="text-white/80 mb-6">
              Wir kümmern uns um Unterlagen, Exposé, Besichtigungen und den gesamten Verkaufsprozess – professionell und zum fairen Preis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-btn hover:bg-gray-50 transition-colors shadow-btn">
                Verkauf anfragen
              </Link>
              <Link href="/wissenswertes/ratgeber" className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-btn hover:bg-white/10 transition-colors">
                Weitere Ratgeber
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
