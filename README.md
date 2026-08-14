# CV Platform (منصة السير الذاتية الذكية)

منصة حديثة وبسيطة لبناء وتحليل وتحسين السير الذاتية باستخدام تقنيات الذكاء الاصطناعي والتحليل الرقمي.

## 🎯 الهدف العام للمنصة

تهدف المنصة إلى تمكين المستفيدين من إنشاء سير ذاتية احترافية، وتحليل توافقها مع الوظائف (ATS Match)، وتلقي توصيات تحسين مخصصة لرفع فرص القبول في سوق العمل.

---

## 🛠️ التقنيات المستخدمة

- **الواجهة الأمامية (Frontend):** React.js (v19)
- **نظام القوالب والمعاينة الحية:** Template Registry + Template Renderer (Classic ATS, Professional ATS, Developer ATS)
- **نماذج البيانات وإدارتها (Forms):** React Hook Form (v7) + Zod Resolvers (v4)
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

## 🎨 نظام القوالب ومعرض السير الذاتية (Template System & Gallery Architecture)

> **إشعار توافق أنظمة ATS (ATS Disclaimer):**
> "جميع القوالب مصممة للتحليل المباشر بواسطة أنظمة تتبع المتقدمين الشائعة (ATS). قد تختلف النتائج بين منصات التوظيف (Optimized for straightforward parsing by common applicant tracking systems. Results may vary between platforms)."

### 🏛️ القوالب الأساسية الثلاثة (Sprint 9 Templates)

1. **Classic ATS** (`ats-optimized`): قالب تخطيط عمودي كلاسيكي فائق البساطة خالٍ من الأعمدة والجداول المعقدة، يضمن أعلى توافق مسحي عبر أنظمة التوظيف.
2. **Professional ATS** (`ats-optimized`): قالب تنفيذي مهني مع فواصل ناعمة وتنسيق أنيق ومناسب للمناصب الإدارية والمؤسسية.
3. **Developer ATS** (`visually-enhanced` / `specialized`): قالب تقني متخصص للمطورين يبرز المهارات البرمجية، المشاريع، وروابط مستودعات GitHub والتقنيات.

```text
src/features/templates/
├── constants/ (templateConstants.js)
├── registry/ (templateRegistry.js, templateMetadata.js)
├── utils/ (getTemplateById.js, getVisibleTemplateSections.js, filterTemplates.js, validateTemplateDefinition.js)
├── components/
│   ├── TemplateRenderer.jsx         # المحرك العام لعرض القالب المحدد
│   ├── TemplateGallery.jsx          # المعرض التفاعلي للقوالب
│   ├── TemplateCard.jsx             # بطاقة القالب مع خيار الاستخدام والمعاينة
│   ├── TemplateFilters.jsx          # تصفية القوالب حسب التصنيف
│   ├── TemplateThumbnail.jsx        # المصغرات البصرية الخفيفة عبر CSS
│   ├── TemplateDetailsDialog.jsx    # حوار معاينة تفاصيل القالب وإشعار ATS
│   └── TemplateCompatibilityBadge.jsx # شارة توافق أنظمة التوظيف
└── templates/                       # القوالب الفردية
    ├── shared/ (templateSharedUtils.js)
    ├── ClassicATS/ (ClassicATSTemplate.jsx)
    ├── ProfessionalATS/ (ProfessionalATSTemplate.jsx)
    └── Developer/ (DeveloperTemplate.jsx)
```

---

## 🔐 الخصوصية والحفاظ على البيانات (Data Preservation Policy)

- تغيير القالب من المعرض أو من Builder لا يؤدي إطلاقاً إلى مسح أو تغيير أية بيانات في السيرة الذاتية (`personalInfo`, `summary`, `experiences`, `education`, `skills`, `projects`, `certificates`, `languages`).
- يتم تحديث `templateId` فقط مع حفظ اللقطة في سجل التراجع والتكرار (`Undo`/`Redo`).

---

## ✅ ما تم إنجازه في المرحلة التاسعة (Sprint 9 Accomplishments)

1. تأسيس سجل القوالب المركزي (`templateRegistry.js`) وعرض المكونات عبر `TemplateRenderer.jsx`.
2. تصميم القوالب الثلاثة الأولى (`Classic ATS`, `Professional ATS`, `Developer ATS`) باللغة الإنجليزية واتجاه LTR حصرأً.
3. بناء معرض القوالب التفاعلي في صفحة `/templates` مع تصفية التصنيفات وشارات التوافق مع ATS.
4. دمج نظام القوالب مباشرة داخل محرر Builder Studio واستبدال المسودة المؤقتة بالنظام الجديد.
5. المحافظة الكاملة على التعديل المباشر (`EditableField`) والترتيب والإخفاء وإعدادات الألوان والخطوط.
6. كتابة **49 اختبار وحدة** عبر `npm run test` وتجاوزها بنجاح 100%.
7. اجتياز فحوصات ESLint وبناء الإنتاج بنجاح كامل دون تحذيرات أو أخطاء.

---

## 🔮 المراحل القادمة (Upcoming Phases)

- **المرحلة العاشرة:** واجهات رفع وتحليل وتطابق وتحسين السير الذاتية (Upload, Analyze, Match & Improve Interfaces).

---

## 📌 سياسة Git Commits

نتبع سياسة **Conventional Commits**:
- `chore:` للتعديلات على الإعدادات أو البنية التحتية.
- `feat:` لإضافة ميزات جديدة.
- `fix:` لإصلاح الأخطاء.
- `docs:` لتحديث التوثيق.
- `style:` للتعديلات المتعلقة بالتنسيق البصري.
