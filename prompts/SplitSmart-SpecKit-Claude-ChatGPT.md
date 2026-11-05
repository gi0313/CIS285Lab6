# SplitSmart — complete independent-agent prompt pack

**Repository:** https://github.com/gi0313/CIS285Lab6  
**Feature:** specs/001-splitsmart-core  
**Prepared:** 2026-11-04 by ChatGPT  
**Status:** Ready for independent execution; do not label drafts as actual agent output.  
**Environment:** Existing Spec Kit 1.2.4 GitHub Copilot integration; Claude Code must be run separately.

## Shared immutable inputs and quality gates

Every agent MUST read these documents in the repository:
1. UserRequirement.md — authoritative customer needs.
2. .specify/memory/constitution.md — governing engineering principles.
3. specs/001-splitsmart-core/spec.md — current detailed specification, including the five answered clarifications.
4. specs/001-splitsmart-core/checklists/requirements.md — existing quality checklist.

Keep exact customer requirement traceability (FR-001..FR-008, NFR-001). FR-009 is a useful audit extension, not an original verbatim customer requirement. Do not change settled clarification decisions without documented human approval: (1) payer need not be a participant; (2) only active group members participate; (3) positive amounts, exactly 100% percentage allocations, HALF_UP rounding; (4) email/password with sign-out and recovery; (5) overpayments become same-recipient credit.

**Blocking discrepancy:** UserRequirement.md asks for a primarily WEB-BASED app, but the current constitution requires Java 21/Maven/Swing for the MVP. Preserve BOTH constraints. Mark a Swing desktop MVP as a documented variance; it DOES NOT satisfy web delivery. Obtain explicit product-owner decision before claiming platform compliance.

**Unanswered questions (do not fabricate approvals):** OQ-001 platform, OQ-002 credential security and recovery policy, OQ-003 approver depth and self-approval, OQ-004 currency scale and deterministic remainder allocation, OQ-006 notification delivery, OQ-007 retention. Also identify persistence technology and receipt policy as implementation decisions needing review. Use statuses ANSWERED / PROPOSED / OPEN / BLOCKED.

## PROMPT A — Spec Kit (run in GitHub Copilot, existing integration)

Execute in the checkout for gi0313/CIS285Lab6. Spec Kit skills in this installation use /speckit-constitution, /speckit-specify, /speckit-clarify and /speckit-plan. Run ONE command at a time, review its changes, then proceed. If the editor uses dotted commands instead, invoke its equivalent command. Do not delete existing canonical artifacts or create a second feature directory. Use specs/001-splitsmart-core.

### A1. Constitution command — copy as the command message

~~~text
/speckit-constitution Review and strengthen the existing SplitSmart constitution IN PLACE at .specify/memory/constitution.md, using UserRequirement.md as the customer source of truth. Maintain requirement traceability FR-001..FR-008 and NFR-001, Java 21, Maven, Java Swing MVP, OO design, isolated domain/business logic, BigDecimal only for money, JUnit 5, PlantUML, idempotency, security and human review. Separate mandatory customer requirements from implementation decisions. DO NOT silently resolve the primary-web-versus-Swing conflict; explicitly record the pending customer approval. Preserve the existing version and ratification history unless a justified, human-approved amendment is made. Present proposed changes for review rather than overwriting settled decisions without consent.
~~~

### A2. Specify command — copy after constitution review

~~~text
/speckit-specify Refine the EXISTING SplitSmart Core Expense Sharing feature at specs/001-splitsmart-core/spec.md from UserRequirement.md. Preserve all eight customer functions: login and personal visibility, create/manage groups, amount/date/description/participants/equal-or-percent/optional-receipt expenses, new-expense notifications, approval before balance effect, pairwise balances, payment settlement, expense-balance-payment reports with date filters. Preserve the five accepted clarifications already recorded in the spec. Keep the specification technology-agnostic except for a clearly separated Swing MVP implementation variance. Add clear Given/When/Then criteria, security and financial boundary cases, testable business outcomes, and FR-ID traceability. Preserve NFR-001 web-based customer intent and explicitly list unresolved policy questions; do not invent answers.
~~~

### A3. Clarify command — conduct genuine question/answer round(s)

~~~text
/speckit-clarify Inspect the existing specs/001-splitsmart-core/spec.md and its five recorded answered clarifications. Ask up to five NEW high-impact, nonduplicative questions in priority order. Cover: (1) whether customer approves Java Swing as MVP despite required web platform; (2) currency/scale and deterministic cent-residue allocation; (3) approval levels, roles, and maker self-approval; (4) recovery/security and retention policies; (5) notification channels and receipts as time allows. Do not answer questions yourself or label defaults as user decisions. For each human answer update spec.md Clarifications and affected acceptance criteria. Leave unanswered questions explicitly OPEN and BLOCK the relevant claims of completion.
~~~

