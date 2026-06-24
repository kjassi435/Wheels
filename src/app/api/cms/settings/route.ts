import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const settings = await db.select().from(siteSettings).all();
    const obj: Record<string, string> = {};
    settings.forEach((s) => { obj[s.key] = s.value || ""; });
    return NextResponse.json(obj);
  } catch {
    return NextResponse.json({});
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    for (const [key, value] of Object.entries(body)) {
      const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).get();
      if (existing) {
        await db.update(siteSettings).set({ value: String(value), updatedAt: new Date() }).where(eq(siteSettings.key, key));
      } else {
        await db.insert(siteSettings).values({ id: `setting_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, key, value: String(value), category: "general", updatedAt: new Date() });
      }
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
