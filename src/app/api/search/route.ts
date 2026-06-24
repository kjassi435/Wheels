import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { eq, and, like } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const searchTerm = `%${q}%`;
  const result = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      price: products.price,
      shortDescription: products.shortDescription,
    })
    .from(products)
    .where(and(eq(products.status, "active"), like(products.name, searchTerm)))
    .limit(10)
    .all();

  return NextResponse.json(result);
}
