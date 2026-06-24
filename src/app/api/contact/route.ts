import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contacts } from "@/db/schema";
import { generateId } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = generateId();

    await db.insert(contacts).values({
      id,
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      message: body.message,
    });

    return NextResponse.json(
      { message: "Message sent successfully", id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
