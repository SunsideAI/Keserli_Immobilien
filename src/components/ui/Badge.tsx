import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "gold" | "success" | "neutral";
  className?: string;
}

const variants = {
  primary: "bg-primary-100 text-primary-800",
  gold: "bg-gold-light text-yellow-800",
  success: "bg-green-100 text-green-800",
  neutral: "bg-gray-100 text-gray-700",
};

export default function Badge({ children, variant = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
