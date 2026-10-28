# Feature Specification: SplitSmart Core Expense Sharing

**Feature Branch**: `001-splitsmart-core`

**Created**: 2026-10-28

**Status**: Draft

**Input**: User description: "Create a testable SplitSmart feature specification from the authoritative customer requirements in UserRequirement.md, preserving all customer features and separately labeling the Java Swing MVP subset."

## Clarifications

### Session 2026-10-28

- Q: Who is responsible for the expense amount, and may the payer be excluded from the shares? → A: The payer pays the full expense, while the selected participants receive shares and the payer may be included or excluded as a participant.
- Q: Who may be selected as a participant in a group expense? → A: Only current active members of that expense's group may be selected; removing a member does not erase prior expenses or balance history.
- Q: How should expense amounts and percentage allocations be validated and rounded? → A: Zero, negative, and non-monetary values are rejected; percentage totals must equal exactly 100 percent; monetary allocations are rounded half-up to the currency scale.
- Q: Which account sign-in behavior should SplitSmart use? → A: Email and password authentication with sign-out and password recovery.
- Q: What happens when a recorded payment exceeds the amount currently owed to the recipient? → A: Record the overpayment as a credit to the payer, preserving it for use against a later payable balance to the same recipient.

## User Scenarios & Testing *(mandatory)*

### Actors

- **Account Holder**: A person who signs in and manages their expenses and balances.
- **Group Member**: An account holder who belongs to one or more expense-sharing groups.
- **Group Manager**: A group member authorized to create or change group membership and settings.
- **Expense Approver**: A group member authorized to review and approve expenses under the group's approval rules.
- **Payment Recorder**: An account holder who records a payment made toward a balance.
- **Reporter/Group Member**: An account holder who views expense, balance, and payment summaries.

### User Story 1 - Sign In and View Personal Information (Priority: P1)

An account holder signs in and sees only the user's own expense and balance information.

**Why this priority**: Access control and personal account visibility are foundational to every other feature.

**Independent Test**: Create two accounts with different expenses, sign in as each account, and verify that personal information and access are correct.

**Acceptance Scenarios**:

1. **Given** a registered account with valid credentials, **When** the account holder signs in, **Then** access to their personal expense and balance information is granted.
2. **Given** one signed-in account, **When** the account holder attempts to view another account's private information without authorization, **Then** access is denied.
3. **Given** an account holder is signed out, **When** they attempt to access personal information, **Then** they are prompted to authenticate.

### User Story 2 - Manage a Sharing Group (Priority: P1)

A group manager creates a group, adds or removes eligible members, and updates group settings.

**Why this priority**: Groups provide the organization and participation context required for expenses and notifications.

**Independent Test**: Create a group, add and remove users, and verify that group membership is reflected consistently.

**Acceptance Scenarios**:

1. **Given** a signed-in account holder, **When** they create a group with a name and members, **Then** the group is created and its members can access it according to authorization rules.
2. **Given** a group manager, **When** they add or remove a member, **Then** the membership list updates and future actions respect the updated membership.
3. **Given** a member, **When** they attempt to change membership or settings without manager authority, **Then** the change is denied.

### User Story 3 - Create and Submit a Shared Expense (Priority: P1)

A group member creates an expense with amount, date, description, an equal or percentage split, involved users, and an optional receipt image.

**Why this priority**: Expense creation is the primary value flow and feeds approval, balances, and reports.

**Independent Test**: Submit equal and percentage expenses with multiple participants, then verify the pending entries and total allocation.

**Acceptance Scenarios**:

1. **Given** valid expense details and involved members, **When** the expense is submitted, **Then** it appears in pending or review status and does not alter balances until approved when approval is required.
2. **Given** an equal split, **When** the expense is reviewed, **Then** the entered amount is allocated across the selected participants according to the documented equal-split rule.
3. **Given** a percentage split totaling 100 percent, **When** the expense is reviewed, **Then** the amount is allocated according to the percentages without losing or duplicating monetary value.
4. **Given** an expense entry with optional receipt image data, **When** the image is attached, **Then** it remains associated with that expense and is readable by authorized users.
5. **Given** invalid data such as a negative amount, zero amount, missing date, missing description, a non-group participant, or percentages that do not total 100 percent, **When** submission is attempted, **Then** the system rejects the entry and explains the validation failure.

### User Story 4 - Review and Approve an Expense (Priority: P1)

