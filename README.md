# CV Platform (منصة السير الذاتية الذكية)

منصة حديثة وبسيطة لبناء وتحليل وتحسين السير الذاتية باستخدام تقنيات الذكاء الاصطناعي والتحليل الرقمي.

## 🎯 الهدف العام للمنصة

تهدف المنصة إلى تمكين المستفيدين من إنشاء سير ذاتية احترافية، وتحليل توافقها مع الوظائف (ATS Match)، وتلقي توصيات تحسين مخصصة لرفع فرص القبول في سوق العمل.

---

## 🛠️ التقنيات المستخدمة

- **الواجهة الأمامية (Frontend):** React.js (v19)
- **خدمات الذكاء الاصطناعي والمحاكاة (AI Intelligence Services):** Mock Service Layer + Zod Response Schemas
- **استخراج البيانات والمطابقة (Upload, Analyze, Match, Improve):** Async Mock Client + AbortController + Diff Viewer
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

## 🤖 طبقة خدمات الذكاء الاصطناعي والمحاكاة (Intelligence Services Architecture)

> **إشعار النمط التجريبي للمحاكاة (Demo Simulation Notice):**
> "جميع واجهات الرفع، التحليل الهيكلي، مطابقة الوصف الوظيفي، وتوليد التحسينات تعمل حالياً عبر طبقة خدمات محاكاة محلية آمنة (Mock Service Layer) مدعومة بعقود Zod القياسية لتسهيل الربط مع السيرفرات الحقيقية مستقبلاً دون إعادة بناء الواجهات."

### 🏛️ المكونات والواجهات الرئيسية (Sprint 10 Modules)

1. **مكون الرفع والاستخراج (`UploadPage` & `DropZone`):**
   - منطقة سحب وإسقاط متوافقة مع معايير الوصولية تدعم ملفات PDF و DOCX بحجم أقصى 5MB (`validateFile`).
   - استخراج بيانات محاكاة ومراجعتها قبل استكمال التعديل في المحرر (`replaceCVData`).
2. **واجهة التحليل الهيكلي (`AnalyzePage`):**
   - تقييم جاهزية السيرة الذاتية (من 100) وتفصيل النتائج حسب الأقسام (Structure, Readability, Impact, ATS Compatibility, Completeness).
   - عرض نقاط القوة، نقاط التراجع، وتوصيات التحسين القابلة للتطبيق.
3. **واجهة مطابقة الوصف الوظيفي (`MatchPage`):**
   - إدخال الوصف الوظيفي المستهدف (English/LTR) وحساب نسبة المطابقة وتصنيف المهارات المتطابقة والمفقودة.
   - خيار "إضافة للمؤهلات" مع حوار تأكيد المصداقية والنزاهة (`ConfirmDialog`) لإضافة المهارة إلى Zustand Store.
4. **واجهة تحسين المحتوى والتعديلات (`ImprovePage` & `DiffViewer`):**
   - عرض الفروقات بين النص الأصلي والنص المقترح مع تبيان السبب والتصنيف.
   - إمكانية القبول أو الرفض الفردي، أو قبول جميع التعديلات التوافقية بنقرة واحدة، مع حماية المسارات الحساسة واكتشاف التعارضات.

```text
src/
├── features/ai-services/
│   ├── contracts/ (serviceContracts.js, serviceStatus.js)
│   ├── mocks/ (mockAnalysisResult.js, mockMatchResult.js, mockImprovementResult.js, mockExtractedCV.js)
│   ├── services/ (mockServiceClient.js)
│   └── utils/ (createServiceError.js)
│
├── features/upload/
│   ├── components/ (DropZone.jsx, SelectedFile.jsx)
│   └── utils/ (validateFile.js)
│
├── features/analyze/
│   ├── components/ (AnalysisOverview.jsx)
│   ├── services/ (analyzeService.js)
│   └── hooks/ (useAnalyzeCV.js)
│
├── features/match/
│   ├── components/ (MatchOverview.jsx)
│   ├── services/ (matchService.js)
│   └── hooks/ (useMatchCV.js)
│
└── features/improve/
    ├── components/ (DiffViewer.jsx)
    ├── utils/ (applySuggestion.js)
    ├── services/ (improveService.js)
    └── hooks/ (useImproveCV.js)
```

---

## ✅ ما تم إنجازه في المرحلة العاشرة (Sprint 10 Accomplishments)

1. تأسيس طبقة العقود `serviceContracts.js` والعميل المحلي `mockServiceClient.js` المدعوم بـ AbortController و delay محاكي.
2. تطوير مكون الرفع `DropZone` وفحص الامتدادات والأحجام (`.pdf`, `.docx`, 5MB) مع خيارات الاستبدال والحذف.
3. بناء واجهة التحليل `AnalyzePage` وعرض النسب المئوية والتفاصيل والضعف والقوة.
4. بناء واجهة المطابقة `MatchPage` وحقول الوصف الوظيفي (LTR) وتأكيد مصداقية المهارات عند الإضافة.
5. بناء واجهة التحسين `ImprovePage` ومكون عرض الفروق `DiffViewer` وقبول/رفض المقترحات وتأثيرها المباشر في Zustand Store.
6. كتابة **65 اختبار وحدة** عبر `npm run test` وتجاوزها بنجاح 100%.
7. اجتياز فحوصات ESLint وبناء الإنتاج بنجاح كامل دون تحذيرات أو أخطاء.

---

## 🔮 المراحل القادمة (Upcoming Phases)

- **المرحلة الحادية عشرة:** طباعة وتصدير PDF، التخزين التلقائي، التكامل وإطلاق النسخة الأولية (Print/PDF Export, Autosave, Integration & Final MVP Release).

---

## 📌 سياسة Git Commits

نتبع سياسة **Conventional Commits**:
- `chore:` للتعديلات على الإعدادات أو البنية التحتية.
- `feat:` لإضافة ميزات جديدة.
- `fix:` لإصلاح الأخطاء.
- `docs:` لتحديث التوثيق.
- `style:` للتعديلات المتعلقة بالتنسيق البصري.
