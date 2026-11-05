# SplitSmart Final Reconciliation Instructions

**Repository:** https://github.com/gi0313/CIS285Lab6  
**Feature:** `specs/001-splitsmart-core`  
**Document type:** Master instructions and acceptance criteria for a reconciled design-documentation baseline  
**Prepared:** 2026-11-05  
**Status:** INSTRUCTIONS ONLY — no claim that the final architecture/design is generated, reviewed, tested, or approved  
**Owner of final product decisions:** Human product owner / course reviewer

> **Mission:** Reconcile ALL legitimate existing SplitSmart requirements, clarifications, Spec Kit deliverables, independent GitHub Copilot deliverables, and ChatGPT draft/review evidence into **one consistent, auditable FINAL DOCUMENTATION PACKAGE** containing functional requirements, measurable non-functional requirements, architecture, detailed design, data specifications, UML diagrams (use case, component, detailed class, sequence, state, activity), supporting decisions, interfaces, testing, traceability, and approval records. Never mistake an instruction or a draft for a completed result.

## 0. Observed starting point (inventory as checked on `main` on 2026-11-05)

The following files **exist** and should be read before writing final artifacts:

| Artifact | Role | Authority |
|---|---|---|
| `UserRequirement.md` | Customer's eight feature areas plus primarily web-based platform | Highest authority for *customer intent* |
| `.specify/memory/constitution.md` | Current, ratified engineering constitution (v1.0.0, 2026-10-28) | Governance of engineering decisions, subject to conflict review |
| `specs/001-splitsmart-core/spec.md` | Existing draft with user stories, requirements, five recorded clarifications and open questions | Current working feature specification |
| `specs/001-splitsmart-core/checklists/requirements.md` | Existing specification-quality checklist | Evidence of *specification review*, NOT implementation success |
| `specs/001-splitsmart-core/Comparison-Report.md` | Preliminary ChatGPT cross-check | Advisory; its comparison remains pending actual independent outputs |
| `specs/001-splitsmart-core/chatgpt-draft/Architecture.md` | Proposed architecture, ChatGPT-authored | Review input only; NOT Spec Kit or direct Copilot output |
| `specs/001-splitsmart-core/chatgpt-draft/Design.md` | Proposed design, ChatGPT-authored | Review input only; NOT Spec Kit or direct Copilot output |
| `prompts/SplitSmart-SpecKit-Copilot-ChatGPT.md` | Full prompts for two independent workflows and ChatGPT comparison | Execution guide |
| `prompts/SplitSmart-SpecKit-Claude-ChatGPT.md` | Superseded redirect | Do not use the old Claude Code instructions |
| `.specify/feature.json` and `.--integration/.specify/*` | Existing Spec Kit feature/integration/configuration | Tooling context, not product requirements |
| `.--integration/.github/skills/speckit-*` | Installed Copilot Spec Kit skills and prerequisites | Use the installed commands according to their actual constraints |

**Not found in the inspected `main` tree at preparation time:** `specs/001-splitsmart-core/speckit/Architecture.md`, `speckit/Design.md`, `copilot/Architecture.md`, `copilot/Design.md`, `plan.md`, `tasks.md`, Java implementation, and test suite. Inspect all current branches and the repository again before starting; later work may have added these. **Do not fabricate missing artifacts, execution logs, review status, or comparisons.**

An auxiliary review branch `docs/splitsmart-design-review-20261104` also exists. Do a current branch inventory, compare its relevant documents with `main`, and import only genuinely newer, justified material. Do not use a branch's existence as proof a generator executed.

## 1. Non-negotiable source-of-truth and editing rules