An authorized approver reviews a submitted expense and approves or rejects it according to group rules.

**Why this priority**: Approval must occur before expenses affect balances, as required by the customer.

**Independent Test**: Submit one expense for a group, approve it under the configured workflow, and verify balance effects and status.

**Acceptance Scenarios**:

1. **Given** a submitted expense, **When** an authorized approver approves it, **Then** its status becomes approved and eligible balance adjustments are applied once.
2. **Given** a submitted expense, **When** an authorized approver rejects it, **Then** it remains excluded from balance calculations and the submitter is informed of the result.
3. **Given** an approved expense, **When** approval is repeated or a duplicate action is submitted, **Then** balances are not adjusted again.
4. **Given** configured multiple-level approval, **When** only an initial approval exists, **Then** the expense remains pending and balances remain unchanged until all required approvals are recorded.

### User Story 5 - Receive Expense Notifications (Priority: P2)

A group member is informed when another group member creates a new expense.

**Why this priority**: Notification helps members review expenses promptly and keep shared records accurate.

**Independent Test**: Create an expense in a group and verify that eligible group members receive an expense-created notification.

**Acceptance Scenarios**:

1. **Given** a group member and a newly submitted expense in that group, **When** the expense is created, **Then** a notification is made available to affected group members.
2. **Given** a notification, **When** the recipient opens it, **Then** it identifies the expense and provides access to authorized review details.
3. **Given** a member outside the expense's group, **When** the expense is created, **Then** that member receives no notification.

### User Story 6 - Track and Settle Balances (Priority: P1)

A member views balances owed to and from other users and records approved payments that settle them.

**Why this priority**: Balance and payment tracking are essential to the core accounting purpose.

**Independent Test**: Approve expenses and record payments, then verify pairwise balances and totals are reconciled.

**Acceptance Scenarios**:

1. **Given** an approved equal-split expense, **When** balances are calculated, **Then** each involved payer/debtor relationship reflects its allocated share.
2. **Given** a recorded payment from one member to another, **When** the payment is accepted, **Then** both displayed pairwise balances reflect the payment once and the current amount owed decreases appropriately.
3. **Given** a payment exceeding the recorded balance, **When** submission is completed, **Then** the recorded balance is settled and the excess is retained as credit to the payer for the same recipient.
4. **Given** multiple expenses and payments, **When** a member views their summary, **Then** current balances reconcile with the underlying approved transactions.

### User Story 7 - View Reports and Summaries (Priority: P2)

A member views expense, balance, and payment reports and can apply supported filters such as date ranges.

**Why this priority**: Reports provide visibility and review without being part of the transaction entry path.

**Independent Test**: Enter dated expenses and payments, apply filters, and verify totals and included records match the underlying data.

**Acceptance Scenarios**:

1. **Given** approved expenses and recorded payments, **When** the member opens a summary, **Then** expenses, balances, and payments are displayed in the authorized scope.
2. **Given** a valid start and end date, **When** a report is generated, **Then** only records whose dates fall in the inclusive range are included.
3. **Given** invalid report parameters, **When** report generation is requested, **Then** the system rejects the request with an actionable explanation.

### Edge Cases

- Equal-split expense totals and percentage allocations must allocate correctly without an untracked remainder; every rounded allocation is traceable to the expense total.
- Percentage splits must reject percentages that are not valid or do not total exactly 100 percent.
- Zero, negative, or non-monetary expense and payment amounts must be rejected without changing balances.
- Duplicate approval, payment, or submission actions must not apply the same accounting effect twice.
- Removing a group member with existing expenses or balances must preserve historical records and existing settlements.
- A receipt image may be unavailable or unreadable; expense data must remain usable and the issue must be reported.
- An expense approved under one approval configuration then changed afterward must retain its original approval result and accounting effect.
- An account with no transactions must display zero balances rather than implicit debt.

## Requirements *(mandatory)*

### Functional Requirements - Customer Requirements Inventory

- **FR-001**: The system MUST provide a user account for every person and MUST authenticate each person with email and password before granting access to their expense and balance information. The system MUST provide sign-out and password recovery.
  - **Acceptance:** Valid registered accounts access only their authorized personal data; invalid credentials, password recovery requests for unregistered accounts, and unauthenticated access are denied or handled without revealing account existence.
- **FR-002**: The system MUST allow authorized users to create, view, update, and remove or deactivate groups and manage their members. Only current active group members MAY participate in or receive group expense actions.
  - **Acceptance:** Group changes are persisted and membership changes affect eligibility for group actions without deleting historical records.
