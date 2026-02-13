import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { faqItems } from "@/data/faq";
import { siteConfig } from "@/data/site-config";

export default function FAQSection() {
  return (
    <section className="section-padding bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading
              badge="FAQ"
              title="Antworten auf Ihre wichtigsten Fragen"
              alignment="left"
            />
            <Accordion
              items={faqItems.map((item) => ({
                question: item.question,
                answer: item.answer,
              }))}
            />
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center">
            <div className="bg-white rounded-card shadow-card p-8 text-center max-w-sm">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">?</span>
              </div>
              <h3 className="text-xl font-bold text-slate-dark mb-2">
                Noch Fragen?
              </h3>
              <p className="text-slate-body mb-4">
                Wir beraten Sie gerne persönlich und unverbindlich.
              </p>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="text-xl font-bold text-primary hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
