"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Star, TrendingUp, Users, Award } from "lucide-react";
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

function anim(visible: boolean, delay: string) {
  return `transition-all duration-700 ease-out ${delay} ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`;
}

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const soldNumber =
    parseInt(siteConfig.stats.propertiesSold.replace(/\D/g, "")) || 1000;
  const animatedCount = useCountUp(soldNumber, 2400, visible);
  const formattedCount =
    animatedCount >= 1000
      ? `${Math.floor(animatedCount / 1000)}.${String(
          animatedCount % 1000
        ).padStart(3, "0")}+`
      : `${animatedCount}+`;

  return (
    <section className="relative bg-gradient-to-br from-mint via-mint-light to-white overflow-hidden">
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large blurred orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl" />

        {/* Animated floating particles */}
        <div
          className="absolute top-[20%] right-[15%] w-2 h-2 rounded-full bg-primary/20 animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-[60%] right-[25%] w-1.5 h-1.5 rounded-full bg-gold/25 animate-float"
          style={{ animationDelay: "1.2s" }}
        />
        <div
          className="absolute top-[30%] left-[10%] w-2 h-2 rounded-full bg-primary/10 animate-float"
          style={{ animationDelay: "2.4s" }}
        />
        <div
          className="absolute top-[75%] left-[20%] w-1.5 h-1.5 rounded-full bg-primary/15 animate-float"
          style={{ animationDelay: "0.8s" }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(#2D7A7A 1px, transparent 1px), linear-gradient(90deg, #2D7A7A 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Main hero content ── */}
      <Container className="relative z-10 pt-24 pb-32 lg:pt-28 lg:pb-40 xl:pt-32 xl:pb-44">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
          {/* ── LEFT: Text content ── */}
          <div>
            {/* Badge */}
            <div className={anim(visible, "delay-[0ms]")}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/10 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Ihre Immobilienexperten
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-5xl sm:text-6xl lg:text-[3.5rem] xl:text-7xl font-extrabold text-slate-dark leading-[1.05] mb-6 ${anim(
                visible,
                "delay-[100ms]"
              )}`}
            >
              Fairste Provision
              <br />
              <span className="relative inline-block">
                der Region
                {/* Animated underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q75 2, 150 6 Q225 10, 298 4"
                    stroke="#2D7A7A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 400,
                      strokeDashoffset: visible ? 0 : 400,
                      opacity: visible ? 0.35 : 0,
                      transition:
                        "stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1) 0.6s, opacity 0.4s ease 0.6s",
                    }}
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-lg sm:text-xl text-slate-body mb-10 max-w-lg leading-relaxed ${anim(
                visible,
                "delay-[200ms]"
              )}`}
            >
              Premium-Maklerservice zum fairsten Preis | Immobilienverkauf bei
              Homefin ab nur{" "}
              <span className="font-bold text-slate-dark">
                1,95&nbsp;% inkl.&nbsp;MwSt.
              </span>
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 ${anim(
                visible,
                "delay-[350ms]"
              )}`}
            >
              <Button
                href="/immobilienbewertung"
                size="lg"
                className="text-base px-8 py-4 shadow-btn hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
              >
                Kostenlose Bewertung
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
              <Button
                href="/kontakt"
                variant="secondary"
                size="lg"
                className="text-base px-8 py-4"
              >
                Beratungsgespräch
              </Button>
            </div>
          </div>

          {/* ── RIGHT: IDA Award ── */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              className={`relative transition-all duration-1000 ease-out delay-300 ${
                visible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-16 scale-90"
              }`}
            >
              {/* Glow ring behind award */}
              <div className="absolute inset-0 -m-8">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 via-gold/10 to-primary/5 blur-3xl animate-pulse-soft" />
              </div>

              {/* Award image */}
              <img
                src="/IDA_Award.png"
                alt="IDA Immobilien Dienstleister Award 2022"
                className="relative w-[20rem] xl:w-[24rem] h-auto object-contain drop-shadow-2xl animate-float"
              />

              {/* AUSGEZEICHNET badge */}
              <div
                className={`absolute -bottom-4 left-1/2 -translate-x-1/2 transition-all duration-700 ease-out delay-700 ${
                  visible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-90"
                }`}
              >
                <div className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full shadow-btn text-sm font-bold whitespace-nowrap">
                  <Award size={16} />
                  AUSGEZEICHNET
                </div>
              </div>
            </div>
          </div>

          {/* ── Mobile Award ── */}
          <div
            className={`lg:hidden flex justify-center ${anim(
              visible,
              "delay-[400ms]"
            )}`}
          >
            <div className="relative">
              <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-br from-primary/10 via-gold/10 to-primary/5 blur-2xl" />
              <img
                src="/IDA_Award.png"
                alt="IDA Immobilien Dienstleister Award 2022"
                className="relative w-52 h-auto object-contain"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full shadow-btn text-xs font-bold whitespace-nowrap">
                  <Award size={14} />
                  AUSGEZEICHNET
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Floating Stats Bar ── */}
      <div className="relative z-20 -mt-16 lg:-mt-20 pb-8">
        <Container>
          <div
            className={`transition-all duration-700 ease-out delay-[600ms] ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/60 p-6 lg:p-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-0 lg:divide-x lg:divide-gray-100">
                {/* Stat 1: Faire Provision */}
                <div className="flex items-center gap-4 lg:px-8 lg:py-7 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <TrendingUp size={22} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-slate-dark leading-tight">
                      1,95&nbsp;%
                    </div>
                    <div className="text-sm text-slate-body">
                      Faire Provision inkl. MwSt.
                    </div>
                  </div>
                </div>

                {/* Stat 2: Vermittelte Immobilien */}
                <div className="flex items-center gap-4 lg:px-8 lg:py-7 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Users size={22} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-slate-dark leading-tight tabular-nums">
                      {formattedCount}
                    </div>
                    <div className="text-sm text-slate-body">
                      Vermittelte Immobilien
                    </div>
                  </div>
                </div>

                {/* Stat 3: Bewertung */}
                <div className="flex items-center gap-4 lg:px-8 lg:py-7 group">
                  <div className="flex-shrink-0">
                    <div className="flex -space-x-2.5">
                      {[
                        { bg: "bg-primary-700", initials: "OK" },
                        { bg: "bg-primary-500", initials: "TM" },
                        { bg: "bg-teal-dark", initials: "JS" },
                        { bg: "bg-primary", initials: "MR" },
                      ].map((a, i) => (
                        <div
                          key={i}
                          className={`w-10 h-10 rounded-full ${a.bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-sm transition-transform duration-300 group-hover:scale-105`}
                          style={{
                            transitionDelay: `${i * 50}ms`,
                          }}
                        >
                          {a.initials}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
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
                      <span className="ml-1 text-sm font-bold text-slate-dark">
                        {siteConfig.stats.googleRating}
                      </span>
                    </div>
                    <div className="text-sm text-slate-body">
                      Google Bewertungen
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
