import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

/** Handy for local/dev: create a user to use with events and chat. */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body as { email?: string; name?: string | null };

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        name: name?.trim() || null,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "code" in e && (e as { code?: string }).code === "P2002") {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
    console.error(e);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
