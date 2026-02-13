import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export default function Card({ children, hover = false, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-card shadow-card",
        hover && "transition-shadow duration-200 hover:shadow-card-hover",
        className
      )}
    >
      {children}
    </div>
  );
}
