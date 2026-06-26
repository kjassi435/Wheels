"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { getDirectImageUrl } from "@/lib/utils";
import Link from "next/link";

interface CartUpdate {
  id: string;
  imageUrl: string;
  title: string | null;
  linkUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

const fallbackImages = [
  { id: "1s6o6ZMb40xpKHgGpoyHz0h4D4t322n5h", alt: "Cart Update 1" },
  { id: "1NZynhjRnhTSUAzQUjtLNrLout68fAD29", alt: "Cart Update 2" },
  { id: "1NSoyj4SXU406i3KJzvL0IE4vwByB9Puz", alt: "Cart Update 3" },
  { id: "1ev6s4Q3zNKvnwYSR5BPqyK6ZOa0NgtZc", alt: "Cart Update 4" },
  { id: "1u0YhjwAdBXeudi9dZB_sJTr20ze6CK4F", alt: "Cart Update 5" },
];

export function NewCartsUpdates() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [updates, setUpdates] = useState<CartUpdate[]>([]);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    fetch("/api/cms/cart-updates")
      .then((r) => r.json())
      .then((data: CartUpdate[]) => {
        const active = data.filter((u) => u.isActive);
        if (active.length > 0) {
          setUpdates(active.sort((a, b) => a.sortOrder - b.sortOrder));
        }
      })
      .catch(() => {});
  }, []);

  const smoothScroll = useCallback((target: number, duration: number = 500) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const start = container.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      container.scrollLeft = start + distance * eased;

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const scrollToNext = useCallback(() => {
    if (!scrollRef.current || isDragging) return;
    const container = scrollRef.current;
    const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
    const gap = 32;
    const scrollAmount = cardWidth + gap;

    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 50) {
      smoothScroll(0, 800);
    } else {
      smoothScroll(container.scrollLeft + scrollAmount, 600);
    }
  }, [isDragging, smoothScroll]);

  useEffect(() => {
    if (!isHovered && updates.length > 0) {
      autoPlayRef.current = setInterval(scrollToNext, 3500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [scrollToNext, isHovered, updates.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    scrollStartX.current = scrollRef.current?.scrollLeft || 0;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const currentTime = performance.now();
    const timeDelta = currentTime - lastTimeRef.current;

    if (timeDelta > 0) {
      velocityRef.current = (lastXRef.current - e.clientX) / timeDelta;
    }

    lastXRef.current = e.clientX;
    lastTimeRef.current = currentTime;

    const diff = dragStartX.current - e.clientX;
    scrollRef.current.scrollLeft = scrollStartX.current + diff;
  };

  const handleMouseUp = () => {
    if (!isDragging || !scrollRef.current) return;
    setIsDragging(false);

    const momentum = velocityRef.current * 150;
    const targetScroll = scrollRef.current.scrollLeft + momentum;
    smoothScroll(targetScroll, 400);

    if (!isHovered) {
      autoPlayRef.current = setInterval(scrollToNext, 3500);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    scrollStartX.current = scrollRef.current?.scrollLeft || 0;
    lastXRef.current = e.touches[0].clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    const currentTime = performance.now();
    const timeDelta = currentTime - lastTimeRef.current;

    if (timeDelta > 0) {
      velocityRef.current = (lastXRef.current - e.touches[0].clientX) / timeDelta;
    }

    lastXRef.current = e.touches[0].clientX;
    lastTimeRef.current = currentTime;

    const diff = dragStartX.current - e.touches[0].clientX;
    scrollRef.current.scrollLeft = scrollStartX.current + diff;
  };

  const handleTouchEnd = () => {
    if (!scrollRef.current) return;
    const momentum = velocityRef.current * 150;
    const targetScroll = scrollRef.current.scrollLeft + momentum;
    smoothScroll(targetScroll, 400);

    if (!isHovered) {
      autoPlayRef.current = setInterval(scrollToNext, 3500);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  if (updates.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-cream-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
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
        className="flex gap-8 overflow-x-auto scrollbar-hide px-6 lg:px-8 pb-8 cursor-grab active:cursor-grabbing"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          perspective: "1200px",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {updates.map((update) => {
          const content = (
            <div
              className="flex-shrink-0 group"
              style={{ width: "clamp(300px, 32vw, 380px)" }}
            >
              <div
                className="relative w-full overflow-hidden rounded-3xl transition-all duration-500 ease-out"
                style={{
                  aspectRatio: "1080 / 1350",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <img
                  src={getDirectImageUrl(update.imageUrl)}
                  alt={update.title || "Cart Update"}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  draggable={false}
                />

                <div
                  className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)",
                  }}
                />
              </div>

              <div
                className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(251, 146, 60, 0.3), rgba(245, 158, 11, 0.3))",
                }}
              />
            </div>
          );

          return update.linkUrl ? (
            <Link key={update.id} href={update.linkUrl}>
              {content}
            </Link>
          ) : (
            <div key={update.id}>{content}</div>
          );
        })}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .group:hover {
          transform: translateZ(20px) rotateX(2deg);
        }
      `}</style>
    </section>
  );
}