1. **Customer intent wins over silently invented implementation scope.** `UserRequirement.md` is the original customer request. Retain all original functions and NFR-001 (primary web-based delivery). The constitution's Java Swing choice is an engineering constraint for a conditional MVP, **not proof of web compatibility**. If governance and customer intent conflict, log a BLOCKING decision, request actual human approval, and propose explicit alternatives; do not silently override either.
2. **Preserve approved clarifications.** The existing `spec.md` contains five clarification answers from 2026-10-28: the payer pays the entire expense and may be outside its split participants; new expense participants must be active members and removal does not destroy history; positive monetary amounts, exact 100% percentage total, HALF_UP rounding; email/password sign-in with sign-out and password recovery; excess payments become credit to the same recipient. Do not recast these as new or hypothetical answers.
3. **Keep original stable identifiers.** FR-001 through FR-008 correspond to original customer functions. FR-009 is a **derived audit/history extension** in the current spec and must be labeled as derived, not misattributed as an original ninth customer bullet. Preserve NFR-001 through NFR-006, MVP-001 through MVP-007, SC-001 through SC-006, user-story IDs, and existing OQ numbers. Add new IDs without quietly repurposing existing ones.
4. **Version and review the constitution.** Its existing `.specify/memory/constitution.md` is canonical. `.--integration/.specify/memory/constitution.md` is an untouched template and **must not replace it**. Do not change constitutional MUST rules, dates or versions without a documented proposal and human approval.
5. **Do not overwrite evidence.** Keep the customer file, original agent output directories, prompts, previous draft/reports, and past decisions intact. Create final documentation in `specs/001-splitsmart-core/final/`. Changes to canonical spec or constitution require a separate reviewed commit or PR and a recorded reason.
6. **Correctness before style.** Financial arithmetic must use `java.math.BigDecimal`, never binary float/double; share allocations reconcile exactly; approval creates one accounting effect, only after final authorization; payments are idempotent and credits are retained; group authorization must be checked in the business/application service; the Swing UI contains no financial business logic.
7. **Evidence labels are mandatory:** `SOURCE REQUIREMENT`, `CONFIRMED CLARIFICATION`, `RATIFIED CONSTRAINT`, `PROPOSED DESIGN`, `OPEN DECISION`, `BLOCKED`, `VERIFIED`, `NOT VERIFIED`, `DEFERRED WITH APPROVAL`. Do not call a document "approved" simply because an agent generated it.
8. **Human signoff is required** for acceptance of AI-authored artifacts and any scope/platform/financial/security/retention decisions. Keep drafts in a review branch until the relevant gates pass.

## 2. Resolve decisions before claiming "final approved"

Prepare `final/11-Decision-Log.md` with one row per decision: `Decision ID | Question | Alternatives | Evidence | Proposed selection | Decision owner | Status | Date | Impacted IDs/docs | Approval link`. Ask the human product owner questions rather than auto-answering. At minimum resolve or explicitly block the following:

| Issue | Required reconciliation | Owner / gate |
|---|---|---|
| **OQ-001 / NFR-001 — WEB vs Swing** | Customer requested primarily web-based; constitution says Java 21/Maven/Swing desktop MVP. Select approved web architecture, or authorize a **time-limited documented desktop MVP variance** with separate full-web delivery acceptance. Do not call Swing web-based. | Product owner; **BLOCKER** |
| **OQ-002 — credentials/recovery** | Password hash strategy, lockout/rate limiting, token expiry/use, anti-enumeration behavior, session timeout/logout, account reset controls. | Product owner and security reviewer |
| **OQ-003 — approvals** | Who may approve, minimum and maximum levels, whether submitter may self-approve, quorum/rejection, policy versioning, delegate/retry behavior. | Product owner; blocks approval design |
| **OQ-004 — money/rounding** | Supported currency/currencies, scale, precision, percentage entry precision, deterministic penny distribution and tie-breaking, group/currency boundaries, credit-offset ordering. Existing HALF_UP decision remains; **residue assignment is still open**. | Product owner and financial domain reviewer |
| **OQ-006 — notification** | In-app vs email/external channels, timing, retries, read status, who qualifies when membership changes, privacy. | Product owner |
| **OQ-007 — retention** | Retention periods and deletion/archival of accounts, approvals, transactions, receipts and audit logs; backup and privacy impact. | Product owner/security reviewer |
| **Additional open** | Shared storage/multi-user concurrency, optional receipt image type/size/security, who can enter payments on whose behalf, report grouping/date timezone and currency, deployment support expectations. | Technical lead + product owner |
| **Specification reference defect** | `spec.md` NFR-004 says timing goals require OQ-003, but OQ-003 concerns approval depth. Correct the reference via reviewed spec change; do not misuse that ID. | Spec owner |

If human decisions are unavailable, produce a **review-ready candidate** with clearly marked assumptions, alternatives and blocked claims; NEVER label the package "approved", "complete", or "production-ready".

## 3. Reconciliation execution workflow

### Phase A — Snapshot and inventory

1. Inspect `main` and all relevant branches; record repository SHA, file SHA/paths, last modification/commit, presence/absence and provenance for every source. Read `UserRequirement.md`, canonical constitution, full `spec.md` and checklist; inspect all `prompts/`, `specs/001-splitsmart-core/{speckit,copilot,chatgpt-draft}/` if present. Look for `plan.md`, `research.md`, `data-model.md`, `contracts/`, `tasks.md`, source code, tests, diagrams and future ADRs.
2. Fill `final/00-README.md` with an input manifest listing **actual** files and **missing** files. Do not treat the current preliminary comparison table as proof that an agent has run.
3. Freeze a shared source snapshot for the two Copilot workflows: customer file, constitution, revised/clarified canonical specification, and its checklist. Record commit SHA. A and B must see the **same reviewed canonical inputs**.
4. Build an inventory of every original customer requirement, settled clarification, constitution MUST statement, user story, NFR, open question and prior AI suggestion. Separate duplicates, contradictions and omissions with source links.