**Human checkpoint:** Answer the actual questions when Copilot asks. Existing answers from 2026-10-28 must be retained. Do not automatically advance unresolved critical product-owner decisions to APPROVED.

### A4. Plan command — copy after clarification review

~~~text
/speckit-plan Design SplitSmart based on UserRequirement.md, the canonical constitution and clarified specs/001-splitsmart-core/spec.md. Technical baseline: Java 21, Maven, Java Swing presentation ONLY as conditional classroom MVP, clean OO domain and application layers independent of Swing, interfaces for persistence/authentication/notification/receipt storage, BigDecimal monetary values with exact reconciliation, JUnit 5 and PlantUML. Preserve a future web adapter path without pretending Swing satisfies web. Approval must be an atomic, once-only transition before any ledger effect; pending/rejected expenses have no effect. Payment overage is same-recipient credit. Enforce active group membership and scoped access. Produce the standard Spec Kit plan.md plus relevant research.md, data-model.md, contracts and quickstart.md. Record unresolved decisions, alternatives, risks, tests and traceability. DO NOT implement code yet or treat speculative decisions as approved.
~~~

### A5. Follow-up instruction to Copilot AFTER /speckit-plan completes

~~~text
Using ONLY the canonical requirements/constitution/specification and the Spec Kit plan and research just created, export TWO full design documents:
- specs/001-splitsmart-core/speckit/Architecture.md
- specs/001-splitsmart-core/speckit/Design.md

Architecture.md: context diagram, architectural drivers, deployment and target-platform variance, component boundaries, ports/adapters, persistence strategy and alternatives, security model, concurrency/transaction boundary, PlantUML component view, ADRs, risks and traceability.
Design.md: classes and responsibilities, data/entity and ledger schema, precise split and remainder algorithm (unapproved policies labeled PROPOSED), approval state machine, notification and payment sequences, operations/contracts, authorization checks, edge cases, JUnit 5 test plan, requirement-to-test matrix and PlantUML design diagrams.
Add a heading 'Provenance: Generated by Spec Kit through GitHub Copilot' ONLY if these artifacts were actually produced in that execution. Otherwise label them drafts. Do not inspect specs/001-splitsmart-core/claude/ or chatgpt-draft/ outputs; that preserves independence. Commit only after human review per constitution.
~~~

## PROMPT B — Claude Code (independent author; paste full text)

~~~text
You are Claude Code, serving as an INDEPENDENT architecture and software design reviewer/author for SplitSmart. Work in the repository gi0313/CIS285Lab6, preferably on a dedicated review branch. READ ONLY the following sources before making design decisions: UserRequirement.md, .specify/memory/constitution.md, specs/001-splitsmart-core/spec.md and specs/001-splitsmart-core/checklists/requirements.md. Treat the customer requirements as authoritative, the constitution as governing, and the recorded five clarifications as already answered.

DO NOT read or use any Spec Kit-generated plan/research/design under specs/001-splitsmart-core/speckit/, and DO NOT read chatgpt-draft/ or Comparison-Report.md, or another agent's work. No cross-pollination. DO NOT change the canonical customer requirements, constitution or spec. Your goal is an original independent design, not implementing software.

Generate exactly these substantive Markdown deliverables:
(1) specs/001-splitsmart-core/claude/Architecture.md
(2) specs/001-splitsmart-core/claude/Design.md

Architecture.md MUST contain: objectives and non-goals; user actors and quality attributes; requirement trace table FR-001..FR-009 plus NFR-001..NFR-006; context, containers/components and dependencies; rationale for Java 21/Maven and Swing as a CONDITIONAL MVP only; a separate future web channel; authorization/security and privacy boundaries; storage and migrations; approval/ledger transaction consistency; offline versus shared-user implications; notification and receipt design; alternatives, ADRs, failure modes, assumptions and unresolved decisions.

Design.md MUST contain: domain entities and key attributes; invariants for BigDecimal accounting; payer may be outside participant set but is an active member; equal and exact-100-percent splits; proposed deterministic cent-remainder handling with examples; pairwise obligations and credits; approval states including multi-level configuration; rejected/pending have no balance effect; duplicate command and idempotency protection; payment and notification sequencing; role checks; repository/service interfaces; schema constraints; report filtering; test cases for each FR/NFR, and PlantUML source diagrams or links.

