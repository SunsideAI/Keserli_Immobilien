import { ArrowRight, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-mint via-mint-light to-white overflow-hidden">
      <Container className="py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="opacity-0 animate-slide-in-left">
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary">
                Ihre Immobilienexperten
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold text-slate-dark leading-[1.08] mb-6">
              Fairste Provision
              <br />
              der Region
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-body mb-10 max-w-lg leading-relaxed">
              Premium-Maklerservice zum fairsten Preis | Immobilienverkauf
              bei Homefin ab nur{" "}
              <span className="font-bold text-slate-dark">1,95 % inkl. MwSt.</span>
            </p>

            {/* CTA Button */}
            <Button href="/immobilienbewertung" size="lg" className="text-base px-10">
              Kostenlose Bewertung erhalten
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>

          {/* Right Side */}
          <div className="opacity-0 animate-slide-in-right hidden lg:flex flex-col items-center">
            {/* IDA Award Image - no card, just the image */}
            <div className="mb-10 animate-fade-in-up">
              <img
                src="/IDA_Award.png"
                alt="IDA Immobilien Dienstleister Award 2022"
                className="w-72 xl:w-80 h-auto object-contain mx-auto drop-shadow-lg"
              />
            </div>

            {/* Stats */}
            <div className="w-full max-w-xs text-center">
              <div className="text-5xl font-extrabold text-slate-dark mb-1">
                {siteConfig.stats.propertiesSold}
              </div>
              <div className="text-sm text-slate-body mb-6">
                Erfolgreich vermittelte Immobilien
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gray-200 mb-6" />

              {/* Avatars + Trust Text + Stars */}
              <div className="flex flex-col items-center gap-3">
                {/* Stacked Avatars */}
                <div className="flex -space-x-2.5">
                  {[
                    { bg: "bg-primary-700", initials: "OK" },
                    { bg: "bg-primary-500", initials: "TM" },
                    { bg: "bg-teal-dark", initials: "JS" },
                    { bg: "bg-primary", initials: "MR" },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 rounded-full ${a.bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}
                    >
                      {a.initials}
                    </div>
                  ))}
                </div>

                <p className="text-sm text-slate-body font-medium">
                  Zufriedene Kunden sprechen für sich
                </p>

                {/* Star Rating */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      className={
                        s <= Math.floor(siteConfig.stats.googleRating)
                          ? "fill-gold text-gold"
                          : "fill-gold/30 text-gold/30"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only stats (below CTA) */}
          <div className="lg:hidden flex flex-col items-center text-center mt-4">
            <img
              src="/IDA_Award.png"
              alt="IDA Immobilien Dienstleister Award 2022"
              className="w-48 h-auto object-contain mx-auto mb-6"
            />
            <div className="text-4xl font-extrabold text-slate-dark mb-1">
              {siteConfig.stats.propertiesSold}
            </div>
            <div className="text-sm text-slate-body mb-4">
              Erfolgreich vermittelte Immobilien
            </div>
            <div className="w-48 h-px bg-gray-200 mb-4" />
            <div className="flex -space-x-2.5 mb-2">
              {[
                { bg: "bg-primary-700", initials: "OK" },
                { bg: "bg-primary-500", initials: "TM" },
                { bg: "bg-teal-dark", initials: "JS" },
                { bg: "bg-primary", initials: "MR" },
              ].map((a, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${a.bg} border-2 border-white flex items-center justify-center text-white text-[9px] font-bold`}
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-body font-medium mb-2">
              Zufriedene Kunden sprechen für sich
            </p>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className={
                    s <= Math.floor(siteConfig.stats.googleRating)
                      ? "fill-gold text-gold"
                      : "fill-gold/30 text-gold/30"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
