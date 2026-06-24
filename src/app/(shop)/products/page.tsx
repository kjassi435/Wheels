import { db } from "@/lib/db";
import { products, categories } from "@/db/schema";
import { eq, and, like } from "drizzle-orm";
import { ProductCard } from "@/components/products/ProductCard";
import { SearchBar } from "@/components/products/SearchBar";

interface Props {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const allCategories = await db.select().from(categories).orderBy(categories.sortOrder).all();

  let productQuery = db.select().from(products).where(eq(products.status, "active"));

  if (params.category) {
    const cat = allCategories.find((c) => c.slug === params.category);
    if (cat) {
      productQuery = db
        .select()
        .from(products)
        .where(and(eq(products.status, "active"), eq(products.categoryId, cat.id)));
    }
  }

  if (params.search) {
    const searchTerm = `%${params.search}%`;
    productQuery = db
      .select()
      .from(products)
      .where(
        and(
          eq(products.status, "active"),
          like(products.name, searchTerm)
        )
      );
  }

  const productList = await productQuery.all();

  return (
    <div className="pt-28 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-400">
            Our Collection
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-900 mt-3 leading-tight">
            Premium Mobile Solutions
          </h1>
          <p className="text-lg text-brand-500 mt-3 max-w-2xl">
            Browse our handcrafted collection of mobile business solutions designed for entrepreneurs who demand the best.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-10">
          <SearchBar categories={allCategories} />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {productList.length === 0 && (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-brand-100 mb-6">
              <span className="text-5xl">🔍</span>
            </div>
            <p className="text-2xl font-display font-bold text-brand-800">No products found</p>
            <p className="text-brand-400 mt-2 text-lg">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
