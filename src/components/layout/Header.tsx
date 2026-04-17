"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { mainNavItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { NavItem } from "@/types";

function isActive(item: NavItem, pathname: string): boolean {
  if (pathname === item.href) return true;
  if (item.children) {
    return item.children.some((child) => pathname.startsWith(child.href));
  }
  return false;
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
              src="/Homefin_Logo.svg"
              alt="homefin"
              className="h-10 lg:h-14 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" ref={dropdownRef}>
            {mainNavItems.map((item) =>
              item.children ? (
                <div key={item.href} className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-primary relative",
                      isActive(item, pathname)
                        ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                        : "text-slate-body"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        openDropdown === item.label && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 origin-top",
                      openDropdown === item.label
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    )}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-5 py-3 text-sm font-medium transition-colors",
                          pathname.startsWith(child.href)
                            ? "bg-primary-50 text-primary"
                            : "text-slate-body hover:bg-gray-50 hover:text-primary"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
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
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center">
            <Button href="/kontakt" size="sm">
              <Phone size={16} className="mr-2" />
              Jetzt Kontakt aufnehmen
            </Button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <a
              href="tel:+498005888015"
              className="p-2 text-primary hover:bg-primary/10 rounded-btn transition-colors"
              aria-label="Jetzt anrufen"
            >
              <Phone size={22} />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-slate-dark hover:bg-gray-100 rounded-btn transition-colors"
              aria-label="Menü öffnen"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "lg:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-md transition-[opacity,transform] duration-250 ease-out will-change-[opacity,transform]",
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <nav className="px-4 py-4 space-y-1">
          {mainNavItems.map((item) =>
            item.children ? (
              <div key={item.href}>
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.label ? null : item.label)
                  }
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-3 rounded-btn text-base font-medium transition-colors",
                    isActive(item, pathname)
                      ? "bg-primary-50 text-primary"
                      : "text-slate-body hover:bg-gray-50"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={cn(
                      "transition-transform duration-200",
                      openDropdown === item.label && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-in-out",
                    openDropdown === item.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block pl-8 pr-4 py-2.5 text-sm font-medium transition-colors rounded-btn",
                          pathname.startsWith(child.href)
                            ? "text-primary"
                            : "text-slate-body hover:text-primary"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
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
            )
          )}
          <div className="pt-3 px-4">
            <Button href="/kontakt" className="w-full" shimmer={false}>
              <Phone size={16} className="mr-2" />
              Jetzt Kontakt aufnehmen
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
