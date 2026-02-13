import { ArrowRight, Shield, Lock, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function KaeuferdatenbankCTA() {
  return (
    <section className="section-padding-sm bg-gradient-to-r from-primary to-teal-dark">
      <Container>
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Suchen Sie eine Immobilie?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Melden Sie sich jetzt für unsere kostenlose Käuferdatenbank an und
            erhalten Sie exklusive Angebote vor allen anderen.
          </p>

          <Button href="/kontakt" variant="white" size="lg">
            Jetzt kostenlos registrieren
            <ArrowRight size={18} className="ml-2" />
          </Button>

          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Shield size={16} />
              <span>Kostenlos</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Lock size={16} />
              <span>Diskret</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Users size={16} />
              <span>Exklusiv</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
