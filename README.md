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

## 🌐 نظام التدويل واللغات (i18n Architecture)

### 📌 الفرق بين لغة الواجهة ولغة السيرة الذاتية (App Language vs CV Language)

> **Architectural Principle:**
> "The application interface supports Arabic and English. CV content, templates, preview, and export are English-only and always use LTR document direction."

- **واجهة التطبيق (App Interface):**
  - **العربية:** `ar` (اتجاه RTL) — افتراضية
  - **الإنجليزية:** `en` (اتجاه LTR) — احتياطية (fallback)
- **مستند السيرة الذاتية مستقبلاً (CV Document):**
  - **اللغة:** `en` ثابتة
  - **الاتجاه:** `ltr` ثابت دائماً بغض النظر عن لغة الواجهة المفضلة للمستخدم.

---

### 📂 بنية ملفات الترجمة

```text
src/
└── i18n/
    ├── config.js               # تهيئة مكتبة i18next
    ├── supportedLanguages.js   # تعريف اللغات المدعومة واللغة الافتراضية
    └── locales/
        ├── ar/                 # حزمة نصوص اللغة العربية (RTL)
        │   ├── common.json
        │   ├── navigation.json
        │   ├── home.json
        │   └── designSystem.json
        └── en/                 # حزمة نصوص اللغة الإنجليزية (LTR)
            ├── common.json
            ├── navigation.json
            ├── home.json
            └── designSystem.json
```

---

### 🔑 مفتاح التخزين والتحكم

- **مفتاح localStorage للغة:**
  ```text
  cv-platform-language
  ```
- **اللغة الافتراضية:** `ar`
- **اللغة الاحتياطية (Fallback):** `en`
- **Namespaces المستخدمة:**
  1. `common`: النصوص العامة والأزرار وحالات النظام.
  2. `navigation`: أسماء المسارات وعناصر التنقل.
  3. `home`: محتوى الصفحة الرئيسية.
  4. `designSystem`: نصوص وأمثلة نظام التصميم.

---

### ➕ كيفية إضافة مفاتيح ترجمة جديدة

عند إضافة نص جديد للواجهة:
1. افتح الملف المناسب في `src/i18n/locales/ar/[namespace].json`.
2. أضف المفتاح مع النص العربي.
3. افتح الملف المماثل في `src/i18n/locales/en/[namespace].json`.
4. أضف نفس المفتاح مع النص الإنجليزي.
5. استخدم الخطاف داخل المكون:
   ```javascript
   const { t } = useTranslation('namespace');
   return <p>{t('keyName')}</p>;
   ```

---

### 🌍 كيفية إضافة لغة جديدة مستقبلاً

1. أنشئ مجلداً جديداً برمز اللغة داخل `src/i18n/locales/[code]/`.
2. انسخ ملفات JSON الأربعة وترجم قيمها.
3. أضف كائن اللغة الجديدة في `src/i18n/supportedLanguages.js`.
4. سجل الحزمة الجديدة داخل `src/i18n/config.js`.

---

## 🎨 نظام الثيمات (Theme System)

| الوضع | الوصف |
| :--- | :--- |
| `light` | الوضع الفاتح |
| `dark` | الوضع الداكن |
| `system` | يتبع تفضيل نظام التشغيل تلقائياً |

- **مفتاح التخزين في localStorage:** `cv-platform-theme`
- **Anti-Flash Script:** سكريبت مباشر في `index.html` يفحص السمة واللغة قبل بناء واجهة React لضمان عدم الوميض عند التحميل.

---

## 🧩 المكونات المنفذة (Core UI Components)

- **Button**: variants (`primary`, `secondary`, `outline`, `ghost`, `danger`), sizes (`sm`, `md`, `lg`, `icon`), loading, disabled, leadingIcon, trailingIcon.
- **Input**: label, helperText, error, required, disabled, startIcon, endIcon, aria-describedby.
- **Textarea**: label, helperText, error, maxLength, showCharacterCount, rows.
- **Card**: compound (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) & variants (`default`, `elevated`, `outlined`, `muted`).
- **Badge**: variants (`neutral`, `primary`, `secondary`, `success`, `warning`, `danger`, `accent`), sizes (`sm`, `md`).
- **ThemeToggle**: قائمة تبديل السمة.
- **LanguageSwitcher**: زر تبديل اللغة بدون أعلام دول وبدعم كامل للوصول وسهولة الاستخدام.

---

## 🛠️ صفحة نظام التصميم (Design System Page)

متاحة في بيئة التطوير على المسار:
```text
/design-system
```
تعرض جميع المكونات والألوان والنصوص واختبار التفاعل في اللغتين والاتجاهين (RTL / LTR).

---

## ✅ ما تم إنجازه في المرحلة الثالثة (Phase 3 Accomplishments)

1. تثبيت وتهيئة `i18next` و `react-i18next`.
2. بناء `LanguageContext` و `LanguageProvider` و `useLanguage` بشكل مستقل ونظيف.
3. دعم تبديل اللغة دون إعادة تحميل الصفحة وحفظ التفضيل في `cv-platform-language`.
4. تحديث `document.documentElement.lang` و `dir` تلقائياً بين `ar` (rtl) و `en` (ltr).
5. دمج السكريبت الخاص بمنع وميض اللغة والسمة (Anti-Flash) في `index.html`.
6. تطوير مكون `LanguageSwitcher` المتوافق مع معايير Accessibility دون استخدام أعلام الدول.
7. ترجمة جميع نصوص الصفحة الرئيسية `HomePage` وصفحة 404 `NotFoundPage` وصفحة `DesignSystemPage` ومكون `ThemeToggle`.
8. إنشاء وحدة `src/utils/locale.js` لتنسيق الأرقام والتواريخ باستخدام `Intl` APIs.
9. توثيق قرار واجهة تطبيق ثنائية اللغة وسيرة ذاتية إنجليزية فقط.

---

## 🔮 المراحل القادمة (Upcoming Phases)

- **المرحلة الرابعة:** الهيكل البنائي لـ CV Data Model وتأسيس حالة CV Store وإدارة النموذج.
- **المرحلة الخامسة:** بناء محرر السيرة الذاتية (CV Builder) والتنقل بين أقسامه والقوالب.

---

## 📌 سياسة Git Commits

نتبع سياسة **Conventional Commits**:
- `chore:` للتعديلات على الإعدادات أو البنية التحتية.
- `feat:` لإضافة ميزات جديدة.
- `fix:` لإصلاح الأخطاء.
- `docs:` لتحديث التوثيق.
- `style:` للتعديلات المتعلقة بالتنسيق البصري.
