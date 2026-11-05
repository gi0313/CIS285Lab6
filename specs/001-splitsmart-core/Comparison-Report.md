# SplitSmart — Cross-check: Spec Kit via Copilot vs Direct Copilot

**Date:** 2026-11-04  
**Reviewer:** ChatGPT  
**Scope:** Canonical requirements and spec reviewed. **Spec Kit via GitHub Copilot vs independent direct GitHub Copilot comparison is NOT YET POSSIBLE.**  
**Status:** PRELIMINARY / INDEPENDENT AGENT OUTPUTS PENDING. No claim of actual Spec Kit or direct Copilot execution.

## 1. Evidence inventory / provenance

| Artifact | Verified on repository | Observation |
|---|---|---|
| `UserRequirement.md` | YES | Original customer requests eight functions and primary web delivery |
| `.specify/memory/constitution.md` | YES | Existing v1.0.0 ratified 2026-10-28; Java21/Maven/Swing, BigDecimal, JUnit5, PlantUML, human-review gates |
| `specs/001-splitsmart-core/spec.md` | YES | Existing draft, seven user stories, five resolved clarifications, six open questions |
| `specs/001-splitsmart-core/checklists/requirements.md` | YES | Existing quality checklist reports pass while open policy remains |
| `speckit/Architecture.md`, `speckit/Design.md` | NOT GENERATED IN THIS SESSION | Reserved for a genuine Spec Kit/Copilot run |
| `copilot/Architecture.md`, `copilot/Design.md` | NOT GENERATED IN THIS SESSION | Reserved for a genuine independent direct GitHub Copilot run |
| `chatgpt-draft/Architecture.md`, `chatgpt-draft/Design.md` | CHATGPT DRAFTS ON REVIEW BRANCH | Baseline proposals only; **not** substitutes for the other agents |

## 2. Comparison matrix — actual agent results

| Evaluation criterion | Spec Kit via Copilot output | Direct Copilot output | Cross-check result |
|---|---|---|---|
| Architecture boundaries | NOT RUN/NOT VERIFIED | NOT RUN/NOT VERIFIED | PENDING |
| Domain entities and API design | NOT RUN/NOT VERIFIED | NOT RUN/NOT VERIFIED | PENDING |
| Approval atomicity and idempotency | NOT RUN/NOT VERIFIED | NOT RUN/NOT VERIFIED | PENDING |
| Cent rounding and exact reconciliation | NOT RUN/NOT VERIFIED | NOT RUN/NOT VERIFIED | PENDING |
| Security, group scopes, receipt access | NOT RUN/NOT VERIFIED | NOT RUN/NOT VERIFIED | PENDING |
| Realistic web vs Swing platform handling | NOT RUN/NOT VERIFIED | NOT RUN/NOT VERIFIED | PENDING |
| JUnit 5 / PlantUML traceability | NOT RUN/NOT VERIFIED | NOT RUN/NOT VERIFIED | PENDING |

**Do not replace this table with imagined ratings.** When both independent output pairs exist, run Prompt C from `prompts/SplitSmart-SpecKit-Copilot-ChatGPT.md` and document concrete citations to headings and line ranges.

## 3. Preliminary cross-check — original requirement vs existing spec

| ID | Customer intent / status of existing spec | Preliminary verdict |
|---|---|---|
| FR-001 | Per-user account, login, private expense/balance visibility; email/password and recovery additionally clarified | COVERED at specification level |
| FR-002 | Group create/manage, membership and history | COVERED at specification level |
| FR-003 | Expense amount, date, description, share mode, receipt, participants | COVERED at specification level |
| FR-004 | Notify members when others add expenses | COVERED at specification level; delivery mode OPEN |
| FR-005 | Review and approve before ledger effect, possibly multi-level | COVERED at specification level; number/roles OPEN |
| FR-006 | Track pairwise balances | COVERED at specification level |
| FR-007 | Record settlements and reflect balances | COVERED at specification level; overpayment pair-credit clarified |
| FR-008 | Expense/balance/payment reports and custom filters | COVERED at specification level |
| FR-009 | Audit history; appears in the current spec but not as a separately enumerated original customer demand | ACCEPTABLE EXTENSION; identify as derived |
| NFR-001 | Original platform is primarily web-based | **BLOCKED:** Swing MVP constitutional choice requires product-owner approval |
| NFR-002 | Restrict data to authorized users | COVERED as a quality requirement; not implementation-tested |
| NFR-003 | Accurate reconciled money totals | COVERED as a quality requirement; no executable tests yet |
| NFR-004 | Interactive performance | NOT MEASURABLY SET; OQ-003 references timing though current OQ-003 actually asks approval depth |
| NFR-005 | Actionable validation/error messages | COVERED at specification level |
| NFR-006 | Durable data retention | OPEN duration and deletion policy |

