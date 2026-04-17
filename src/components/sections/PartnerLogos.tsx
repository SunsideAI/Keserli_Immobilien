"use client";

const partners = [
  { src: "/images/partners/Immoscout_Logo_Updated.png", alt: "ImmoScout24 Partner", height: 60 },
  { src: "/images/partners/Immowelt.png", alt: "Immowelt", height: 50 },
  { src: "/images/partners/NEU_Logo_IVD-Immobilienunternehmer_CMYK.png", alt: "IVD Immobilienunternehmer", height: 60 },
  { src: "/images/partners/ka_horizontal_lightgreen_rgb.png", alt: "Kautionsfrei", height: 48 },
  { src: "/images/partners/Backbone.png", alt: "Backbone", height: 44 },
  { src: "/images/partners/MS_Logo_line_RGB_black_yellow.png", alt: "MS Immobilien", height: 50 },
  { src: "/images/partners/logo-rgb-immonet.webp", alt: "Immonet", height: 44 },
  { src: "/images/partners/Monheimer_Lokalhelden.png", alt: "Monheimer Lokalhelden", height: 55 },
  { src: "/images/partners/radio_koeln.png", alt: "Radio Köln", height: 52 },
  { src: "/images/partners/Alpha-Energieausweis.png", alt: "Alpha Energieausweis", height: 50 },
];

function LogoSet({ duplicate }: { duplicate?: boolean }) {
  return (
    <div
      className="flex items-center gap-12 sm:gap-16 shrink-0 px-8"
      aria-hidden={duplicate}
    >
      {partners.map((p, i) => (
        <div
          key={duplicate ? `dup-${i}` : i}
          className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src}
            alt={p.alt}
            className="w-auto max-w-[200px] object-contain"
            style={{ height: p.height }}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export default function PartnerLogos() {
  return (
    <section className="relative z-20 pt-16 lg:pt-4 pb-6 overflow-hidden bg-transparent">
      <p className="text-center text-sm text-slate-body font-medium tracking-wide uppercase mb-6">
        Unsere Partner &amp; Netzwerk
      </p>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling track — two identical sets for seamless loop */}
        <div className="flex w-max will-change-transform animate-marquee hover:[animation-play-state:paused]">
          <LogoSet />
          <LogoSet duplicate />
        </div>
      </div>
    </section>
  );
}