### Phase B — Generate two independent candidate architecture/design pairs (only if absent)

**Workflow A: Spec Kit via GitHub Copilot.** Follow `prompts/SplitSmart-SpecKit-Copilot-ChatGPT.md` with the existing feature; review `/speckit-constitution`, `/speckit-specify`, then run `/speckit-clarify` interactively. Stop for actual human answers; then `/speckit-plan` and export genuine output to `speckit/Architecture.md` and `speckit/Design.md`. Produce standard `plan.md`, `research.md`, `data-model.md`, `contracts/` and `quickstart.md` where supported. Preserve the Spec Kit output's exact generator provenance and commit.

**Workflow B: independent DIRECT GitHub Copilot.** Launch a **fresh session/worktree** at the same canonical input commit, without any Spec Kit slash commands. Read ONLY the four canonical input documents, not `plan.md`, Spec Kit output, ChatGPT draft or previous report. Write genuine independent files `copilot/Architecture.md` and `copilot/Design.md`. Record mode, date, session/operator, input snapshot and commit. Never pretend these two Copilot workflows use different underlying AI models.

**If an output is missing:** mark its comparison cells `NOT AVAILABLE`; use ChatGPT drafts as **explicitly labeled proposals** only, NOT an invented second run. If independent generation cannot be performed, go to Phase C and create a provisional baseline with a `PENDING INDEPENDENT COMPARISON` gate.

### Phase C — Evidence-based comparison and decision reconciliation

