# CV Platform (منصة السير الذاتية الذكية)

منصة حديثة وبسيطة لبناء وتحليل وتحسين السير الذاتية باستخدام تقنيات الذكاء الاصطناعي والتحليل الرقمي.

## 🎯 الهدف العام للمنصة

تهدف المنصة إلى تمكين المستفيدين من إنشاء سير ذاتية احترافية، وتحليل توافقها مع الوظائف (ATS Match)، وتلقي توصيات تحسين مخصصة لرفع فرص القبول في سوق العمل.

---

## 🛠️ التقنيات المستخدمة

- **الواجهة الأمامية (Frontend):** React.js (v19)
- **إدارة الحالة (State Management):** Zustand (v5)
- **التحقق من البيانات (Schema Validation):** Zod (v4)
- **اختبار الوحدات البرمجية (Unit Testing):** Vitest (v4)
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

### 3. تشغيل اختبارات الوحدات (Unit Tests)

```bash
npm run test
```

### 4. فحص جودة الكود (ESLint Linter)

```bash
npm run lint
```

### 5. إنشاء حزمة الإنتاج (Production Build)

```bash
npm run build
```

---

## 🗄️ نموذج بيانات السيرة الذاتية وإدارة الحالة (CV Data Model & State Architecture)

> **Architectural Decision (English-Only CV Document):**
> "The platform interface supports Arabic and English. However, CV documents, templates, schema exports, and generated previews are strictly English-only (`document.language = 'en'`) and always render in LTR document direction (`document.direction = 'ltr'`)."

```text
src/
├── utils/
│   └── generateId.js            # مولد معرفات فريدة آمن للواجهة مع fallback
│
├── features/cv/
│   ├── models/                  # ثوابت ونماذج البيانات
│   │   ├── cvConstants.js       # الإصدار (v1)، ثوابت اللغة والاتجاه وثوابت التصميم
│   │   ├── cvSchema.js          # مخططات Zod للتحقق الهيكلي من البيانات
│   │   ├── cvDefaults.js        # القيم الافتراضية المستقلة
│   │   └── cvFactories.js       # دالات المصنع (Factories) لإنشاء العناصر والأقسام
│   │
│   ├── store/                   # طبقة إدارة الحالة (Zustand Store)
│   │   ├── useCVStore.js        # المتجر الرئيسي والحالات والإجراءات
│   │   ├── cvSelectors.js       # محددات الحالة الموضعية لمنع Re-renders
│   │   ├── cvPersistence.js     # حفظ المسودة محلياً في localStorage
│   │   └── cvMigrations.js      # معمارية الهجرة وتحديث الإصدارات
│   │
│   ├── utils/                   # أدوات ومعالجة البيانات
│   │   ├── updateByPath.js      # التحديث غير القابل للتعديل المباشر والحماية من Prototype Pollution
│   │   ├── normalizeCVData.js   # تطبيع البيانات وضمان كمال الأقسام والمعرفات
│   │   ├── validateCVData.js    # الفحص الهيكلي وفحص جاهزية التصدير (Export Readiness)
│   │   └── cvJsonTransfer.js    # تسلسل واستيراد وتصدير ملفات JSON
│   │
│   └── development/             # أدوات فحص وتطوير المتجر
│       ├── CVStoreInspector.jsx
│       └── CVDataSummary.jsx
│
└── pages/
    └── CVStorePage.jsx          # مسار تطويري مستقل (/cv-store) لاختبار حالة المتجر
```

### 🔐 الخصوصية والتخزين المحلي (LocalStorage Privacy Notice)

- يتم حفظ مسودة السيرة الذاتية محلياً تحت المفتاح: `cv-platform-cv-draft`.
- التخزين المحلي مؤقت وخاص بنفس الجهاز المتصفح، ولا يتم رفع أي بيانات حساسة إلى سيرفرات خارجية في هذه المرحلة.
- يتم تجريد سجل التراجع (Undo/Redo History) والأخطاء وحالات الحفظ المؤقتة عند الحفظ في `localStorage`.

---

## 🏛️ معمارية الهيكل والتنقل (Layout & Navigation Architecture)

```text
PublicLayout
├── /                         (HomePage)
├── /create                   (CreatePage)
├── /upload                   (UploadPage)
├── /analyze                  (AnalyzePage)
├── /match                    (MatchPage)
├── /improve                  (ImprovePage)
├── /templates                (TemplatesPage)
├── /help                     (HelpPage)
└── *                         (NotFoundPage)

Standalone Dev Routes:
├── /design-system            (DesignSystemPage)
└── /cv-store                (CVStorePage - Zustand Inspector)
```

---

## ✅ ما تم إنجازه في المرحلة السادسة (Phase 6 Accomplishments)

1. تثبيت وتكامل `zustand` (v5) و `zod` (v4) و `vitest` (v4).
2. بناء نموذج بيانات السيرة الذاتية الموحد برقم إصدار `schemaVersion: 1` وتثبيت لغة المستند بـ `en` واتجاهه بـ `ltr`.
3. تصميم مخططات Zod المقسمة للفحص الهيكلي وتطوير دالتي `validateCVData` و `validateCVForExport`.
4. إنشاء دالات المصنع (`cvFactories.js`) ومولد المعرفات الآمن (`generateId.js`).
5. بناء متجر Zustand (`useCVStore.js`) مع دعم الإجراءات المحددة، الحفظ التلقائي المحلي، والتراجع والإعادة (Undo/Redo) لـ 50 لقطة.
6. تطوير أداة التحديث الآمنة المباشرة `updateByPath.js` والحماية ضد ثغرات Prototype Pollution.
7. إنشاء دالات استيراد وتصدير ملفات JSON الآمنة بدون `eval`.
8. إنشاء صفحة التطوير الفعالة على المسار `/cv-store` لاختبار الـ Store واستعراض حالة البيانات والـ JSON المباشر.
9. كتابة **23 اختبار وحدة (Unit Tests)** وتجاوزها جميعها بنجاح عبر `npm run test`.
10. اجتياز فحوصات ESLint وبناء الإنتاج بنجاح كامل بدون أخطاء أو تحذيرات.

---

## 🔮 المراحل القادمة (Upcoming Phases)

- **المرحلة السابعة:** نموذج إدخال السيرة الذاتية ومحرر السيرة (Create CV Multi-Step Form & Builder UI).
- **المرحلة الثامنة:** معروض القوالب والمعاينة المباشرة (CV Templates & Live Preview Engine).

---

## 📌 سياسة Git Commits

نتبع سياسة **Conventional Commits**:
- `chore:` للتعديلات على الإعدادات أو البنية التحتية.
- `feat:` لإضافة ميزات جديدة.
- `fix:` لإصلاح الأخطاء.
- `docs:` لتحديث التوثيق.
- `style:` للتعديلات المتعلقة بالتنسيق البصري.
