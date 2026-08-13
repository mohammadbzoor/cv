# CV Platform (منصة السير الذاتية الذكية)

منصة حديثة وبسيطة لبناء وتحليل وتحسين السير الذاتية باستخدام تقنيات الذكاء الاصطناعي والتحليل الرقمي.

## 🎯 الهدف العام للمنصة

تهدف المنصة إلى تمكين المستفيدين من إنشاء سير ذاتية احترافية، وتحليل توافقها مع الوظائف (ATS Match)، وتلقي توصيات تحسين مخصصة لرفع فرص القبول في سوق العمل.

---

## 🛠️ التقنيات المستخدمة

- **الواجهة الأمامية (Frontend):** React.js (v19)
- **أداة البناء والتطوير:** Vite (v8)
- **لغة البرمجة:** JavaScript (ES6+) و JSX
- **التدويل والتعدد اللغوي:** i18next (v25) + react-i18next (v16)
- **التنسيق والأنماط:** Tailwind CSS (v4)
- **التوجيه والمسارات:** React Router (v7)
- **الخدمات والشبكة:** Axios (v1)
- **الأيقونات:** Lucide React
- **جودة الكود:** ESLint (v10)
- **إدارة الإصدارات:** Git & GitHub

---

## 📋 متطلبات التشغيل

- **Node.js**: الإصدار 18.0.0 أو أحدث
- **npm**: الإصدار 9.0.0 أو أحدث

---

## 🚀 طريقة التثبيت والتشغيل

### 1. تثبيت الحزم (Installation)

```bash
npm install
```

### 2. تشغيل خادم التطوير (Development Server)

```bash
npm run dev
```

### 3. فحص جودة الكود (ESLint Linter)

```bash
npm run lint
```

### 4. إنشاء حزمة الإنتاج (Production Build)

```bash
npm run build
```

### 5. المعاينة المحلية لحزمة الإنتاج (Preview Build)

```bash
npm run preview
```

---

## 🏛️ معمارية الهيكل والتنقل (Layout & Navigation Architecture)

تم تأسيس نظام التخطيط والتنقل العام للتطبيق باستخدام عناصر دلالية ومرنة تعتمد معايير الوصول الشامل (WAI-ARIA):

```text
src/
├── constants/
│   └── navigation.js            # المصفوفة المركزية الموحدة لجميع عناصر التنقل
│
├── components/layout/
│   ├── AppLayout/               # الهيكل البنائي الأساسي (header, main #main-content, footer)
│   ├── PublicLayout/            # تغليف الهيكل العام مع ScrollToTop و Outlet
│   ├── Navbar/                  # ترويسة التطبيق الثابتة sticky
│   ├── DesktopNavigation/       # روابط التنقل لسطح المكتب مع aria-current="page"
│   ├── MobileNavigation/        # قائمة الهاتف الجانبية (Drawer) مع التغليق التلقائي عند تغيير المسار
│   ├── Footer/                  # تذييل الصفحات مع الحقوق وسنة ديناميكية وتنويه لغة CV
│   ├── PageContainer/           # حاوي قياسي متجاوب بمقاسات مختلفة (sm, md, lg, xl, full)
│   ├── PageHeader/              # ترويسة الصفحة مع مسار التصفح والعناوين والإجراءات
│   ├── SkipLink/                # رابط تخطي المحتوى لسهولة الوصول عبر لوحة المفاتيح
│   ├── Logo/                    # الشعار المهني الرسمي
│   ├── Breadcrumbs/             # مسار التصفح التفاعلي WAI-ARIA
│   └── ScrollToTop/             # إعادة موضع التمرير لأعلى الصفحة عند التبديل
│
├── features/shared/components/
│   └── FeaturePlaceholder.jsx   # مكون عرض الصفحات قيد التطوير المستقبلية
│
└── pages/
    ├── HomePage.jsx             # الصفحة الرئيسية
    ├── CreatePage.jsx           # صفحة إنشاء سيرة ذاتية
    ├── UploadPage.jsx           # صفحة رفع وتصدير سيرة
    ├── AnalyzePage.jsx          # صفحة تحليل السيرة الذاتية (ATS)
    ├── MatchPage.jsx            # صفحة مطابقة الوظيفة
    ├── ImprovePage.jsx          # صفحة تحسين المحتوى بالذكاء الاصطناعي
    ├── TemplatesPage.jsx        # صفحة استعراض القوالب
    ├── HelpPage.jsx             # صفحة المساعدة والتعليمات
    ├── NotFoundPage.jsx         # صفحة 404
    └── DesignSystemPage.jsx     # صفحة نظام التصميم التطويرية
```

