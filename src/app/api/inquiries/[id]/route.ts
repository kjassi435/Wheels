import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { inquiries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const inquiry = await db
    .select()
    .from(inquiries)
    .where(eq(inquiries.id, id))
    .get();

  if (!inquiry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(inquiry);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  await db
    .update(inquiries)
    .set({
      status: body.status,
      notes: body.notes !== undefined ? body.notes : undefined,
      updatedAt: new Date(),
    })
    .where(eq(inquiries.id, id));

  return NextResponse.json({ message: "Updated" });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await db.delete(inquiries).where(eq(inquiries.id, id));
  return NextResponse.json({ message: "Deleted" });
}
