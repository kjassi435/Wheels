import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateId } from "@/lib/utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "true";

  if (all) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const result = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt)).all();
    return NextResponse.json(result);
  }

  const result = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.status, "approved"))
    .all();
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const id = generateId();

  await db.insert(testimonials).values({
    id,
    name: body.name,
    company: body.company || null,
    designation: body.designation || null,
    content: body.content,
    rating: body.rating ?? 5,
    avatarUrl: body.avatarUrl || null,
    isFeatured: body.isFeatured ?? false,
    status: body.status || "approved",
  });

  return NextResponse.json({ id }, { status: 201 });
}
