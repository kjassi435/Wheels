"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  ChefHat, Truck, Zap, Container, Bike, Building2, BatteryCharging,
  IceCream, Smartphone, Sparkles, ShoppingBag, Tag, Award,
} from "lucide-react";
import { getDirectImageUrl } from "@/lib/utils";

interface Segment {
  id?: string;
  name: string;
  slug: string;
  icon: any;
  desc: string;
  gradient: string;
  image?: string;
}

const fallbackSegments: Segment[] = [
  { name: "Food Carts", slug: "food-carts", icon: ChefHat, desc: "Custom mobile food carts", gradient: "from-orange-400 via-orange-300 to-amber-200", image: "/carousel/food-carts.png" },
  { name: "Food Vans", slug: "food-vans", icon: Truck, desc: "Fully equipped food vans", gradient: "from-green-400 via-emerald-300 to-teal-300", image: "/carousel/food-vans.png" },
  { name: "EV Carts", slug: "electric-vehicle-carts", icon: Zap, desc: "Eco-friendly electric carts", gradient: "from-blue-400 via-cyan-300 to-sky-300", image: "/carousel/ev-carts.png" },
  { name: "Food Trailers", slug: "food-trailers", icon: Container, desc: "Towed trailers for events", gradient: "from-amber-400 via-orange-300 to-yellow-300", image: "/carousel/food-trailers.png" },
  { name: "Motorbike Carts", slug: "motorbike-operated-carts", icon: Bike, desc: "Compact motorbike carts", gradient: "from-rose-300 via-pink-200 to-fuchsia-200", image: "/carousel/motorbike-carts.png" },
  { name: "Kiosks", slug: "kiosks", icon: Building2, desc: "Stationary kiosk solutions", gradient: "from-indigo-400 via-violet-300 to-purple-300", image: "/carousel/kiosks.png" },
  { name: "E-Tricycle", slug: "electric-tricycle-carts", icon: BatteryCharging, desc: "Three-wheeled electric carts", gradient: "from-teal-400 via-cyan-300 to-sky-300", image: "/carousel/e-tricycle.png" },
  { name: "Ice Cream", slug: "ice-cream-carts", icon: IceCream, desc: "Mobile ice cream vending", gradient: "from-pink-400 via-rose-300 to-red-300" },
  { name: "Mobile Accessory", slug: "mobile-accessory-cart", icon: Smartphone, desc: "Mobile accessory & repair carts", gradient: "from-violet-400 via-purple-300 to-fuchsia-300" },
  { name: "Cosmetic Cart", slug: "cosmetic-cart", icon: Sparkles, desc: "Beauty & cosmetic display carts", gradient: "from-fuchsia-400 via-pink-300 to-rose-300" },
  { name: "Grocery Cart", slug: "grocery-cart", icon: ShoppingBag, desc: "Mobile grocery vending carts", gradient: "from-green-400 via-lime-300 to-emerald-300" },
  { name: "Garment Cart", slug: "garment-shop-cart", icon: Tag, desc: "Clothing display carts", gradient: "from-amber-400 via-yellow-300 to-orange-300" },
  { name: "Footwear Cart", slug: "footwear-cart", icon: Award, desc: "Shoe retail carts", gradient: "from-brand-400 via-brand-300 to-gold-300" },
];

export function ProductSegments() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartIndex = useRef(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [segments, setSegments] = useState<Segment[]>(fallbackSegments);

  const total = segments.length;

  const goTo = useCallback((index: number) => {
    const wrapped = ((index % total) + total) % total;
    setActiveIndex(wrapped);
  }, [total]);

  const next = useCallback(() => setActiveIndex((p) => (p + 1) % total), [total]);

  useEffect(() => {
    fetch("/api/cms/carousel")
      .then((r) => r.json())
      .then((cmsCards: any[]) => {
        if (cmsCards.length > 0) {
          setSegments(fallbackSegments.map((seg) => {
            const card = cmsCards.find((c: any) => c.linkUrl?.includes(seg.slug));
            if (card) {
              return { ...seg, name: card.title, desc: card.description || seg.desc, image: card.imageUrl ? getDirectImageUrl(card.imageUrl) : seg.image };
            }
            return seg;
          }));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    autoPlayRef.current = setInterval(next, 3000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [next]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(next, 3000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartIndex.current = activeIndex;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 80) {
      if (diff > 0) goTo(dragStartIndex.current + 1);
      else goTo(dragStartIndex.current - 1);
      dragStartX.current = e.clientX;
      dragStartIndex.current = activeIndex;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    resetAutoPlay();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    dragStartIndex.current = activeIndex;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = dragStartX.current - e.touches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(dragStartIndex.current + 1);
      else goTo(dragStartIndex.current - 1);
      dragStartX.current = e.touches[0].clientX;
      dragStartIndex.current = activeIndex;
    }
  };

  const handleTouchEnd = () => resetAutoPlay();

  const getRelativeIndex = (i: number) => {
    const diff = i - activeIndex;
    if (diff > total / 2) return diff - total;
    if (diff < -total / 2) return diff + total;
    return diff;
  };

  return (
    <section className="py-20 lg:py-28 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-14">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-400">
            Our Product Range
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-900 mt-4 leading-tight">
            Crafted for Every<br />Mobile Business
          </h2>
          <div className="divider mx-auto mt-6" />
          <p className="text-lg text-brand-600/80 mt-6 leading-relaxed">
            From street food to electric mobility — explore our comprehensive range
            of premium mobile business solutions.
          </p>
        </div>
      </div>

      <div
        className="relative w-full select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-[380px] md:h-[480px] flex items-center justify-center">
          {segments.map((segment, i) => {
            const Icon = segment.icon;
            const rel = getRelativeIndex(i);
            const isCenter = rel === 0;
            const isVisible = Math.abs(rel) <= 2;

            if (!isVisible) return null;

            const translateX = rel * 240;
            const scale = isCenter ? 1.15 : 0.82;
            const zIndex = 10 - Math.abs(rel);

            return (
              <Link
                key={segment.slug}
                href={`/products?category=${segment.slug}`}
                className="absolute rounded-[2rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  width: "clamp(240px, 22vw, 300px)",
                  height: isCenter ? "100%" : "82%",
                  top: isCenter ? "0" : "9%",
                  pointerEvents: isCenter ? "auto" : "none",
                }}
                draggable={false}
              >
                <div className="relative w-full h-full flex flex-col rounded-[2rem] overflow-hidden bg-gray-800 shadow-2xl">
                  <div className={`flex-1 bg-gradient-to-br ${segment.gradient} relative min-h-0`}>
                    {segment.image ? (
                      <img
                        src={segment.image}
                        alt={segment.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <Icon className="w-1/3 h-1/3 text-white/90 drop-shadow-lg" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 bg-gray-800 px-4 py-5 md:px-6 md:py-6 text-center">
                    <p className="text-white font-display text-lg md:text-xl font-semibold">
                      {segment.name}
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm mt-1 leading-snug">{segment.desc}</p>
                    <div className="mt-3">
                      <span className="inline-block px-5 py-1.5 rounded-full text-xs font-medium border border-white/20 text-white/80 hover:bg-white/10 transition-colors">
                        Explore
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-10">
        {segments.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetAutoPlay(); }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-8 bg-brand-600" : "w-2 bg-brand-200 hover:bg-brand-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
