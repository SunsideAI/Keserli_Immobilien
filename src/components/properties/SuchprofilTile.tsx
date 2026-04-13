import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

export default function SuchprofilTile() {
  return (
    <Link
      href="/suchprofil"
      className="group relative flex flex-col overflow-hidden rounded-card shadow-card hover:shadow-card-hover transition-all"
    >
      {/* Light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-mint via-primary-100 to-primary-200" />

      <div className="relative flex flex-col items-center justify-center text-center p-8 min-h-[320px]">
        {/* Icon */}
        <div className="w-16 h-16 bg-primary/15 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/25 transition-all duration-300">
          <Search size={30} className="text-primary" />
        </div>

        <h3 className="text-xl font-extrabold text-slate-dark mb-2 leading-tight">
          Nicht das Passende dabei?
        </h3>

        <p className="text-slate-body text-sm mb-6 max-w-[240px] leading-relaxed">
          Suchprofil erstellen und als Erster über neue Angebote informiert werden.
        </p>

        <span className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-btn shadow-btn group-hover:bg-primary-800 group-hover:gap-3 transition-all duration-300">
          Suchprofil anlegen
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
