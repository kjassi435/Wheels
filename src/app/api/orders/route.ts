import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/db/schema";
import { eq, desc, like } from "drizzle-orm";
import { generateId } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderNumber = searchParams.get("orderNumber");

  if (orderNumber) {
    const order = await db
      .select()
      .from(orders)
      .where(like(orders.orderNumber, `%${orderNumber}%`))
      .get();

    if (!order) {
      return NextResponse.json({ notFound: true }, { status: 404 });
    }

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id))
      .all();

    return NextResponse.json({ ...order, items });
  }

  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt))
    .all();

  return NextResponse.json(allOrders);
}

export async function POST(req: Request) {
  const body = await req.json();
  const id = generateId();
  const orderNumber = `WOW-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;

  await db.insert(orders).values({
    id,
    orderNumber,
    userId: body.userId,
    totalAmount: body.totalAmount,
    customerName: body.customerName,
    customerEmail: body.customerEmail,
    customerPhone: body.customerPhone,
    shippingAddress: body.shippingAddress,
    notes: body.notes,
    status: "pending",
    paymentStatus: "pending",
  });

  if (body.items) {
    for (const item of body.items) {
      await db.insert(orderItems).values({
        id: generateId(),
        orderId: id,
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.unitPrice * item.quantity,
      });
    }
  }

  return NextResponse.json({ id, orderNumber }, { status: 201 });
}
