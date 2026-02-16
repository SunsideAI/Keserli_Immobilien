"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const soldNumber = parseInt(siteConfig.stats.propertiesSold.replace(/\D/g, "")) || 1000;
  const animatedCount = useCountUp(soldNumber, 2200, visible);
  const formattedCount =
    animatedCount >= 1000
      ? `${Math.floor(animatedCount / 1000)}.${String(animatedCount % 1000).padStart(3, "0")}+`
      : `${animatedCount}+`;

  const benefits = [
    "Kostenlose Erstberatung",
    "Keine versteckten Kosten",
    "Regionale Marktkenntnis",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-mint via-mint-light to-white overflow-hidden min-h-[calc(100vh-5rem)]"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-primary/20 animate-float" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-gold/30 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-primary/15 animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <Container className="relative z-10 py-24 lg:py-28 xl:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          {/* ── Left Content ── */}
          <div className="pt-4 lg:pt-8">
            {/* Badge */}
            <div
              className={`mb-8 transition-all duration-700 ease-out ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="inline-flex items-center px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/10">
                Ihre Immobilienexperten
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-slate-dark leading-[1.05] mb-8 transition-all duration-700 ease-out delay-150 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Fairste Provision
              <br />
              <span className="relative inline-block">
                der Region
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q75 2, 150 6 Q225 10, 298 4"
                    stroke="#2D7A7A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className={`transition-all duration-1000 delay-700 ${
                      visible ? "opacity-40" : "opacity-0"
                    }`}
                    style={{
                      strokeDasharray: 400,
                      strokeDashoffset: visible ? 0 : 400,
                      transition: "stroke-dashoffset 1.2s ease-out 0.8s, opacity 0.5s ease-out 0.8s",
                    }}
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-lg sm:text-xl text-slate-body mb-8 max-w-xl leading-relaxed transition-all duration-700 ease-out delay-300 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Premium-Maklerservice zum fairsten Preis | Immobilienverkauf
              bei Homefin ab nur{" "}
              <span className="font-bold text-slate-dark">1,95 % inkl. MwSt.</span>
            </p>

            {/* Benefits checklist */}
            <ul
              className={`flex flex-col sm:flex-row gap-3 sm:gap-6 mb-10 transition-all duration-700 ease-out delay-[400ms] ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {benefits.map((b, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm font-medium text-slate-dark"
                  style={{ transitionDelay: `${450 + i * 100}ms` }}
                >
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div
              className={`transition-all duration-700 ease-out delay-[600ms] ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Button
                href="/immobilienbewertung"
                size="lg"
                className="text-base sm:text-lg px-10 py-4 shadow-btn hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Kostenlose Bewertung erhalten
                <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* ── Right Side ── */}
          <div className="hidden lg:flex flex-col items-center pt-4">
            {/* IDA Award Image - very large, floating */}
            <div
              className={`mb-10 transition-all duration-1000 ease-out delay-300 ${
                visible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-95"
              }`}
            >
              <div className="relative">
                {/* Glow behind award */}
                <div className="absolute inset-0 bg-gold/10 rounded-full blur-3xl scale-75 animate-pulse-soft" />
                <img
                  src="/IDA_Award.png"
                  alt="IDA Immobilien Dienstleister Award 2022"
                  className="relative w-[22rem] xl:w-[26rem] h-auto object-contain mx-auto drop-shadow-2xl animate-float"
                />
              </div>
            </div>

            {/* Stats Card */}
            <div
              className={`w-full max-w-sm bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 shadow-card p-8 text-center transition-all duration-700 ease-out delay-500 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-6xl xl:text-7xl font-extrabold text-slate-dark mb-2 tabular-nums">
                {formattedCount}
              </div>
              <div className="text-base text-slate-body mb-6">
                Erfolgreich vermittelte Immobilien
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

              {/* Avatars + Trust Text + Stars */}
              <div className="flex flex-col items-center gap-3">
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
                      className={`w-11 h-11 rounded-full ${a.bg} border-[2.5px] border-white flex items-center justify-center text-white text-xs font-bold shadow-sm transition-transform duration-300 hover:scale-110 hover:z-10`}
                    >
                      {a.initials}
                    </div>
                  ))}
                </div>

                <p className="text-sm text-slate-body font-medium">
                  Zufriedene Kunden sprechen für sich
                </p>

                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={20}
                      className={`transition-all duration-300 ${
                        s <= Math.floor(siteConfig.stats.googleRating)
                          ? "fill-gold text-gold"
                          : "fill-gold/30 text-gold/30"
                      }`}
                      style={{ animationDelay: `${s * 100}ms` }}
                    />
                  ))}
                  <span className="ml-2 text-sm font-bold text-slate-dark">
                    {siteConfig.stats.googleRating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Mobile-only: Award + Stats ── */}
          <div
            className={`lg:hidden flex flex-col items-center text-center mt-4 transition-all duration-700 ease-out delay-500 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gold/10 rounded-full blur-2xl scale-75" />
              <img
                src="/IDA_Award.png"
                alt="IDA Immobilien Dienstleister Award 2022"
                className="relative w-60 h-auto object-contain mx-auto"
              />
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 shadow-card p-6 w-full max-w-xs">
              <div className="text-5xl font-extrabold text-slate-dark mb-2 tabular-nums">
                {formattedCount}
              </div>
              <div className="text-sm text-slate-body mb-5">
                Erfolgreich vermittelte Immobilien
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5" />
              <div className="flex -space-x-2.5 justify-center mb-3">
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
              <div className="flex items-center gap-0.5 justify-center">
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
                <span className="ml-1.5 text-xs font-bold text-slate-dark">
                  {siteConfig.stats.googleRating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
