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
│
├── components/
│   ├── ui/               # مكونات الواجهة الأساسية
│   │   ├── Button/       # زر متعدد الأنماط والأحجام
│   │   ├── Input/        # حقل إدخال مع تسمية وأيقونات وأخطاء
│   │   ├── Textarea/     # منطقة نص مع عداد أحرف
│   │   ├── Card/         # بطاقة مركبة بمكونات فرعية
│   │   ├── Badge/        # شارة حالة غير تفاعلية
│   │   └── ThemeToggle/  # زر تبديل السمة الفاتحة/الداكنة/النظام
│   ├── layout/           # الهياكل الأساسية (Navbar, Footer, Layouts)
│   └── feedback/         # التنبيهات ورسائل التحميل والأخطاء
│
├── contexts/             # السياقات العامة
│   ├── ThemeContext.jsx   # سياق السمة
│   └── ThemeProvider.jsx  # مزود السمة
│
├── hooks/
│   └── useTheme.js       # خطاف الوصول للسمة
│
├── features/             # الميزات المقسمة حسب النطاق
│
├── pages/
│   ├── HomePage.jsx       # الصفحة الرئيسية
│   ├── NotFoundPage.jsx   # صفحة 404
│   └── DesignSystemPage.jsx # صفحة عرض نظام التصميم
│
├── services/
│   ├── apiClient.js       # Axios instance الرئيسي
│   ├── endpoints.js       # المسارات المتوقعة للـ API
│   └── errorNormalizer.js # دالة توحيد أخطاء الشبكة
│
├── utils/
│   └── cn.js             # أداة دمج أسماء الفئات CSS
│
├── styles/
│   └── globals.css        # Design Tokens + Tailwind + Dark Mode
│
└── main.jsx               # نقطة الانطلاق الرئيسية
```

---

## 🎨 نظام الثيمات (Theme System)

### الأوضاع المدعومة

| الوضع | الوصف |
| :--- | :--- |
| `light` | الوضع الفاتح (افتراضي) |
| `dark` | الوضع الداكن |
| `system` | يتبع تفضيل نظام التشغيل تلقائياً |

### البنية

- **ThemeContext**: سياق React يوفر `theme` و `resolvedTheme` و `setTheme` و `toggleTheme`.
- **ThemeProvider**: مزود يدير حالة السمة ويتعامل مع DOM و localStorage.
- **useTheme**: خطاف مخصص للوصول إلى نظام الثيمات.
- **ThemeToggle**: مكون واجهة لتبديل السمة مع دعم لوحة المفاتيح و ARIA.
- **Anti-Flash Script**: سكريبت في `index.html` يمنع وميض اللون عند التحميل.

### مفتاح التخزين

```
cv-platform-theme
```

### Design Tokens

جميع الألوان معرفة كـ CSS custom properties في `globals.css` باستخدام `@theme` (Tailwind v4) وتتغير تلقائياً مع `.dark`:

| Token | Light | Dark |
| :--- | :--- | :--- |
| `app-bg` | `#F7F5F1` | `#171C1F` |
| `surface` | `#FCFBF9` | `#1E2529` |
| `foreground` | `#202A30` | `#EDF0EE` |
| `primary` | `#344553` | `#A7B8BF` |
| `secondary` | `#607D73` | `#8FA99F` |
| `accent` | `#B9785D` | `#D09A82` |
| `border` | `#D8D6D0` | `#374145` |

### اختبار الثيمات

1. افتح التطبيق وبدّل السمة من القائمة المنسدلة في الترويسة.
2. أعد تحميل الصفحة — يجب أن يبقى التفضيل محفوظاً.
3. اختر "النظام" ثم غيّر تفضيل نظام التشغيل للتحقق من التكيف التلقائي.

---

## 🧩 المكونات المنفذة (Core UI Components)

| المكون | الأنماط (Variants) | الأحجام | الوصف |
| :--- | :--- | :--- | :--- |
| **Button** | primary, secondary, outline, ghost, danger | sm, md, lg, icon | أزرار مع حالات تحميل وتعطيل ودعم أيقونات |
| **Input** | — | — | حقل إدخال مع تسمية ونص مساعد وخطأ وأيقونات |
| **Textarea** | — | — | منطقة نص مع عداد أحرف وتحقق |
| **Card** | default, elevated, outlined, muted | — | بطاقة مركبة (Header, Title, Description, Content, Footer) |
| **Badge** | neutral, primary, secondary, success, warning, danger, accent | sm, md | شارة حالة غير تفاعلية |
| **ThemeToggle** | — | — | قائمة تبديل السمة |

### صفحة نظام التصميم

متاحة في وضع التطوير على المسار:

```
/design-system
```

تعرض جميع المكونات وأنماطها وأحجامها وحالاتها في كلا الوضعين.

---

## 🔑 متغيرات البيئة (Environment Variables)

| المتغير | الوصف | القيمة الافتراضية |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | عنوان مسار الـ API الرئيسي | `http://localhost:5000/api` |

---

## ✅ ما تم إنجازه

### المرحلة الأولى — البنية التحتية

1. تأسيس مشروع React + Vite.
2. هيكل مجلدات هندسي منظم.
3. React Router + Axios client + ESLint.
4. هوية بصرية مهنية هادئة.
5. ربط GitHub.

### المرحلة الثانية — نظام الثيمات والمكونات

1. نظام ثيمات كامل (Light / Dark / System).
2. Design Tokens دلالية مركزية مع دعم Dark Mode.
3. Anti-flash script لمنع وميض اللون.
4. مكونات Button, Input, Textarea, Card, Badge, ThemeToggle.
5. صفحة Design System للعرض والاختبار.
6. أداة `cn()` لدمج فئات CSS.

---

## 🔮 المراحل القادمة

- **المرحلة الثالثة:** Navigation وLayout وصفحات البناء.
- **المرحلة الرابعة:** نماذج البيانات وCV Builder والقوالب.
- **المرحلة الخامسة:** التحليل والتحسين والمطابقة.

---

## 📌 حدود المرحلة الحالية

لم يتم تنفيذ: CV Data Model, Zustand, Builder, Templates, Upload, Analyze, Match, Improve, Modal, Tabs, Select, PDF/DOCX, Backend, Tests المتقدمة.

---

## 📌 سياسة Git Commits

نتبع سياسة **Conventional Commits**:
- `chore:` للتعديلات على الإعدادات أو البنية التحتية.
- `feat:` لإضافة ميزات جديدة.
- `fix:` لإصلاح الأخطاء.
- `docs:` لتحديث التوثيق.
- `style:` للتعديلات المتعلقة بالتنسيق البصري.
