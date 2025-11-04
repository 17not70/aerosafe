# Prompt Record – AeroSafe Insights

**Prompt ID:** 03  
**Date:** 2025-11-04  
**Version:** v0.3  
**Purpose:** Introduce Gemini/Genkit-based smart recommendation engine  
**Used In:** Firebase Studio (AI & Cloud Functions enhancement)

---

### Prompt Text
Integrate Google Gemini AI through Genkit into the AeroSafe Insights project.

**Objectives**
- Analyze VSR and MOR narrative fields.
- Generate suggested corrective actions or preventive measures.
- Tag reports automatically with potential hazard categories (e.g., “Runway Excursion”, “Crew Fatigue”, “Technical Failure”).
- Display AI suggestions under each report for Safety Officer review.
- Allow Safety Officer to accept, reject, or edit AI-generated recommendations.
- Store final accepted actions in Firestore (`actions` collection).

**Implementation**
- Use Firebase Cloud Functions to call Gemini API through Genkit.
- Enable Firestore triggers on `reports` collection.
- Add a “Smart Recommendation” panel to report detail pages.
- Record audit log when recommendations are accepted or modified.

---

### Notes
- Gemini and Genkit are optional in Blaze plan.
- Ensure Gemini API key configured in Firebase Project Settings → Extensions.
- AI suggestions operate under safety review, not automatic execution.
- Prepares foundation for future NLP-driven safety trend insights.

---

### Outcome Screenshot
(Add image of AI suggestion panel or Gemini configuration page.)

---

### Next Action
Prepare documentation for deployment to `aerosafe.gsacharya.com` and integration with CAAN reporting exports.
