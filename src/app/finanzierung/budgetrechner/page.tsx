import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import BudgetrechnerCalc from "@/components/finanzierung/BudgetrechnerCalc";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Budgetrechner – Wie viel Immobilie kann ich mir leisten?",
  description:
    "Berechnen Sie Ihr maximales Immobilienbudget: Einkommen, Eigenkapital und Kaufnebenkosten berücksichtigt. Kostenloser Budgetrechner von homefin.",
  keywords: ["Budgetrechner Immobilie", "Wie viel Haus kann ich mir leisten", "Immobilie Budget berechnen", "Kaufbudget Rechner"],
  alternates: { canonical: `${siteConfig.url}/finanzierung/budgetrechner` },
};

export default function BudgetrechnerPage() {
  return (
    <>
      <section className="bg-gray-50 py-3 sm:py-4">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-body">
            <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/finanzierung" className="hover:text-primary transition-colors">Finanzierung</Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-slate-dark font-medium">Budgetrechner</span>
          </nav>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <Badge variant="gold" className="mb-4">BUDGETRECHNER</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-dark mb-3">
              Wie viel Immobilie können Sie sich leisten?
            </h1>
            <p className="text-slate-body mb-8 max-w-2xl">
              Berechnen Sie anhand Ihres Einkommens, Ihrer Ausgaben und Ihres Eigenkapitals, welches Budget Ihnen für den Immobilienkauf zur Verfügung steht.
            </p>
            <BudgetrechnerCalc />
          </div>
        </Container>
      </section>

      <section className="py-10 bg-gradient-to-br from-primary to-teal-dark">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Individuelle Beratung gewünscht?</h2>
            <p className="text-white/80 text-sm mb-5">Wir finden das passende Angebot aus über 700 Partnerbanken – kostenlos und unverbindlich.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-btn hover:bg-gray-50 transition-colors shadow-btn text-sm">Beratung anfragen</Link>
              <a href={`tel:${siteConfig.contact.phoneRaw}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-btn hover:bg-white/10 transition-colors text-sm">
                <Phone size={16} />{siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
