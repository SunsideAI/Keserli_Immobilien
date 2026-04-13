import Link from "next/link";
import { Bell, ArrowRight } from "lucide-react";

export default function SuchprofilTile() {
  return (
    <Link
      href="/suchprofil"
      className="group flex flex-col items-center justify-center bg-gradient-to-br from-primary to-primary-800 rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-all min-h-[320px] p-8 text-center text-white"
    >
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
        <Bell size={28} className="text-white" />
      </div>

      <h3 className="text-xl font-bold mb-3">
        Nicht das Passende dabei?
      </h3>

      <p className="text-white/80 text-sm mb-6 max-w-[240px]">
        Erstellen Sie Ihr persönliches Suchprofil und wir informieren Sie über
        passende Immobilien.
      </p>

      <span className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-5 py-2.5 rounded-btn group-hover:gap-3 transition-all">
        Suchprofil anlegen
        <ArrowRight size={16} />
      </span>
    </Link>
  );
}
