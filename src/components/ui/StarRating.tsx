import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  showNumber?: boolean;
  size?: number;
  className?: string;
}

export default function StarRating({
  rating,
  showNumber = true,
  size = 18,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={cn(
            star <= Math.round(rating)
              ? "fill-gold text-gold"
              : "fill-gray-200 text-gray-200"
          )}
        />
      ))}
      {showNumber && (
        <span className="ml-1 text-sm font-semibold text-slate-dark">
          {rating}
        </span>
      )}
    </div>
  );
}
