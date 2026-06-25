import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cartUpdates } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const updates = await db.select().from(cartUpdates).orderBy(asc(cartUpdates.sortOrder)).all();
    return NextResponse.json(updates);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = `cart_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    await db.insert(cartUpdates).values({
      id,
      imageUrl: body.imageUrl,
      title: body.title || null,
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
