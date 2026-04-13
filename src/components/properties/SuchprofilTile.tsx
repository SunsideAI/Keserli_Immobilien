import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

export default function SuchprofilTile() {
  return (
    <Link
      href="/suchprofil"
      className="group relative flex flex-col overflow-hidden rounded-card shadow-card hover:shadow-card-hover transition-all"
    >
      {/* Medium teal background matching blog card headers */}
      <div className="absolute inset-0 bg-[#2D7A7A]" />
      {/* Subtle house silhouettes like the blog cards */}
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 20L30 50v30h20V60h20v20h20V50L60 20z' fill='%23fff'/%3E%3C/svg%3E\")" }} />

      <div className="relative flex flex-col items-center justify-center text-center text-white p-8 min-h-[320px]">
        {/* Icon */}
        <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
          <Search size={30} className="text-white" />
        </div>

        <h3 className="text-xl font-extrabold mb-2 leading-tight">
          Nicht das Passende dabei?
        </h3>

        <p className="text-white/75 text-sm mb-6 max-w-[240px] leading-relaxed">
          Suchprofil erstellen und als Erster über neue Angebote informiert werden.
        </p>

        <span className="inline-flex items-center gap-2 bg-white text-[#2D7A7A] font-semibold px-6 py-3 rounded-btn shadow-lg group-hover:gap-3 group-hover:shadow-xl transition-all duration-300">
          Suchprofil anlegen
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
