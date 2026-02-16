"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}

export default function ScrollAnimator({
  children,
  className,
  stagger = false,
  delay,
}: ScrollAnimatorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? `delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={cn(
        stagger ? "stagger-children" : "animate-on-scroll",
        delayClass,
        className
      )}
    >
      {children}
    </div>
  );
}