- **FR-003**: The system MUST allow a user to create an expense containing amount, date, description, equal or percentage split method, optional receipt image, payer, and selected involved participants. The payer MUST pay the full amount; the participant set MAY include or exclude the payer. Zero, negative, or non-monetary amounts MUST be rejected; percentage splits MUST equal exactly 100 percent; allocations MUST round half-up to the currency scale.
  - **Acceptance:** Valid equal and percentage expenses are accepted; invalid monetary values, dates, descriptions, participants, or percentages are rejected.
- **FR-004**: The system MUST notify affected group members when a new expense is created by another group member.
  - **Acceptance:** Every eligible member receives one actionable notification per new expense event, and non-members receive none.
- **FR-005**: The system MUST place expenses into review and prevent them from affecting balances until the group's configured approval requirements are satisfied.
  - **Acceptance:** Pending and rejected expenses have zero accounting effect; approved expenses affect balances exactly once; approval configuration supports at least one reviewer and records each decision.
- **FR-006**: The system MUST track balances owed by each user to every other user from approved expenses and recorded payments.
  - **Acceptance:** Pairwise balances reconcile with approved expense allocations and payments, with no duplicate application from repeated actions.
- **FR-007**: The system MUST allow users to record a payment made to settle a balance owed. If a payment exceeds the amount currently owed to the recipient, the excess MUST be retained as a credit to the payer for later application against a payable balance to that same recipient.
  - **Acceptance:** A valid payment updates the relevant pairwise balance once, excess amount becomes visible credit, and the transaction is included in payment history and reports.
- **FR-008**: The system MUST provide expense, balance, and payment reports and summaries and MUST support custom filtering, including date ranges and other agreed parameters.
  - **Acceptance:** Reports include the correct authorized records and totals for the selected filters and display an explanation for empty or invalid results.
- **FR-009**: The system MUST preserve original expense, approval, payment, membership, and balance history so later changes do not erase audit information.
  - **Acceptance:** Corrections or group membership changes leave prior accounting events traceable and prevent retroactive silent recalculation.

### Non-Functional Requirements - Customer and Quality Constraints

- **NFR-001**: The customer's stated platform is **primary web-based**; delivery MUST treat a desktop-only implementation as a scoped MVP or variance, not as replacement of the customer requirement, until a human product-owner decision is recorded.
- **NFR-002**: User data and private expense/balance information MUST be visible only to authorized users or roles.
- **NFR-003**: Monetary results displayed or reported by the system MUST be internally consistent and reconciled to two-party and whole-system totals.
- **NFR-004**: The system SHOULD respond to ordinary user actions quickly enough for interactive use; testable timing targets require approval through open question OQ-003.
- **NFR-005**: Validation failures and accounting-status changes MUST be understandable and actionable by the user.
- **NFR-006**: The system SHOULD retain group and accounting records so reporting remains accurate across sessions; exact persistence and retention rules require approval.

### Java Swing MVP Subset - Implementation Decision, Not a Customer Requirement

The following subset is proposed only for the Java Swing MVP implementation. It MUST NOT be interpreted as reducing FR-001 through FR-008.

- **MVP-001**: Provide Java Swing screens for account sign-in, personal balance summary, group membership management, expense entry, expense approval, payment recording, and report viewing.
- **MVP-002**: Implement the core equal-split and percentage-split calculation flow for selected group members.
- **MVP-003**: Provide in-application presentation of new-expense notifications for group members.
- **MVP-004**: Include one reviewer approval as the minimum MVP workflow; configurable or multiple-level approval remains in the full customer requirement and is not removed by the MVP label.
- **MVP-005**: Support report summaries and date-range filtering sufficient to demonstrate expense, balance, and payment visibility.
- **MVP-006**: Exclude a web deployment unless separately approved; this MVP subset does not resolve the platform variance in NFR-001.
- **MVP-007**: Preserve traces from each MVP acceptance scenario to FR-001 through FR-008 so MVP completion status is explicit.

## Key Entities *(include if feature involves data)*

