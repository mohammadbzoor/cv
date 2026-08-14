# CV Platform (منصة السير الذاتية الذكية)

منصة حديثة وبسيطة لبناء وتحليل وتحسين السير الذاتية باستخدام تقنيات الذكاء الاصطناعي والتحليل الرقمي.

## 🎯 الهدف العام للمنصة

تهدف المنصة إلى تمكين المستفيدين من إنشاء سير ذاتية احترافية، وتحليل توافقها مع الوظائف (ATS Match)، وتلقي توصيات تحسين مخصصة لرفع فرص القبول في سوق العمل.

---

## 🛠️ التقنيات المستخدمة

- **الواجهة الأمامية (Frontend):** React.js (v19)
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

## 🧙‍♂️ معمارية معالج إنشاء السيرة الذاتية (Create CV Multi-Step Wizard)

> **قاعدة لغة محتوى السيرة الذاتية (English-Only Content):**
> "تتبع نصوص الواجهة والتعليمات لغة التطبيق الحالية (عربي/إنجليزي)، بينما تُدخل جميع حقول السيرة الذاتية باللغة الإنجليزية حصرأً مع ضبط الاتجاه تلقائياً إلى LTR (`lang='en' dir='ltr'`)."

### 📌 خطوات المعالج (9 Steps)

1. **Welcome**: ترحيب وتوضيح قواعد المحتوى وخيار متابعة المسودة أو البدء بسيرة جديدة مع حوار التأكيد.
2. **Personal Information**: بيانات الاسم الكامل، المسمى الوظيفي، التواصل والروابط المهنية مع وسم `autocomplete`.
3. **Professional Summary**: النص الملخص مع عداد الحروف ونصائح كتابة الملخص المهني.
4. **Experience**: الخبرات العملية الديناميكية عبر `useFieldArray` مع فحص منطق التواريخ وخيار الوظيفة الحالية.
5. **Education**: المؤهلات التعليمية والدرجات العلمية والجامعات.
6. **Skills**: المهارات التقنية والشخصية مع فئات ودرجات الإتقان.
7. **Projects**: المشاريع البارزة مع روابط المعاينة والمستودع والتقنيات المستخدمة.
8. **Additional Information**: الشهادات المعتمدة واللغات المتحدثة في تبويبات منظمة.
9. **Review & Confirm**: مراجعة شاملة لجميع الأقسام، أزرار للانتقال السريع للخطوة، وفحص جاهزية التصدير (Export Readiness).

```text
src/features/create/
├── constants/
│   └── wizardSteps.js           # تعريف الـ 9 خطوات وحقول التحقق الخاصة بكل خطوة
├── schemas/
│   └── createCVWizardSchema.js  # مخطط Zod المحسّن مع تحققات التواريخ المتقاطعة
├── utils/
│   ├── mapStoreToForm.js        # تحويل بيانات Zustand إلى قيم React Hook Form الإبتدائية
│   ├── mapFormToStore.js        # تحويل قيم Form إلى كائن Zustand cvData المطبع
│   ├── getStepFields.js         # إرجاع حقول الخطوة للتحقق المرحلي
│   └── focusFirstError.js       # التركيز التلقائي على أول حقل خاطئ للوصول الشامل
├── components/
│   ├── CreateCVWizard.jsx       # الحاوي الرئيسي المصل بالقوالب والحالة
│   ├── WizardProgress.jsx       # شريط التقدم المتجاوب (Stepper للمكتب والجوال)
│   ├── WizardNavigation.jsx     # شريط التنقل (السابق، التالي، حفظ مسودة، إنهاء)
│   ├── EnglishContentNotice.jsx # تنبيه لغة محتوى السيرة الإنجليزية
│   ├── FormSection.jsx          # حاوي أقسام الخطوات
│   ├── ArrayItemCard.jsx        # حاوي عناصر القوائم الديناميكية مع حوار التأكيد
│   ├── ReviewSection.jsx        # قسم المراجعة وزر التعديل المباشر
│   └── UnsavedWizardGuard.jsx   # حماية التعديلات غير المحفوظة عند إغلاق التبويب
└── steps/                       # الخطوات الـ 9 الفرعية
    ├── WelcomeStep.jsx
    ├── PersonalInfoStep.jsx
    ├── SummaryStep.jsx
    ├── ExperienceStep.jsx
    ├── EducationStep.jsx
    ├── SkillsStep.jsx
    ├── ProjectsStep.jsx
    ├── AdditionalInfoStep.jsx
    └── ReviewStep.jsx
```

---

## 🔐 الخصوصية والتخزين المحلي (LocalStorage Privacy Notice)

- يتم حفظ مسودة السيرة الذاتية محلياً تحت المفتاح: `cv-platform-cv-draft`.
- التخزين المحلي مؤقت وخاص بنفس الجهاز المتصفح، ولا يتم رفع أي بيانات حساسة إلى سيرفرات خارجية في هذه المرحلة.

---

## ✅ ما تم إنجازه في المرحلة السابعة (Sprint 7 Accomplishments)

1. تثبيت وتكامل `react-hook-form` (v7) و `@hookform/resolvers` (v4).
2. بناء معالج إنشاء السيرة الذاتية الكامل ذو الـ 9 خطوات في صفحة `/create`.
3. ربط `FormProvider` مع متجر Zustand عبر تحويلات `mapStoreToForm` و `mapFormToStore`.
4. دعم حفظ المسودة اليدوي والمرحلي مع الحفظ التلقائي في `localStorage`.
5. حظر أخطاء التواريخ المتقاطعة (تاريخ الانتهاء قبل البداية).
6. دعم الحقول الإنجليزية الثابتة `lang="en" dir="ltr"` مع تنبيه بصري واضح.
7. كتابة **30 اختبار وحدة** عبر `npm run test` وتجاوزها بنجاح 100%.
8. اجتياز فحوصات ESLint وبناء الإنتاج بنجاح كامل دون تحذيرات أو أخطاء.

---

## 🔮 المراحل القادمة (Upcoming Phases)

- **المرحلة الثامنة:** محرر السيرة الذاتية ومعاين القوالب المباشر (CV Builder Core & Live Preview Engine).

---

## 📌 سياسة Git Commits

نتبع سياسة **Conventional Commits**:
- `chore:` للتعديلات على الإعدادات أو البنية التحتية.
- `feat:` لإضافة ميزات جديدة.
- `fix:` لإصلاح الأخطاء.
- `docs:` لتحديث التوثيق.
- `style:` للتعديلات المتعلقة بالتنسيق البصري.
