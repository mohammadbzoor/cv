# CV Platform — Front-End MVP & SaaS Experience

An internationalized, accessible, multi-template Resume Builder & AI Intelligence Platform built with React 19, Vite, Tailwind CSS, Zustand, and React Hook Form.

---

## 🌟 Key Features

- **Professional SaaS Landing Page (`/`)**: Hero section with HTML/CSS miniature CV paper sheet, trust principles, 8 platform services, 4-step workflow, feature highlights, studio builder showcase, template cards, ATS compatibility explanation, privacy guarantees, FAQ accordion, and final CTA.
- **Motion Design System**: Accessible entry animations (`MotionReveal`, `MotionStagger`, `MotionSection`) powered by `IntersectionObserver` with full support for `prefers-reduced-motion`.
- **Demo Auth Architecture (`/login`, `/register`, `/forgot-password`)**: Complete front-end authentication UI flow with React Hook Form, Zod validation, password strength meter, show/hide toggle, and explicit demo notices. **Never stores passwords or tokens**.
- **User Settings & Preferences (`/settings`)**: Comprehensive settings panel covering Profile, Appearance (Light/Dark/System), Language (Arabic/English), Notifications (local reminders), Privacy guarantees, Local Data management (JSON export & granular clearance), and Account session controls.
- **Navbar Account Menu**: Accessible dropdown menu for logged-in demo users with avatar initials, profile summary, quick links, and one-click demo session termination.
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

---

## 🛠️ Technology Stack

- **Core**: React 19, JavaScript (ES2023), JSX
- **Build Tool**: Vite 8 with @tailwindcss/vite
- **Styling**: Tailwind CSS v4, Vanilla CSS Design Tokens, `@media print`
- **State Management**: Zustand 5 with persist & devtools middleware
- **Form Validation**: React Hook Form, Zod 4
- **Localization**: i18next, react-i18next
- **Icons**: Lucide React
- **Testing**: Vitest 4 (132 unit & integration tests)
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
│   ├── templates/            # Template Registry, Renderer & 3 Resume Templates
│   └── upload/               # File Validation & Drag-and-Drop Dropzone
├── hooks/                    # useTheme, useLanguage, useDocumentMetadata
├── i18n/                     # i18next configuration & ar/en translation dictionaries
├── pages/                    # HomePage, BuilderPage, LoginPage, RegisterPage, SettingsPage...
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

### Environment Variables

Copy `.env.example` to `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ENABLE_DEVELOPMENT_ROUTES=false
```

### Development Server

```bash
npm run dev
```

App will start at `http://localhost:5173`.

### Automated Testing & Linting

```bash
# Run unit & integration test suite (132 tests)
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

---

## 🔮 Next Roadmap Phase

- **Backend Authentication & Database Integration**: Connect to PostgreSQL/MongoDB, issue secure JWT HTTP-only cookies, and implement multi-resume cloud sync.
