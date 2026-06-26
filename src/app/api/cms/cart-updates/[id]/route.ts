import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cartUpdates } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    await db.update(cartUpdates).set({ ...body, updatedAt: new Date() }).where(eq(cartUpdates.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("PUT cart-updates error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(cartUpdates).where(eq(cartUpdates.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE cart-updates error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
