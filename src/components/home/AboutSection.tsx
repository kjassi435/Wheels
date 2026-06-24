import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const highlights = [
  "Premium stainless steel construction",
  "Custom designs to match your brand",
  "Pan-India delivery & installation",
  "1,000+ satisfied business owners",
];

export function AboutSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-[2.5rem] bg-gradient-to-br from-brand-100 to-brand-50 border border-brand-100 overflow-hidden">
              <img
                src="/about-image.png"
                alt="Welcome on Wheels Manufacturing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-gradient-to-br from-brand-800 to-brand-900 p-6 shadow-2xl hidden lg:block">
              <p className="text-3xl font-display font-bold text-white">10+</p>
              <p className="text-sm text-brand-300">Years of Craftsmanship</p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-400">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-900 leading-tight">
              Take Your Business<br />
              <span className="gradient-text">Anywhere</span>
            </h2>
            <p className="text-lg text-brand-600/80 leading-relaxed">
              Welcome on Wheels (Bajaj India Services) is a premier manufacturer of
              innovative mobile carts, food vans, and electric vehicles based in
              Jaipur. We empower entrepreneurs with high-quality, customizable
              mobile business solutions that stand out.
            </p>
            <ul className="space-y-3 pt-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
                  <span className="text-brand-700">{h}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3 text-sm font-semibold text-white hover:from-brand-700 hover:to-brand-800 transition-all shadow-lg shadow-brand-600/25"
            >
              Discover Our Story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
