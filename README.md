# CV Platform — Front-End MVP & Template Studio

An internationalized, accessible, multi-template Resume Builder & AI Intelligence Platform built with React 19, Vite, Tailwind CSS, Zustand, and React Hook Form.

---

## 🌟 Key Features

- **Professional Template Studio (`/templates`)**: Redesigned template workbench with single unified header, responsive Workbench layout (5-col rail + 7-col workspace), mobile 3-tab workflow, live A4 document preview, zoom controls (50%, 75%, 100%, Zoom In/Out, Fullscreen), plain text inspector, local ATS structure evaluation panel, quick customization accordions, side-by-side template comparison, search & filters.
- **Smart Template Fit Engine**: Deterministic recommendation engine matching user career level (`student`, `junior`, `mid`, `senior`, `executive`), target role family (`software`, `engineering`, `business`, `consulting`, `management`, `general`), and CV metrics. Displays match score, localized reasons, and "Apply Recommendation" button without mutating store automatically.
- **Template Decision Matrix**: Qualitative comparison matrix evaluating layout trade-offs across 10 dimensions (parsing simplicity, one-page suitability, project emphasis, executive emphasis, visual density, customization range, best career level, reading order complexity, print stability) using descriptive qualitative labels (`high`, `medium`, `low`, `simple`).
- **Content Pressure Meter**: Evaluates document text volume and layout settings (`comfortable`, `approaching-limit`, `dense`, `overflow-risk`), showing actionable layout suggestions without shrinking font below safe limit (10pt).
- **Content Coverage Map**: Interactive status grid (`Complete`, `Partial`, `Empty`, `Hidden`) across all 7 core sections.
- **Safe Customization Guard**: Non-blocking warning for low-contrast primary colors, small fonts with compact density, or hidden dividers with weak headings, with an "Apply Safer Defaults" quick action button.
- **Reading Order Inspector**: Evaluates extracted plain text flow, detects missing contact info, duplicate headings, hidden section data, and unsafe links.
- **Change Impact Preview**: Summary confirmation modal displayed before major changes (template switch, reset recommended order, safer defaults) showing what will change and what text remains preserved.
- **6 Practice Resume Templates**:
  - `Technical Prime ATS` (Flagship Default): Single column, ATS optimized, grouped technical skills, clean Deep Slate headings, thin dividers, reverse-chronological experiences, no photos or layout tables.
  - `Classic ATS`: Ultra-clean minimal single column layout.
  - `Professional ATS`: Executive presentation with refined spacing and divider lines.
  - `Compact ATS`: Dense single-column layout for single-page CVs without clipping text.
  - `Executive ATS`: Executive summary highlight box and achievement-oriented experience layout.
  - `Developer Portfolio`: Visually enhanced technical layout with skill tags and repository links.
- **Dual Language & RTL/LTR**: Application UI available in Arabic (RTL) and English (LTR). CV document content strictly enforced in **English only and LTR only** (`lang="en" dir="ltr"`).

---

## 🛠️ Technology Stack

- **Core**: React 19, JavaScript (ES2023), JSX
- **Build Tool**: Vite 8 with @tailwindcss/vite
- **Styling**: Tailwind CSS v4, Vanilla CSS Design Tokens, `@media print`
- **State Management**: Zustand 5 with persist & devtools middleware
- **Form Validation**: React Hook Form, Zod 4
- **Localization**: i18next, react-i18next
- **Icons**: Lucide React
- **Testing**: Vitest 4 (180 unit & integration tests)
- **Linting**: ESLint 10

---

## 📁 Project Architecture

```text
src/
├── app/                      # Router, Providers, Route Constants, App Entry
├── components/
│   ├── layout/               # AppLayout, PublicLayout, Navbar, PageContainer
│   └── ui/                   # Button, Modal, ConfirmDialog, Input, Switch...
├── features/
│   ├── ai-services/          # Mock API Client, Zod Schemas, Mock Data Generators
│   ├── auth/                 # Demo Auth Store, Login/Register/Forgot Forms, Demo Notices
│   ├── autosave/             # Debounced Autosave Hook, Status Badge, Draft Recovery
│   ├── builder/              # Studio Builder Layout, Preview Panel, Inline Editor
│   ├── create-wizard/        # Step Navigation & Multi-step Form Logic
│   ├── cv/                   # CV Store, Data Models, Defaults, Factories, Validation
│   ├── export/               # Print Service, Export Dialog, Readiness Checkers
│   ├── home/                 # Hero, Services, HowItWorks, Features, Showcases
│   ├── settings/             # Settings Layout, Profile, Appearance, Local Data
│   └── templates/            # Template Registry, 6 Resume Templates, Live Preview, ATS Checks
│       ├── ats/              # ATS Structure Check runner, Plain Text Preview, Disclaimers
│       └── studio/           # Template Studio Workbench
│           ├── components/   # StudioHeader, Toolbar, Rail, Workspace, Recommendation, Matrix...
│           ├── hooks/        # useTemplateStudio, useTemplateFilters, useTemplateComparison...
│           ├── utils/        # rankTemplates, buildTemplateRecommendation, calculateContentPressure...
│           └── __tests__/    # Unit & Integration tests for studio state & features
├── i18n/                     # i18next configuration & ar/en translation dictionaries
├── pages/                    # HomePage, TemplatesPage, BuilderPage, LoginPage, SettingsPage...
└── styles/                   # globals.css, print.css, accessibility.css
```

---

## 🚀 Getting Started

### Installation

```bash
git clone https://github.com/mohammadbzoor/cv.git
cd cv
npm install
```

### Development Server

```bash
npm run dev
```

App will start at `http://localhost:5173`.

### Automated Testing & Linting

```bash
# Run unit & integration test suite (180 tests)
npm run test

# Run ESLint code quality check
npm run lint
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔒 Security & Front-End Demo Auth Statement

- Authentication pages (`/login`, `/register`, `/forgot-password`) are **front-end demonstrations**.
- **No passwords, tokens, or credentials are stored** in `localStorage`, `sessionStorage`, or state.
- Logging out of a demo session **does NOT delete your local CV draft**.

---

## 📋 Release Checklist

See [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) for full MVP verification details.
