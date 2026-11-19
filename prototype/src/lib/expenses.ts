export function parseAmountToCents(value: unknown): number | null {
  if (typeof value !== "string" || !/^\d+(?:\.\d{1,2})?$/.test(value.trim())) {
    return null;
  }

  const [whole, fraction = ""] = value.trim().split(".");
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  if (!Number.isSafeInteger(cents) || cents <= 0 || cents > 2_147_483_647) {
    return null;
  }
  return cents;
}

export function splitCents(amountCents: number, memberIds: string[]) {
  const sortedIds = [...memberIds].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const baseShare = Math.floor(amountCents / sortedIds.length);
  const remainder = amountCents % sortedIds.length;

  return sortedIds.map((memberId, index) => ({
    memberId,
    shareCents: baseShare + (index < remainder ? 1 : 0),
  }));
}
