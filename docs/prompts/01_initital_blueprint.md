# Prompt Record – AeroSafe Insights

**Prompt ID:** 01  
**Date:** 2025-11-02  
**Version:** v0.1  
**Purpose:** Generate initial Firebase App Blueprint for Safety Assessment Tool (SAT)  
**Used In:** Firebase Studio

---

### Prompt Text
Build a Safety Assessment Tool (SAT) for airlines and regulators in Nepal to record, classify, and analyze aviation safety reports following ICAO Doc 9859 and CAAN standards.

The app should manage two report types:

1. Voluntary Safety Report (VSR)
2. Mandatory Occurrence Report (MOR)

Core goals:
- Collect structured safety data through forms.
- Assess each report’s risk (Severity × Probability).
- Track corrective and preventive actions.
- Display dashboards for safety performance.
- Export data for regulator use.

Key features:
- Firebase Authentication (Email + Google Sign-In)
- Firestore for reports, users, actions, audit logs
- Cloud Storage for attachments
- Role-based access (Reporter, Safety Officer, Admin)
- Cloud Functions for risk index calculation
- React + Tailwind UI (Login, Dashboard, Reports, Actions, Admin)
- CSV/PDF export
- Deployed using Firebase Blaze plan

Collections:
- **reports:** type, title, description, severity, probability, risk_index, action_status, attachments, reporter_id, created_at  
- **users:** name, email, role  
- **actions:** report_ref, assigned_to, description, due_date, status  
- **audit_logs:** actor_uid, action, timestamp

Rules:
- Reporters see only their reports.
- Safety Officers see and edit all.
- Admins manage users and exports.

Expected Output:
Firebase project with Auth, Firestore schema, Cloud Functions for risk index, and hosted basic frontend. Include role-based routing examples and starter UI.

---

### Notes
- Firebase proposed **AeroSafe Insights** as the project name.  
- Setup included Auth, Firestore, Cloud Functions, and Hosting.  
- Default schema aligned with aviation SMS standards.  
- Initial UI and routing successfully generated in Firebase Studio.

---

### Outcome Screenshot
(Add Firebase Studio preview image or project setup confirmation screenshot.)

---

### Next Action
Proceed to Prompt 02 for dashboard analytics and role-based navigation.
