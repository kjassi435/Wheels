"use client";

import { useState, useEffect } from "react";
import { Sparkles, Rocket, Eye } from "lucide-react";

interface LaunchItem {
  name: string;
  description: string | null;
  quarter: string | null;
  icon: string | null;
}

const fallbackLaunches: LaunchItem[] = [
  { name: "Solar-Powered EV Cart", description: "Eco-friendly electric cart with integrated solar panels for off-grid operation. Perfect for remote locations.", quarter: "Q3 2026", icon: "🚀" },
  { name: "Smart Kiosk with AI Ordering", description: "Next-gen kiosk with AI-powered ordering, digital payments, and inventory management integration.", quarter: "Q4 2026", icon: "👁️" },
  { name: "Luxury Food Truck", description: "Premium fully-equipped luxury food truck with high-end appliances, climate control, and custom branding.", quarter: "Q1 2027", icon: "🚀" },
  { name: "Compact Bubble Tea Cart", description: "Specialized cart for bubble tea and beverages with built-in sealing machine, ice maker, and storage.", quarter: "Q2 2027", icon: "👁️" },
];

export default function FutureLaunchesPage() {
  const [launches, setLaunches] = useState<LaunchItem[]>(fallbackLaunches);

  useEffect(() => {
    fetch("/api/cms/launches")
      .then((r) => r.json())
      .then((data) => {
        if (data.length > 0) setLaunches(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="pt-28 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-2 text-sm font-medium text-brand-600 mb-4 shadow-sm">
            <Sparkles className="h-4 w-4 text-gold-400" /> Coming Soon
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-900 mt-4 leading-tight">
            Future Launches
          </h1>
          <div className="divider mx-auto mt-6" />
          <p className="text-lg text-brand-500 mt-6">
            Exciting new products in development to take your business further
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {launches.map((item, i) => (
            <div
              key={item.name}
              className="card-3d rounded-2xl border border-brand-100 bg-white p-8 shadow-sm"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-cream-50 text-3xl shadow-sm">
                  {item.icon}
                </div>
                {item.quarter && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-600">
                    {item.quarter}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-display font-semibold text-brand-900 mb-3">
                {item.name}
              </h3>
              <p className="text-brand-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 p-10 lg:p-14 rounded-[2.5rem] bg-gradient-to-br from-brand-50 to-cream-50 border border-brand-100">
          <h2 className="text-2xl font-display font-semibold text-brand-900 mb-2">
            Have a product idea?
          </h2>
          <p className="text-brand-500">
            We love collaborating on custom solutions. Tell us what you need!
          </p>
        </div>
      </div>
    </div>
  );
}
