import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { generateId, slugify } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const isAdmin = session && (session.user as any)?.role === "admin";
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  let conditions = [];

  if (!isAdmin) {
    conditions.push(eq(products.status, "active"));
  }

  if (category) {
    conditions.push(eq(products.categoryId, category));
  }

  if (featured === "true") {
    conditions.push(eq(products.isFeatured, true));
  }

  let query = db.select().from(products) as any;
  if (conditions.length > 0) {
    query = query.where(conditions.length === 1 ? conditions[0] : and(...conditions));
  }

  const result = await query.orderBy(desc(products.createdAt)).all();
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = generateId();
    const slug = slugify(body.name);

    await db.insert(products).values({
      id,
      slug,
      name: body.name,
      description: body.description,
      shortDescription: body.shortDescription,
      categoryId: body.categoryId,
      price: body.price,
      originalPrice: body.originalPrice,
      dimensions: body.dimensions,
      weight: body.weight,
      features: body.features ? JSON.stringify(body.features) : null,
      specifications: body.specifications ? JSON.stringify(body.specifications) : null,
      images: body.images ? JSON.stringify(body.images) : null,
      videoUrl: body.videoUrl || null,
      isFeatured: body.isFeatured ?? false,
      isNew: body.isNew ?? false,
      status: body.status ?? "active",
      stockQuantity: body.stockQuantity ?? 0,
    });

    return NextResponse.json({ id, slug }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
