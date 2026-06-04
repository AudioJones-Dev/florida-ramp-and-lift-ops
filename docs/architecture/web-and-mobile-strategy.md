# Web And Mobile Strategy

**Status:** Git Spec-Ready Draft  
**Scope:** Architecture decision only  
**Runtime impact:** None

## 1. Product Decision

The Florida Ramp & Lift Operational Intelligence Platform MVP ships as a responsive web app first.

Native mobile applications are out of MVP scope. The platform should still be designed so that future mobile apps can reuse the same backend, authentication model, roles, domain objects, state machines, approvals, events, and APIs.

The MVP product rule is:

- Michael Keegan and internal admins use desktop-first dashboard views.
- Contractors and installers use mobile-first web portal workflows.
- Clients are served later through secure links or a future client portal.
- Native mobile app support is a future phase, not a scaffold requirement.

## 2. Web App MVP Scope

The MVP web app should include:

- Responsive app shell.
- Role-aware navigation.
- Executive dashboard.
- Support admin view.
- Office/admin view.
- Dispatch view.
- Contractor portal MVP.
- Manual/mock core records.
- Operational queues.
- Approval and alert surfaces.
- Documentation review surfaces.
- Invoice readiness surfaces.

The MVP web app should not depend on mobile app stores, native app packaging, native push notifications, native camera APIs, or device-specific runtime features.

## 3. Mobile-First Contractor UX Requirements

Contractor workflows must be designed mobile-first even while delivered through the web app.

Contractor portal surfaces should prioritize:

- Assigned jobs.
- Site address and contact context.
- Scope of work.
- Required equipment.
- PPE and safety requirements.
- Job status.
- Documentation requirements.
- Photo/document upload entry points.
- Completion notes.
- Submit-for-review flow.
- Payout status visibility when released.

Contractor UX should avoid:

- Dense tables.
- Executive financial visibility.
- System configuration.
- Full customer database access.
- Other contractors' payout data.
- Admin-only queues.

The contractor workflow should fit the field pattern:

```txt
See job
-> Review scope and safety requirements
-> Do work
-> Upload proof
-> Add notes
-> Submit for review
```

## 4. Desktop-First Admin UX Requirements

Executive, support admin, office admin, dispatcher, and finance workflows may be desktop-first.

Desktop/admin surfaces should prioritize:

- Queue scanning.
- Multi-record comparison.
- Approval review.
- Documentation review.
- Invoice readiness review.
- Alert triage.
- Contractor roster review.
- Operational dashboard metrics.
- Audit and history context.

Desktop/admin UX should support denser layouts than contractor views, but must remain responsive and usable on tablets and smaller screens.

## 5. Future Mobile App Boundary

A future mobile app may be considered after the responsive web MVP proves the operating model.

Future mobile app candidates:

- Contractor field app.
- Lead installer app.
- Owner executive briefing app.
- Lightweight admin review app.

Future mobile app decisions must be made later and should evaluate:

- React Native.
- Expo.
- Capacitor.
- Native iOS/Android.
- App-store distribution.
- Native push notifications.
- Offline storage.
- Device camera/document handling.

None of those choices should be implemented in the MVP scaffold.

## 6. Shared Backend/API Assumption

Future mobile apps should reuse the same platform foundation as the web app:

- Organization model.
- User and role model.
- Object-level access rules.
- Customer, Job, Contractor, Communication, DocumentationArtifact, Invoice, Alert, and Approval objects.
- Operational state machine.
- Event architecture.
- Approval boundaries.
- Audit requirements.
- Future API contracts.

The mobile app should be a companion client, not a separate operating system.

## 7. Photo/Documentation Workflow Implications

Because contractor documentation is field-heavy, the web MVP should account for future mobile capture needs.

Design implications:

- Documentation artifacts must support photos, notes, PDFs, and future file references.
- Jobs must show required documentation clearly.
- Contractor portal should make missing documentation obvious.
- Documentation review states must distinguish `required`, `missing`, `submitted`, `needs_review`, `approved`, `rejected`, and `held`.
- Invoice readiness should remain blocked until required documentation is accepted.
- Upload UI should be designed for mobile screens even before real storage is added.

MVP implementation remains mock/manual only. No storage, native camera access, or upload infrastructure should be introduced by this document.

## 8. Notification Implications

Notification strategy should be designed but not implemented in MVP.

Future notification candidates:

- Contractor assignment reminders.
- Documentation missing alerts.
- Job schedule changes.
- Approval requests.
- Invoice review reminders.
- Missed follow-up reminders.
- Critical safety/compliance alerts.

MVP should expose notification-worthy states through queues and dashboards first. Live email, SMS, push notifications, and ResponseOS-triggered messaging are later phases.

## 9. Offline/Low-Signal Assumptions

Field work may happen in poor-signal environments.

The MVP should not implement offline sync yet, but future planning should account for:

- Draft completion notes.
- Queued photo/document uploads.
- Retry behavior.
- Clear upload status.
- No duplicate submissions.
- Audit trail continuity.
- Safe handling of partially submitted documentation.

Until offline support exists, the product should not promise offline completion or offline photo upload.

## 10. Non-Goals

This document does not authorize:

- React Native.
- Expo.
- Capacitor.
- Native iOS code.
- Native Android code.
- PWA manifest or service worker setup.
- App-store setup.
- Native push notification setup.
- Offline sync implementation.
- Camera integration.
- Real file upload/storage.
- Supabase, Clerk, HubSpot, QuickBooks, ResponseOS, or AI automation integration.
- Secrets or environment variable changes.
- Firebase.

## 11. Acceptance Criteria

This document is accepted when:

- It defines responsive web as the MVP delivery model.
- It defines native mobile as future scope.
- It preserves mobile-first contractor workflow requirements.
- It preserves desktop-first executive/admin dashboard expectations.
- It states future mobile should reuse backend, roles, domain model, state machine, events, approvals, and APIs.
- It documents photo/documentation, notification, and low-signal implications.
- It explicitly excludes React Native, Expo, Capacitor, PWA setup, app-store setup, native code, live integrations, secrets, and Firebase.
- It does not add app code, runtime setup, native dependencies, or mobile configuration.
