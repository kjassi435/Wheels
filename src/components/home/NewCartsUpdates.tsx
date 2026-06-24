"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const cartImages = [
  { id: "1s6o6ZMb40xpKHgGpoyHz0h4D4t322n5h", alt: "Cart Update 1" },
  { id: "1NZynhjRnhTSUAzQUjtLNrLout68fAD29", alt: "Cart Update 2" },
  { id: "1NSoyj4SXU406i3KJzvL0IE4vwByB9Puz", alt: "Cart Update 3" },
  { id: "1ev6s4Q3zNKvnwYSR5BPqyK6ZOa0NgtZc", alt: "Cart Update 4" },
  { id: "1u0YhjwAdBXeudi9dZB_sJTr20ze6CK4F", alt: "Cart Update 5" },
];

function getDirectImageUrl(fileId: string) {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

export function NewCartsUpdates() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

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
    autoPlayRef.current = setInterval(scrollToNext, 3000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [scrollToNext]);

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
    autoPlayRef.current = setInterval(scrollToNext, 3000);
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
    autoPlayRef.current = setInterval(scrollToNext, 3000);
  };

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-400">
            Latest Updates
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-900 mt-4 leading-tight">
            New Carts Updates
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
        {cartImages.map((img) => (
          <div
            key={img.id}
            className="flex-shrink-0 scroll-snap-align-center"
            style={{
              width: "clamp(280px, 30vw, 360px)",
              aspectRatio: "1080 / 1350",
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src={getDirectImageUrl(img.id)}
                alt={img.alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </div>
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