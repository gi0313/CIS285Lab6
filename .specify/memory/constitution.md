<!-- Sync Impact Report
Version change: template scaffold -> 1.0.0
Added sections: Customer Requirements; Implementation Decisions; Engineering Constraints;
Quality and Traceability; Governance
Added principles: Requirements Source of Truth; Java and Maven Baseline; Swing Presentation;
Object-Oriented Design; GUI/Business Separation; Money Precision; JUnit 5 Verification;
PlantUML Documentation; Requirement Traceability; Human Review
Removed sections: none
Follow-up TODOs: Obtain explicit customer approval for the Swing-versus-primary-web platform decision.
-->

# SplitSmart Constitution

## Core Principles

### I. Requirements Source of Truth

The contents of `UserRequirement.md` are the authoritative customer request. Every delivery
MUST preserve and trace the stated functions, including user accounts, group management,
expense creation, notifications, approval workflow, balance tracking, payment tracking, and
reporting. Customer requirements MUST be recorded independently from implementation choices,
and no implementation choice MAY silently weaken, add to, or replace a customer requirement.

### II. Java 21 and Maven Baseline

Implementation MUST use Java 21 and Maven as the build and dependency-management platform.
All source code and tests MUST compile with the project's Java 21 Maven configuration. Build,
dependencies, and plugins MUST be declared in the Maven project so that a clean build is
repeatable on supported development and review machines.

### III. Java Swing Presentation

Java Swing is the approved GUI technology unless the governing project decision is amended.
Swing views MUST use clear components, accessible labels where practical, predictable layouts,
and standard Java 21 capabilities. A Java Swing implementation MUST NOT be represented as
satisfying the customer's primary web-based platform requirement unless the customer explicitly
approves a platform-technology variance.

### IV. Object-Oriented Design

The implementation MUST use object-oriented principles: cohesive classes, clear responsibilities,
encapsulation, explicit domain types, and substitution through interfaces or abstractions when
behavior varies. Inheritance MUST be used only where it expresses a genuine is-a relationship;
composition and small interfaces SHOULD be preferred. Avoid unnecessary abstractions and keep
public APIs focused and understandable.

### V. GUI and Business Logic Separation

GUI classes MUST not contain financial calculations, approval decisions, balance mutation rules,
or other domain business rules. Swing controllers or adapters MUST translate user actions and
view state into calls to independently testable application and domain services. Business
services MUST not depend on Swing classes or UI events, and persistence or notification adapters
MUST be isolated behind interfaces. The separation MUST support testing the business behavior
without launching a GUI.

### VI. BigDecimal for Money

All money amounts, split values derived from money, balances, payments, and monetary totals MUST
use `java.math.BigDecimal`. Floating-point types MUST NOT be used for monetary calculations or
monetary storage. Implementations MUST define currency scale and rounding behavior explicitly;
percentage split calculations MUST use a documented rounding strategy, and distributed amounts
MUST be checked so totals reconcile without untracked rounding residue.

### VII. JUnit 5 Verification

The implementation MUST use JUnit 5 for automated unit and integration tests. Business rules,
boundary conditions, approval behavior, split calculations, balance updates, and payment
settlement MUST have automated tests. Tests MUST be repeatable, independent, and runnable from
Maven. A change that affects an expense, balance, approval, or payment rule MUST include or
update its relevant tests before completion.

### VIII. PlantUML Documentation

PlantUML MUST be used for diagrams needed to communicate architecture and behavior. Requirements
with meaningful interactions MUST be represented by an appropriate source diagram, such as a
class, sequence, activity, use-case, or component diagram, and diagram source MUST remain in the
repository with generated reviewable output when generated assets are required. PlantUML models
MUST reflect the implemented design rather than acting as stale decoration.

### IX. Requirement Traceability

Each customer requirement MUST have a stable identifier and a trace from requirement to design,
implementation, test, and review status. Traceability records MAY be maintained in feature specs,
design documents, source comments only where useful, and test names, but MUST never depend on
undocumented memory. Requirements MAY not be marked complete until an identified implementation
and automated verification cover the requirement, or an approved exception is recorded.

### X. Human Review of AI Output

AI-generated specifications, code, tests, diagrams, and reports MUST be reviewed by an accountable
human reviewer before they are approved or committed. Review MUST verify requirements coverage,
Java correctness, financial precision, GUI/business separation, test results, and unintended
scope changes. Passing automation alone does not replace human review or approval.

## Customer Requirements

The following identifiers are derived from `UserRequirement.md` and are customer requirements,
not implementation decisions:

- **FR-001 User Accounts**: Each person MUST have an account and log in to access their own
  expense and balance information.
- **FR-002 Group Management**: Users MUST create and manage groups for roommates, trips, parties,
  coworkers, or similar sharing relationships.
- **FR-003 Expense Creation**: Users MUST create expenses with amount, date, description, equal
  or percentage split, optional receipt image, and involved users.
- **FR-004 Notification System**: Users MUST be notified when another group member creates a
  new expense.
- **FR-005 Approval Workflow**: Expenses MUST be reviewed and approved before affecting balances;
  the approval depth MAY be configured according to group needs.
- **FR-006 Balance Tracking**: The system MUST track each user's balance relationships according
  to approved entered expenses and payments.
- **FR-007 Payment Tracking**: Users MUST record payments made to settle balances.
- **FR-008 Reporting**: Users MUST receive expense, balance, and payment reports, with custom
  date-range and parameter reports available where supported by the approved scope.
- **NFR-001 Platform**: The original customer request identifies a primary web-based platform.

## Implementation Decisions

The following are engineering implementation decisions and remain subordinate to the customer
requirements above:

- Use Java 21.
- Use Maven.
- Use Java Swing for desktop GUI presentation.
- Use JUnit 5 for automated verification.
- Use PlantUML for required design and behavior documentation.
- Use object-oriented design and clear GUI/business separation.
- Use BigDecimal for all monetary values and calculations.

Because NFR-001 says the platform is primary web-based while Java Swing is a desktop GUI
technology, this conflict MUST be handled through human product-owner review. The constitution
does not silently declare the conflict resolved; an approved amendment or scope decision MUST
explicitly record the selected platform interpretation before implementation proceeds as Swing.

## Quality and Traceability

Every feature specification MUST classify each requirement as customer requirement, design
constraint, or deferred implementation choice. Acceptance criteria MUST be testable. Maven
builds MUST be capable of running the complete automated test suite without GUI-only intervention
for business behavior. PlantUML source and human-reviewed diagrams MUST stay aligned with the
current architecture. Requirement coverage gaps MUST be reported rather than hidden.

## Governance

This constitution supersedes conflicting project conventions only to the extent allowed by
approved customer requirements. Amendments require a documented proposal, human review, and a
record of migration impact. A MAJOR version change removes or redefines an existing principle or
customer requirement; a MINOR version change adds or materially expands principles or sections;
a PATCH changes clarification or non-semantic wording. All specifications, plans, tasks, code,
diagrams, and reviews MUST verify compliance with this constitution, and deviations require an
explicit written justification and approval.

**Version**: 1.0.0 | **Ratified**: 2026-10-28 | **Last Amended**: 2026-10-28
