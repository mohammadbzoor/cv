# CV Platform (منصة السير الذاتية الذكية)

منصة حديثة وبسيطة لبناء وتحليل وتحسين السير الذاتية باستخدام تقنيات الذكاء الاصطناعي والتحليل الرقمي.

## 🎯 الهدف العام للمنصة

تهدف المنصة إلى تمكين المستفيدين من إنشاء سير ذاتية احترافية، وتحليل توافقها مع الوظائف (ATS Match)، وتلقي توصيات تحسين مخصصة لرفع فرص القبول في سوق العمل.

---

## 🛠️ التقنيات المستخدمة

- **الواجهة الأمامية (Frontend):** React.js (v19)
- **أداة البناء والتطوير:** Vite (v8)
- **لغة البرمجة:** JavaScript (ES6+) و JSX
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

## 🏗️ هيكل المشروع (Project Structure)

```text
src/
├── app/                  # إعدادات التطبيق والتوجيه والمزودات الرئيسية
│   ├── App.jsx           # المكون الجذري للتطبيق
│   ├── router.jsx        # تعريف المسارات والصفحات
│   ├── providers.jsx     # تجميع Context Providers
│   └── routePaths.js     # الثوابت الخاصة بأسماء المسارات
│
├── assets/               # الأصول الثابتة (الصور والأيقونات)
│   ├── images/
│   ├── icons/
│   └── template-thumbnails/
│
├── components/           # المكونات العامة المجهزة لإعادة الاستخدام
│   ├── ui/               # عناصر الواجهة الذرية (Atomic UI)
│   ├── layout/           # الهياكل الأساسية (Navbar, Footer, Layouts)
│   └── feedback/         # التنبيهات ورسائل التحميل والأخطاء
│
├── features/             # الميزات المقسمة حسب النطاق (Feature Modules)
│   ├── home/
│   ├── create/
│   ├── upload/
│   ├── analyze/
│   ├── match/
│   ├── improve/
│   ├── builder/
│   ├── templates/
│   └── export/
│
├── pages/                # الصفحات المستقلة المربوطة بالمسارات
│   ├── HomePage.jsx      # الصفحة الرئيسية الاختبارية
│   └── NotFoundPage.jsx  # صفحة الخطأ 404
│
├── contexts/             # السياقات العامة (Global Contexts)
├── hooks/                # الخطافات المخصصة (Custom Hooks)
├── services/             # خدمات الشبكة والـ API
│   ├── apiClient.js      # Axios instance الرئيسي
│   ├── endpoints.js      # المسارات المتوقعة للـ API
│   └── errorNormalizer.js# دالة توحيد أخطاء الشبكة
│
├── models/               # بنية ونماذج البيانات
├── constants/            # الثوابت العامة
├── utils/                # الدوال المساعدة العامة
├── styles/               # الأنماط والتنسيقات
│   └── globals.css       # تنسيقات Tailwind والأشكال العامة
└── main.jsx              # نقطة الانطلاق الرئيسية للتطبيق
```

---

## 🔑 متغيرات البيئة (Environment Variables)

يتم ضبط متغيرات البيئة في ملف `.env` (مع توفير ملف `.env.example` كمثال مرجعي):

| المتغير | الوصف | القيمة الافتراضية |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | عنوان مسار الـ API الرئيسي | `http://localhost:5000/api` |

---

## ✅ ما تم إنجازه في المرحلة الأولى (Phase 1 Accomplishments)

1. تأسيس مشروع React + Vite باستخدام JavaScript و JSX بدون TypeScript.
2. تثبيت الحزم الأساسية وتوافقها الكامل (`react-router-dom`, `axios`, `lucide-react`, `tailwindcss`, `eslint`).
3. إعداد وتفعيل Tailwind CSS v4 من خلال الملحق الرسمي لـ Vite (`@tailwindcss/vite`).
4. بناء هيكل المجلدات الهندسي المنظم مع دعم التوسع وحفظ المجلدات عبر `.gitkeep`.
5. ضبط التوجيه (React Router) وتحديد مسار الصفحة الرئيسية `/` وصفحة الخطأ `*` (NotFoundPage).
6. إنشاء عميل Axios موحد (`apiClient.js`) يدعم متغيرات البيئة ودالة معالجة الأخطاء (`errorNormalizer.js`).
7. بناء صفحة اختبار تجريبية (`HomePage`) تدعم التصميم المتجاوب، والاتجاه الأيمن RTL، وأيقونات Lucide، وعينات لوحة الألوان (Indigo, Teal, Amber).
8. اجتياز اختبارات ESLint و Production Build دون أخطاء.

---

## 🔮 المراحل القادمة (Upcoming Phases)

- **المرحلة الثانية:** إعداد ThemeContext ودعم Mode الداكن/الفاتح، وتأسيس الهيكل البصري للـ Navigation و Footer.
- **المرحلة الثالثة:** بناء نماذج البيانات واستكمال وحدات بناء السيرة الذاتية (CV Builder & Templates).
- **المرحلة الرابعة:** ربط وحدات التحليل والتحسين وإدخال الذكاء الاصطناعي ورفع الملفات.

---

## 📌 سياسة Git Commits

نتبع سياسة **Conventional Commits**:
- `chore:` للتعديلات على الإعدادات أو البنية التحتية.
- `feat:` لإضافة ميزات جديدة.
- `fix:` لإصلاح الأخطاء.
- `docs:` لتحديث التوثيق.
- `style:` للتعديلات المتعلقة بالتنسيق البصري.
