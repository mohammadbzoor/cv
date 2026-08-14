# Release Checklist — CV Platform MVP & Template Studio

This checklist documents the testing and release readiness of the CV Platform Front-End MVP and Sprint 13 Template Studio.

---

## 1. Automated Verification

- [x] `npm install` — Dependencies resolved cleanly without vulnerability warnings.
- [x] `npm run test` — **162 passed out of 162 tests** across 44 test files.
- [x] `npm run lint` — **0 errors, 0 warnings** across all JavaScript/JSX modules.
- [x] `npm run build` — Production build completes cleanly in 662ms; JS bundle code-split into optimal route chunks.

---

## 2. Sprint 13 — Template Studio (`/templates`)

- [x] **6 Resume Templates**:
  - `technical-prime-ats` (**Technical Prime ATS** - Flagship Default): Single column, ATS optimized, grouped technical skills, clean Deep Slate headings, thin dividers, reverse-chronological experiences, no photos, no charts, no layout tables.
  - `classic-ats` (**Classic ATS**): Ultra-clean minimal single column layout.
  - `professional-ats` (**Professional ATS**): Executive presentation with refined spacing and divider lines.
  - `compact-ats` (**Compact ATS**): Dense single-column layout for single-page CVs without clipping text.
  - `executive-ats` (**Executive ATS**): Executive summary highlight box and achievement-oriented experience layout.
  - `developer` (**Developer Portfolio**): Visually enhanced technical layout with skill tags and repository links.
- [x] **Default Template Migration**:
  - `DEFAULT_TEMPLATE_ID` is `technical-prime-ats`.
  - New drafts automatically use `technical-prime-ats`.
  - Existing persisted drafts keep their saved `templateId`.
  - Fallback for invalid `templateId` is `technical-prime-ats`.
- [x] **Controls Bar**: Local search input (searches template name, description, recommended roles, category; local state, no store persistence) + Category & Compatibility filters + Clear filters.
- [x] **Template Cards**: Miniature vector previews (`TemplateThumbnail`), template name, category, compatibility badge, description, recommended roles, key traits tags, selected status with `CheckCircle2`, preview button, use template button, and comparison checkbox.
- [x] **Large Live Preview**:
  - Displays notice: "Previewing your CV" (if user data present) or "Previewing sample data" (if empty).
  - Tabs: `Visual Preview`, `Plain Text Reading`, `Structure Check`.
  - Visual Preview tab: renders `TemplateRenderer` with zoom controls (Fit, 50%, 75%, 100%, Full screen modal), light A4 canvas, always LTR.
  - Plain Text Reading tab: renders `generatePlainTextCV` formatted text ordered by `sectionOrder`.
  - Structure Check tab: renders `ATSStructurePanel` showing score out of 100, 12 check items breakdown, and disclaimer.
- [x] **Template Quick Customization**: Primary color, font family, font size, line height, margins, content density (`comfortable`, `balanced`, `compact`), divider visibility (`showSectionDividers`), section heading style (`headingStyle`), and Section Manager with Reset to Template Order button.
- [x] **Template Comparison Dialog**: Side-by-side comparison modal for up to 2 selected templates.
- [x] **Template Details Dialog**: Enlarged thumbnail, recommended roles, key traits, ATS classification, structure check summary, and limitations.
- [x] **ATS Wording Standard**: Strictly uses "ATS Optimized", "ATS-oriented", "Parsing-friendly structure" without false 100% guarantees or guaranteed interview claims. Displays mandatory disclaimer: *"These templates prioritize clear structure and readable text. Parsing behavior may vary between applicant tracking systems."*

---

## 3. SaaS Landing & Home Page (`/`)

- [x] **Hero Section**: Value proposition title, tagline, Create CV & Explore Templates CTAs, and local privacy notice.
- [x] **Hero Visual**: HTML/CSS miniature A4 CV sheet preview (`lang="en" dir="ltr"`) with ATS score & saved badges.
- [x] **Trust Principles**: Highlights English CV builder, ATS layouts, private drafts, bilingual UI, and A4 print PDF.
- [x] **Platform Services**: Grid of 8 core services (Create, Upload, Analyze, Match, Improve, Templates, Builder, Export).
- [x] **How It Works**: 4-step process timeline (Add Info -> Review & Enhance -> Select Template -> Edit & Export).
- [x] **Feature Highlights**: Highlights inline editing, ATS design, local privacy, bilingual UI, native PDF print, and Zod validation.
- [x] **Studio Builder Showcase**: Visual HTML/CSS 3-column studio preview.
- [x] **Templates Showcase**: Previews templates gallery with direct CTAs.
- [x] **ATS Compatibility**: Explains ATS parser principles and displays exact disclaimers.
- [x] **Privacy Guarantees**: Breaks down browser local storage, no third-party tracking, and isolated mock services.
- [x] **FAQ Accordion**: 6 collapsible items addressing language rules, draft saving, AI mocks, PDF export, and ATS assurances.

---

## 4. Motion System & Accessibility

- [x] **Motion Tokens**: Centralized durations (150ms–500ms) and cubic-bezier enter/exit easing curves.
- [x] **IntersectionObserver Reveal**: Smooth scroll entry animations via `MotionReveal`, `MotionStagger`, and `MotionSection`.
- [x] **Prefers Reduced Motion**: Automatically disables slide/fade movements and displays instant static content when OS reduced motion is active.

---

## 5. Security & Privacy Review

- [x] No API keys, passwords, or tokens stored in state or version control.
- [x] Local data clearance targets only application keys (`cv-platform-theme`, `cv-platform-language`, `cv-platform-cv-draft`, `cv-platform-demo-session`, `cv-platform-settings`).
- [x] Logging out of a demo session **preserves** the local CV draft data.

---

## 6. Known MVP Limitations

- **Front-End Auth Demo**: Authentication is simulated locally for UI evaluation; real backend accounts will be added in Phase 2.
- **Deterministic Mock Services**: Upload extraction, resume analysis, job matching, and text improvements run locally via mock handlers.
- **Single Active Draft**: Persists one active CV document in `localStorage`.
- **English CV Document**: CV document content enforced as English (LTR) only.
