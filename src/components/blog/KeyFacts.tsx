import { CheckCircle } from "lucide-react";

export default function KeyFacts({ facts }: { facts: string[] }) {
  if (!facts || facts.length === 0) return null;

  return (
    <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-4 sm:p-5 mb-8">
      <div className="text-sm font-bold uppercase tracking-wide text-primary mb-3">
        Das Wichtigste in Kürze
      </div>
      <ul className="space-y-2">
        {facts.map((fact, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-dark leading-relaxed">
            <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
