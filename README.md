# CV Platform — Front-End MVP & Template Studio

An internationalized, accessible, multi-template Resume Builder & AI Intelligence Platform built with React 19, Vite, Tailwind CSS, Zustand, and React Hook Form.

---

## 🌟 Key Features

- **Professional Template Studio (`/templates`)**: Redesigned template gallery with live A4 document preview, safe generic sample data fallback, zoom controls (50%, 75%, 100%, Fullscreen), plain text reading stream, local ATS structure evaluation panel, quick customization panel, side-by-side template comparison, search & filters.
- **6 Practice Resume Templates**:
  - `Technical Prime ATS` (Flagship Default): Single column, ATS optimized, grouped technical skills, clean Deep Slate headings, thin dividers, reverse-chronological experiences, no photos or layout tables.
  - `Classic ATS`: Ultra-clean minimal single column layout.
  - `Professional ATS`: Executive presentation with refined spacing and divider lines.
  - `Compact ATS`: Dense single-column layout for single-page CVs without clipping text.
  - `Executive ATS`: Executive summary highlight box and achievement-oriented experience layout.
  - `Developer Portfolio`: Visually enhanced technical layout with skill tags and repository links.
- **ATS Structure Check Engine**: Evaluates 12 layout criteria locally (Single column, selectable text, no layout tables, no skill bars, no photo, contact in body, standard headings, safe font, readable font size, logical reading order, valid section order, safe links) and returns a structural readiness score out of 100 with actionable feedback and mandatory disclaimers.
- **Plain Text Reading Preview**: Transforms CV data into clean, ordered plain text matching `sectionOrder` for reading order inspection and instant clipboard copying.
- **Advanced Design Settings**: Customization controls for Primary Color, Font Family, Font Size, Line Height, Margins, Content Density (`comfortable`, `balanced`, `compact`), Section Divider Visibility (`showSectionDividers`), and Heading Style (`standard`, `understated`, `prominent`).
- **Professional SaaS Landing Page (`/`)**: Hero section with HTML/CSS miniature CV paper sheet, trust principles, 8 platform services, 4-step workflow, feature highlights, studio builder showcase, template cards, ATS compatibility explanation, privacy guarantees, FAQ accordion, and final CTA.
- **Motion Design System**: Accessible entry animations (`MotionReveal`, `MotionStagger`, `MotionSection`) powered by `IntersectionObserver` with full support for `prefers-reduced-motion`.
- **Demo Auth Architecture (`/login`, `/register`, `/forgot-password`)**: Complete front-end authentication UI flow with React Hook Form, Zod validation, password strength meter, show/hide toggle, and explicit demo notices. **Never stores passwords or tokens**.
- **User Settings & Preferences (`/settings`)**: Comprehensive settings panel covering Profile, Appearance (Light/Dark/System), Language (Arabic/English), Notifications (local reminders), Privacy guarantees, Local Data management (JSON export & granular clearance), and Account session controls.
- **Multi-Step Resume Wizard (`/create`)**: Step-by-step form navigation with Zod validation for Personal Info, Summary, Experience, Education, and Skills.
- **Studio Builder Engine (`/builder`)**: Live A4 preview sheet, inline text editing (`EditableField`), section reordering & reset (`SectionManager`), zoom controls, and keyboard shortcuts (`Ctrl+S`, `Ctrl+Z`, `Ctrl+Y`).
- **Browser Print & PDF Export Engine (`/export`)**: PDF export via browser print dialog (`window.print()`) with print CSS, document title sanitization, and readiness validation.
- **Debounced Local Autosave**: Autosave status indicator with local storage persistence (`cv-platform-cv-draft`) and draft recovery notice.
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
- **Testing**: Vitest 4 (162 unit & integration tests)
- **Linting**: ESLint 10

---

## 📁 Project Architecture

```text
src/
├── app/                      # Router, Providers, Route Constants, App Entry
├── components/
│   ├── feedback/             # AppErrorBoundary, RouteLoadingFallback
│   ├── layout/               # AppLayout, PublicLayout, Navbar (AccountMenu), PageContainer
│   └── ui/                   # Button, Modal, ConfirmDialog, DropdownMenu, Input, Switch...
├── contexts/                 # ThemeContext, LanguageContext
├── features/
│   ├── ai-services/          # Mock API Client, Zod Schemas, Mock Data Generators
│   ├── auth/                 # Demo Auth Store, Login/Register/Forgot Forms, Demo Notices
│   ├── autosave/             # Debounced Autosave Hook, Status Badge, Draft Recovery
│   ├── builder/              # Studio Builder Layout, Preview Panel, Inline Editor
│   ├── create-wizard/        # Step Navigation & Multi-step Form Logic
│   ├── cv/                   # CV Store, Data Models, Defaults, Factories, Validation
│   ├── export/               # Print Service, Export Dialog, Readiness Checkers
│   ├── home/                 # Hero, Services, HowItWorks, Features, Builder/Template Showcases
│   ├── motion/               # MotionReveal, MotionStagger, ReducedMotionFallback, Tokens
│   ├── release/              # Feature Flags & Development Route Controls
│   ├── settings/             # Settings Layout, Navigation, Profile, Appearance, Local Data
│   └── templates/            # Template Registry, 6 Resume Templates, Live Preview, ATS Checks
│       ├── ats/              # ATS Structure Check runner, Plain Text Preview, Disclaimers
│       ├── components/       # TemplateGallery, TemplateStudioControls, LivePreview, Customization
│       ├── data/             # Generic Sample CV Preview Data
│       ├── registry/         # Template Registry & Metadata definitions
│       └── templates/        # Technical Prime ATS, Classic, Professional, Compact, Executive, Developer
├── hooks/                    # useTheme, useLanguage, useDocumentMetadata
├── i18n/                     # i18next configuration & ar/en translation dictionaries
├── pages/                    # HomePage, TemplatesPage, BuilderPage, LoginPage, SettingsPage...
└── styles/                   # globals.css, print.css, accessibility.css
```

---

## 🚀 Getting Started

### Installation

```bash
# Clone repository
git clone https://github.com/mohammadbzoor/cv.git
cd cv

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

App will start at `http://localhost:5173`.

### Automated Testing & Linting

```bash
# Run unit & integration test suite (162 tests)
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
- Targeted data clearance options under `/settings` allow wiping local storage keys without clearing unrelated domain keys.

---

## 📋 Release Checklist

See [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) for full MVP verification details.
