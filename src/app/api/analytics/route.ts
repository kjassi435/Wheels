import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders, products, users, contacts } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const totalProducts = await db.select({ count: sql<number>`count(*)` }).from(products).get();
  const totalOrders = await db.select({ count: sql<number>`count(*)` }).from(orders).get();
  const totalCustomers = await db.select({ count: sql<number>`count(*)` }).from(users).where(eq(users.role, "customer")).get();

  const revenueResult = await db
    .select({ total: sql<number>`coalesce(sum(total_amount), 0)` })
    .from(orders)
    .where(eq(orders.paymentStatus, "paid"))
    .get();

  const recentOrders = await db.select().from(orders).orderBy(sql`created_at desc`).limit(5).all();
  const unreadMessages = await db.select({ count: sql<number>`count(*)` }).from(contacts).where(eq(contacts.isRead, false)).get();

  return NextResponse.json({
    totalProducts: totalProducts?.count || 0,
    totalOrders: totalOrders?.count || 0,
    totalCustomers: totalCustomers?.count || 0,
    totalRevenue: revenueResult?.total || 0,
    recentOrders,
    unreadMessages: unreadMessages?.count || 0,
  });
}
