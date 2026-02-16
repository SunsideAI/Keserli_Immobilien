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

/* ── Sparkle/bokeh dots config ── */
const sparkles = [
  { top: "12%", right: "8%", w: 8, o: 0.25, d: 0, dur: 4 },
  { top: "22%", right: "18%", w: 5, o: 0.18, d: 0.6, dur: 3.5 },
  { top: "38%", right: "5%", w: 10, o: 0.12, d: 1.2, dur: 5 },
  { top: "52%", right: "12%", w: 6, o: 0.22, d: 1.8, dur: 3.8 },
  { top: "68%", right: "3%", w: 4, o: 0.28, d: 2.4, dur: 4.2 },
  { top: "28%", right: "28%", w: 5, o: 0.12, d: 0.9, dur: 3.2 },
  { top: "74%", right: "22%", w: 7, o: 0.16, d: 1.5, dur: 4.5 },
  { top: "18%", left: "12%", w: 4, o: 0.08, d: 2, dur: 3.6 },
  { top: "48%", left: "6%", w: 5, o: 0.1, d: 2.5, dur: 4.1 },
  { top: "82%", right: "35%", w: 6, o: 0.14, d: 0.3, dur: 3.4 },
];

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
    <section className="relative overflow-hidden">
      {/* ═══════════ Background: House image + gradient overlays ═══════════ */}
      <div className="absolute inset-0">
        {/* House photo - blurred background */}
        <img
          src="/images/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-[2px]"
        />
        {/* Gradient overlays for the mint/teal brand look */}
        <div className="absolute inset-0 bg-gradient-to-br from-mint/90 via-mint-light/85 to-white/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/30" />
      </div>

      {/* ═══════════ Background effects ═══════════ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.07] blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-gold/[0.05] blur-3xl" />

        {/* Bokeh sparkles */}
        {sparkles.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold animate-float"
            style={{
              top: s.top,
              right: s.right,
              left: (s as { left?: string }).left,
              width: s.w,
              height: s.w,
              opacity: s.o,
              animationDelay: `${s.d}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              "linear-gradient(#2D7A7A 1px, transparent 1px), linear-gradient(90deg, #2D7A7A 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ═══════════ Hero content ═══════════ */}
      <Container className="relative z-10">
        <div className="relative min-h-[calc(100vh-5rem)] lg:min-h-[620px] xl:min-h-[680px]">
          {/* ── Desktop 3-column layout: MAKLER | TEXT | AWARD ── */}
          <div className="hidden lg:grid lg:grid-cols-[auto_1fr_auto] gap-8 xl:gap-12 min-h-[inherit] items-end">
            {/* COL 1 — Makler person (LEFT, anchored to bottom, overlaps stats) */}
            <div
              className={`self-end z-20 transition-all duration-1000 ease-out delay-200 ${
                visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-16"
              }`}
            >
              <img
                src="/Makler.png"
                alt="Ihr Immobilienmakler"
                className="w-[300px] xl:w-[360px] 2xl:w-[400px] h-auto max-h-[580px] xl:max-h-[640px] object-contain object-bottom drop-shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
              />
            </div>

            {/* COL 2 — Text content (LEFT-ALIGNED, vertically centered) */}
            <div className="self-center pb-20 xl:pb-24">
              {/* Badge */}
              <div className={anim(visible, "delay-[0ms]")}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/10 mb-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Ihre Immobilienexperten
                </span>
              </div>

              {/* Headline — 2 lines */}
              <h1
                className={`text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-slate-dark leading-[1.08] mb-5 ${anim(
                  visible,
                  "delay-[100ms]"
                )}`}
              >
                Fairste Provision
                <br />
                <span className="relative inline-block">
                  der Region
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-3"
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
                className={`text-base xl:text-lg text-slate-body mb-8 max-w-md leading-relaxed ${anim(
                  visible,
                  "delay-[200ms]"
                )}`}
              >
                Premium-Maklerservice zum fairsten Preis |
                Immobilienverkauf bei Homefin ab nur{" "}
                <span className="font-bold text-slate-dark">
                  1,95&nbsp;% inkl.&nbsp;MwSt.
                </span>
              </p>

              {/* CTA */}
              <div className={anim(visible, "delay-[350ms]")}>
                <Button
                  href="/immobilienbewertung"
                  size="lg"
                  className="text-base px-8 py-4 shadow-btn hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  Kostenlose Bewertung erhalten
                  <ArrowRight
                    size={18}
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </div>

            {/* COL 3 — IDA Award (RIGHT, vertically centered, BIG) */}
            <div className="self-center pb-20 xl:pb-24">
              <div
                className={`relative flex flex-col items-center transition-all duration-1000 ease-out delay-300 ${
                  visible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-16 scale-90"
                }`}
              >
                {/* Glow */}
                <div className="absolute inset-0 -m-16">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 via-gold/10 to-primary/5 blur-3xl animate-pulse-soft" />
                </div>

                {/* AUSGEZEICHNET badge — top-right of award */}
                <div
                  className={`absolute -top-6 -right-4 z-10 transition-all duration-700 ease-out delay-500 ${
                    visible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-4 scale-90"
                  }`}
                >
                  <div className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full shadow-btn text-xs font-bold">
                    <Award size={14} />
                    AUSGEZEICHNET
                  </div>
                </div>

                {/* Award image — very big */}
                <img
                  src="/IDA_Award.png"
                  alt="IDA Immobilien Dienstleister Award 2022"
                  className="relative w-72 xl:w-[22rem] 2xl:w-[26rem] h-auto object-contain drop-shadow-2xl animate-float"
                />
              </div>
            </div>
          </div>

          {/* ── Mobile layout ── */}
          <div className="lg:hidden flex flex-col items-center text-center py-20 sm:py-24 gap-10">
            {/* Badge */}
            <div className={anim(visible, "delay-[0ms]")}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/10">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Ihre Immobilienexperten
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-4xl sm:text-5xl font-extrabold text-slate-dark leading-[1.08] ${anim(
                visible,
                "delay-[100ms]"
              )}`}
            >
              Fairste Provision
              <br />
              <span className="relative inline-block">
                der Region
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-3"
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
              className={`text-base sm:text-lg text-slate-body max-w-md leading-relaxed -mt-4 ${anim(
                visible,
                "delay-[200ms]"
              )}`}
            >
              Premium-Maklerservice zum fairsten Preis |
              Immobilienverkauf bei Homefin ab nur{" "}
              <span className="font-bold text-slate-dark">
                1,95&nbsp;% inkl.&nbsp;MwSt.
              </span>
            </p>

            {/* Makler image (mobile) */}
            <div
              className={`relative transition-all duration-1000 ease-out delay-300 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="absolute inset-0 -m-4 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-2xl" />
              <img
                src="/Makler.png"
                alt="Ihr Immobilienmakler"
                className="relative w-56 sm:w-64 h-auto object-contain mx-auto"
              />
            </div>

            {/* IDA Award (mobile) */}
            <div
              className={`relative ${anim(visible, "delay-[400ms]")}`}
            >
              <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-br from-primary/10 via-gold/10 to-primary/5 blur-2xl" />
              <div className="flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full shadow-btn text-xs font-bold mx-auto w-fit mb-3">
                <Award size={14} />
                AUSGEZEICHNET
              </div>
              <img
                src="/IDA_Award.png"
                alt="IDA Immobilien Dienstleister Award 2022"
                className="relative w-40 h-auto object-contain mx-auto"
              />
            </div>

            {/* CTA */}
            <div className={anim(visible, "delay-[500ms]")}>
              <Button
                href="/immobilienbewertung"
                size="lg"
                className="text-base px-8 py-4 shadow-btn hover:shadow-lg group"
              >
                Kostenlose Bewertung erhalten
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* ═══════════ Floating Stats Bar ═══════════ */}
      <div className="relative z-30 -mt-14 lg:-mt-12 pb-6 lg:pb-8">
        <Container>
          <div
            className={`transition-all duration-700 ease-out delay-[650ms] ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/60 p-5 lg:p-0 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-shadow duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-0 lg:divide-x lg:divide-gray-100">
                {/* Stat 1 — Faire Provision */}
                <div className="flex items-center gap-4 lg:px-8 lg:py-6 group cursor-default">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-btn">
                    <TrendingUp
                      size={20}
                      className="text-primary transition-colors duration-300 group-hover:text-white"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-slate-dark leading-tight">
                      1,95&nbsp;%
                    </div>
                    <div className="text-sm text-slate-body">
                      Faire Provision inkl. MwSt.
                    </div>
                  </div>
                </div>

                {/* Stat 2 — Vermittelte Immobilien */}
                <div className="flex items-center gap-4 lg:px-8 lg:py-6 group cursor-default">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-btn">
                    <Users
                      size={20}
                      className="text-primary transition-colors duration-300 group-hover:text-white"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-slate-dark leading-tight tabular-nums">
                      {formattedCount}
                    </div>
                    <div className="text-sm text-slate-body">
                      Vermittelte Immobilien
                    </div>
                  </div>
                </div>

                {/* Stat 3 — Google Bewertung */}
                <div className="flex items-center gap-4 lg:px-8 lg:py-6 group cursor-default">
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
                          className={`w-9 h-9 rounded-full ${a.bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-sm transition-transform duration-300 group-hover:scale-110`}
                          style={{ transitionDelay: `${i * 50}ms` }}
                        >
                          {a.initials}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5 mb-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={15}
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
