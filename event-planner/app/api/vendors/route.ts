import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const vendors = await prisma.vendor.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(vendors);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to list vendors" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, email } = body as {
      name?: string;
      category?: string | null;
      email?: string | null;
    };

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const vendor = await prisma.vendor.create({
      data: {
        name: name.trim(),
        category: category?.trim() || null,
        email: email?.trim() || null,
      },
    });

    return NextResponse.json(vendor, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create vendor" }, { status: 500 });
  }
}
