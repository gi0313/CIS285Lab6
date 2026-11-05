# SplitSmart — Full Spec Kit / Independent Copilot / ChatGPT Workflow

**Repository:** https://github.com/gi0313/CIS285Lab6  
**Feature directory:** `specs/001-splitsmart-core/`  
**Prepared:** 2026-11-04  
**Version:** 2 — GitHub Copilot replaces Claude Code  
**Execution status:** Prompts ready. No Copilot or Spec Kit agent execution has been observed in this ChatGPT session.

## Objective and independent-run protocol

Produce a SplitSmart Constitution and clarified Spec, followed by **two independently authored Architecture and Design pairs**:

| Run | Tool and mode | Output directory |
|---|---|---|
| A | GitHub Copilot **through Spec Kit commands** | `specs/001-splitsmart-core/speckit/` |
| B | GitHub Copilot **direct Agent/Chat mode, no Spec Kit commands** | `specs/001-splitsmart-core/copilot/` |
| C | ChatGPT: comparison and cross-check **only after A and B exist** | `specs/001-splitsmart-core/Comparison-Report.md` |

Both generators use GitHub Copilot but have distinct procedures and contexts. This is a **workflow comparison**, not a comparison of two different underlying AI models. Run B in a fresh Copilot session/worktree, without reading Run A design or planning output. Do not copy drafts from `chatgpt-draft/` or any earlier report. Record tool/version, operator, dates, exact branch/commit and any files read. Preserve originals in separate paths.

### Canonical inputs (read by BOTH runs)

- `UserRequirement.md` — customer source of truth.
- `.specify/memory/constitution.md` — existing Spec Kit constitution v1.0.0, dated 2026-10-28.
- `specs/001-splitsmart-core/spec.md` — existing spec with **five previously answered clarifications**.
- `specs/001-splitsmart-core/checklists/requirements.md` — current quality check.

Existing repository Spec Kit integration: **1.2.4 configured for GitHub Copilot**, from `.--integration/.specify/integration.json`. Confirm command names in the installed editor; this pack uses the installed hyphenated `/speckit-...` form.

### Global requirements and review gates

Preserve customer capabilities: FR-001 account/authentication, FR-002 groups, FR-003 expense entry/equal or percentage split/optional receipt, FR-004 notifications, FR-005 approvals BEFORE balances, FR-006 pairwise balances, FR-007 payments, FR-008 reports; NFR-001 **primarily web-based** platform. FR-009 audit retention is a derived extension present in current spec, not a verbatim ninth customer bullet.

Respect established clarifications: (1) payer pays full expense, may be excluded from participant shares; (2) selected participants and payer are active group members, and removing members does not erase history; (3) positive money values and percentage total exactly 100%, HALF_UP monetary rounding; (4) email/password sign-in, sign-out and password recovery; (5) overpayment is credit for same pair/recipient.

**Critical conflict:** `UserRequirement.md` requires primarily web-based use, while existing constitution calls for Java 21/Maven and a Java Swing MVP. A Swing desktop implementation **does not** satisfy the customer's web platform requirement. Require explicit product-owner approval for a temporary variance or an approved architecture/constitution change; do not silently claim compliance.

Unresolved questions from spec: OQ-001 platform; OQ-002 auth/recovery security; OQ-003 approval depth and roles; OQ-004 currency, scale and cent residue; OQ-006 notification delivery; OQ-007 retention. In the existing spec, NFR-004 erroneously cites OQ-003 for performance, though OQ-003 concerns approvals; flag that for human-approved correction. Never fabricate user answers or tool executions.

All designs MUST distinguish REQUIRED / CONFIRMED / PROPOSED / OPEN / BLOCKED. Maintain Java 21, Maven, OO domain/UI separation, BigDecimal for monetary amounts (never float/double), JUnit 5 and PlantUML. Require authorization checks, immutable audit history, transactionally once-only accounting, and testable FR-to-design-to-test traceability.

---

## PROMPT A — Spec Kit through GitHub Copilot (run A)

Work in the checkout of `gi0313/CIS285Lab6`; use the EXISTING feature `specs/001-splitsmart-core`, not a new feature directory. The canonical constitution and spec **already exist**; update only when needed, preserve accepted clarification history, and require human review before amending governance. Run the following commands sequentially, not all at once.

