import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { CompareTable } from "@/components/products/CompareTable";

interface Props {
  searchParams: Promise<{ id?: string | string[] }>;
}

export default async function ComparePage({ searchParams }: Props) {
  const params = await searchParams;
  const ids = params.id
    ? Array.isArray(params.id)
      ? params.id
      : [params.id]
    : [];

  let productList: any[] = [];

  if (ids.length > 0) {
    productList = await db
      .select()
      .from(products)
      .where(inArray(products.id, ids.slice(0, 3)))
      .all();
  }

  return (
    <div className="pt-28 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-400">
            Compare
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-900 mt-3 leading-tight">
            Side-by-Side Comparison
          </h1>
          <p className="text-lg text-brand-500 mt-3">
            Compare up to 3 products to find the perfect fit for your business
          </p>
        </div>

        <div className="rounded-2xl border border-brand-100 bg-white p-6 lg:p-8 shadow-sm overflow-hidden">
          <CompareTable products={productList} />
        </div>

        {productList.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-50">⚖️</div>
            <p className="text-xl font-display font-semibold text-brand-600">No products selected</p>
            <p className="text-brand-400 mt-2">
              Browse our products and click &ldquo;Compare&rdquo; to add them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
