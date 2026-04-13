import Link from "next/link";
import { Bell } from "lucide-react";

export default function SuchprofilTile() {
  return (
    <Link
      href="/suchprofil"
      className="group flex flex-col justify-between bg-primary rounded-card shadow-card hover:shadow-card-hover transition-all p-6 min-h-[320px]"
    >
      <div>
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
          <Bell size={24} className="text-white" />
        </div>

        <h3 className="text-xl font-bold text-white mb-3 leading-snug">
          Nicht das Passende dabei?
        </h3>

        <p className="text-white/80 text-sm leading-relaxed">
          Legen Sie jetzt Ihr persönliches Suchprofil an – ich
          benachrichtige Sie sofort, wenn die richtige Immobilie
          verfügbar ist.
        </p>
      </div>

      <div className="mt-6">
        <span className="inline-flex items-center gap-2 text-primary bg-white font-semibold text-sm px-5 py-2.5 rounded-btn group-hover:bg-white/90 transition-colors">
          <Bell size={14} />
          Suchprofil anlegen
        </span>
      </div>
    </Link>
  );
}