1. Have ChatGPT read `UserRequirement.md`, constitution, canonical spec, checklist, two pairs of actual generator outputs when present, supporting plans/ADRs, and the explicitly labeled ChatGPT draft. Perform separate **requirements completeness**, **architecture consistency**, **detailed-design consistency**, **data/ledger consistency**, **security**, **testability**, and **UML correctness** reviews.
2. For each disputed point, write a **Reconciliation Finding**: `ID | FR/NFR/SC/constitution source | Spec Kit evidence | Direct Copilot evidence | ChatGPT draft evidence | Nature of difference | CRITICAL/HIGH/MEDIUM/LOW | Recommended decision | Alternatives | Decision owner | Status`. Cite actual document path and heading; never invent evidence.
3. Prefer the design that meets the customer need, ratified constraints, reproducible tests and simpler justified complexity. Merge the strongest ideas only into the **final/** documents; do NOT edit the independent originals. If neither design satisfies a requirement, add new work rather than force a PASS.
4. Classify findings `AGREED`, `RECONCILED`, `UNRESOLVED`, `BLOCKED`, `REJECTED WITH REASON`. Record rationale, specific affected documents and any requirement changes in `final/13-Reconciliation-Report.md`.
5. Validate cross-document naming and semantics: exact actor/role names, object IDs, approval states, payer/participant distinction, ledger postings, currency dimensions, event types, endpoints, state transitions and concurrency behavior must match across requirements, tables, UML, architecture and sequence flows.
6. Escalate all BLOCKERs; a reconciler may draft options but cannot ratify a constitution amendment or invent customer decisions.

### Phase D — Assemble the FINAL documentation package

Create **all required files** below in `specs/001-splitsmart-core/final/` with consistent headings, date, revision, status, author/provenance, sources, related FR/NFR/ADR IDs, open decisions and reviewer. Keep each self-contained and cross-linked.

```text
specs/001-splitsmart-core/final/
├── 00-README.md
├── 01-Functional-Requirements.md
├── 02-Nonfunctional-Requirements.md
├── 03-Architecture.md
├── 04-Detailed-Design.md
├── 05-Data-Model-and-Dictionary.md
├── 06-Interfaces-and-Contracts.md
├── 07-Architecture-Decision-Records.md
├── 08-Security-Privacy-Threat-Model.md
├── 09-Test-and-Verification-Plan.md
├── 10-Requirements-Traceability-Matrix.md
├── 11-Decision-Log.md
├── 12-Open-Issues-and-Exceptions.md
├── 13-Reconciliation-Report.md
├── 14-Deployment-and-Operations.md
├── 15-Glossary.md
└── uml/
    ├── README.md
    ├── 01-use-cases.puml
    ├── 02-components.puml
    ├── 03-detailed-domain-classes.puml
    ├── 04-application-and-adapter-classes.puml
    ├── 05-sequence-expense-submission.puml
    ├── 06-sequence-approval-and-ledger.puml
    ├── 07-sequence-payment-and-credit.puml
    ├── 08-sequence-notification.puml
    ├── 09-state-expense-approval.puml
    ├── 10-state-payment-or-notification.puml
    ├── 11-activity-expense-lifecycle.puml
    ├── 12-activity-approval-and-payment.puml
    ├── 13-data-erd.puml
    └── 14-deployment.puml
```

**Required rendering:** Keep editable PlantUML source in Git. When tooling is available, also render readable SVG or PNG previews under `final/uml/rendered/`, with consistent file stems; check each rendered preview matches its source. If render tooling is unavailable, state `NOT RENDERED` and provide reproducible local rendering instructions, not fabricated images. Do not commit proprietary or embedded font assets.

### 4. Functional requirements (file 01)

- Include a concise system description, in-scope/out-of-scope boundaries, actors and role glossary, key user journeys, and customer-versus-derived distinction.
- **FR-001 Accounts:** register/create account, sign-in with email/password, sign-out, password recovery, authorized personal visibility.
- **FR-002 Groups:** create/manage groups, membership lifecycle, role enforcement, only active members in *new* transactions, historical continuity.
- **FR-003 Expenses:** payer, amount, date, description, included users, equal or percentage split, optional receipt image, validations, pending/rejected/approved statuses.
- **FR-004 Notifications:** new-expense events for eligible group members with no information leak or duplicate notification.
- **FR-005 Approvals:** explicit roles/rules/levels and decisions; no balance impact before final required approval; concurrency-safe once-only posting.
- **FR-006 Balances:** pairwise debts and credits, approved transactions only, accurate group/currency context, zero-state view.
- **FR-007 Payments:** payment parties, dates, amounts, history; settlement and same-recipient overpayment credit; duplicate protection.
- **FR-008 Reporting:** personal/group authorized expenses, balances and payments, inclusive date filtering, invalid/empty parameter handling, optional approved custom parameters.
- **FR-009 Derived:** immutable or append-only transaction/approval/membership audit records and explicit correction/reversal process — label as derived, not original customer text.
- Give each FR a stable ID, rationale/source, preconditions, normal/alternate/error flow, acceptance scenarios in Given/When/Then form, relevant exceptions, permissions, test IDs and UML links. Retain all seven existing user stories; add missing stories only with traceable IDs and provenance.
- Specify precise boundaries: an expense's payer may be excluded from the participants; both payer and participants must be active group members at submission; do not generate a self-debt; preserve older transactions after member deactivation.

### 5. Non-functional requirements (file 02)

Preserve current NFR-001..NFR-006 and **make them verifiable**. Add new NFR-007+ only as proposed/reviewed derived requirements. Each entry MUST state: `ID | Category | Requirement | Metric/threshold | Measurement method | Test/environment | Source | Priority | Decision owner/status`. Do not invent customer-approved quantitative targets.

| ID | Minimum focus | Required verification |
|---|---|---|
| **NFR-001 Platform** | Primarily web-based customer request versus conditional Swing MVP | Written scope/variance decision with owner, approved dates and target delivery; BLOCK if unapproved |
| **NFR-002 Security/privacy** | Authentication, authorization, least privilege, protected receipts/reports and safe session/recovery flow | Role/membership negative tests, token and access-control tests |
| **NFR-003 Monetary correctness** | BigDecimal-only money, exact share reconciliation, no duplicate postings and accurate balances | Unit/property/integration reconciliation tests |
| **NFR-004 Performance** | Response latency and data volume for primary workflows | Propose p95/scale targets and representative workload; mark threshold `TBD — approval required` until chosen |
| **NFR-005 Usability/error handling** | Accessible labeling, legible validation and actionable status information | Scenario checklist and accessibility/manual acceptance test |
| **NFR-006 Durability/retention** | Persist histories, survive restarts, backup/recovery, retention and deletion rules | Persistence/restart, recovery and retention-policy tests; policies OPEN |

Assess and add **proposed NFRs** for availability/reliability, auditability, scalability/multi-user concurrency, maintainability/modularity, interoperability, accessibility, observability/log hygiene, deployability/portability, dependency security, backup/recovery (RPO/RTO), and data integrity. Clearly state when a value is merely recommended (not approved). Where feasible, reuse existing SC-001..SC-006 measurable outcomes; check feasibility and distinguish manual user-acceptance trials from automated tests. The original spec's "95% pass with zero critical access-control failures" MUST NOT be interpreted as permitting any critical privacy flaw.

### 6. Architecture (file 03)

Document the selected **conditional** architecture with diagrams and ADR links:

- Business context, stakeholders, scope, quality attributes, functional drivers and platform decision.
- Context/boundary view: account holders, groups, system, notification/email providers, receipt storage and chosen authentication service; label external integrations as proposed if not approved.
- Component/layer view: Swing view/controllers (conditional), future web presentation/API alternative, application/use-case services, domain entities/policies, persistence ports/repositories, transaction/ledger, authentication, notification, receipt storage, reporting, adapters and runtime storage. Explicit dependency arrows: presentation → application → domain, outbound ports implemented by infrastructure.
- Deployment view: desktop-only demonstration versus centrally managed multi-user service/web. **Do not imply independent local Swing files synchronize users.** Record constraints, shared storage topology, remote access and operational responsibilities.
- Data consistency boundaries: single atomic transaction for final approval plus ledger, atomic payment/credit, idempotency keys, unique constraints, version checks/locks, outbox delivery and failure recovery.
- Authorization boundaries: authenticate and authorize in services, active group membership, historical membership views, manager/approver roles and receipt/report access.
- Alternatives, rejected options, failure modes, threat boundaries and trade-offs. Link architecture choices to requirement IDs, ADRs, data entities, tests and diagrams.

### 7. Detailed design (file 04)

Specify responsibilities, public service interfaces, pre/postconditions, validation, error codes, state transitions, concurrency/retry behavior and relevant UML. Cover:

1. **Account lifecycle:** credential verification (not plaintext), secure recovery, logout, session or desktop identity boundary.
2. **Group administration:** create/join/leave/remove role changes; preserve historical facts; authorize all operations.
3. **Expenses:** validation; payer, participant and group rules; attachment metadata/storage/access; submission as pending without balance changes; immutable allocation snapshot.
4. **Allocation algorithm:** BigDecimal and an explicitly proposed/approved deterministic smallest-unit remainder strategy; exactly 100% decimal percentages; rounding HALF_UP at approved currency scale; exact `sum(shares) = expense`; never negative shares or untracked residues.
5. **Approval state machine:** draft/pending/rejected/approved, optional multiple levels, no unauthorized/self approval per actual policy, double submit and concurrent final approvals, one transaction/one posting.
6. **Ledger model:** separate immutable source transactions and derived pairwise balances, consistent signs, no self-debt, per-group/per-currency context, no double counting or arbitrary cross-currency offsets.
7. **Payments/credits:** valid payer/recipient pair, payment entered once, amount applied against outstanding debt and excess same-recipient credit; later offset policy explicit, complete payment history, rollback/retry behavior.
8. **Notifications:** publish new-expense event once, deliver only to eligible members, deduplicate retries, do not leak receipts or other-group information, track read/delivery status.
9. **Reports:** authorized scope, time zone/date handling, inclusive ranges, deterministic totals, status filtering and empty/invalid result handling.
10. **Cross-cutting:** errors, validation, logging, security, transaction management, persistence adapters, test seams, UI/business separation and resilience.

Every operation must identify actor, input, output, failures, required authorization, transaction boundary, idempotency and requirement/test mappings. Keep transport/API and persistence details in files 05/06 rather than mixing them into customer requirements.

### 8. Data model and data dictionary (file 05)

Produce **conceptual, logical and proposed physical** models, plus the `13-data-erd.puml` ERD:

- Entities at minimum: `UserAccount`, `Group`, `GroupMembership`, `GroupRole`/`ApprovalPolicy`, `Expense`, `ExpenseAllocation`, `ApprovalDecision`, `ReceiptAttachment`, `LedgerEntry` (or clearly explained balanced journal), `Payment`, `PairCredit`, `Notification`, `NotificationDelivery`, `AuditEvent`; `ReportFilter` is a query model unless persistence justified.
- For each entity/table: business purpose, ID/key, columns/attributes, type and nullability, currency/scale, defaults, validations, sensitive-data classification, source requirement, relationships and multiplicities, delete/retention policy, lifecycle state, indexes/uniqueness and migration considerations.
- Define FK and uniqueness rules: active membership eligibility on new writes; exact foreign group scope; one ledger post per approved expense; one accepted payment per idempotency key; at most one notification delivery per event/recipient/channel; approved state with required approval history; reference integrity on payer/participants; preserve historic records if membership deactivates.
- Avoid a separately mutable `Balance` total as the sole truth: derive balance from immutable approved ledger events and payments/credits; cached read models may exist if reconciliation and invalidation are defined.
- Define an invariant and reconciliation job: all expense allocations total their expense; approved posting occurs exactly once; pairwise and group totals reconcile; reports match transaction source; no negative/invalid stored monetary values; overpayment credit applied once only.
- Propose relational storage and migrations if true shared access is chosen; compare SQL server vs SQLite demo limitations. Do not pretend a SQL schema is approved when storage is undecided.
- Add representative records with expected totals, and a data migration/rollback strategy with retention, backups and access control.

### 9. Required PlantUML/UML content (final/uml)

**Use plain text `.puml` as source; no screenshots in place of source.** All diagrams must share the same domain names and state labels with files 01-08 and include a title, legend where useful, and requirement IDs in notes or accompanying `uml/README.md`.

| File | REQUIRED contents and cross-check |
|---|---|
| `01-use-cases.puml` | System boundary, Account Holder, Group Member, Group Manager, Approver, Payment Recorder and external notifier where appropriate; use cases: sign-in/recover, manage groups, submit expense, attach receipt, approve/reject, see notifications/balances, record payment, generate reports; use `include`/`extend` only when semantically justified. |
| `02-components.puml` | UI (conditional Swing), potential web interface/API clearly FUTURE, domain/application services, repositories/ports, notification, receipt, authentication, storage adapters; permitted dependency direction, trust boundaries. |
| `03-detailed-domain-classes.puml` | Full domain classes, attributes with types, methods, associations and multiplicities; expense/allocations, members/roles, approvals, payments/credits/ledger, notifications and value objects; BigDecimal/amount/currency type; explicit enums/state types. |
| `04-application-and-adapter-classes.puml` | Controllers, application services, interfaces, repository/transaction abstractions, adapters, dependencies, composition/inheritance only where justified; no Swing import into domain. |
| `05-sequence-expense-submission.puml` | Login/authorize, validate active group members, calculate allocations, persist pending, outbox event, response; alternate invalid/rejected input with no ledger post. |
| `06-sequence-approval-and-ledger.puml` | Approver auth, policy/version checks, optional multiple levels, atomic final approval+ledger, uniqueness/idempotency, retry/concurrent approval and rejected paths. |
| `07-sequence-payment-and-credit.puml` | Payment validation, authorize, lock/read pair balance, atomic settle/credit, audit, duplicate retry and error path, no overpayment loss. |
| `08-sequence-notification.puml` | ExpenseCreated commit/outbox, select eligible recipients, deduplicate, send/inbox, retry/failure and privacy rules. |
| `09-state-expense-approval.puml` | Draft → Pending → Approved/Rejected; intermediate approval states/guards if adopted; terminal/immutable transitions; only final approval posts money. |
| `10-state-payment-or-notification.puml` | Distinguish recorded/posted/reversed payment or notification pending/delivered/read/failed/retry; guards and final states, no fictitious statuses. |
| `11-activity-expense-lifecycle.puml` | Start/login → group/participant/amount validation → equal/percent calculation → submit → notify → approval branch → balance view; clear decision branches/errors. |
| `12-activity-approval-and-payment.puml` | Authorized review and final posting, settle/pay/reconcile, retry and rejection flows with explicit transaction/rollback boundaries. |
| `13-data-erd.puml` | Tables/entities, PK/FK cardinality, ownership/nullable assumptions and audited relationships; matches data dictionary. |
| `14-deployment.puml` | Actual proposed or approved runtime nodes, optional future web architecture, multi-user shared persistence, external delivery/receipt nodes and network/privacy boundaries. |

**UML review criteria:** syntax compiles/renders, every actor/action is traceable, cardinalities and attribute types agree with data dictionary, approval and payment sequences conform to states and transactions, authorization checks appear in the correct layer, and no diagram labels an unapproved technology as a completed implementation. Include page/reference links from detailed design to each diagram and identify unresolved design options in notes.

### 10. Interfaces and contracts (file 06)

Document Java application-service contracts and interfaces (identity, group, expense, approval, balance, payment, notification, receipt, reporting, repositories, unit-of-work). For each, list operation name, purpose, inputs/outputs, authorization, idempotency, error cases and transaction semantics. If the product owner approves a web channel, provide a **proposed** API contract/OpenAPI specification with resources, methods, auth, pagination, idempotency headers and error model. Do not claim an API exists for a desktop-only demonstration. Version any schema or contract and describe compatibility/migrations.

### 11. ADRs, security, tests, operations, and related docs (files 07-15)

- **07 ADRs:** Every material choice: platform, storage, domain layering, money/remainder algorithm, ledger/event model, approval workflow, notification channel, auth mechanism, receipt storage, reports, retention. Give options, consequences, approvals and linked NFR/FR; rejected options must have rationale.
- **08 Threat model:** assets, trust boundaries, threat actors, likely abuse cases, mitigations and verification: cross-group data exposure, forged approval, duplicate request/replay, race conditions, tampered receipt, account enumeration, weak reset token, injection, stored attachment content type/size, sensitive logging and unauthorized export. Label unresolved safeguards as gates.
- **09 Test plan:** JUnit 5 unit/integration/contract test identifiers, fixtures, negative/auth tests, concurrency/idempotency stress, boundary/property tests for money, persistence restart, UI smoke/manual accessibility, platform UAT, nonfunctional measurement protocol, PlantUML validation. No fake test run results; record `PLANNED / EXECUTED-PASS / EXECUTED-FAIL / BLOCKED` per test.
- **10 Traceability matrix:** Every `FR-001..FR-009`, `NFR-001..NFR-006`, approved additional NFR, `MVP-001..MVP-007`, `SC-001..SC-006`, user-story AC, constitution principle maps to a specific section, design component/class/diagram, data entity, test ID, evidence and approval status. No blank "PASS" without evidence.
- **11 Decision log:** All confirmed clarify answers with source/session; all open choices and variance approvals with accountable owner and date. Keep proposed defaults separate.
- **12 Open issues/exceptions:** Severity, impact, options, workaround, time limit, owner and approved exceptions; any unmet critical customer feature blocks overall signoff.
- **13 Reconciliation report:** Independent Spec Kit vs Direct Copilot findings with actual evidence if outputs exist; explicit missing-input warning otherwise; decision rationale and merged final design; unresolved contradictions and checklist.
- **14 Deployment and operations:** Java/Maven/JUnit/PlantUML versions/commands; approved Swing or web topology and run steps; secrets/configuration, migrations, backup/restore, notification retries, monitoring and recovery; separate demonstration setup from production readiness.
- **15 Glossary:** Exactly define expense, payer, participant, group member, approver, allocation, balance, obligation, credit, payment, approval level, report scope, currency precision, audit event and idempotency key.
- **00 README:** Start-here navigation, documentation revision and status, selected scope, acceptance gates, manifest with links to all source documents, diagrams and known unresolved decisions.

### 12. Required worked examples and test oracles

Demonstrate these as expected **design-level outcomes** in data, design, tests and sequences; do not claim tests ran:

| Scenario | Required oracle |
|---|---|
| A pays **$60.00** for A, B, C equally | A's share $20; B owes A $20; C owes A $20; NO A→A debt; shares total $60 |
| Expense is pending or rejected | It affects no approved accounting balance; status/audit event still visible where authorized |
| B pays A **$25.00** against $20.00 owed | B→A outstanding debt becomes $0 and B holds **$5.00 same-recipient credit**; $25 payment retained in history |
| Retry same final approval | No second financial posting; response is consistent and auditable |
| Retry same payment idempotency key | No second settlement, no duplicated credit or report entry |
| $10.00 split equally among three | Example $3.34 / $3.33 / $3.33 with exactly $10 total; exact extra-cent recipient rule **OPEN until approved** |
| $0.05 at 50% / 50% | Raw HALF_UP $0.03 + $0.03 must be reconciled to $0.05 through deterministic correction; recipient assignment **OPEN until approved** |
| Group member removed after old approved expense | New submissions exclude removed member; old expense/approval/payment history remains accurate |
| Unauthorized member accesses another group's receipt/report | DENY without leaking sensitive data or membership |
| Concurrent final approvals | Exactly one approved transition and one set of ledger entries |
| Date-range report | Include only authorized events within the approved inclusive business-date range; date/timezone semantics documented |
| First-time/no activity | Report and balance show zero state; not invented debt |

Also test payer not included as a participant, invalid nonpositive or malformed money, percentages not equal to 100, unknown currency or cross-currency requests, self-approval per policy, failed notification after approved expense commit, storage restart and audit preservation.

### 13. Acceptance checklist / quality gates

Do not mark a gate complete until supporting evidence exists:

- [ ] **G0 Inventory:** exact source manifest, branch/commit identifiers and provenance captured; absent independent outputs honestly labeled.
- [ ] **G1 Requirements:** all 8 customer features present; original web requirement visible; FR-009 marked derived; five settled clarifications retained; new decisions clearly approved/open.
- [ ] **G2 NFRs:** existing NFRs retained, each has measurement method; all recommended new NFRs labeled proposed or approved; no fabricated SLA/latency/retention figures.
- [ ] **G3 Architecture:** single consistent architecture across final docs, explicit web-versus-Swing decision, shared-state model, auth, transactionality, recoverability and ADRs.
- [ ] **G4 Design/Data:** complete class/contract/data dictionary/ERD definitions with financial invariants, state machine, idempotency, authorization and data lifecycle.
- [ ] **G5 UML:** all 14 required PlantUML source files are substantive, syntax/render checked or marked NOT RENDERED; diagrams match architecture, design and data.
- [ ] **G6 Traceability:** full FR/NFR/MVP/SC/AC → architecture → design/data/diagram → test mapping, with no unexplained coverage gap or fake pass.
- [ ] **G7 Cross-check:** independent Copilot workflow outputs compared if available, or comparison explicitly PENDING; reconcile evidence and severity findings recorded.
- [ ] **G8 Verification:** planned vs executed tests distinguished; actual execution evidence and defects linked; no unperformed JUnit/security/performance test claimed passed.
- [ ] **G9 Governance:** product owner approves required scope/platform and financial/approval/security policies; human reviews AI output and constitution changes.
- [ ] **G10 Delivery:** files have working relative links, consistent versions, no placeholders masquerading as decisions, clean review diff, and approval/exception record.

**Final status rules:** `APPROVED` only if all blocking gates and required human signoffs pass; `REVIEW READY / BLOCKED` for complete draft docs with unresolved key decisions; `INCOMPLETE` if required documents/diagrams are missing. Even a completed document set is not evidence that code has been implemented.

## 14. Correct ordering of Spec Kit tooling

The installed Spec Kit includes `speckit-constitution`, `speckit-specify`, `speckit-clarify`, `speckit-plan`, `speckit-tasks`, `speckit-analyze`, `speckit-implement` and `speckit-converge` among its skills. Use only commands supported by the current editor and honor their prerequisites:

1. Constitution/specify/clarify (with genuine user answers) → plan and design candidates.
2. Generate `tasks.md` via `/speckit-tasks` **only after** a reviewed plan exists and only if the user wants implementation planning.
3. Run **`/speckit-analyze` only AFTER `plan.md` and `tasks.md` exist**; it is a read-only spec/plan/tasks consistency analysis, not the independent two-design comparison.
4. Run `/speckit-implement` only with explicit implementation authorization and a reviewed task list.
5. Run **`/speckit-converge` only AFTER tasks and an implementation pass**; it appends remaining implementation tasks and is **not** the tool for merging architecture or UML documents. Never use it as a substitute for the ChatGPT comparison/reconciliation described here.

## 15. Copy/paste kickoff prompt for a capable GitHub Copilot agent

```text
Read repository-root instruction.md in gi0313/CIS285Lab6 and execute its documented SplitSmart FINAL RECONCILIATION workflow.

First inventory all current branches and actual artifacts. Treat UserRequirement.md as customer intent, .specify/memory/constitution.md as the ratified engineering baseline, and specs/001-splitsmart-core/spec.md as the current working spec. Preserve the five recorded clarifications. Do not assume Spec Kit or direct Copilot outputs exist: verify their files and provenance. If missing, distinguish required external generation steps from provisional ChatGPT draft material.

Build a source-linked requirements inventory, NFR inventory and issue/decision log. Identify the primary-web-versus-Swing conflict as BLOCKING pending customer authorization; never resolve it by assumption. Generate the full 00-15 final document package and all 14 PlantUML diagrams exactly under specs/001-splitsmart-core/final/. Do not overwrite independent agent artifacts. Ensure financial reconciliation, group authorization, approval/payment idempotency, proper receipt and report privacy, detailed data entities, interfaces, tests and complete traceability.

Use evidence to compare Spec Kit via Copilot and DIRECT Copilot if both genuinely ran. If absent, mark the two-workflow comparison PENDING, with no invented findings. Keep all proposed implementation defaults labeled PROPOSED and all unresolved questions open. Include a per-file change summary, working documentation links, quality-gate checklist and final status REVIEW READY / BLOCKED until human approval. Do not implement source code unless separately instructed, do not assert any tests have run unless they have, and do not merge to main before human review.
```

## 16. Copy/paste final independent ChatGPT audit prompt

```text
Use the GitHub connector to read gi0313/CIS285Lab6's original requirements, canonical constitution/spec/checklist, actual Spec Kit and direct Copilot artifacts if available, and the proposed specs/001-splitsmart-core/final/ documentation package. Follow instruction.md's G0-G10 gates.

Audit every FR/NFR/SC/MVP/user story and accepted clarification for full traceability. Compare the two authentic independent Copilot outputs only where the files and provenance exist. Cross-check architecture vs detailed classes, APIs, data dictionary/ERD and all PlantUML use-case/component/detailed-class/sequence/state/activity diagrams. Verify transaction and BigDecimal invariants using the financial worked examples, authorization, idempotency, historical records and report filters. Check diagram source syntax/render evidence rather than merely asserting that diagrams exist. Highlight mismatches with precise paths/headings and CRITICAL/HIGH/MEDIUM/LOW severity.

Update only final/13-Reconciliation-Report.md and review notes (do not overwrite original generator outputs), and return APPROVE / REVISE / BLOCK with every missing approval and test clearly described. Never report a missing external agent run or an unexecuted test as passed.
```

---

**Deliverable of this instruction document:** A complete, reproducible reconciliation protocol, exact output paths, UML coverage, design/data/NFR content requirements, financial test oracles, evidence matrix, and signoff criteria. It does **not** itself constitute the final approved documentation set.
