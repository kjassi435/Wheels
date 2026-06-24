import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const companyInfo = {
  email: "info@welcomeonwheels.com",
  phone: "+916376671590",
  address: "61, Mithila Vihar, Jaipur, Rajasthan",
};

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/inquiry", label: "Send Inquiry" },
  { href: "/future-launches", label: "Coming Soon" },
  { href: "/contact", label: "Contact" },
];

const productLinksRow1 = [
  { href: "/products?category=food-carts", label: "Food Carts" },
  { href: "/products?category=food-vans", label: "Food Vans" },
  { href: "/products?category=electric-vehicle-carts", label: "EV Carts" },
  { href: "/products?category=food-trailers", label: "Food Trailers" },
  { href: "/products?category=mobile-accessory-cart", label: "Mobile Accessory Cart" },
  { href: "/products?category=cosmetic-cart", label: "Cosmetic Cart" },
];

const productLinksRow2 = [
  { href: "/products?category=grocery-cart", label: "Grocery Cart" },
  { href: "/products?category=garment-shop-cart", label: "Garment Shop Cart" },
  { href: "/products?category=footwear-cart", label: "Footwear Cart" },
  { href: "/products?category=electric-tricycle-carts", label: "E-Tricycle" },
  { href: "/products?category=ice-cream-carts", label: "Ice Cream Carts" },
];

export function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Company Info */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <img
                src="/logo-wow.png"
                alt="Welcome on Wheels"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-brand-400 max-w-xs">
              India&apos;s premier manufacturer of innovative mobile carts, food vans,
              and electric vehicles. Take your business anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-400 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-600 group-hover:bg-gold-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Row 1 */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-400 mb-5">
              Products
            </h3>
            <ul className="space-y-2.5">
              {productLinksRow1.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-600 group-hover:bg-gold-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Row 2 */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-400 mb-5 invisible">
              More
            </h3>
            <ul className="space-y-2.5">
              {productLinksRow2.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-600 group-hover:bg-gold-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-400 mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                <a href={`tel:${companyInfo.phone}`} className="text-sm text-brand-400 hover:text-white transition-colors">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                <a href={`mailto:${companyInfo.email}`} className="text-sm text-brand-400 hover:text-white transition-colors">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-sm text-brand-400 leading-relaxed">
                  {companyInfo.address}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-brand-500">
            &copy; {new Date().getFullYear()} Welcome on Wheels (Bajaj India Services). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