### A1: Constitution (send into GitHub Copilot Spec Kit interface)

```text
/speckit-constitution Review the EXISTING .specify/memory/constitution.md for the SplitSmart project against UserRequirement.md. Preserve the constitution's existing version and amendment history unless a human approves a justified revision. Preserve FR-001 through FR-008, original NFR-001 primary-web platform, and engineering baseline Java 21/Maven, Swing as conditional MVP, OO separation of presentation and business logic, BigDecimal money precision, JUnit 5, PlantUML, audit traceability and review of AI results. Separate customer intent from implementation decisions. Identify the unresolved web-first vs Swing conflict and require an explicit product-owner decision; do not resolve it by assumption. Show a diff and request review rather than silently overwriting confirmed text.
```

### A2: Specify (run after reviewing A1)

```text
/speckit-specify Refine the EXISTING specs/001-splitsmart-core/spec.md using UserRequirement.md and .specify/memory/constitution.md. Do not create a different feature directory. Preserve all original functions and current five accepted 2026-10-28 clarifications. Use testable independent stories, Given/When/Then acceptance scenarios, stable FR-001..FR-009 identifiers, NFR-001..NFR-006, applicable MVP-001..MVP-007, explicit edge cases, and a requirements-to-verification matrix. Keep customer requirements technology-agnostic and Swing clearly labeled an interim MVP implementation decision. Keep unanswered policy questions OPEN, and do not invent stakeholder approval.
```

### A3: Clarify (interactive; a human must answer)

```text
/speckit-clarify Inspect specs/001-splitsmart-core/spec.md, especially its existing five accepted answers and remaining OQ items. Ask new, prioritized questions only, up to five at a time: primary web-based versus Swing interim variance; currency precision/cent remainder assignment; approval roles, self-approval and levels; secure recovery; notification channel and retention as capacity permits. Do not answer questions for me. Once I respond, record EACH response in the Clarifications section and update its affected requirements/acceptance scenarios. Leave unanswered issues OPEN; label the platform decision BLOCKED if approval is missing. Retain previous accepted answers.
```

**Stop here for genuine user answers.** If the product owner has not decided OQ-001 or another architecture-shaping policy, keep the design conditional and mark open gates. Do not manufacture a Clarify transcript.

### A4: Plan and export independent designs

```text
/speckit-plan Use the updated canonical constitution and clarified SplitSmart spec to create the actual Spec Kit plan in specs/001-splitsmart-core/plan.md, with research.md, data-model.md, contracts and quickstart.md where appropriate. Design Java 21/Maven; Swing presentation as a conditional desktop MVP only; OO isolated business/services/ports; BigDecimal with reconciled shares; JUnit 5; PlantUML; authorization-scoped group data; approval before atomic exactly-once ledger posting; idempotent payment and approval; pair-specific overpayment credit; auditable history; multi-user storage options and future web adapter. Show alternatives, ADRs, and still-open product policies. Do not silently claim web compliance or run code implementation.
```

After genuine Spec Kit planning completes, give the SAME Spec Kit/Copilot session this export prompt:

```text
Generate substantive architecture and detailed design documents from ONLY the approved canonical sources and the Spec Kit artifacts from this execution. Save them as:
  specs/001-splitsmart-core/speckit/Architecture.md
  specs/001-splitsmart-core/speckit/Design.md
Architecture.md: scope; customer and MVP constraints; context and components; deployment; ports/adapters; account security; tenancy authorization; storage and synchronized multi-user access; transaction boundaries; persistence and notification failure behavior; PlantUML architecture diagram; ADRs, alternatives, risks and requirement mapping.
Design.md: entities, interfaces, schemas and data relationships; payer and participant rules; BigDecimal equal and percentage split algorithms with precise proposed cent-remainder handling; approvals state machine and once-only ledger transactions; overpayment pair credits; notification, report and receipt flows; PlantUML class/sequence diagrams; JUnit 5 test matrix covering FR-001..FR-009 and NFR-001..NFR-006; open policy gates. Save self-check and evidence links. Do NOT read specs/001-splitsmart-core/copilot/ or chatgpt-draft/ and do not use the comparison report. State 'Generated via Spec Kit / GitHub Copilot' only if it was actually run. Do not merge without human review.
```

