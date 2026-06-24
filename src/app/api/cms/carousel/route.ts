import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { carouselCards } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const cards = await db.select().from(carouselCards).orderBy(asc(carouselCards.sortOrder)).all();
    return NextResponse.json(cards);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = `card_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    await db.insert(carouselCards).values({
      id,
      title: body.title,
      description: body.description || null,
      imageUrl: body.imageUrl || null,
      linkUrl: body.linkUrl || null,
      sortOrder: body.sortOrder || 0,
      isActive: body.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json({ id, success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
