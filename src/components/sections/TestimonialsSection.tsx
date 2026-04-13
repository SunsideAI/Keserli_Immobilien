import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import StarRating from "@/components/ui/StarRating";
import ScrollAnimator from "@/components/ui/ScrollAnimator";
import { testimonials } from "@/data/testimonials";
import TrustWidgetsRow from "@/components/sections/TrustWidgetsRow";

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <Container>
        <ScrollAnimator>
          <SectionHeading
            badge="KUNDENSTIMMEN"
            title="Was unsere Kunden sagen"
            subtitle="Echte Bewertungen unserer Kunden auf Trustpilot, ProvenExpert und Google."
          />

          {/* ── Live Trust-Widgets (Trustpilot + Trustlocal) ── */}
          <TrustWidgetsRow />
        </ScrollAnimator>

        <ScrollAnimator stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <Card key={t.id} hover className="p-6">
                <StarRating rating={t.rating} showNumber={false} size={14} className="mb-3" />
                <p className="text-sm text-slate-body leading-relaxed mb-4 line-clamp-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-dark">
                      {t.name}
                    </div>
                    {t.location && (
                      <div className="text-xs text-slate-body">{t.location}</div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollAnimator>
      </Container>
    </section>
  );
}
