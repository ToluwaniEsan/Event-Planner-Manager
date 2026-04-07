import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

function toNumber(d: unknown): number {
  if (d == null) return 0;
  if (typeof d === "number") return d;
  if (typeof d === "object" && d !== null && "toString" in d) {
    return Number(d.toString());
  }
  return Number(d);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json({ error: "eventId query param is required" }, { status: 400 });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        bookings: {
          where: {
            status: { not: "CANCELLED" },
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const totalBudget = toNumber(event.budget);

    const spent = event.bookings.reduce((sum, b) => {
      const p = b.totalPrice;
      return sum + (p == null ? 0 : toNumber(p));
    }, 0);

    const remaining = Math.max(0, totalBudget - spent);
    const usedRatio = totalBudget > 0 ? Math.min(1, spent / totalBudget) : 0;

    return NextResponse.json({
      eventId: event.id,
      title: event.title,
      totalBudget,
      spent,
      remaining,
      usedRatio,
      bookingCount: event.bookings.length,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load budget" }, { status: 500 });
  }
}
