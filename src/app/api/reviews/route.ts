import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reviews, products } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { generateId } from "@/lib/utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (productId) {
    const result = await db
      .select()
      .from(reviews)
      .where(and(eq(reviews.productId, productId), eq(reviews.status, "approved")))
      .orderBy(desc(reviews.createdAt))
      .all();
    return NextResponse.json(result);
  }

  const allReviews = await db
    .select()
    .from(reviews)
    .orderBy(desc(reviews.createdAt))
    .all();
  return NextResponse.json(allReviews);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = generateId();

    await db.insert(reviews).values({
      id,
      productId: body.productId,
      userId: body.userId,
      reviewerName: body.reviewerName,
      rating: body.rating,
      title: body.title,
      comment: body.comment,
      images: body.images ? JSON.stringify(body.images) : null,
      status: "pending",
    });

    // Update product average rating
    const productReviews = await db
      .select()
      .from(reviews)
      .where(and(eq(reviews.productId, body.productId), eq(reviews.status, "approved")))
      .all();

    const avgRating =
      productReviews.length > 0
        ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
        : body.rating;

    await db
      .update(products)
      .set({
        averageRating: avgRating,
        reviewCount: productReviews.length,
      })
      .where(eq(products.id, body.productId));

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("Review creation error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
