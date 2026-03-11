import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Shield, Zap, Leaf, CreditCard, Lock, Bell, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Baufinanzierungszertifikat – Ihre digitale Finanzierungsbestätigung | homefin",
  description:
    "Das homefin Baufinanzierungszertifikat: Digitale NFC-Karte als Finanzierungsnachweis. SCHUFA-neutral, sofort verfügbar, über 700 Partnerbanken.",
  keywords: ["Baufinanzierungszertifikat", "Finanzierungsbestätigung", "Finanzierungszusage", "NFC Karte Baufinanzierung"],
  alternates: { canonical: `${siteConfig.url}/finanzierung/baufinanzierungszertifikat` },
};

const features = [
  { icon: Zap, title: "Schnelle Kaufzusage", text: "Verkäufer und Makler bevorzugen Käufer mit verifizierter Finanzierung. Ihr Angebot wird priorisiert." },
  { icon: Shield, title: "SCHUFA-neutral", text: "Die Prüfung hat keinen Einfluss auf Ihren SCHUFA-Score. Keine Konditionsanfrage, kein negativer Eintrag." },
  { icon: CreditCard, title: "Digitale NFC-Karte", text: "Moderne NFC-Technologie – einfach vorzeigen oder digital teilen. Papierlos und immer dabei." },
  { icon: Lock, title: "3D Secure & DSGVO", text: "Höchste Sicherheitsstandards schützen Ihre Daten. Vollständig DSGVO-konform." },
  { icon: Bell, title: "Echtzeit-Benachrichtigungen", text: "Bleiben Sie über den Status Ihrer Finanzierung immer auf dem Laufenden." },
  { icon: Leaf, title: "Nachhaltig", text: "Komplett papierlos. Für jede ausgestellte Karte pflanzen wir einen Baum." },
];

const steps = [
  { step: "1", title: "Registrierung", text: "Füllen Sie unser Online-Formular aus – in wenigen Minuten erledigt." },
  { step: "2", title: "Prüfung", text: "Wir prüfen Ihre Finanzierungsfähigkeit SCHUFA-neutral bei über 700 Banken." },
  { step: "3", title: "Zertifikat erhalten", text: "Sie erhalten Ihr digitales Zertifikat und Ihre NFC-Karte." },
];

const faqs = [
  { q: "Ist die Prüfung wirklich SCHUFA-neutral?", a: "Ja, absolut. Wir führen eine sogenannte Konditionsanfrage (Merkmal KA) durch, die keinen Einfluss auf Ihren Score hat und für andere nicht sichtbar ist." },
  { q: "Was kostet das Baufinanzierungszertifikat?", a: "Die Ausstellung des Zertifikats ist für Sie kostenlos. Es entstehen keine versteckten Gebühren." },
  { q: "Wie schnell erhalte ich mein Zertifikat?", a: "In der Regel erhalten Sie Ihr digitales Zertifikat innerhalb von 24 Stunden nach Einreichung aller Unterlagen." },
  { q: "Ersetzen das Zertifikat eine verbindliche Finanzierungszusage?", a: "Das Zertifikat bestätigt Ihre grundsätzliche Finanzierungsfähigkeit. Eine verbindliche Zusage erfolgt nach der detaillierten Prüfung durch die finanzierende Bank." },
  { q: "Welche Unterlagen brauche ich?", a: "Gehaltsabrechnungen der letzten 3 Monate, letzter Steuerbescheid, Kontoauszüge und Personalausweis. Wir führen Sie Schritt für Schritt durch den Prozess." },
];

export default function BaufinanzierungszertifikatPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-gray-50 py-3 sm:py-4">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-body">
            <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/finanzierung" className="hover:text-primary transition-colors">Finanzierung</Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-slate-dark font-medium">Baufinanzierungszertifikat</span>
          </nav>
        </Container>
      </section>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-teal-dark py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="gold" className="mb-4">BAUFINANZIERUNGSZERTIFIKAT</Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                Ihre digitale Finanzierungs&shy;bestätigung
              </h1>
              <p className="text-white/80 mb-6">
                Zeigen Sie Verkäufern und Maklern sofort, dass Sie finanziell bereit sind.
                Unser digitales Zertifikat mit NFC-Technologie macht den Unterschied.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/kontakt" variant="white">
                  Zertifikat anfragen
                </Button>
                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-btn hover:bg-white/10 transition-colors">
                  <Phone size={18} />{siteConfig.contact.phone}
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="w-32 h-32 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4">
                  <Shield size={64} className="text-primary" />
                </div>
                <p className="text-white font-bold text-center text-lg">homefin Zertifikat</p>
                <p className="text-white/60 text-center text-sm">Finanzierung verifiziert</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-10 text-center">Ihre Vorteile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-xl p-6">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                  <f.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-bold text-slate-dark mb-2">{f.title}</h3>
                <p className="text-sm text-slate-body">{f.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="section-padding bg-gray-50">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-10 text-center">So funktioniert&apos;s</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 mx-auto bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-slate-dark mb-2">{s.title}</h3>
                <p className="text-sm text-slate-body">{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-8 text-center">Häufig gestellte Fragen</h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <details key={i} className="group bg-gray-50 rounded-xl border border-gray-100">
                  <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 font-semibold text-slate-dark hover:text-primary transition-colors list-none">
                    <span className="pr-4">{f.q}</span>
                    <ChevronRight size={20} className="shrink-0 transition-transform group-open:rotate-90 text-primary" />
                  </summary>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-body leading-relaxed text-sm">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary to-teal-dark">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Jetzt Zertifikat anfragen</h2>
            <p className="text-white/80 mb-6">Kostenlos, SCHUFA-neutral und in 24 Stunden verfügbar.</p>
            <Button href="/kontakt" variant="white">Jetzt anfragen</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
