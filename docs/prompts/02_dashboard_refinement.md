# Prompt Record – AeroSafe Insights

**Prompt ID:** 02  
**Date:** 2025-11-03  
**Version:** v0.2  
**Purpose:** Add dashboard analytics, role-based navigation, and export features  
**Used In:** Firebase Studio

---

### Prompt Text
Enhance the existing “AeroSafe Insights” project with the following features:

**Dashboard Analytics**
- Create a “Safety Dashboard” route for Safety Officer and Admin roles.
- Show KPIs: total reports, open corrective actions, average risk score, and risk distribution.
- Add visualizations:
  - Monthly trend line (VSR vs. MOR)
  - Bar chart of top 5 hazard categories
  - Heatmap (Severity × Probability)
- Data source: Firestore collections `reports` and `corrective_actions`.

**Role-Based Navigation**
- Implement navigation bar logic by Auth role claim.
  - Reporter: “Submit Report”, “My Reports”
  - Safety Officer: “Dashboard”, “Pending Reviews”, “Corrective Actions”
  - Admin: “All Reports”, “Dashboard”, “User Management”
- Add Firestore rules for read/write by role.

**Data Export and Filters**
- Add date range and hazard-type filters to dashboard.
- Include CSV/PDF export for filtered data.
- Use Cloud Functions for PDF generation and Firebase Storage for storage.

---

### Notes
- Firebase accepted AeroSafe Insights as main project name.
- Studio confirmed Auth + Firestore backend active.
- Cloud Functions and live data integration initialized.
- Backend provision complete; report form page connected to Firestore.

---

### Outcome Screenshot
(Add Firebase “Dashboard Preview” or screenshot of first analytics chart.)

---

### Next Action
Proceed to Prompt 03 for Gemini-based recommendation logic integration.