- **User Account**: A person identity, login eligibility, and authorization scope for personal and group data.
- **Group**: A named collection of users, managers, approvers, and approval configuration.
- **Group Membership**: The relationship between an account and a group, including role and active status.
- **Expense**: Amount, date, description, split method, selected participants, payer who paid the full amount, participant set that may include or exclude the payer, status, optional receipt image, and approval history.
- **Expense Allocation**: The monetary share assigned to an involved user for an expense.
- **Approval Decision**: Reviewer, decision, decision date, required approval level, and expense status transition.
- **Balance**: The current amount one user owes another, derived from approved expenses and payments.
- **Payment**: Payer, recipient, amount, date, optional description, and recorded status.
- **Notification**: Expense event, recipient, delivery or read status, and authorized navigation target.
- **Report**: Selected filters, included records, calculated totals, and generated date range.

## Acceptance Criteria Matrix

| Requirement | Verification | Pass Condition |
|---|---|---|
| FR-001 | Account and authorization scenarios | Valid sign-in succeeds; unauthorized personal data is denied |
| FR-002 | Group create/update/remove scenarios | Membership and authorization changes are correct and historical data is retained |
| FR-003 | Equal and percentage expense scenarios | Valid expense records are complete; invalid entries are rejected |
| FR-004 | Group notification scenarios | Eligible members receive one notification and non-members receive none |
| FR-005 | Approval workflow scenarios | Pending and rejected expenses have no accounting effect; approved expense applies exactly once |
| FR-006 | Balance reconciliation scenarios | Pairwise balances and aggregate totals match transactions |
| FR-007 | Payment recording scenarios | Payment updates the target balance once and appears in history |
| FR-008 | Report generation scenarios | Filtered records and totals match underlying authorized data |
| FR-009 | Audit and correction scenarios | Historical transactions remain traceable after later changes |
| NFR-001 | Scope review | Platform implementation is explicitly approved and Swing is documented as an MVP/variance |
| NFR-002 | Authorization tests | Private data is inaccessible to unauthorized users or roles |
| NFR-003 | Monetary reconciliation tests | Displayed, pairwise, and aggregate totals reconcile |

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In user-acceptance testing, at least 90 percent of first-time participants can create a valid equal-split expense and complete submission without facilitator intervention.
- **SC-002**: In test data containing at least 100 approved expenses and 100 payments, pairwise and aggregate balance totals reconcile with zero unexplained variance.
- **SC-003**: Duplicate approval, duplicate payment, or repeated submission actions produce no more than one accounting effect in 100 test iterations.
- **SC-004**: A date-range report generated from 1,000 dated records matches the expected record count and total in every case in a reviewed test set of at least 20 report queries.
- **SC-005**: In a reviewed authorization test set covering all account roles and group membership states, at least 95 percent pass with zero critical access-control failures; no unauthorized access to private balances is accepted.
- **SC-006**: A group member can identify the status of a submitted expense, its approval result, and its resulting balance effect within one report or summary view.

## Assumptions

- Account authentication uses email and password, with sign-out and password recovery.
- Group membership is the default scope for expense participants, approvals, notifications, and group reports.
- An approved expense is the only expense state that changes balances; rejected and pending expenses remain non-accounting records.
- Equal and percentage allocations round monetary shares half-up to the currency scale and preserve the expense total with traceable allocation adjustments.
- Payment amounts are entered by the user and become permanent settlement records after successful validation; overpayments become credit records for the payer and the same recipient.
- Receipt image support means an optional image reference or stored attachment; exact image format and size limits are deferred.
- A desktop Java Swing MVP may be demonstrated while the primary web platform remains the original customer requirement and platform decision remains open.
- Test data will cover normal, boundary, and unauthorized-access cases without requiring production deployment.

## Open Questions

- **OQ-001 - Platform Decision**: Does the product owner approve Java Swing as the MVP presentation platform despite the original primary web-based requirement, and for how long may the desktop MVP replace web delivery? This is the highest-impact scope decision.
- **OQ-002 - Authentication Policy**: What password complexity, lockout, recovery-token lifetime, and credential-recovery rules should apply to email/password authentication?
- **OQ-003 - Approval Depth**: Is one approval sufficient for the MVP, and who may approve or reject expenses in each group at full scope (single approver, managers, all members, or multiple levels)?
- **OQ-004 - Monetary Scale and Remainders**: Which currency and decimal scale should be used, and how should percentage or equal-split remainders be assigned after half-up allocation?
- **OQ-006 - Notification Delivery**: Is in-product notification sufficient, or are email or other external notification channels required in full scope?
- **OQ-007 - Data Retention**: What retention and account-deletion policy applies to expenses, receipts, approvals, payments, and balances?
