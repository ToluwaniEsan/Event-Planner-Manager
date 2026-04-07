import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, date, location, userId, guestCount, budget } = body as {
      name?: string;
      date?: string | null;
      location?: string | null;
      userId?: string;
      guestCount?: number | null;
      budget?: number | string | null;
    };

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let parsedDate: Date | null = null;
    if (date != null && date !== "") {
      const d = new Date(date);
      if (Number.isNaN(d.getTime())) {
        return NextResponse.json({ error: "Invalid date" }, { status: 400 });
      }
      parsedDate = d;
    }

    let budgetDec: string | null = null;
    if (budget != null && budget !== "") {
      const n = Number(budget);
      if (Number.isNaN(n) || n < 0) {
        return NextResponse.json({ error: "Invalid budget" }, { status: 400 });
      }
      budgetDec = n.toFixed(2);
    }

    const event = await prisma.event.create({
      data: {
        userId,
        title: name.trim(),
        date: parsedDate,
        location: location?.trim() || null,
        guestCount:
          guestCount != null && Number.isFinite(Number(guestCount))
            ? Math.floor(Number(guestCount))
            : null,
        budget: budgetDec,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
