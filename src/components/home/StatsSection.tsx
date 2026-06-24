import { Users, ShoppingCart, Award, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "1K+", label: "Satisfied Clients" },
  { icon: ShoppingCart, value: "100+", label: "Carts Delivered" },
  { icon: Award, value: "8+", label: "Product Lines" },
  { icon: Globe, value: "15+", label: "States Covered" },
];

export function StatsSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-400">
            Our Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4 leading-tight">
            By the Numbers
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold-400 to-gold-500 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-700/50 border border-brand-600/30 mb-5 group-hover:border-gold-400/30 transition-all duration-300 group-hover:scale-105">
                  <Icon className="h-7 w-7 text-gold-400" />
                </div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-white mb-1.5">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-brand-300 tracking-wide">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
