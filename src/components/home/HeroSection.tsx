"use client";

import Link from "next/link";
import { ArrowRight, Shield, Star, Truck } from "lucide-react";
import { HeroShader } from "./HeroShader";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-950">
      <HeroShader />

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-brand-950/40 via-transparent to-brand-950/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-brand-900/60 px-5 py-2 text-sm font-medium text-white backdrop-blur-md w-fit">
              <Star className="h-3.5 w-3.5 text-gold-400" />
              India&apos;s Premier Mobile Cart Manufacturer
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight">
              <span className="text-white">Your Business,</span>
              <br />
              <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                Anywhere.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-brand-200/80 max-w-xl leading-relaxed">
              From food carts to electric vehicles — we craft premium mobile
              business solutions that empower entrepreneurs across India. Quality,
              trust, and innovation in every build.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-base font-semibold text-brand-950 hover:from-gold-500 hover:to-gold-600 transition-all shadow-2xl shadow-gold-500/25"
              >
                Explore Our Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-300/30 bg-brand-900/40 px-7 py-3.5 text-base font-medium text-brand-100 hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Get a Quote
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-800/60 backdrop-blur-sm border border-brand-700/50">
                  <Truck className="h-5 w-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Pan-India</p>
                  <p className="text-xs text-brand-300">Delivery & Support</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-800/60 backdrop-blur-sm border border-brand-700/50">
                  <Shield className="h-5 w-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Premium</p>
                  <p className="text-xs text-brand-300">Quality Guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-800/60 backdrop-blur-sm border border-brand-700/50">
                  <Star className="h-5 w-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">1K+</p>
                  <p className="text-xs text-brand-300">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img
              src="/hero-image.png"
              alt="Welcome on Wheels - Premium Mobile Cart"
              className="w-full h-auto rounded-[2.5rem] shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-50 to-transparent z-10" />
    </section>
  );
}
