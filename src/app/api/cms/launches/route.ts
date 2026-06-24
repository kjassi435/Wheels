import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { futureLaunches } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const launches = await db.select().from(futureLaunches).orderBy(asc(futureLaunches.sortOrder)).all();
    return NextResponse.json(launches);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = `launch_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    await db.insert(futureLaunches).values({
      id,
      name: body.name,
      description: body.description || null,
      quarter: body.quarter || null,
      icon: body.icon || "🚀",
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
