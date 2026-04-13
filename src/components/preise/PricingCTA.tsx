import { CalendarDays, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function PricingCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary to-primary-800">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Nicht sicher, welches Modell passt?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Lassen Sie sich kostenlos beraten. In einem kurzen Gespräch finden
            wir gemeinsam heraus, welches Paket ideal zu Ihrer Situation passt.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/kontakt" variant="white" className="gap-2">
              <CalendarDays size={18} />
              Kostenlose Erstberatung anfragen
            </Button>
            <Button
              href="tel:+4921735089560"
              variant="ghost"
              className="text-white hover:bg-white/10 border border-white/30 gap-2"
              shimmer={false}
            >
              <Phone size={18} />
              Jetzt anrufen
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