---

## PROMPT B — Direct GitHub Copilot (run B; WITHOUT Spec Kit)

Launch a **fresh, independent GitHub Copilot Agent/Chat session or worktree** on the same canonical reviewed commit after clarification decisions. Do NOT invoke any `/speckit-...` commands. Paste the following complete prompt as a single Copilot agent instruction:

```text
You are GitHub Copilot acting as an INDEPENDENT software architect and detailed designer for the SplitSmart expense-sharing system. Work in gi0313/CIS285Lab6, preferably in a separate worktree/branch. Your only source material is:
  UserRequirement.md
  .specify/memory/constitution.md
  specs/001-splitsmart-core/spec.md
  specs/001-splitsmart-core/checklists/requirements.md

DO NOT read or consult specs/001-splitsmart-core/plan.md, research.md, data-model.md, contracts/, speckit/, chatgpt-draft/, Comparison-Report.md or any prior agent-generated architecture/design output. DO NOT use Spec Kit slash commands. Work from the four canonical inputs and your own engineering reasoning; this is the standalone Copilot design run.

Create EXACTLY TWO detailed deliverables:
  specs/001-splitsmart-core/copilot/Architecture.md
  specs/001-splitsmart-core/copilot/Design.md

Architecture.md requirements:
- Scope, stakeholder journeys, current customer requirements and NFRs, explicit constraints, architecture drivers and quality attributes.
- Compare reasonable deployment/storage options: Swing local classroom demo, shared server + relational database, and longer-term web adapter. Explain the tradeoffs and the shared-state problem, not simply choose based on convenience.
- Document Java 21/Maven with Swing as a CONDITIONAL MVP, while highlighting that UserRequirement.md specifically calls for a primarily WEB-BASED system; no unapproved compliance claim.
- Clean OO layers: presentation controllers/views, application services/use cases, domain, repositories, authorization/identity, receipt/notification ports/adapters, transaction boundary and reporting; show dependency direction.
- Security: authentication, least privilege, active group membership checks, scope-bound receipts, secure recovery, privacy of reports; list outstanding choices.
- Consistency: immutable audited ledger, pending/rejected have no financial impact, idempotent final approval and payment, transactional posting, deduplicated notifications.
- PlantUML component/context diagrams, alternatives and ADRs, failure modes, risks and assumptions, source requirements-to-components traceability.

Design.md requirements:
- Detailed types: UserAccount, Group, GroupMembership, Expense, Allocation, ApprovalDecision, LedgerEntry, Payment, Credit, Notification, Receipt, Reports.
- Define operation contracts, authorization checks, input invariants and intended persistence model.
- Monetary values must use Java BigDecimal, NEVER binary floating point. Equal and exact-100%-percentage split methods, HALF_UP rounding, total exact reconciliation and deterministic proposed cent-residue algorithm with worked examples. If product owner has not chosen currency/precision/residue policy, explicitly mark it OPEN/PROPOSED.
- Payer pays full amount but may be excluded from split participants, all current active members, history survives member removal.
- Model configurable approval states, who can decide, reject and multilevel gating; final approval triggers exactly one atomic ledger posting; document race handling.
- Payments reduce pairwise debt, any overage stored as same-recipient credit, and repeated command keys cause no duplicate postings. Trace event and report date ranges.
- State machine and payment/approval/notification PlantUML diagrams; separation of UI/business logic and JUnit 5 tests for FR-001..FR-009, NFR-001..NFR-006 plus all confirmed clarification answers.
- Include source file references, architecture decisions, risks, unresolved OQs and human-approval gates. Clearly distinguish required behavior versus proposals.

Respect the customer-first web platform request. Do NOT silently choose Swing to be web compliant. The existing spec's six open questions remain open until actual human clarification; do not invent answers. Mark FR-009 as derived audit extension (not an original ninth bullet). Point out any inconsistent cross-references you identify. Do not modify existing spec, constitution or requirements; do not use other agents' outputs. Do not claim executed JUnit tests or builds. At the end, list saved files, evidence of your direct Copilot run and exact branch/commit; present diffs for human approval. Label 'Generated by direct GitHub Copilot' only if genuinely produced here.
```

