import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { inquiries, products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { generateId } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const all = await db
    .select()
    .from(inquiries)
    .orderBy(desc(inquiries.createdAt))
    .all();

  return NextResponse.json(all);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = generateId();

    let productName = null;
    if (body.productId) {
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, body.productId))
        .get();
      productName = product?.name ?? null;
    }

    await db.insert(inquiries).values({
      id,
      userId: (session.user as any).id,
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      service: body.service,
      productId: body.productId || null,
      productName,
      notes: body.notes || null,
      status: "pending",
    });

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("Create inquiry error:", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
