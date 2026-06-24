import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categories } from "@/db/schema";
import { asc } from "drizzle-orm";
import { generateId, slugify } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const result = await db
    .select()
    .from(categories)
    .orderBy(asc(categories.sortOrder))
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
  const slug = slugify(body.name);

  await db.insert(categories).values({
    id,
    slug,
    name: body.name,
    description: body.description,
    imageUrl: body.imageUrl,
    iconName: body.iconName,
    sortOrder: body.sortOrder ?? 0,
  });

  return NextResponse.json({ id }, { status: 201 });
}
