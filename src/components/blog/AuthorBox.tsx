import { Star, Shield, Award } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export default function AuthorBox() {
  return (
    <div className="bg-gradient-to-br from-mint-light to-mint rounded-xl p-5 sm:p-6 border border-primary/10">
      <div className="flex items-start gap-4">
        <img
          src={siteConfig.owner.photo}
          alt={siteConfig.owner.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover object-top border-2 border-primary/20 flex-shrink-0"
        />
        <div className="min-w-0">
          <div className="text-xs font-bold uppercase tracking-wide text-primary mb-1">
            Autor
          </div>
          <div className="text-lg font-bold text-slate-dark">
            {siteConfig.owner.name}
          </div>
          <div className="text-sm text-slate-body mb-3">
            {siteConfig.owner.title} &middot; {siteConfig.name}
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-body">
            <span className="inline-flex items-center gap-1">
              <Shield size={12} className="text-primary" />
              Immobilienmakler (IHK)
            </span>
            <span className="inline-flex items-center gap-1">
              <Award size={12} className="text-gold" />
              IDA Award
            </span>
            <span className="inline-flex items-center gap-1">
              <Star size={12} className="text-gold fill-gold" />
              {siteConfig.stats.googleRating} Google
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
