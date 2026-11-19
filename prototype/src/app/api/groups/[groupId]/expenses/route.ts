import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseAmountToCents, splitCents } from "@/lib/expenses";

type RouteContext = { params: Promise<{ groupId: string }> };

export async function POST(request: Request, context: RouteContext) {
  const { groupId } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Expense details are required." }, { status: 400 });
  }
  const values = body as Record<string, unknown>;
  const description =
    typeof values.description === "string" ? values.description.trim() : "";
  const amountCents = parseAmountToCents(values.amount);
  const payerId = typeof values.payerId === "string" ? values.payerId : "";
  const participantIds = values.participantIds;

  if (!description || description.length > 100) {
    return NextResponse.json(
      { error: "Description must contain between 1 and 100 characters." },
      { status: 400 },
    );
  }
  if (amountCents === null) {
    return NextResponse.json(
      { error: "Amount must be greater than $0.00 and use at most two decimal places." },
      { status: 400 },
    );
  }
  if (!payerId) {
    return NextResponse.json({ error: "Choose who paid for this expense." }, { status: 400 });
  }
  if (
    !Array.isArray(participantIds) ||
    participantIds.length === 0 ||
    participantIds.some((id) => typeof id !== "string") ||
    new Set(participantIds).size !== participantIds.length
  ) {
    return NextResponse.json(
      { error: "Select at least one unique participant for this expense." },
      { status: 400 },
    );
  }

  const members = await prisma.member.findMany({
    where: { groupId, id: { in: [payerId, ...participantIds] } },
    select: { id: true },
  });
  const memberIds = new Set(members.map((member) => member.id));
  if (!memberIds.has(payerId)) {
    return NextResponse.json(
      { error: "The payer must be a member of this group." },
      { status: 400 },
    );
  }
  if (participantIds.some((id) => !memberIds.has(id))) {
    return NextResponse.json(
      { error: "Every participant must be a member of this group." },
      { status: 400 },
    );
  }

  const shares = splitCents(amountCents, participantIds);
  const expense = await prisma.expense.create({
    data: {
      description,
      amountCents,
      groupId,
      paidById: payerId,
      participants: {
        create: shares.map(({ memberId, shareCents }) => ({ memberId, shareCents })),
      },
    },
  });
  return NextResponse.json(expense, { status: 201 });
}
