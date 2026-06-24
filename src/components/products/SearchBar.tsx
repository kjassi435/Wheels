"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export function SearchBar({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const activeCategory = searchParams.get("category");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    router.push(`/products?${params.toString()}`);
  }

  function handleCategoryClick(slug: string) {
    router.push(`/products?category=${slug}`);
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-400" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 pr-4 h-12 rounded-2xl border-brand-200 bg-white focus:border-brand-400 focus:ring-brand-300 shadow-sm text-brand-800 placeholder:text-brand-400"
        />
        {search && (
          <button
            type="button"
            onClick={() => { setSearch(""); router.push("/products"); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => router.push("/products")}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
            !activeCategory
              ? "bg-brand-800 text-white shadow-lg shadow-brand-800/25"
              : "bg-white text-brand-600 border border-brand-200 hover:border-brand-300 hover:bg-brand-50"
          }`}
        >
          All Products
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.slug)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeCategory === cat.slug
                ? "bg-brand-800 text-white shadow-lg shadow-brand-800/25"
                : "bg-white text-brand-600 border border-brand-200 hover:border-brand-300 hover:bg-brand-50"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
