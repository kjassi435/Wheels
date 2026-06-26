import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cartUpdates } from "@/db/schema";
import { asc } from "drizzle-orm";
import { client } from "@/lib/db";

async function ensureTable() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS cart_updates (
      id TEXT PRIMARY KEY,
      image_url TEXT NOT NULL,
      title TEXT,
      link_url TEXT,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    )
  `);
}

export async function GET() {
  try {
    await ensureTable();
    const updates = await db.select().from(cartUpdates).orderBy(asc(cartUpdates.sortOrder)).all();
    return NextResponse.json(updates);
  } catch (e) {
    console.error("GET cart-updates error:", e);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    await ensureTable();
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
  } catch (e) {
    console.error("POST cart-updates error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
