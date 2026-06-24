import { db } from "@/lib/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Star } from "lucide-react";

export async function Testimonials() {
  const testimonialList = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.status, "approved"))
    .all();

  if (testimonialList.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-400">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-900 mt-4 leading-tight">
            What Our Clients Say
          </h2>
          <div className="divider mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonialList.map((t, idx) => (
            <div
              key={t.id}
              className="card-3d relative rounded-2xl bg-white border border-brand-100 p-8 shadow-sm hover:shadow-xl"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-50 to-transparent rounded-bl-[3rem]" />
              <div className="relative">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-brand-600 leading-relaxed mb-6 italic">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-200 to-brand-300 flex items-center justify-center shadow-inner">
                    <span className="text-base font-semibold font-display text-brand-700">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-900">{t.name}</p>
                    {t.designation && (
                      <p className="text-sm text-brand-400">{t.designation}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
