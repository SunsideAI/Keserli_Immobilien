import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import SuchprofilFunnel from "@/components/suchprofil/SuchprofilFunnel";

export const metadata: Metadata = {
  title: "Suchprofil anlegen – Wir finden Ihre Traumimmobilie",
  description:
    "Erstellen Sie Ihr persönliches Suchprofil bei homefin GmbH. Wir informieren Sie über passende Immobilien in Monheim am Rhein, Langenfeld, Leverkusen, Köln & Düsseldorf.",
  alternates: { canonical: "https://www.myhomefin.de/suchprofil" },
  openGraph: {
    title: "Suchprofil anlegen | homefin GmbH – Immobilienmakler (IHK)",
    description: "Erstellen Sie Ihr Suchprofil und erhalten Sie passende Immobilienangebote.",
    url: "https://www.myhomefin.de/suchprofil",
    type: "website",
    locale: "de_DE",
    siteName: "homefin GmbH",
  },
};

export default function SuchprofilPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-mint-light to-mint py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              SUCHPROFIL
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-dark mb-6">
              Wir finden Ihre{" "}
              <span className="text-primary">Traumimmobilie</span>
            </h1>
            <p className="text-lg text-slate-body">
              Erstellen Sie in wenigen Schritten Ihr persönliches Suchprofil –
              wir informieren Sie über passende Angebote.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-gray-50">
        <Container>
          <SuchprofilFunnel />
        </Container>
      </section>
    </>
  );
}
