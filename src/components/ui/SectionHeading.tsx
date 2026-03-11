import { cn } from "@/lib/utils";
import Badge from "./Badge";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  alignment = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 lg:mb-12",
        alignment === "center" && "text-center",
        alignment === "left" && "text-left"
      )}
    >
      {badge && (
        <div className="mb-3 lg:mb-4">
          <Badge variant={light ? "primary" : "primary"}>{badge}</Badge>
        </div>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4",
          light ? "text-white" : "text-slate-dark"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base lg:text-lg max-w-2xl",
            alignment === "center" && "mx-auto",
            light ? "text-gray-300" : "text-slate-body"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
