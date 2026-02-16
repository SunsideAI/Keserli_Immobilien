"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { mainNavItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm transition-all duration-300",
        scrolled && "shadow-md bg-white"
      )}
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center">
            <img
              src="/Homefin_Logo.png"
              alt="homefin"
              className="h-10 lg:h-14 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 hover:text-primary relative",
                  pathname === item.href
                    ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                    : "text-slate-body"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/immobilienbewertung" size="sm">
              Jetzt bewerten
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-dark hover:bg-gray-100 rounded-btn transition-colors"
            aria-label="Menü öffnen"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="px-4 py-4 space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-4 py-3 rounded-btn text-base font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary-50 text-primary"
                  : "text-slate-body hover:bg-gray-50"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 px-4">
            <Button href="/immobilienbewertung" className="w-full">
              Jetzt bewerten
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
