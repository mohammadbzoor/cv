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

> **Architectural Principle:**
> "The application interface supports Arabic and English. CV content, templates, preview, and export are English-only and always use LTR document direction."

- **واجهة التطبيق (App Interface):** العربية (`ar` / RTL) والإنجليزية (`en` / LTR).
- **مستند السيرة الذاتية مستقبلاً (CV Document):** لغة إنجليزية ثابتة (`en` / LTR) دائماً.

- **مفتاح localStorage للغة:** `cv-platform-language`
- **Namespaces:** `common`, `navigation`, `home`, `designSystem`, `feedback`.

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

تم استكمال مكتبة مكونات الواجهة العامة (Primitives & Feedback States) بدون استخدام أي مكتبة UI خارجية:

| المكون | التصدير | الوصف وسلوك الوصول (Accessibility) |
| :--- | :--- | :--- |
| **Button** | `Button` | أزرار متعددة الأنماط والأحجام مع حالات تحميل وتعطيل ودعم أيقونات leading/trailing. |
| **Input** | `Input` | حقل إدخال مع label, helperText, error, startIcon, endIcon, aria-invalid, aria-describedby. |
| **Textarea** | `Textarea` | منطقة نص مع عداد أحرف وحجم أقصى وأولوية الخطأ على النص المساعد. |
| **Select** | `Select` | قائمة منسدلة قائمة على `<select>` الأصلي مع سهم اتجاه منطقي يدعم RTL و LTR. |
| **Checkbox** | `Checkbox` | مربع اختيار دلالي يدعم checked, unchecked, indeterminate, description, aria-invalid. |
| **RadioGroup** | `RadioGroup` | مجموعة اختيارات دائرية تعتمد `<fieldset>` و `<legend>` مع تنسيق رأسي وأفقي. |
| **Switch** | `Switch` | زر تبديل مع `role="switch"` و `aria-checked` وتحريك سلس يراعي Reduced Motion. |
| **Modal** | `Modal` | نافذة منبثقة تعتمد React Portal, Focus Trap, Scroll Lock, Escape key, وإعادة Focus السابق. |
| **Tabs** | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | تبويبات متوافقة مع WAI-ARIA ودعم التنقل بأسهم لوحة المفاتيح و Home/End مع مراعاة اتجاه RTL. |
| **Accordion** | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | قائمة طي واكتشاف متوافقة مع WAI-ARIA ودعم التمدد الفردي والمتعدد وحركة Chevron. |
| **Skeleton** | `Skeleton` | هيكل تحميل بصري يدعم أنماط text, circle, rectangle ويختفي عن قارئ الشاشة بـ `aria-hidden`. |
| **Spinner** | `Spinner` | مؤشر تحميل دائري دلالي يضم `role="status"` ونص مخفي قارئ شاشة `sr-only`. |
| **EmptyState** | `EmptyState` | حاوي عرض للحالات الفارغة يدعم الأيقونات والأوصاف وأزرار الإجراءات بدون نصوص صلبة. |
| **ErrorState** | `ErrorState` | حاوي عرض لأخطاء الشبكة والنظام مع أزرار إعادة المحاولة وعرض تفاصيل الخطأ. |
| **ConfirmDialog** | `ConfirmDialog` | حوار تأكيد يعيد استخدام Modal و Button مع دعم العمليات المدمرة وحالة التحميل. |
| **FormField** | `FormField` | حاوي تخطيطي موحد يربط label و required و error بالـ htmlFor. |
| **Tooltip** | `Tooltip` | تلميح توضيحي يظهر عند Hover و Focus ويغلق بزر Esc ويرتبط بـ `aria-describedby`. |
| **ThemeToggle** | `ThemeToggle` | قائمة منسدلة لتبديل السمة الفاتحة والداكنة والنظام. |
| **LanguageSwitcher** | `LanguageSwitcher` | زر التبديل بين العربية والإنجليزية دون استخدام أعلام الدول. |

### طريقة الاستيراد

```javascript
import { Select } from './components/ui/Select';
import { Modal } from './components/ui/Modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/Tabs';
import { ConfirmDialog } from './components/ui/ConfirmDialog';
```

---

## 🛠️ صفحة نظام التصميم (Design System Page)

متاحة في بيئة التطوير على المسار:
```text
/design-system
```
تعرض جميع المكونات والألوان والنصوص واختبارات النماذج والطبقات وحالات التغذية الراجعة في اللغتين العربية والإنجليزية والاتجاهين (RTL / LTR).

---

## ✅ ما تم إنجازه في المرحلة الرابعة (Phase 4 Accomplishments)

1. بناء المكونات الـ 14 العامة بالكامل وفق المعايير الدلالية و WAI-ARIA.
2. عدم الاعتماد على أية مكتبة UI أو Forms أو State إضافية.
3. التوافق التام لجميع المكونات مع الوضعين الفاتح والداكن وتفضيل النظام.
4. دعم اتجاهات RTL و LTR بالخصائص المنطقية (Logical Properties) والأيقونات المتكيفة.
5. توفير إدارة كاملة للتركيز (Focus Trap & Return) في `Modal` وحظر التمرير الخلفي.
6. دعم لوحة المفاتيح الكامل (Tab, Enter, Space, Escape, Arrows, Home, End).
7. تنظيم صفحة `/design-system` وتوزيع مكوناتها في وحدات منظمة تحت `src/features/design-system/components/`.
8. تحديث التوثيق واجتياز اختبارات ESLint و Production Build بفرص نجاح كاملة وسريعة.

---

## 🔮 المراحل القادمة (Upcoming Phases)

- **المرحلة الخامسة:** الهيكل البنائي والتنقل واختيار القوالب (Layout & Navigation).
- **المرحلة السادسة:** نموذج بيانات السيرة الذاتية ومحرر السيرة الذاتية (CV Data Model & Builder).

---

## 📌 سياسة Git Commits

نتبع سياسة **Conventional Commits**:
- `chore:` للتعديلات على الإعدادات أو البنية التحتية.
- `feat:` لإضافة ميزات جديدة.
- `fix:` لإصلاح الأخطاء.
- `docs:` لتحديث التوثيق.
- `style:` للتعديلات المتعلقة بالتنسيق البصري.
