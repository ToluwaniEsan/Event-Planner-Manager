import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

const SENDERS = ["USER", "VENDOR"] as const;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const vendorId = searchParams.get("vendorId");

    if (!userId || !vendorId) {
      return NextResponse.json(
        { error: "userId and vendorId query params are required" },
        { status: 400 }
      );
    }

    const messages = await prisma.message.findMany({
      where: { userId, vendorId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(messages);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, vendorId, sender, body: text } = body as {
      userId?: string;
      vendorId?: string;
      sender?: string;
      body?: string;
    };

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }
    if (!vendorId || typeof vendorId !== "string") {
      return NextResponse.json({ error: "vendorId is required" }, { status: 400 });
    }
    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "body is required" }, { status: 400 });
    }

    const senderRole = SENDERS.includes(sender as (typeof SENDERS)[number])
      ? sender
      : "USER";

    const [user, vendor] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.vendor.findUnique({ where: { id: vendorId } }),
    ]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    const message = await prisma.message.create({
      data: {
        userId,
        vendorId,
        sender: senderRole as "USER" | "VENDOR",
        body: text.trim(),
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
