import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

export default function SuchprofilTile() {
  return (
    <Link
      href="/suchprofil"
      className="group relative flex flex-col overflow-hidden rounded-card shadow-card hover:shadow-card-hover transition-all"
    >
      {/* Background with pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D7A7A] via-[#1a5c5c] to-[#134e4a]" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="relative flex flex-col items-center justify-center text-center text-white p-8 min-h-[320px]">
        {/* Icon */}
        <div className="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
          <Search size={36} className="text-white" />
        </div>

        <h3 className="text-2xl font-extrabold mb-2 leading-tight">
          Nicht das Passende<br />dabei?
        </h3>

        <p className="text-white/70 text-sm mb-8 max-w-[220px] leading-relaxed">
          Suchprofil erstellen und als Erster über neue Angebote informiert werden.
        </p>

        <span className="inline-flex items-center gap-2 bg-white text-[#2D7A7A] font-bold px-6 py-3 rounded-btn shadow-lg group-hover:gap-3 group-hover:shadow-xl transition-all duration-300">
          Suchprofil anlegen
          <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
