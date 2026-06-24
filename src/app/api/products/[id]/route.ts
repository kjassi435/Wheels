import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products, reviews } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .get();

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const productReviews = await db
    .select()
    .from(reviews)
    .where(and(eq(reviews.productId, id), eq(reviews.status, "approved")))
    .all();

  return NextResponse.json({ ...product, reviews: productReviews });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  await db
    .update(products)
    .set({
      ...body,
      features: body.features ? JSON.stringify(body.features) : undefined,
      specifications: body.specifications ? JSON.stringify(body.specifications) : undefined,
      images: body.images ? JSON.stringify(body.images) : undefined,
      updatedAt: new Date(),
    })
    .where(eq(products.id, id));

  return NextResponse.json({ message: "Updated" });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await db.delete(products).where(eq(products.id, id));
  return NextResponse.json({ message: "Deleted" });
}