---

## 🌐 نظام التدويل واللغات (i18n Architecture)

> **Architectural Principle:**
> "The application interface supports Arabic and English. CV content, templates, preview, and export are English-only and always use LTR document direction."

- **واجهة التطبيق (App Interface):** العربية (`ar` / RTL) والإنجليزية (`en` / LTR).
- **مستند السيرة الذاتية مستقبلاً (CV Document):** لغة إنجليزية ثابتة (`en` / LTR) دائماً.
- **مفتاح localStorage للغة:** `cv-platform-language`
- **Namespaces:** `common`, `navigation`, `home`, `designSystem`, `feedback`, `pages`.

---

## 🎨 نظام الثيمات (Theme System)

| الوضع | الوصف |
| :--- | :--- |
| `light` | الوضع الفاتح |
| `dark` | الوضع الداكن |
| `system` | يتبع تفضيل نظام التشغيل تلقائياً |

- **مفتاح التخزين في localStorage:** `cv-platform-theme`
- **Anti-Flash Script:** يفحص السمة واللغة في `index.html` قبل بناء React لضمان عدم الوميض عند التحميل.

---

## 🧩 مكتبة مكونات الواجهة (Core UI Components Library)

- **Button**, **Input**, **Textarea**, **Select**, **Checkbox**, **RadioGroup**, **Switch**, **Modal**, **Tabs**, **Accordion**, **Skeleton**, **Spinner**, **EmptyState**, **ErrorState**, **ConfirmDialog**, **FormField**, **Tooltip**, **ThemeToggle**, **LanguageSwitcher**.

---

## 🛠️ صفحة نظام التصميم (Design System Page)

متاحة في بيئة التطوير على المسار:
```text
/design-system
```

---

## ✅ ما تم إنجازه في المرحلة الخامسة (Phase 5 Accomplishments)

1. إعداد الثوابت المركزية لأسماء المسارات (`routePaths.js`) وعناصر التنقل (`navigation.js`).
2. بناء الهيكل البنائي `AppLayout` و `PublicLayout` باستخدام عناصر HTML5 الدلالية (`<header>`, `<nav>`, `<main id="main-content">`, `<footer>`).
3. إدراج مكون `SkipLink` للانتقال المباشر للمحتوى الرئيسي لتعزيز إمكانية الوصول.
4. تطوير `Navbar` الثابت أعلى الصفحة و `DesktopNavigation` مع تمييز الصفحة الحالية بـ `aria-current="page"`.
5. تطوير `MobileNavigation` (Drawer) متوافق مع الوصول الشامل وإغلاق تلقائي عند تغيير المسار.
6. تطوير `Footer` مع التنويه المعماري للـ CV وإدراج السنة الحالية برمجياً.
7. إنشاء المكونات المساندة `PageContainer` و `PageHeader` و `Logo` و `Breadcrumbs` و `ScrollToTop`.
8. إنشاء الصفحات المؤقتة للمسارات المستقبلية ومكون `FeaturePlaceholder`.
9. إعداد مسارات React Router بروابط فرعية (Nested Layout Routes).
10. تحديث ملفات الترجمة واجتياز اختبارات ESLint وبناء الإنتاج بنجاح كامل.

---

## 🔮 المراحل القادمة (Upcoming Phases)

- **المرحلة السادسة:** نموذج بيانات السيرة الذاتية وإدارة الحالة (CV Data Model & State Management / Zustand).
- **المرحلة السابعة:** محرر السيرة الذاتية وقوالب العرض (CV Builder & Templates).

---

## 📌 سياسة Git Commits

نتبع سياسة **Conventional Commits**:
- `chore:` للتعديلات على الإعدادات أو البنية التحتية.
- `feat:` لإضافة ميزات جديدة.
- `fix:` لإصلاح الأخطاء.
- `docs:` لتحديث التوثيق.
- `style:` للتعديلات المتعلقة بالتنسيق البصري.