## 4. Confirmed clarify answers (2026-10-28)

1. Expense payer pays full amount and may be excluded from allocated participant shares.
2. Only current active group members may participate in a group expense; historical transactions survive removal.
3. Reject zero/negative/non-monetary values, require exactly 100% percentage splits, monetary rounding HALF_UP.
4. Email/password login, sign-out and password recovery.
5. Overpayment is a recorded same-recipient credit toward future debt.

These are existing specification decisions, not new answers collected during this session. Do not reopen them without documented approval.

## 5. Worked financial invariants (design-level reasoning only)

- A pays **$60** for A, B and C at equal shares => **$20 each**. Ledger obligations: B owes A **$20** and C owes A **$20**. No self-obligation A->A. Unapproved expense => no ledger effect.
- B pays A **$25** against its $20 obligation => B's remaining debt to A **$0**, B's same-recipient credit against A **$5**, payment history records $25. Retrying the identical payment command must not create a second $25.
- **$10.00 / 3:** propose $3.34, $3.33, $3.33. Which participant receives the extra cent remains a policy choice.
- **$0.05 / 50%-50%:** independent HALF_UP rounding gives $0.03+$0.03=$0.06; a deterministic correction to $0.03+$0.02 is necessary to reconcile. The residue policy is not approved.
- Final approval may occur only once and must post accounting changes atomically, despite retry/concurrency.
- Reconcile per relevant group, currency and pair; never silently net unmatched currencies or groups.

## 6. Preliminary findings

| Severity | Issue and evidence | Proposed resolution/owner |
|---|---|---|
| **CRITICAL / BLOCKER** | NFR-001 web-first customer vs Swing required by constitution III and existing Swing MVP | Product owner must approve an explicit interim variance or approve architecture/constitution change |
| **HIGH** | OQ-004 unresolved currency/scale and cent-remainder distribution | Product owner + domain reviewer approve exact allocation algorithm before ledger implementation |
| **HIGH** | OQ-003 approval depth and self-approval, affecting fraud/authorization | Product owner set policy, then design/test workflow |
| **HIGH** | Multi-user synchronization/persistence not selected; standalone Swing storage would not satisfy shared groups | Engineer + product owner choose shared data service or explicitly limit MVP |
| **HIGH** | Password recovery/security, receipt access, role boundaries need concrete policy | Security reviewer / product owner decide and test |
| **MEDIUM** | OQ-006 notification delivery and OQ-007 record/receipt retention remain open | Product owner decide expected channels, durability and deletion |
| **MEDIUM** | `spec.md` uses OQ-003 in NFR-004 for timing targets, while actual OQ-003 covers approval depth | Correct reference in next reviewed clarification/spec revision |
| **MEDIUM** | FR-009 additional audit requirement needs explicit attribution as derived rather than original | Maintain trace to financial integrity and audit objectives |
| **MEDIUM** | Group-specific versus global net balance and multi-currency settlement are not settled | Add explicit policy/assumptions before implementation |

## 7. Pending independent review checklist

- [ ] Spec Kit genuinely executes constitution/specify/clarify/plan on the existing feature, using responses to actual clarification questions.
- [ ] Spec Kit exports independent `speckit/Architecture.md` and `speckit/Design.md`.
- [ ] direct GitHub Copilot independently reads canonical sources (not Spec Kit output) and exports `copilot/Architecture.md` and `copilot/Design.md`.
- [ ] ChatGPT verifies presence/provenance and reports exact side-by-side evidence and requirements traceability for both pairs.
- [ ] Security, ledger, rounding, group membership, receipt, reports and failure paths checked independently.
- [ ] Product owner signs off platform and outstanding policies.
- [ ] Human reviewer evaluates agent-generated text and code before accepting/merging, per constitution X.

## 8. Recommendation

**BLOCK final design approval pending platform decision and genuinely independent design artifacts.** Existing constitutional and specification files are real and usable. This report is an honest baseline cross-check, not the requested final two-workflow Copilot comparison. The prompt pack on `main` provides complete runnable prompts for each subsequent agent and for final comparison.

**No builds, automated tests, or external agent executions were performed in preparing this report.**

## 9. Workflow comparison fairness

Both generators rely on GitHub Copilot; only the generation workflow differs. The Spec Kit path uses the installed `/speckit-*` commands and their planning artifacts. The direct Copilot path must use a fresh context, the same canonical input snapshot, no Spec Kit commands, and no access to the Spec Kit plans or output documents. Version and commit provenance should be recorded for a defensible comparison. This report has **not** verified that either workflow ran. The current prompt pack is `prompts/SplitSmart-SpecKit-Copilot-ChatGPT.md`.
