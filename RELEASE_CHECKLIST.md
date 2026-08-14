# Release Checklist - CV Platform MVP

This checklist documents the testing and release readiness of the CV Platform Front-End MVP.

---

## 1. Automated Verification

- [x] `npm install` — Dependencies resolved cleanly without vulnerability warnings.
- [x] `npm run test` — **107 passed out of 107 tests** across 32 test files.
- [x] `npm run lint` — **0 errors, 0 warnings** across all JavaScript/JSX modules.
- [x] `npm run build` — Production build completes cleanly; JS bundle code-split into optimal route chunks.

---

## 2. Core User Flows

- [ ] **Create CV Wizard** (`/create`): Multi-step form populates personal info, summary, experience, education, and skills.
- [ ] **Save Draft**: Manual save updates status and writes to local persistence.
- [ ] **Page Refresh**: Hydrates stored draft cleanly without losing data.
- [ ] **Studio Builder** (`/builder`): Desktop 3-column split view and mobile tab bar function as expected.
- [ ] **Inline Edit**: Direct content editing on A4 live preview updates Zustand store.
- [ ] **Undo / Redo**: Keyboard shortcuts (`Ctrl+Z`, `Ctrl+Y`, `Ctrl+Shift+Z`) and header buttons step through history.
- [ ] **Template Switching**: Switching between Classic ATS, Professional ATS, and Developer templates preserves all data.
- [ ] **Resume Upload Demo** (`/upload`): PDF/DOCX dropzone validates files and extracts structured draft data.
- [ ] **Resume Analysis Demo** (`/analyze`): Scores resume structure, ATS compatibility, strengths, and weaknesses.
- [ ] **Job Description Match Demo** (`/match`): Compares CV against job description, showing matched and missing skills with authenticity dialog.
- [ ] **AI Improvement Demo** (`/improve`): DiffViewer displays original vs suggested text with granular accept/reject actions.
- [ ] **Export PDF**: Opens browser print dialog with sanitized suggested filename and A4 printable page styling.

---

## 3. Language & Internationalization

- [ ] **Arabic UI**: RTL layout, Arabic navigation, builder controls, and dialogs.
- [ ] **English UI**: LTR layout, English navigation, builder controls, and dialogs.
- [ ] **CV Document**: **English only and LTR only** (`lang="en" dir="ltr"`) regardless of application theme or UI language.

---

## 4. Design & Themes

- [ ] **Light Mode**: Calm, professional palette with soft stone background.
- [ ] **Dark Mode**: High-contrast dark theme with adjusted text and border variables.
- [ ] **System Theme**: Automatically matches OS preferences.
- [ ] **White A4 Sheet**: Resume document paper remains white with black text in all themes.

---

## 5. Viewports & Responsiveness

- [ ] **Desktop (≥ 1024px)**: 3-column studio layout (Content | Live A4 Preview | Design).
- [ ] **Tablet / Mobile (< 1024px)**: Bottom tab bar (Content / Preview / Design) for viewport switching.

---

## 6. Supported Browsers

- [ ] **Google Chrome**: Verified print dialog, grid layout, and local persistence.
- [ ] **Microsoft Edge**: Verified print dialog and font rendering.
- [ ] **Mozilla Firefox**: Verified CSS grid, print page breaks, and flexbox behavior.
- [ ] **Apple Safari**: Verified WebKit print rules and local storage hydration.

---

## 7. Security & Privacy

- [x] No API keys or secrets embedded in codebase or committed files.
- [x] `.env` excluded from version control; `.env.example` safe for public repository.
- [x] No real personal user data stored in source control.
- [x] Browser `File` objects omitted from store state and localStorage.
- [x] Mock AI responses processed deterministically with Zod schema validation.
- [x] No external network calls or tracking scripts embedded.

---

## 8. Known MVP Limitations

- **Browser Print PDF**: Relies on browser's native `window.print()` dialog to Save as PDF.
- **Deterministic Mock Services**: AI upload, analysis, job match, and text improvement run locally via mock services.
- **Single Active Draft**: Persists one active CV document in `localStorage` (`cv-platform-cv-draft`).
- **English CV Document**: CV document content enforced as English (LTR) only.
- **No Backend**: Front-End implementation only — no user accounts, authentication, or cloud database.
