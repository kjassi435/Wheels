import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { products, categories, reviews } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { Star, Check, MessageCircle, ArrowLeft } from "lucide-react";
import { formatCurrency, getVideoEmbed } from "@/lib/utils";
import Link from "next/link";
import InquiryForm from "./InquiryForm";
import { ImageGallery } from "@/components/products/ImageGallery";

interface Props {
  params: Promise<{ slug: string }>;
}








export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.status, "active")))
    .get();

  if (!product) notFound();

  const category = await db
    .select()
    .from(categories)
    .where(eq(categories.id, product.categoryId))
    .get();

  const productReviews = await db
    .select()
    .from(reviews)
    .where(and(eq(reviews.productId, product.id), eq(reviews.status, "approved")))
    .all();

  const features = product.features ? JSON.parse(product.features) : [];
  const images: string[] = product.images ? JSON.parse(product.images) : [];
  const videoUrl = product.videoUrl ? getVideoEmbed(product.videoUrl) : null;

  return (
    <div className="pt-28 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-500 hover:text-brand-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-4">
            {images.length > 0 ? (
              <ImageGallery images={images} productName={product.name} />
            ) : (
              <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-brand-100 to-brand-50 border border-brand-100 flex items-center justify-center shadow-xl">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">📦</div>
                  <p className="text-xl font-display font-semibold text-brand-700">{product.name}</p>
                </div>
              </div>
            )}

            {videoUrl && (
              <div className="rounded-[2rem] overflow-hidden border border-brand-100 shadow-xl">
                <iframe
                  src={videoUrl}
                  title="Product Video"
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              {category && (
                <Link href={`/products?category=${category.slug}`}>
                  <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-600 mb-3">
                    {category.name}
                  </span>
                </Link>
              )}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-900 leading-tight">
                {product.name}
              </h1>
              {product.shortDescription && (
                <p className="text-lg text-brand-500 mt-3 leading-relaxed">{product.shortDescription}</p>
              )}
            </div>

            {product.price && (
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-display font-bold gradient-text">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-brand-300 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
            )}

            {product.averageRating && product.averageRating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: Math.round(product.averageRating) }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span className="text-sm text-brand-400">({product.reviewCount} reviews)</span>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <InquiryForm productId={product.id} productName={product.name} />
              <Link
                href={`/compare?id=${product.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 px-6 py-3.5 text-sm font-medium text-brand-700 hover:bg-brand-50 transition-all"
              >
                Compare
              </Link>
            </div>

            {product.description && (
              <div>
                <h3 className="font-display text-lg font-semibold text-brand-900 mb-2">Description</h3>
                <p className="text-brand-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {features.length > 0 && (
              <div>
                <h3 className="font-display text-lg font-semibold text-brand-900 mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-brand-700">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(product.dimensions || product.weight) && (
              <div className="grid grid-cols-2 gap-4 rounded-2xl bg-gradient-to-br from-brand-50 to-white border border-brand-100 p-5">
                {product.dimensions && (
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-brand-400">Dimensions</p>
                    <p className="font-medium text-brand-800">{product.dimensions}</p>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-brand-400">Weight</p>
                    <p className="font-medium text-brand-800">{product.weight}</p>
                  </div>
                )}
              </div>
            )}

            {productReviews.length > 0 && (
              <div>
                <h3 className="font-display text-lg font-semibold text-brand-900 mb-3 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Reviews ({productReviews.length})
                </h3>
                <div className="space-y-3">
                  {productReviews.map((review) => (
                    <div key={review.id} className="rounded-2xl border border-brand-100 bg-white p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-brand-900 text-sm">{review.reviewerName}</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                          ))}
                        </div>
                      </div>
                      {review.title && (
                        <p className="text-sm font-medium text-brand-800">{review.title}</p>
                      )}
                      {review.comment && (
                        <p className="text-sm text-brand-500 mt-1">{review.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
