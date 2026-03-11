import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { footerNavItems } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";

export default function Footer() {
  return (
    <footer className="bg-slate-dark text-gray-300">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <img
                src="/Logo_Weiß.png"
                alt="homefin"
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ihr lokaler Immobilienmakler in {siteConfig.contact.address.city}.
              Professioneller Maklerservice zum fairsten Preis der Region.
            </p>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Service</h3>
            <ul className="space-y-3">
              {footerNavItems.service.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Unternehmen</h3>
            <ul className="space-y-3">
              {footerNavItems.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {footerNavItems.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Phone size={14} />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Mail size={14} />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-gray-400">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <span>
                    {siteConfig.contact.address.street}
                    <br />
                    {siteConfig.contact.address.zip}{" "}
                    {siteConfig.contact.address.city}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.</p>
            <div className="flex gap-6">
              <Link href="/impressum" className="hover:text-white transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
