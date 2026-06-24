"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChevronDown, User, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "#",
    label: "Products",
    children: [
      { href: "/products?category=food-carts", label: "Food Carts" },
      { href: "/products?category=food-vans", label: "Food Vans" },
      { href: "/products?category=electric-vehicle-carts", label: "EV Carts" },
      { href: "/products?category=food-trailers", label: "Food Trailers" },
      { href: "/products?category=mobile-accessory-cart", label: "Mobile Accessory Cart" },
      { href: "/products?category=cosmetic-cart", label: "Cosmetic Cart" },
      { href: "/products?category=grocery-cart", label: "Grocery Cart" },
      { href: "/products?category=garment-shop-cart", label: "Garment Shop Cart" },
      { href: "/products?category=footwear-cart", label: "Footwear Cart" },
      { href: "/products?category=electric-tricycle-carts", label: "E-Tricycle" },
      { href: "/products?category=ice-cream-carts", label: "Ice Cream Carts" },
    ],
  },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/future-launches", label: "Coming Soon" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const isAdmin = (session?.user as any)?.role === "admin";
  const isHome = pathname === "/";
  const lightText = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-lg shadow-brand-900/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo-wow.png"
            alt="Welcome on Wheels"
            className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    lightText
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-brand-700 hover:text-brand-900 hover:bg-brand-50"
                  }`}
                >
                  {link.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 pt-4 w-60 rounded-xl border border-brand-100 bg-white shadow-xl shadow-brand-900/10 animate-fade-in-up">
                    <div className="p-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="group flex items-center justify-between rounded-lg px-4 py-2.5 text-sm text-brand-800 hover:bg-brand-50 hover:text-brand-600 transition-all"
                        >
                          {child.label}
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  lightText
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-brand-700 hover:text-brand-900 hover:bg-brand-50"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href={isAdmin ? "/admin" : "/inquiry"}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  lightText
                    ? "text-white/90 hover:bg-white/10"
                    : "text-brand-700 hover:bg-brand-50"
                }`}
              >
                <User className="h-4 w-4" />
                {session.user?.name}
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/25"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/auth/login"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  lightText
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-brand-700 hover:text-brand-900 hover:bg-brand-50"
                }`}
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800 transition-all shadow-lg shadow-brand-600/25"
              >
                Get Started
              </Link>
            </div>
          )}

          <button
            className={`lg:hidden p-2.5 rounded-lg transition-all ${
              lightText
                ? "text-white hover:bg-white/10"
                : "text-brand-700 hover:text-brand-900 hover:bg-brand-50"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-brand-100">
          <div className="max-w-7xl mx-auto px-6 py-5 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-400">
                    {link.label}
                  </p>
                  <div className="ml-4 space-y-0.5">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-brand-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="w-1 h-1 rounded-full bg-brand-300" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2.5 text-sm font-medium text-brand-800 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <hr className="my-3 border-brand-100" />
            {session ? (
              <div className="space-y-1">
                <Link
                  href={isAdmin ? "/admin" : "/inquiry"}
                  className="block px-4 py-2.5 text-sm text-brand-700 hover:bg-brand-50 rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {isAdmin ? "Dashboard" : "Send Inquiry"}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3 pt-2">
                <Link
                  href="/auth/login"
                  className="flex-1 text-center px-4 py-2.5 text-sm font-medium border border-brand-200 text-brand-700 rounded-lg hover:bg-brand-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="flex-1 text-center px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-lg shadow-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