## PROMPT C — ChatGPT cross-check and comparison (run C)

After BOTH independent output pairs are actually committed, use this prompt with ChatGPT's GitHub connection:

```text
Access my GitHub repository gi0313/CIS285Lab6 and independently review SplitSmart. First VERIFY presence and provenance of:
  UserRequirement.md
  .specify/memory/constitution.md
  specs/001-splitsmart-core/spec.md
  specs/001-splitsmart-core/checklists/requirements.md
  specs/001-splitsmart-core/speckit/Architecture.md
  specs/001-splitsmart-core/speckit/Design.md
  specs/001-splitsmart-core/copilot/Architecture.md
  specs/001-splitsmart-core/copilot/Design.md
Read plan/research or other diagrams only as supplementary evidence. If either output pair is absent, report NOT GENERATED / NOT VERIFIED and do not pretend a real side-by-side comparison is possible.

These are TWO separate GitHub Copilot workflows: A = Copilot using Spec Kit slash commands, B = direct Copilot without Spec Kit. Do NOT portray them as two distinct LLMs or credit Claude Code. Confirm separate work contexts and flag any copy/paste contamination.

Produce or update specs/001-splitsmart-core/Comparison-Report.md after review, with:
1. Executive assessment, exact evidence paths, branch/commits, dates, output provenance and run-mode limitations.
2. Side-by-side architecture comparison: deployment, Swing/web handling, modular boundaries, data stores, security, concurrency, transactionality, extensibility, ADRs and risks.
3. Side-by-side detailed-design comparison: entities/IDs, schema constraints, BigDecimal scales, deterministic cent residue, approval state machine, idempotency, payment/credits, reports/receipts, tests/PlantUML.
4. Matrix for FR-001..FR-009, NFR-001..NFR-006 and MVP-001..MVP-007; each entry has citations to BOTH generated designs, gaps and pass/partial/fail/unverifiable.
5. Check all seven current user stories against original UserRequirement.md; retain the five genuine clarified answers and identify remaining six OQs. FR-009 should be classified as derived audit extension. Identify the NFR-004/OQ-003 performance cross-reference error, if still present.
6. Worked financial test: A pays $60 for A/B/C equal => $20 each; B owes A $20, C owes A $20, A no self-debt. B pays A $25 => B debt to A $0 plus $5 same-recipient credit; exactly once on retries. Test $10/3 cents and $0.05 with 50%/50% HALF_UP and proposed remainder assignment. Approval prior to posting has no financial effect. Distinguish illustrative results from policy approval.
7. Severity-ranked findings (CRITICAL/HIGH/MEDIUM/LOW), tied to requirement IDs and exact evidence; include web-first vs Swing blocker, authorization, receipt privacy, shared persistence, audit history, duplicate approval/payment, notifications and retention.
8. Synthesized proposed reconciliation/architecture, explicit decision owners and action items. Do not silently resolve OQ-001.. or approve platform deviation.
9. Planned JUnit 5 test matrix with outcomes and traceability, NOT fake executed tests; explain what cannot be confirmed without source/build execution.
10. Verdict APPROVE / REVISE / BLOCK with human signoff gates.

DO NOT modify either generator's original Architecture/Design. Show exact changes to the comparison report and ask for human review before merging. If design outputs are missing, instead produce only a transparent preliminary gap analysis that says two-way comparison PENDING.
```

## Run and review sequence

1. Snapshot the four canonical inputs at a specific commit; protect that snapshot for both runs.
2. Run Spec Kit A1/A2/A3 **interactively**, obtain genuine product-owner clarifications, then A4 and export to `speckit/`.
3. Run standalone Copilot B in a NEW context against the same reviewed canonical input snapshot, with no Spec Kit commands and no access to Spec Kit-generated plans and outputs.
4. Collect both agent pairs on a review branch without changing their content. Preserve commit provenance.
5. Run ChatGPT C to cross-check actual documents; do not merge before a human reviewer approves the unresolved business/platform decisions and the proposed architecture/design.

**Important:** A saved prompt is not proof an agent ran. A ChatGPT-written reference draft is not evidence of Spec Kit or Copilot generation. The GitHub repository connector here can read/write files, but it does not execute GitHub Copilot editor agents or Spec Kit CLI commands.
