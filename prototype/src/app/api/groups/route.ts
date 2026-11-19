import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const groups = await prisma.group.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { members: true } } },
  });
  return NextResponse.json(
    groups.map(({ _count, ...group }) => ({
      ...group,
      memberCount: _count.members,
    })),
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const name =
    typeof body === "object" && body !== null && "name" in body && typeof body.name === "string"
      ? body.name.trim()
      : "";
  if (!name || name.length > 60) {
    return NextResponse.json(
      { error: "Group name must contain between 1 and 60 characters." },
      { status: 400 },
    );
  }

  const group = await prisma.group.create({ data: { name } });
  return NextResponse.json({ ...group, memberCount: 0 }, { status: 201 });
}
