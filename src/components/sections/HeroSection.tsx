import { ArrowRight, Award } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import { siteConfig } from "@/data/site-config";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-mint-light via-white to-mint overflow-hidden">
      <Container className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="gold" className="mb-6">
            IHRE IMMOBILIENEXPERTEN
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-dark mb-6 leading-tight">
            Fairste Provision{" "}
            <span className="text-primary">der Region</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-body mb-8 max-w-2xl mx-auto">
            Premium-Maklerservice zum fairsten Preis – Immobilienverkauf bei
            homefin ab nur{" "}
            <span className="font-semibold text-primary">1,95% inkl. MwSt.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button href="/immobilienbewertung" size="lg">
              Kostenlose Bewertung erhalten
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button href="/angebote" variant="secondary" size="lg">
              Unsere Angebote
            </Button>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-dark">
                {siteConfig.stats.propertiesSold}
              </div>
              <div className="text-sm text-slate-body">
                Vermittelte Immobilien
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-dark">
                {siteConfig.stats.yearsExperience}
              </div>
              <div className="text-sm text-slate-body">Jahre Erfahrung</div>
            </div>
            <div className="text-center">
              <StarRating rating={siteConfig.stats.googleRating} />
              <div className="text-sm text-slate-body mt-1">
                Google Bewertung
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-body">
              <Award size={20} className="text-gold" />
              <span className="font-medium">IDA Award</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
    </section>
  );
}
