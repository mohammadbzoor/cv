# CV Platform (منصة السير الذاتية الذكية)

منصة حديثة وبسيطة لبناء وتحليل وتحسين السير الذاتية باستخدام تقنيات الذكاء الاصطناعي والتحليل الرقمي.

## 🎯 الهدف العام للمنصة

تهدف المنصة إلى تمكين المستفيدين من إنشاء سير ذاتية احترافية، وتحليل توافقها مع الوظائف (ATS Match)، وتلقي توصيات تحسين مخصصة لرفع فرص القبول في سوق العمل.

---

## 🛠️ التقنيات المستخدمة

- **الواجهة الأمامية (Frontend):** React.js (v19)
- **محرر المستند والمعاينة الحية:** CV Studio Builder Engine (A4 Live Preview + Inline Editing)
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

## 🏗️ معمارية المحرر والمعاينة الحية (CV Builder Studio Architecture)

> **حصرية اتجاه ومحتوى السيرة الذاتية (English-Only & LTR Document):**
> "جميع حقول ومكونات ورقة المعاينة الحية والتعديل المباشر تلتزم دائماً بخصائص `lang='en' dir='ltr'` وخلفية بيضاء محايدة لصفحة A4، بغض النظر عن لغة واجهة المنصة الخارجية أو نمط الألوان (Dark/Light Mode)."

### 🎨 مكونات محرك المحرر (Sprint 8 Features)

1. **Builder Layout**: تقسيم ثلاثي الأجزاء للماكينات المكتبية (لوحة المحتوى، ورقة المعاينة A4، ولوحة التصميم) مع تبويب سفلي متجاوب للشاشات الصغيرة والجوال (`Content` / `Preview` / `Design`).
2. **Builder Header**: شريط الأدوات العلوي مع مؤشر حالة الحفظ المحلي (`Saved locally`, `Unsaved changes`)، أزرار التراجع والإعادة (`Undo`/`Redo`)، حفظ المسودة، والتنقل السريع.
3. **Live A4 Preview & BuilderDraftTemplate**: محرك معاينة ورقة A4 حقيقي (`210mm x 297mm`) مع قالب مسودة داخلي يعكس البيانات فورياً ويرتب الأقسام حسب `sectionOrder` ويستثني `hiddenSections`.
4. **Inline Editing (`EditableField`)**: إمكانية التعديل المباشر التفاعلي عند النقر على حقول النص في ورقة المعاينة الحية، مع اختصارات الحفظ والإلغاء (`Enter`, `Shift+Enter`, `Escape`, `Blur`).
5. **Section Manager**: إدارة ترتيب الأقسام عبر أزرار التحريك للأعلى والأسفل (`Up`/`Down`) وإمكانية إخفاء/إظهار أي قسم (`EyeToggle`).
6. **Design Panel**: التحكم بلون التمييز الرئيسي (مع تنقية وتأمين رموز Hex)، نوع الخط من قائمة مسموحة (`SAFE_FONT_FAMILIES`)، حجم الخط، تباعد الأسطر والهوامش.
7. **Zoom Controls**: التحكم بمستوى تكبير المعاينة (`50%` إلى `150%`) مع خيار ملاءمة الشاشة (`Fit Window`) وإعادة الضبط.
8. **Keyboard Shortcuts**: دعم اختصارات لوحة المفاتيح `Ctrl+S` للحفظ، `Ctrl+Z` للتراجع، و `Ctrl+Y` / `Ctrl+Shift+Z` للإعادة.
9. **Unsaved Guard**: حماية التعديلات غير المحفوظة عند محاولة محو المسودة أو إغلاق التبويب (`beforeunload`).

```text
src/features/builder/
├── constants/ (builderConstants.js)
├── utils/ (calculatePreviewScale.js, builderValidation.js, getSectionLabel.js)
├── hooks/ (usePreviewZoom.js, useInlineEditing.js, useBuilderKeyboardShortcuts.js, useBuilderLayout.js)
├── components/
│   ├── BuilderLayout.jsx
│   ├── BuilderHeader.jsx
│   ├── ContentPanel.jsx
│   ├── DesignPanel.jsx
│   ├── PreviewPanel.jsx
│   ├── CVPreview.jsx
│   ├── PreviewPage.jsx
│   ├── BuilderDraftTemplate.jsx
│   ├── EditableField.jsx
│   ├── SectionManager.jsx
│   ├── SaveStatus.jsx
│   ├── ZoomControls.jsx
│   ├── EmptyDocumentNotice.jsx
│   └── BuilderUnsavedGuard.jsx
└── sections/ (PersonalInfoEditor.jsx, SummaryEditor.jsx, ExperienceEditor.jsx, EducationEditor.jsx, SkillsEditor.jsx, ProjectsEditor.jsx, CertificatesEditor.jsx, LanguagesEditor.jsx)
```

---

## 🔐 الخصوصية والتخزين المحلي (LocalStorage Privacy Notice)

- يتم حفظ مسودة السيرة الذاتية محلياً تحت المفتاح: `cv-platform-cv-draft`.
- التخزين المحلي مؤقت وخاص بنفس الجهاز المتصفح، ولا يتم رفع أي بيانات حساسة إلى سيرفرات خارجية في هذه المرحلة.

---

## ✅ ما تم إنجازه في المرحلة الثامنة (Sprint 8 Accomplishments)

1. إنشاء المسار المستقل `/builder` وتحديث `ReviewStep` لتفعيل زر "Open CV Builder".
2. بناء معمارية المحرر المتجاوبة `BuilderLayout` بخياراتها الثلاثية والمتحركة للجوال.
3. تطوير مكون التعديل المباشر `EditableField` وتأمين عدم تسرب أكواد HTML أو تغيرات غير مرغوبة.
4. تطوير معاينة ورقة A4 حية برمجية تدعم زوم `50%-150%` وملاءمة الشاشة.
5. إنشاء لوحة التحكم الأقسام `SectionManager` للتنظيم والإخفاء.
6. إضافة اختصارات لوحة المفاتيح `Ctrl+S`, `Ctrl+Z`, `Ctrl+Y`.
7. كتابة **37 اختبار وحدة** عبر `npm run test` وتجاوزها بنجاح 100%.
8. اجتياز فحوصات ESLint وبناء الإنتاج بنجاح كامل دون تحذيرات أو أخطاء.

---

## 🔮 المراحل القادمة (Upcoming Phases)

- **المرحلة التاسعة:** سجل القوالب وقوالب ATS الاحترافية (Template Registry & ATS Templates Engine).

---

## 📌 سياسة Git Commits

نتبع سياسة **Conventional Commits**:
- `chore:` للتعديلات على الإعدادات أو البنية التحتية.
- `feat:` لإضافة ميزات جديدة.
- `fix:` لإصلاح الأخطاء.
- `docs:` لتحديث التوثيق.
- `style:` للتعديلات المتعلقة بالتنسيق البصري.
