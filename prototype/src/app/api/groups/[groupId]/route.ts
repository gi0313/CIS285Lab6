import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ groupId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { groupId } = await context.params;
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      members: { orderBy: { createdAt: "asc" } },
      expenses: {
        orderBy: { createdAt: "desc" },
        include: {
          payer: true,
          participants: {
            include: { member: true },
            orderBy: { member: { name: "asc" } },
          },
        },
      },
    },
  });
  if (!group) {
    return NextResponse.json({ error: "Group not found." }, { status: 404 });
  }

  const balanceByMember = new Map(group.members.map((member) => [member.id, 0]));
  for (const expense of group.expenses) {
    balanceByMember.set(
      expense.paidById,
      (balanceByMember.get(expense.paidById) ?? 0) + expense.amountCents,
    );
    for (const participant of expense.participants) {
      balanceByMember.set(
        participant.memberId,
        (balanceByMember.get(participant.memberId) ?? 0) - participant.shareCents,
      );
    }
  }

  const { expenses, ...groupDetails } = group;
  return NextResponse.json({
    ...groupDetails,
    expenses: expenses.map(({ participants, ...expense }) => ({
      ...expense,
      participants: participants.map(({ member, shareCents }) => ({
        ...member,
        shareCents,
      })),
    })),
    balances: group.members.map((member) => ({
      memberId: member.id,
      memberName: member.name,
      balanceCents: balanceByMember.get(member.id) ?? 0,
    })),
  });
}
