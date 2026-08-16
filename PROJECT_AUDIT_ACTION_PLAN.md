# 🎯 خطة العمل التنفيذية (PROJECT AUDIT ACTION PLAN)

---

## 🔴 P0 — موانع الإطلاق (Must-Have Before Any Production Release)

### 1. [P0-AUTH] بناء وإطلاق نظام المصادقة الحقيقي (Real Authentication & Session Management)
* **المشكلة:** نظام تسجيل الدخول والتسجيل يعمل حالياً عبر `mockAuthService.js` فقط.
* **الوحدات المتأثرة:** `src/features/auth/*`, `src/pages/LoginPage.jsx`, `src/pages/RegisterPage.jsx`.
* **الحجم والجهد:** **L (Large)**
* **الأثر:** منع فقدان الجلسات، وحماية مسار المستخدم، وتمكين الوصول المتعدد.
* **معيار القبول (DoD):** تكامل مع مزود مصادقة (Firebase Auth أو Supabase Auth أو Node.js JWT)، وتخزين آمن لرموز الجلسة (HTTP-only Cookies / Secure Tokens).
* **الاختبارات المطلوبة:** اختبارات تسجيل الدخول بالبريد، واستعادة كلمة المرور، وحماية المسارات الخاصة.

### 2. [P0-DB] بناء طبقة التخزين السحابي للسير الذاتية (Cloud Database & User Data Persistence)
* **المشكلة:** بيانات السيرة الذاتية مخزنة محلياً فقط في `localStorage`، مما يهدد بفقدانها عند مسح ذاكرة المتصفح.
* **الوحدات المتأثرة:** `src/features/cv/store/useCVStore.js`, `src/services/apiClient.js`.
* **الحجم والجهد:** **L (Large)**
* **الأثر:** مزامنة السير الذاتية عبر أجهزة المستخدم المختلفة وإمكانية استرجاعها في أي وقت.
* **معيار القبول (DoD):** قاعدة بيانات سحابية (Firestore أو PostgreSQL) مع عمليات CRUD كاملة (Create, Read, Update, Delete) مربوطة بمعرف المستخدم `userId`.

### 3. [P0-CI] إنشاء خطوط الأنابيب المؤتمتة (GitHub Actions CI/CD Pipeline)
* **المشكلة:** غياب مجلد `.github/workflows`، مما يعني عدم فحص الكود والاختبارات آلياً قبل الدمج.
* **الوحدات المتأثرة:** `.github/workflows/ci.yml`.
* **الحجم والجهد:** **S (Small)**
* **الأثر:** منع دمج أي كود يكسر الاختبارات أو يحتوي على أخطاء Linting.
* **معيار القبول (DoD):** ملف Workflow يعمل عند كل `push` أو `pull_request` ويشغل `npm run lint` و `npm run test` و `npm run build`.

---

## 🟠 P1 — متطلبات أساسية بعد P0 (High Priority)

### 4. [P1-AI] ربط خدمات الذكاء الاصطناعي بمزود نماذج حقيقي (Real AI Services Integration)
* **المشكلة:** خدمات فحص الـ ATS ومطابقة الوظائف وتحسين النصوص تعيد بيانات ثابتة من `mockServiceClient.js`.
* **الوحدات المتأثرة:** `src/features/ai-services/*`, `src/pages/AnalyzePage.jsx`, `src/pages/MatchPage.jsx`, `src/pages/ImprovePage.jsx`.
* **الحجم والجهد:** **M (Medium)**
* **الأثر:** توفير القيمة الجوهرية الذكية للمنصة للمستخدمين الحقيقيين.
* **معيار القبول (DoD):** ربط الـ Backend بواجهة OpenAI API أو Anthropic API مع معالجة حدود الاستخدام (Rate Limiting) واقتطاع الردود بتنسيق JSON مدقق بـ Zod.

### 5. [P1-E2E] إضافة اختبارات المسار الشامل (Playwright End-to-End Testing)
* **المشكلة:** عدم وجود اختبارات تقيس تجربة المستخدم وتفاعل المتصفح الحقيقي وتصدير الـ PDF.
* **الوحدات المتأثرة:** `package.json`, مجلد `e2e/`.
* **الحجم والجهد:** **M (Medium)**
* **الأثر:** حماية المسار الحرج (تسجيل -> إنشاء سيرة -> تعديل محتوى -> تنزيل PDF).
* **معيار القبول (DoD):** تشغيل واجتياز 5 سيناريوهات E2E رئيسية في المتصفحات (Chromium, Firefox, WebKit).

---

## 🟡 P2 — تحسينات الجودة وتجربة المستخدم (Quality & Refactoring)

### 6. [P2-REF] استخراج المكونات الفرعية المشتركة للقوالب الستة (Shared Template Subcomponents)
* **المشكلة:** تكرار كود عرض الخبرات والتعليم والمشاريع داخل كل قالب من القوالب الستة.
* **الوحدات المتأثرة:** `src/features/templates/templates/*`.
* **الحجم والجهد:** **S (Small)**
* **الأثر:** تقليل حجم الكود المكرر وتسهيل إضافة أي تعديلات بصرية مستقبلاً.
* **معيار القبول (DoD):** استخراج `TemplateExperienceSection`, `TemplateEducationSection`, `TemplateProjectSection` مع الحفاظ على التخصيص البصري لكل قالب.

### 7. [P2-UX] إضافة دعم السحب والإفلات لإعادة ترتيب الأقسام (Drag & Drop Reordering)
* **المشكلة:** ترتيب الأقسام يعتمد حالياً على أزرار الأسهم العلوية والسفلية فقط.
* **الوحدات المتأثرة:** `src/features/builder/components/SectionManager.jsx`.
* **الحجم والجهد:** **S (Small)**
* **الأثر:** تجربة مستخدم أكثر سلاسة وتفاعلية على الشاشات الكبيرة والهواتف.

### 8. [P2-COV] تثبيت أداة قياس التغطية الاختبارية (Test Coverage Reporter)
* **المشكلة:** عدم القدرة على استخراج تقرير نسبة التغطية لغياب `@vitest/coverage-v8`.
* **الوحدات المتأثرة:** `package.json`, `vite.config.js`.
* **الحجم والجهد:** **XS (Extra Small)**
* **الأثر:** مراقبة الأسطر والوظائف غير المغطاة بالاختبارات آلياً.

---

## 🟢 P3 — تحسينات وتوسعات مستقبلية (Future Enhancements)

### 9. [P3-TS] التحول التدريجي إلى TypeScript (Gradual TypeScript Migration)
* **المشكلة:** المشروع مبني بـ JavaScript Vanilla، مما يزيد من احتمالية أخطاء الأنواع أثناء التوسع مع فرق برمجية كبيرة.
* **الحجم والجهد:** **XL (Extra Large)**
* **الأثر:** أمان تام للأنواع في وقت التطوير وتكامل متميز مع بيئات IDE.

### 10. [P3-HYBRID-PDF] محرك تصدير PDF هجين بالخادم (Server-Side Puppeteer PDF Rendering)
* **المشكلة:** `html2pdf.js` يعمل من طرف العميل ويحول العناصر إلى Canvas عالي الدقة.
* **الحجم والجهد:** **M (Medium)**
* **الأثر:** إنتاج ملفات PDF ذات نصوص موجهة بنسبة 100% (True Vector Text Stream) للشركات والمؤسسات.