Critical unresolved policy: web-first customer request conflicts with Swing desktop MVP in the constitution. Explicitly mark the product-owner decision as OPEN and do not claim Swing complies. Likewise distinguish the five already answered clarifications from remaining open decisions on currency scale, approvers, secure recovery, notifications and retention. Avoid invented percentages, service levels or technology approvals. State assumptions with impact and options.

Use your own architectural judgment. Include at least two realistic alternatives for persistence and multi-user synchronization, explaining tradeoffs, not claiming decisions are approved. Do not simulate executed tests. Cite repository file paths and FR IDs. Include a concise independent self-review and risk ranking. Mark the document provenance 'Generated by Claude Code' only if genuinely generated in your run. DO NOT access or alter Spec Kit's independent output directory. Show all changed files and a diff for human approval; do not merge to main without human review.
~~~

## PROMPT C — ChatGPT compare, report and cross-check (paste after BOTH agent runs)

~~~text
You are ChatGPT, the INDEPENDENT COMPARISON and cross-check reviewer for SplitSmart in gi0313/CIS285Lab6. Read:
- UserRequirement.md
- .specify/memory/constitution.md
- specs/001-splitsmart-core/spec.md
- specs/001-splitsmart-core/checklists/requirements.md
- specs/001-splitsmart-core/speckit/Architecture.md and Design.md
- specs/001-splitsmart-core/claude/Architecture.md and Design.md
Optionally read generated plan.md, research.md, data-model.md and PlantUML sources, but do not substitute those for missing required deliverables.

FIRST verify that both independent output pairs exist and their provenance is credible. If any file is missing, report NOT RUN / NOT AVAILABLE rather than fabricate an agent comparison. Do not claim to have executed either agent. Identify review date and actual git commit IDs if available.

Create/update specs/001-splitsmart-core/Comparison-Report.md, reporting:
1. Executive summary and verification status.
2. Side-by-side Spec Kit vs Claude Code architecture AND design comparison (not a comparison of prompts).
3. Requirement-by-requirement traceability FR-001..FR-009, NFR-001..NFR-006 and MVP-001..MVP-007, with direct evidence path/section, missing coverage and severity.
4. Cross-check all user stories, the five confirmed clarifications, unresolved OQs and actual UserRequirement.md.
5. A financial correctness worked example: a $60 expense paid by A for A/B/C equally: each $20, B owes A $20, C owes A $20; B pays A $25 => B has a $5 credit against A. Confirm sum of shares equals expense, no self-debt, pending/rejected no effect, and double approvals/payments have one effect only. Include a non-even and percentage rounding scenario, flagged policy-deferred if remainder assignment is not approved.
6. Trace and rate discrepancies: CRITICAL/HIGH/MEDIUM/LOW. Check currency precision (BigDecimal only), idempotency, transaction atomicity, group authorization, receipt privacy, historical membership/audit preservation, reporting dates, recovery security, notification eligibility and data retention.
7. Platform conflict: original customer requests primarily web; constitution uses Swing for MVP. This must be a blocking unresolved product-owner choice, not a false PASS.
8. Concrete design differences, trade-offs, shared gaps, security/quality risks, suggested reconciled hybrid design, decision owners and next actions.
9. Test-case matrix with JUnit 5 test identifiers and expected outcomes, not fictional executed results.
10. Final recommendation: APPROVE / REVISE / BLOCK, with clearly stated human review gates.

Give each finding a requirement ID, evidence source and resolution. Explicitly distinguish evidence from assumption. Do not overwrite either agent's original artifacts, do not silently decide open questions, and do not merge anything without human review. If outputs are missing, still perform a transparent preliminary customer-vs-current-spec cross-check, labeling the agent comparison PENDING.
~~~

## Operator sequence and independent-output guardrails

1. Review the existing constitution and spec; preserve the five accepted 2026-10-28 clarification decisions.
2. In GitHub Copilot, run the four Spec Kit commands, responding to live clarification questions. Review the resulting changes and export Spec Kit-only architecture/design documents.
3. In a SEPARATE Claude Code context, give Claude only the four canonical inputs and Prompt B. Keep its outputs in claude/; it must not read Spec Kit, ChatGPT, or comparison artifacts.
4. Once both pairs exist, use Prompt C in ChatGPT. Verify each document was genuinely created, then perform the final comparison and cross-check.
5. Ask the human product owner to explicitly approve or reject the desktop-versus-web variance and all outstanding policy questions before implementation or final approval.

**Important:** The prompts are usable immediately. Saving them does NOT mean that either external agent has run or that its outputs exist. ChatGPT-authored draft architecture/design documents, if present in chatgpt-draft/, are neither Spec Kit nor Claude Code outputs.