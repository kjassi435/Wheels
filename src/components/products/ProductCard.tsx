import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { formatCurrency, getDirectImageUrl } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  price: number | null;
  originalPrice: number | null;
  images: string | null;
  videoUrl: string | null;
  isFeatured: boolean | null;
  isNew: boolean | null;
  averageRating: number | null;
  reviewCount: number | null;
}

export function ProductCard({ product }: { product: Product }) {
  const firstImage = product.images
    ? (() => {
        try {
          const arr = JSON.parse(product.images);
          return arr[0] || null;
        } catch {
          return null;
        }
      })()
    : null;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="product-card relative rounded-3xl bg-white border border-brand-100 overflow-hidden shadow-sm hover:shadow-2xl">
        {/* Image Section */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-50 to-brand-100 overflow-hidden">
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 via-brand-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            {product.isNew && (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-gold-400 to-gold-500 text-brand-950 shadow-lg shadow-gold-400/30">
                New
              </span>
            )}
            {product.isFeatured && (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-sm text-brand-700 shadow-lg">
                Featured
              </span>
            )}
          </div>

          {/* Product Image */}
          <div className="flex items-center justify-center h-full p-6">
            {firstImage ? (
              <img
                src={getDirectImageUrl(firstImage)}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-brand-200/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <span className="text-5xl">📦</span>
              </div>
            )}
          </div>

          {/* Hover CTA */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-20">
            <span className="inline-flex items-center justify-center gap-2 w-full text-sm font-semibold text-white bg-brand-800/90 backdrop-blur-sm px-5 py-3 rounded-2xl">
              View Details <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 pt-4">
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-bold text-lg text-brand-900 group-hover:text-brand-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
            {product.averageRating && product.averageRating > 0 ? (
              <div className="flex items-center gap-1 shrink-0 bg-brand-50 px-2 py-1 rounded-lg">
                <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                <span className="text-xs font-bold text-brand-700">{product.averageRating}</span>
              </div>
            ) : null}
          </div>

          {/* Description */}
          {product.shortDescription && (
            <p className="text-sm text-brand-500 line-clamp-2 mb-4 leading-relaxed">
              {product.shortDescription}
            </p>
          )}

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-brand-100">
            {product.price ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-brand-800">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-brand-300 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-sm font-medium text-brand-400">Enquire for Price</span>
            )}
            <span className="text-sm font-medium text-brand-400 group-hover:text-brand-600 transition-colors flex items-center gap-1">
              Learn more <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
