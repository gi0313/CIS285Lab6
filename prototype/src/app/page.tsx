"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Member = {
  id: string;
  name: string;
};

type Expense = {
  id: string;
  description: string;
  amountCents: number;
  createdAt: string;
  payer: Member;
  participants: Array<Member & { shareCents: number }>;
};

type Group = {
  id: string;
  name: string;
  members: Member[];
  expenses: Expense[];
  balances: Array<{ memberId: string; memberName: string; balanceCents: number }>;
};

type GroupSummary = {
  id: string;
  name: string;
  memberCount: number;
};

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error ?? "Something went wrong. Please try again.");
  }
  return body as T;
}

function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(cents) / 100);
}

function signedMoney(cents: number) {
  if (cents === 0) return "$0.00";
  return `${cents > 0 ? "+" : "−"}${money(cents)}`;
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function Home() {
  const [groups, setGroups] = useState<GroupSummary[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [group, setGroup] = useState<Group | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [payerId, setPayerId] = useState("");
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const loadGroups = useCallback(async () => {
    const result = await requestJson<GroupSummary[]>("/api/groups");
    setGroups(result);
    if (!selectedGroupId && result.length > 0) {
      setSelectedGroupId(result[0].id);
    }
  }, [selectedGroupId]);

  const loadGroup = useCallback(async () => {
    if (!selectedGroupId) {
      setGroup(null);
      return;
    }
    const result = await requestJson<Group>(`/api/groups/${selectedGroupId}`);
    setGroup(result);
    setPayerId((current) =>
      result.members.some((member) => member.id === current)
        ? current
        : (result.members[0]?.id ?? ""),
    );
    setParticipantIds((current) =>
      current.length > 0
        ? current.filter((id) => result.members.some((member) => member.id === id))
        : result.members.map((member) => member.id),
    );
  }, [selectedGroupId]);

  useEffect(() => {
    let active = true;
    requestJson<GroupSummary[]>("/api/groups")
      .then((result) => {
        if (!active) return;
        setGroups(result);
        if (result.length > 0) setSelectedGroupId(result[0].id);
      })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : "Could not load groups.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedGroupId) {
      setGroup(null);
      return;
    }
    let active = true;
    requestJson<Group>(`/api/groups/${selectedGroupId}`)
      .then((result) => {
        if (!active) return;
        setGroup(result);
        setPayerId((current) =>
          result.members.some((member) => member.id === current)
            ? current
            : (result.members[0]?.id ?? ""),
        );
        setParticipantIds((current) =>
          current.length > 0
            ? current.filter((id) => result.members.some((member) => member.id === id))
            : result.members.map((member) => member.id),
        );
      })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : "Could not load this group.");
      });
    return () => {
      active = false;
    };
  }, [selectedGroupId]);

  async function submitGroup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      const created = await requestJson<GroupSummary>("/api/groups", {
        method: "POST",
        body: JSON.stringify({ name: groupName }),
      });
      setGroups((current) => [...current, created]);
      setGroupName("");
      setSelectedGroupId(created.id);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not create the group.");
    } finally {
      setSaving(false);
    }
  }

  async function submitMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedGroupId) return;
    setError("");
    setSaving(true);
    try {
      await requestJson(`/api/groups/${selectedGroupId}/members`, {
        method: "POST",
        body: JSON.stringify({ name: memberName }),
      });
      setMemberName("");
      await Promise.all([loadGroup(), loadGroups()]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not add this member.");
    } finally {
      setSaving(false);
    }
  }

  async function submitExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedGroupId) return;
    setError("");
    setSaving(true);
    try {
      await requestJson(`/api/groups/${selectedGroupId}/expenses`, {
        method: "POST",
        body: JSON.stringify({
          description,
          amount,
          payerId,
          participantIds,
        }),
      });
      setDescription("");
      setAmount("");
      await Promise.all([loadGroup(), loadGroups()]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not record this expense.");
    } finally {
      setSaving(false);
    }
  }

  const toggleParticipant = (memberId: string) => {
    setParticipantIds((current) =>
      current.includes(memberId)
        ? current.filter((id) => id !== memberId)
        : [...current, memberId],
    );
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="SplitSmart home">
          <span className="brand-mark">S</span>
          <span>split<span className="brand-light">smart</span></span>
        </Link>
        <div className="topbar-note"><span className="status-dot" /> Shared expenses, made simple</div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="section-label">YOUR WORKSPACE</div>
          <div className="sidebar-heading">Your groups <span>{groups.length}</span></div>
          <div className="group-list">
            {groups.map((item) => (
              <button
                className={`group-option ${selectedGroupId === item.id ? "selected" : ""}`}
                key={item.id}
                onClick={() => setSelectedGroupId(item.id)}
                type="button"
              >
                <span className="group-icon">{initials(item.name) || "G"}</span>
                <span className="group-option-copy">
                  <strong>{item.name}</strong>
                  <small>{item.memberCount} {item.memberCount === 1 ? "member" : "members"}</small>
                </span>
                <span className="group-chevron">›</span>
              </button>
            ))}
            {!loading && groups.length === 0 && (
              <p className="sidebar-empty">Your groups will show up here.</p>
            )}
          </div>
          <form className="new-group-form" onSubmit={submitGroup}>
            <label htmlFor="group-name">START A GROUP</label>
            <div className="inline-input">
              <input
                id="group-name"
                maxLength={60}
                onChange={(event) => setGroupName(event.target.value)}
                placeholder="e.g. Cabin weekend"
                required
                value={groupName}
              />
              <button aria-label="Create group" disabled={saving} type="submit">+</button>
            </div>
          </form>
          <div className="sidebar-footer">
            <span className="footer-orbit">✳</span>
            <span>Good things are better<br />when shared.</span>
          </div>
        </aside>

        <section className="main-content">
          {error && (
            <div className="error-banner" role="alert">
              <span>{error}</span>
              <button aria-label="Dismiss error" onClick={() => setError("")} type="button">×</button>
            </div>
          )}
          {loading ? (
            <div className="empty-workspace"><span className="loading-mark">S</span><p>Getting your groups ready…</p></div>
          ) : !group ? (
            <div className="empty-workspace">
              <span className="empty-illustration">✳</span>
              <p className="eyebrow">A LITTLE LESS “WHO OWES WHO?”</p>
              <h1>Make sharing<br />feel easy.</h1>
              <p>Create a group to keep shared expenses and balances all in one place.</p>
              <form className="empty-create-form" onSubmit={submitGroup}>
                <input
                  aria-label="New group name"
                  maxLength={60}
                  onChange={(event) => setGroupName(event.target.value)}
                  placeholder="Name your first group"
                  required
                  value={groupName}
                />
                <button className="button-primary" disabled={saving} type="submit">Create a group <span>→</span></button>
              </form>
            </div>
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <div className="breadcrumb">YOUR GROUPS <span>/</span> OVERVIEW</div>
                  <h1>{group.name}</h1>
                  <p>{group.members.length} {group.members.length === 1 ? "member" : "members"} <span className="bullet">·</span> {group.expenses.length} {group.expenses.length === 1 ? "expense" : "expenses"}</p>
                </div>
                <div className="heading-avatar-stack" aria-label={`${group.members.length} group members`}>
                  {group.members.slice(0, 4).map((member, index) => (
                    <span className={`stack-avatar avatar-${index % 4}`} key={member.id} title={member.name}>{initials(member.name)}</span>
                  ))}
                  {group.members.length > 4 && <span className="stack-more">+{group.members.length - 4}</span>}
                </div>
              </div>

              <div className="balance-banner">
                <div className="balance-banner-copy">
                  <span className="eyebrow">EVERYTHING IN BALANCE</span>
                  <h2>It all adds up.</h2>
                  <p>Shared fairly, down to the last cent.</p>
                </div>
                <div className="balance-total">
                  <span>GROUP SPENDING</span>
                  <strong>{money(group.expenses.reduce((total, expense) => total + expense.amountCents, 0))}</strong>
                  <small>{group.expenses.length} {group.expenses.length === 1 ? "expense recorded" : "expenses recorded"}</small>
                </div>
                <span className="banner-sparkle sparkle-one">✳</span>
                <span className="banner-sparkle sparkle-two">✳</span>
              </div>

              <section className="balances-section">
                <div className="section-heading">
                  <div><span className="eyebrow">THE FAIR SHARE</span><h2>Member balances</h2></div>
                  <span className="balance-hint">Positive = receives <span>·</span> Negative = owes</span>
                </div>
                {group.members.length === 0 ? (
                  <div className="subtle-empty">Add your first member to start tracking balances.</div>
                ) : (
                  <div className="balance-grid">
                    {group.balances.map((balance, index) => (
                      <article className="balance-card" key={balance.memberId}>
                        <div className={`member-avatar avatar-${index % 4}`}>{initials(balance.memberName)}</div>
                        <div className="member-balance-copy">
                          <strong>{balance.memberName}</strong>
                          <span>{balance.balanceCents > 0 ? "gets back" : balance.balanceCents < 0 ? "owes" : "all settled"}</span>
                        </div>
                        <strong className={`balance-amount ${balance.balanceCents > 0 ? "positive" : balance.balanceCents < 0 ? "negative" : ""}`}>
                          {signedMoney(balance.balanceCents)}
                        </strong>
                      </article>
                    ))}
                  </div>
                )}
              </section>

              <div className="content-grid">
                <div className="left-column">
                  <section className="panel members-panel">
                    <div className="panel-heading">
                      <div><span className="eyebrow">THE CREW</span><h2>Members <span className="count-pill">{group.members.length}</span></h2></div>
                      <span className="panel-icon">◎</span>
                    </div>
                    {group.members.length > 0 && (
                      <div className="member-list">
                        {group.members.map((member, index) => (
                          <div className="member-row" key={member.id}>
                            <span className={`member-avatar small avatar-${index % 4}`}>{initials(member.name)}</span>
                            <strong>{member.name}</strong>
                            <span className="member-badge">IN THE GROUP</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <form className="add-member-form" onSubmit={submitMember}>
                      <label htmlFor="member-name">ADD SOMEONE</label>
                      <div className="field-with-button">
                        <input
                          id="member-name"
                          maxLength={60}
                          onChange={(event) => setMemberName(event.target.value)}
                          placeholder="Enter a name"
                          required
                          value={memberName}
                        />
                        <button className="button-secondary" disabled={saving} type="submit">Add member <span>+</span></button>
                      </div>
                    </form>
                  </section>

                  <section className="panel expense-form-panel">
                    <div className="panel-heading">
                      <div><span className="eyebrow">ADD TO THE TAB</span><h2>New expense</h2></div>
                      <span className="panel-icon receipt-icon">▤</span>
                    </div>
                    {group.members.length < 1 ? (
                      <p className="form-note">Add a group member before recording an expense.</p>
                    ) : (
                      <form className="expense-form" onSubmit={submitExpense}>
                        <label htmlFor="expense-description">WHAT WAS IT FOR?</label>
                        <input
                          id="expense-description"
                          maxLength={100}
                          onChange={(event) => setDescription(event.target.value)}
                          placeholder="e.g. Groceries for the cabin"
                          required
                          value={description}
                        />
                        <div className="form-row">
                          <div>
                            <label htmlFor="expense-amount">AMOUNT</label>
                            <div className="currency-input"><span>$</span><input
                              id="expense-amount"
                              inputMode="decimal"
                              onChange={(event) => setAmount(event.target.value)}
                              placeholder="0.00"
                              required
                              value={amount}
                            /></div>
                          </div>
                          <div>
                            <label htmlFor="expense-payer">PAID BY</label>
                            <select id="expense-payer" onChange={(event) => setPayerId(event.target.value)} required value={payerId}>
                              {group.members.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}
                            </select>
                          </div>
                        </div>
                        <fieldset className="participants-field">
                          <legend>SHARED WITH</legend>
                          <div className="participant-options">
                            {group.members.map((member, index) => (
                              <label className={`participant-chip ${participantIds.includes(member.id) ? "checked" : ""}`} key={member.id}>
                                <input
                                  checked={participantIds.includes(member.id)}
                                  onChange={() => toggleParticipant(member.id)}
                                  type="checkbox"
                                  value={member.id}
                                />
                                <span className={`tiny-avatar avatar-${index % 4}`}>{initials(member.name)}</span>
                                {member.name}
                                {participantIds.includes(member.id) && <span className="checkmark">✓</span>}
                              </label>
                            ))}
                          </div>
                        </fieldset>
                        <button className="button-primary full-button" disabled={saving} type="submit">Split this expense <span>→</span></button>
                      </form>
                    )}
                  </section>
                </div>

                <section className="panel history-panel">
                  <div className="panel-heading history-heading">
                    <div><span className="eyebrow">THE PAPER TRAIL</span><h2>Expense history</h2></div>
                    <span className="history-count">{group.expenses.length} TOTAL</span>
                  </div>
                  {group.expenses.length === 0 ? (
                    <div className="history-empty">
                      <span className="empty-receipt">▤</span>
                      <strong>Nothing on the tab yet</strong>
                      <p>Once you add an expense, it’ll show up here.</p>
                    </div>
                  ) : (
                    <div className="expense-list">
                      {group.expenses.map((expense, index) => (
                        <article className="expense-entry" key={expense.id}>
                          <span className={`expense-icon expense-icon-${index % 4}`}>{["↗", "⌂", "✳", "▤"][index % 4]}</span>
                          <div className="expense-details">
                            <strong>{expense.description}</strong>
                            <span>Paid by {expense.payer.name} <i>·</i> {new Date(expense.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                            <small>Split between {expense.participants.map((member) => member.name).join(", ")}</small>
                          </div>
                          <strong className="expense-amount">{money(expense.amountCents)}</strong>
                        </article>
                      ))}
                    </div>
                  )}
                  {group.expenses.length > 0 && (
                    <div className="history-footer"><span>That’s everything for now.</span><span>✳</span></div>
                  )}
                </section>
              </div>
              <footer className="page-footer"><span>SplitSmart</span> · Less chasing, more sharing.</footer>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
