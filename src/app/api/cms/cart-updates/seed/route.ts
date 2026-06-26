import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cartUpdates } from "@/db/schema";
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

export async function POST() {
  try {
    await ensureTable();

    const existing = await db.select().from(cartUpdates).all();
    if (existing.length > 0) {
      return NextResponse.json({ message: "Data already exists", count: existing.length });
    }

    const defaultImages = [
      { id: "1s6o6ZMb40xpKHgGpoyHz0h4D4t322n5h", title: "Cart Update 1", sortOrder: 0 },
      { id: "1NZynhjRnhTSUAzQUjtLNrLout68fAD29", title: "Cart Update 2", sortOrder: 1 },
      { id: "1NSoyj4SXU406i3KJzvL0IE4vwByB9Puz", title: "Cart Update 3", sortOrder: 2 },
      { id: "1ev6s4Q3zNKvnwYSR5BPqyK6ZOa0NgtZc", title: "Cart Update 4", sortOrder: 3 },
      { id: "1u0YhjwAdBXeudi9dZB_sJTr20ze6CK4F", title: "Cart Update 5", sortOrder: 4 },
    ];

    for (const img of defaultImages) {
      const uid = `cart_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      await db.insert(cartUpdates).values({
        id: uid,
        imageUrl: `https://drive.google.com/file/d/${img.id}/view`,
        title: img.title,
        linkUrl: null,
        sortOrder: img.sortOrder,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return NextResponse.json({ message: "Seeded 5 cart updates", success: true });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
