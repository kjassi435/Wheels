import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="pt-28 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-400">
            Events
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-900 mt-4 leading-tight">
            Events & Exhibitions
          </h1>
          <div className="divider mx-auto mt-6" />
          <p className="text-lg text-brand-500 mt-6">
            Visit us at upcoming events to experience our products in person
          </p>
        </div>

        <div className="space-y-6">
          <div className="card-3d rounded-2xl border border-brand-100 bg-white p-6 lg:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 flex flex-col items-center justify-center text-center border border-brand-100">
                <span className="text-xs font-bold tracking-wider uppercase text-brand-400">Jun</span>
                <span className="text-3xl font-display font-bold text-brand-700">25</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-display font-semibold text-brand-900">Jaipur Food Expo 2026</h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-brand-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-brand-400" /> Jaipur Exhibition Centre
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-brand-400" /> 25-27 June 2026
                  </span>
                </div>
                <p className="text-brand-600 mt-3">
                  Visit our stall at the Jaipur Food Expo to see our latest food carts and vans in action.
                </p>
              </div>
            </div>
          </div>

          <div className="card-3d rounded-2xl border border-brand-100 bg-white p-6 lg:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 flex flex-col items-center justify-center text-center border border-brand-100">
                <span className="text-xs font-bold tracking-wider uppercase text-brand-400">Aug</span>
                <span className="text-3xl font-display font-bold text-brand-700">12</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-display font-semibold text-brand-900">Street Food Festival 2026</h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-brand-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-brand-400" /> Delhi Haat
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-brand-400" /> 12-15 August 2026
                  </span>
                </div>
                <p className="text-brand-600 mt-3">
                  Showcasing our latest electric carts and ice cream carts at Delhi&apos;s premier food festival.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 p-10 lg:p-14 rounded-[2.5rem] bg-gradient-to-br from-cream-100 to-white border border-brand-100">
          <h2 className="text-2xl font-display font-semibold text-brand-900 mb-2">
            Want us at your event?
          </h2>
          <p className="text-brand-500 mb-6">
            We&apos;d love to showcase our products at your exhibition or food festival.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3 text-sm font-semibold text-white hover:from-brand-700 hover:to-brand-800 transition-all shadow-lg"
          >
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
