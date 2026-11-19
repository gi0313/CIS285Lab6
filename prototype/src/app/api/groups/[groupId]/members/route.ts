import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ groupId: string }> };

export async function POST(request: Request, context: RouteContext) {
  const { groupId } = await context.params;
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
      { error: "Member name must contain between 1 and 60 characters." },
      { status: 400 },
    );
  }

  const group = await prisma.group.findUnique({ where: { id: groupId }, select: { id: true } });
  if (!group) {
    return NextResponse.json({ error: "Group not found." }, { status: 404 });
  }

  const member = await prisma.member.create({ data: { name, groupId } });
  return NextResponse.json(member, { status: 201 });
}
