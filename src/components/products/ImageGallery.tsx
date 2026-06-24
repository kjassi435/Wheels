"use client";

import { getDirectImageUrl } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  function scrollToImage(index: number) {
    const el = document.getElementById("gallery");
    if (el) el.scrollLeft = el.clientWidth * index;
  }

  return (
    <div className="relative rounded-[2rem] overflow-hidden border border-brand-100 shadow-xl bg-white">
      <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth" id="gallery">
        {images.map((img, i) => (
          <div key={i} className="min-w-full snap-center">
            <img
              src={getDirectImageUrl(img)}
              alt={`${productName} - Image ${i + 1}`}
              className="w-full aspect-square object-cover"
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 justify-center p-3 bg-white/80 backdrop-blur-sm">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToImage(i)}
              className="w-16 h-16 rounded-lg overflow-hidden border-2 border-brand-100 hover:border-brand-400 transition-colors shrink-0"
            >
              <img src={getDirectImageUrl(img)} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
