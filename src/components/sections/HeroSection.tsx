"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { TrustpilotMicro, TrustlocalPortrait } from "@/components/ui/TrustWidgets";
import { siteConfig } from "@/data/site-config";

function anim(visible: boolean, delay: string) {
  return `transition-[opacity,transform] duration-500 ease-out ${delay} will-change-[opacity,transform] ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;
}

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame for smoother initial paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }, []);

  return (
    <section className="relative">
      {/* ═══ Background ═══ */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hero image — NO blur on mobile, light blur on desktop */}
        <img
          src="/images/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover lg:scale-105 lg:blur-[2px]"
        />
        {/* Gradient overlays — simplified for mobile (fewer layers) */}
        <div className="absolute inset-0 bg-gradient-to-br from-mint/92 via-mint-light/88 to-white/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-white/20" />
      </div>

      {/* ═══ Background effects — desktop only ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.07] blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-gold/[0.05] blur-3xl" />
      </div>

      {/* ═══ Hero content ═══ */}
      <Container className="relative z-10">
        {/* Makler — desktop only */}
        <div
          className={`hidden lg:block absolute bottom-0 -right-[2%] xl:right-0 z-20 transition-[opacity,transform] duration-700 ease-out delay-700 will-change-[opacity,transform] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <img
            src="/Keseli_Makler.png"
            alt="Ihr Immobilienmakler (IHK)"
            className="h-[390px] xl:h-[430px] 2xl:h-[470px] w-auto object-contain object-bottom drop-shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
          />
        </div>

        <div className="relative min-h-0 lg:min-h-[620px] xl:min-h-[680px]">
          {/* IDA Award — desktop only */}
          <div
            className={`hidden lg:flex absolute inset-0 items-end justify-center pb-2 z-10 pointer-events-none transition-[opacity,transform] duration-700 ease-out delay-300 will-change-[opacity,transform] ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/8 via-gold/8 to-primary/4 blur-3xl animate-pulse-soft" />
            <img
              src="/IDA_Award.png"
              alt="IDA Immobilien Dienstleister Award 2022"
              className="w-[320px] xl:w-[380px] 2xl:w-[420px] h-auto object-contain drop-shadow-2xl animate-float opacity-85"
            />
          </div>

          {/* ── Desktop text ── */}
          <div className="hidden lg:flex min-h-[inherit] items-center relative z-20">
            <div className="pt-20 pb-28 max-w-[520px] xl:max-w-[560px]">
              <div className={anim(visible, "delay-[0ms]")}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/10 backdrop-blur-sm mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Ihre Immobilienexperten
                </span>
              </div>

              <h1
                className={`text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-slate-dark leading-[1.08] mb-5 ${anim(
                  visible,
                  "delay-100"
                )}`}
              >
                Fairste Provision
                <br />
                der Region
              </h1>

              <p
                className={`text-base xl:text-lg text-slate-body mb-8 max-w-md leading-relaxed ${anim(
                  visible,
                  "delay-200"
                )}`}
              >
                Premium-Maklerservice zum fairsten Preis |
                Immobilienverkauf bei Homefin ab nur{" "}
                <span className="font-bold text-slate-dark">
                  1,95&nbsp;% inkl.&nbsp;MwSt.
                </span>
              </p>

              <div className={anim(visible, "delay-300")}>
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

          {/* ── Mobile layout — lightweight, no blur/orbs ── */}
          <div className="lg:hidden flex flex-col items-center text-center pt-20 sm:pt-24 pb-6 px-2">
            <div className={anim(visible, "delay-[0ms]")}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] bg-white/80 text-primary border border-primary/15 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Ihre Immobilienexperten
              </span>
            </div>

            <h1
              className={`mt-5 text-[2.25rem] sm:text-[2.75rem] font-extrabold text-slate-dark leading-[1.05] tracking-tight ${anim(
                visible,
                "delay-75"
              )}`}
            >
              Fairste Provision
              <br />
              <span className="text-primary">der Region</span>
            </h1>

            <p
              className={`mt-4 text-[15px] sm:text-base text-slate-body max-w-[340px] sm:max-w-sm leading-relaxed ${anim(
                visible,
                "delay-150"
              )}`}
            >
              Premium-Maklerservice zum fairsten Preis |
              Immobilienverkauf bei Homefin ab nur{" "}
              <span className="font-bold text-slate-dark">
                1,95&nbsp;% inkl.&nbsp;MwSt.
              </span>
            </p>

            <div className={`mt-6 ${anim(visible, "delay-200")}`}>
              <Button
                href="/immobilienbewertung"
                size="lg"
                className="text-[15px] px-8 py-4 shadow-btn group rounded-xl"
              >
                Kostenlose Bewertung erhalten
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </div>

            {/* IDA Award — static, no glow animation on mobile */}
            <div className={`mt-8 ${anim(visible, "delay-300")}`}>
              <img
                src="/Ida_Award_Mobile.png"
                alt="IDA Immobilien Dienstleister Award 2022"
                className="w-36 sm:w-44 h-auto object-contain drop-shadow-lg mx-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* ═══ Trust Bar ═══ */}
      <div className="relative z-30 -mt-4 lg:-mt-12 mb-[-40px] lg:mb-[-48px]">
        <Container>
          <div
            className={`transition-[opacity,transform] duration-500 ease-out delay-500 will-change-[opacity,transform] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-gray-100 p-3 sm:p-4 lg:p-0">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-0 lg:divide-x lg:divide-gray-100 items-center">
                {/* Trustpilot */}
                <div className="flex items-center justify-center lg:px-6 lg:py-5 py-2 min-h-[60px]">
                  <div className="w-full max-w-[200px]">
                    <TrustpilotMicro />
                  </div>
                </div>

                {/* Trustlocal */}
                <div className="flex items-center justify-center lg:px-6 lg:py-5 py-2 min-h-[60px]">
                  <div className="w-full max-w-[200px]">
                    <TrustlocalPortrait />
                  </div>
                </div>

                {/* Google */}
                <div className="flex flex-col items-center text-center gap-1 sm:flex-row sm:text-left sm:items-center sm:gap-3 lg:px-6 lg:py-5 py-2 cursor-default">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Star size={20} className="text-gold fill-gold" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5 mb-0.5 justify-center sm:justify-start">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={13}
                          className={`sm:w-[15px] sm:h-[15px] ${
                            s <= Math.floor(siteConfig.stats.googleRating)
                              ? "fill-gold text-gold"
                              : "fill-gold/30 text-gold/30"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm font-bold text-slate-dark">
                        {siteConfig.stats.googleRating}
                      </span>
                    </div>
                    <div className="text-[10px] sm:text-sm text-slate-body leading-tight">
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
