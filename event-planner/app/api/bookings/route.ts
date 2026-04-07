import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

const BOOKING_STATUSES = ["PENDING", "CONFIRMED", "CANCELLED"] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      eventId,
      vendorId,
      totalPrice,
      notes,
      status,
    } = body as {
      eventId?: string;
      vendorId?: string;
      totalPrice?: number | string | null;
      notes?: string | null;
      status?: string;
    };

    if (!eventId || typeof eventId !== "string") {
      return NextResponse.json({ error: "eventId is required" }, { status: 400 });
    }
    if (!vendorId || typeof vendorId !== "string") {
      return NextResponse.json({ error: "vendorId is required" }, { status: 400 });
    }

    const [event, vendor] = await Promise.all([
      prisma.event.findUnique({ where: { id: eventId } }),
      prisma.vendor.findUnique({ where: { id: vendorId } }),
    ]);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    let priceStr: string | null = null;
    if (totalPrice != null && totalPrice !== "") {
      const n = Number(totalPrice);
      if (Number.isNaN(n) || n < 0) {
        return NextResponse.json({ error: "Invalid totalPrice" }, { status: 400 });
      }
      priceStr = n.toFixed(2);
    }

    const bookingStatus = BOOKING_STATUSES.includes(status as (typeof BOOKING_STATUSES)[number])
      ? status
      : "PENDING";

    const booking = await prisma.booking.create({
      data: {
        eventId,
        vendorId,
        totalPrice: priceStr,
        notes: notes?.trim() || null,
        status: bookingStatus as "PENDING" | "CONFIRMED" | "CANCELLED",
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
