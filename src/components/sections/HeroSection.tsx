"use client";

import { ArrowRight, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-mint-light via-white to-mint overflow-hidden min-h-[calc(100vh-5rem)]">
      <Container className="py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="opacity-0 animate-slide-in-left">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                Ihre Immobilienexperten
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-slate-dark leading-[1.1] mb-6">
              Fairste Provision
              <br />
              <span className="text-primary">der Region</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-body mb-8 max-w-xl leading-relaxed">
              Premium-Maklerservice zum fairsten Preis | Immobilienverkauf
              bei Homefin ab nur{" "}
              <span className="font-bold text-primary">1,95 % inkl. MwSt.</span>
            </p>

            {/* CTA Button */}
            <div className="mb-10">
              <Button href="/immobilienbewertung" size="lg" className="text-base">
                Kostenlose Bewertung erhalten
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>

            {/* Stats Row - Avatars + Count + Stars */}
            <div className="flex flex-wrap items-center gap-6">
              {/* Stacked Avatars */}
              <div className="flex -space-x-3">
                {["bg-primary-600", "bg-primary-400", "bg-teal-dark", "bg-primary"].map(
                  (bg, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {["OK", "TM", "JS", "MR"][i]}
                    </div>
                  )
                )}
              </div>

              {/* Stats Text */}
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-xl font-extrabold text-slate-dark">
                    {siteConfig.stats.propertiesSold}
                  </span>
                </div>
                <div className="text-sm text-slate-body">
                  Erfolgreich vermittelte Immobilien
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className="fill-gold text-gold"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Award & Visual */}
          <div className="relative opacity-0 animate-slide-in-right hidden lg:block">
            {/* Main Visual Container */}
            <div className="relative">
              {/* Background Decorative Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-[2rem] transform rotate-3" />

              {/* Award Card */}
              <div className="relative bg-white rounded-[1.5rem] shadow-card-hover p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* IDA Award Image */}
                <div className="flex flex-col items-center text-center">
                  {/* Award Badge - uses real image if available, otherwise placeholder */}
                  <div className="w-40 h-40 mb-6 animate-float">
                    <img
                      src="/ida-award.png"
                      alt="IDA Immobilien Dienstleister Award 2022"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Fallback placeholder if image not yet available */}
                    <div
                      className="w-full h-full rounded-full bg-gradient-to-br from-gold to-gold-light items-center justify-center shadow-lg hidden"
                    >
                      <div className="text-center">
                        <div className="text-xs font-bold text-white uppercase tracking-wider">
                          IDA
                        </div>
                        <div className="text-[10px] text-white/80">
                          Award
                        </div>
                        <div className="text-lg font-extrabold text-white">
                          2022
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-lg font-bold text-slate-dark mb-1">
                    Immobilien Dienstleister
                  </div>
                  <div className="text-sm text-slate-body mb-6">
                    Award 2022
                  </div>

                  {/* Stats Grid inside Award Card */}
                  <div className="grid grid-cols-3 gap-4 w-full pt-6 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-xl font-extrabold text-primary">
                        {siteConfig.stats.yearsExperience}
                      </div>
                      <div className="text-[11px] text-slate-body">
                        Jahre
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-extrabold text-primary">
                        {siteConfig.stats.googleRating}
                      </div>
                      <div className="text-[11px] text-slate-body">
                        Google
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-extrabold text-primary">
                        100M+
                      </div>
                      <div className="text-[11px] text-slate-body">
                        Volumen
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full animate-pulse-soft" />
              <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gold/20 rounded-full animate-float" />
            </div>
          </div>
        </div>
      </Container>

      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full translate-x-1/3" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-primary/[0.03] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/[0.02] to-transparent rounded-full pointer-events-none" />
    </section>
  );
}
