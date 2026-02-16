import { ArrowRight, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-mint via-mint-light to-white overflow-hidden min-h-[calc(100vh-5rem)]">
      <Container className="py-24 lg:py-32 xl:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left Content */}
          <div className="opacity-0 animate-slide-in-left">
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary">
                Ihre Immobilienexperten
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-slate-dark leading-[1.05] mb-8">
              Fairste Provision
              <br />
              der Region
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-body mb-12 max-w-xl leading-relaxed">
              Premium-Maklerservice zum fairsten Preis | Immobilienverkauf
              bei Homefin ab nur{" "}
              <span className="font-bold text-slate-dark">1,95 % inkl. MwSt.</span>
            </p>

            {/* CTA Button */}
            <Button href="/immobilienbewertung" size="lg" className="text-base sm:text-lg px-10 py-4">
              Kostenlose Bewertung erhalten
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>

          {/* Right Side */}
          <div className="opacity-0 animate-slide-in-right hidden lg:flex flex-col items-center">
            {/* IDA Award Image - large, prominent */}
            <div className="mb-12">
              <img
                src="/IDA_Award.png"
                alt="IDA Immobilien Dienstleister Award 2022"
                className="w-80 xl:w-96 h-auto object-contain mx-auto drop-shadow-xl"
              />
            </div>

            {/* Stats */}
            <div className="w-full max-w-sm text-center">
              <div className="text-6xl xl:text-7xl font-extrabold text-slate-dark mb-2">
                {siteConfig.stats.propertiesSold}
              </div>
              <div className="text-base text-slate-body mb-8">
                Erfolgreich vermittelte Immobilien
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gray-200 mb-8" />

              {/* Avatars + Trust Text + Stars */}
              <div className="flex flex-col items-center gap-4">
                {/* Stacked Avatars */}
                <div className="flex -space-x-3">
                  {[
                    { bg: "bg-primary-700", initials: "OK" },
                    { bg: "bg-primary-500", initials: "TM" },
                    { bg: "bg-teal-dark", initials: "JS" },
                    { bg: "bg-primary", initials: "MR" },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className={`w-11 h-11 rounded-full ${a.bg} border-[2.5px] border-white flex items-center justify-center text-white text-xs font-bold shadow-sm`}
                    >
                      {a.initials}
                    </div>
                  ))}
                </div>

                <p className="text-base text-slate-body font-medium">
                  Zufriedene Kunden sprechen für sich
                </p>

                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={20}
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

          {/* Mobile-only: Award + Stats */}
          <div className="lg:hidden flex flex-col items-center text-center mt-2">
            <img
              src="/IDA_Award.png"
              alt="IDA Immobilien Dienstleister Award 2022"
              className="w-56 h-auto object-contain mx-auto mb-8"
            />
            <div className="text-5xl font-extrabold text-slate-dark mb-2">
              {siteConfig.stats.propertiesSold}
            </div>
            <div className="text-sm text-slate-body mb-6">
              Erfolgreich vermittelte Immobilien
            </div>
            <div className="w-56 h-px bg-gray-200 mb-6" />
            <div className="flex -space-x-2.5 mb-3">
              {[
                { bg: "bg-primary-700", initials: "OK" },
                { bg: "bg-primary-500", initials: "TM" },
                { bg: "bg-teal-dark", initials: "JS" },
                { bg: "bg-primary", initials: "MR" },
              ].map((a, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-full ${a.bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}
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
      </Container>
    </section>
  );
}
