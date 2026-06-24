import { Target, Eye, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-400">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-900 mt-4 leading-tight">
            Crafting Mobile<br />Business Excellence
          </h1>
          <div className="divider mx-auto mt-6" />
        </div>

        <div className="relative rounded-[2.5rem] overflow-hidden border border-brand-100 shadow-xl bg-white mb-16 aspect-video">
          <img
            src="/about-hero.png"
            alt="Welcome on Wheels Manufacturing"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-xl text-brand-600 leading-relaxed mb-6">
            Welcome on Wheels (Bajaj India Services) is a premier manufacturer and supplier
            of innovative mobile carts, food vans, and electric vehicles. Based in the vibrant
            city of Jaipur, Rajasthan, we have been at the forefront of the mobile business
            revolution in India.
          </p>
          <p className="text-lg text-brand-500 leading-relaxed">
            Our mission is simple: to help entrepreneurs take their business anywhere. Whether
            you're starting a street food venture, a mobile café, or an ice cream business, we
            provide the highest quality mobile solutions that combine durability, functionality,
            and aesthetic appeal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-2xl bg-white border border-brand-100 p-8 text-center card-3d shadow-sm">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-600 mb-5">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-display font-semibold text-brand-900 mb-2">Our Mission</h3>
            <p className="text-sm text-brand-500 leading-relaxed">
              To empower aspiring entrepreneurs with high-quality, affordable mobile business solutions.
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-brand-100 p-8 text-center card-3d shadow-sm">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-600 mb-5">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-display font-semibold text-brand-900 mb-2">Our Vision</h3>
            <p className="text-sm text-brand-500 leading-relaxed">
              To be India's most trusted manufacturer of mobile business solutions.
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-brand-100 p-8 text-center card-3d shadow-sm">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-600 mb-5">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-display font-semibold text-brand-900 mb-2">Our Values</h3>
            <p className="text-sm text-brand-500 leading-relaxed">
              Quality, innovation, customer satisfaction, and integrity in everything we do.
            </p>
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-gradient-to-br from-brand-800 to-brand-900 p-10 lg:p-14 text-center shadow-2xl">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-brand-300 mb-8 max-w-xl mx-auto">
            Join 1,000+ successful business owners who chose Welcome on Wheels.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-base font-semibold text-brand-950 hover:from-gold-500 hover:to-gold-600 transition-all shadow-xl"
            >
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-400/30 px-7 py-3.5 text-base font-medium text-brand-200 hover:bg-white/5 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
