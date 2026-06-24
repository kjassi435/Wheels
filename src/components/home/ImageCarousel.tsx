"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getDirectImageUrl } from "@/lib/utils";

interface CarouselCard {
  id: string;
  title: string;
  imageUrl: string | null;
  linkUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

export function ImageCarousel() {
  const [cards, setCards] = useState<CarouselCard[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  useEffect(() => {
    fetch("/api/cms/carousel")
      .then((r) => r.json())
      .then((data: CarouselCard[]) => {
        const activeCards = data.filter((c) => c.isActive);
        setCards(activeCards.sort((a, b) => a.sortOrder - b.sortOrder));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scrollToNext = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
    const gap = 24;
    const scrollAmount = cardWidth + gap;

    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      autoPlayRef.current = setInterval(scrollToNext, 3000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [cards.length, scrollToNext]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    scrollStartX.current = scrollRef.current?.scrollLeft || 0;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const diff = dragStartX.current - e.clientX;
    scrollRef.current.scrollLeft = scrollStartX.current + diff;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (cards.length > 0) {
      autoPlayRef.current = setInterval(scrollToNext, 3000);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    scrollStartX.current = scrollRef.current?.scrollLeft || 0;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    const diff = dragStartX.current - e.touches[0].clientX;
    scrollRef.current.scrollLeft = scrollStartX.current + diff;
  };

  const handleTouchEnd = () => {
    if (cards.length > 0) {
      autoPlayRef.current = setInterval(scrollToNext, 3000);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-brand-400">Loading carousel...</div>
    );
  }

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-400">
            Our Product Range
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-900 mt-4 leading-tight">
            Crafted for Every<br />Mobile Business
          </h2>
          <div className="divider mx-auto mt-6" />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-8 cursor-grab active:cursor-grabbing"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {cards.map((card) => (
          <Link
            key={card.id}
            href={card.linkUrl || "#"}
            className="flex-shrink-0 scroll-snap-align-center"
            style={{
              width: "clamp(280px, 30vw, 360px)",
              aspectRatio: "1080 / 1350",
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              {card.imageUrl ? (
                <img
                  src={getDirectImageUrl(card.imageUrl)}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-brand-200 to-brand-300 flex items-center justify-center">
                  <span className="text-brand-500 text-lg font-medium">{card.title}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scroll-snap-align-center {
          scroll-snap-align: center;
        }
      `}</style>
    </section>
  );
}