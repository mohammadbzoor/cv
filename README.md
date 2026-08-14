# CV Platform — Front-End MVP

An internationalized, accessible, multi-template Resume Builder & AI Intelligence Platform built with React 19, Vite, Tailwind CSS, Zustand, and React Hook Form.

---

## 🌟 Key Features

- **Multi-Step Resume Wizard (`/create`)**: Step-by-step form navigation with Zod validation for Personal Info, Summary, Experience, Education, and Skills.
- **Studio Builder Engine (`/builder`)**: Live A4 preview sheet, inline text editing (`EditableField`), section reordering (`SectionManager`), zoom controls, and keyboard shortcuts (`Ctrl+S`, `Ctrl+Z`, `Ctrl+Y`).
- **Template Registry & Gallery (`/templates`)**: 3 ATS-optimized and visually enhanced templates (`Classic ATS`, `Professional ATS`, `Developer`).
- **Browser Print & PDF Export Engine (`/export`)**: PDF export via browser print dialog (`window.print()`) with print CSS, document title sanitization, and readiness validation.
- **Debounced Local Autosave**: Autosave status indicator with local storage persistence (`cv-platform-cv-draft`) and draft recovery notice.
- **CV Intelligence Services (Mock Layer)**:
  - **Upload & Extraction (`/upload`)**: Drag & drop PDF/DOCX dropzone with file validation and structured draft extraction.
  - **Resume Analysis (`/analyze`)**: Structural readiness score (out of 100), section ratings, strengths, weaknesses, and recommendations.
  - **Job Description Match (`/match`)**: Match percentage, skill overlap, missing skills detection with authenticity confirmation dialog.
  - **Content Improvement (`/improve`)**: `DiffViewer` showing original vs suggested text with granular accept/reject controls.
- **Dual Language & RTL/LTR**: Application UI available in Arabic (RTL) and English (LTR). CV document content strictly enforced in **English only and LTR only** (`lang="en" dir="ltr"`).
- **Light / Dark / System Theme**: High-contrast theme system with white paper sheet preservation for resume document preview.
- **Error Handling & Code Splitting**: Application-level Error Boundary (`AppErrorBoundary`) and route-level `React.lazy` code splitting.

---

## 🛠️ Technology Stack

- **Core**: React 19, JavaScript (ES2023), JSX
- **Build Tool**: Vite 8 with @tailwindcss/vite
- **Styling**: Tailwind CSS v4, Vanilla CSS Design Tokens, `@media print`
- **State Management**: Zustand 5 with persist & devtools middleware
- **Form Validation**: React Hook Form, Zod 4
- **Localization**: i18next, react-i18next
- **Icons**: Lucide React
- **Testing**: Vitest 4 (107 unit & integration tests)
- **Linting**: ESLint 10

---

## 📁 Project Architecture

```text
src/
├── app/                      # Router, Providers, Route Constants, App Entry
├── components/
│   ├── feedback/             # AppErrorBoundary, RouteLoadingFallback
│   ├── layout/               # AppLayout, PublicLayout, PageContainer, PageHeader
│   └── ui/                   # Button, Modal, ConfirmDialog, Input, Select, Badge...
├── contexts/                 # ThemeContext, LanguageContext
├── features/
│   ├── ai-services/          # Mock API Client, Zod Schemas, Mock Data Generators
│   ├── analyze/              # Analysis Page Services & Overview Components
│   ├── autosave/             # Debounced Autosave Hook, Status Badge, Draft Recovery
│   ├── builder/              # Studio Builder Layout, Preview Panel, Inline Editor
│   ├── create-wizard/        # Step Navigation & Multi-step Form Logic
│   ├── cv/                   # CV Store, Data Models, Defaults, Factories, Validation
│   ├── export/               # Print Service, Export Dialog, Readiness Checkers
│   ├── improve/              # Suggestion Apply Utility & DiffViewer Component
│   ├── match/                # Job Description Matcher & Honesty Dialog
│   ├── release/              # Feature Flags & Development Route Controls
│   ├── templates/            # Template Registry, Renderer & 3 Resume Templates
│   └── upload/               # File Validation & Drag-and-Drop Dropzone
├── i18n/                     # i18next configuration & ar/en translation dictionaries
├── pages/                    # Route pages (HomePage, BuilderPage, CreatePage...)
└── styles/                   # globals.css, print.css, accessibility.css
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone repository
git clone https://github.com/mohammadbzoor/cv.git
cd cv

# Install dependencies
npm install
```

### Environment Variables

Copy `.env.example` to `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ENABLE_DEVELOPMENT_ROUTES=false
```

- `VITE_ENABLE_DEVELOPMENT_ROUTES`: Set to `true` to enable developer routes (`/design-system`, `/cv-store`) in production builds. Defaults to `true` in development (`import.meta.env.DEV`).

### Development Server

```bash
npm run dev
```

App will start at `http://localhost:5173`.

### Automated Testing & Linting

```bash
# Run unit & integration test suite (107 tests)
npm run test

# Run ESLint code quality check
npm run lint
```

### Production Build

```bash
npm run build

# Preview production build locally
npm run preview
```

---

## 🖨️ Print & PDF Export Strategy

This MVP uses the native **Browser Print API** (`window.print()`) for PDF generation:

1. Clicking **Export PDF** opens an **Export Dialog** validating document completeness.
2. If ready, clicking **Open Print Dialog** temporarily sets `document.title` to a sanitized document name (e.g., `alex-johnson-resume`).
3. Native `window.print()` opens the browser's print interface.
4. User selects **Save as PDF** in destination dropdown, configures paper size to **A4**, and saves.
5. Print CSS (`print.css`) hides all UI chrome, navigation, headers, and panels, rendering ONLY the white A4 resume sheet (`[data-cv-document]`).
6. Text remains selectable and extractable for ATS parsers — no image conversion or canvas screenshots are used.

---

## ♿ Accessibility & Performance

- **Accessibility**: Reviewed against common WCAG interaction patterns (semantic headings, ARIA live regions, focus trapping in modals, keyboard navigation, minimum 44px touch targets, prefers-reduced-motion support).
- **Code Splitting**: Route-level dynamic `React.lazy` loading reduces the initial JavaScript bundle from 723 kB down to **296 kB** (59% reduction).
- **Zustand Selector Stability**: Uses frozen singleton fallbacks to eliminate unnecessary re-renders.

---

## 🔒 Security & Privacy

- All CV draft data is stored exclusively in the user's browser `localStorage`.
- No API keys, secrets, or tracking telemetry are embedded.
- AI services run via local deterministic mock handlers — no data is sent to external cloud APIs.
- Uploaded `File` objects are validated locally and never persisted directly in state.

---

## 📋 Release Checklist

See [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) for full MVP verification details.

---

## 🔮 Next Roadmap Phase

- **Backend Integration & Authentication**: Connect store persistence to PostgreSQL/MongoDB, implement OAuth login, and enable multi-resume cloud storage.
