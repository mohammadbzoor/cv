import { Link } from 'react-router-dom';
import { Search, Mail, Lock, AlertCircle, ArrowRight, Plus, Trash2, Download, Eye, Home } from 'lucide-react';
import { ROUTE_PATHS } from '../app/routePaths';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

function SectionTitle({ children }) {
  return <h2 className="text-xl font-bold text-foreground mb-1">{children}</h2>;
}

function SectionDescription({ children }) {
  return <p className="text-sm text-foreground-secondary mb-6">{children}</p>;
}

/**
 * Development-only design system showcase page.
 * Demonstrates all UI components, variants, states, and design tokens.
 */
export default function DesignSystemPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-app-bg text-foreground font-sans">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-foreground">نظام التصميم</h1>
            <Badge variant="primary" size="sm">مرحلة التطوير</Badge>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to={ROUTE_PATHS.HOME}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm text-foreground-secondary hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>الرئيسية</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-12">

        {/* === THEME TOGGLE === */}
        <section>
          <SectionTitle>تبديل السمة (Theme Toggle)</SectionTitle>
          <SectionDescription>يدعم ثلاثة أوضاع: فاتح وداكن ونظام. يحفظ التفضيل تلقائياً.</SectionDescription>
          <div className="bg-surface rounded-xl border border-border p-6 flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm text-foreground-secondary">اختر السمة من القائمة المنسدلة</span>
          </div>
        </section>

        {/* === DESIGN TOKENS === */}
        <section>
          <SectionTitle>رموز التصميم (Design Tokens)</SectionTitle>
          <SectionDescription>جميع الألوان تتغير تلقائياً حسب السمة المختارة.</SectionDescription>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { label: 'Primary', cls: 'bg-primary' },
              { label: 'Primary Hover', cls: 'bg-primary-hover' },
              { label: 'Primary Subtle', cls: 'bg-primary-subtle' },
              { label: 'Secondary', cls: 'bg-secondary' },
              { label: 'Secondary Hover', cls: 'bg-secondary-hover' },
              { label: 'Secondary Subtle', cls: 'bg-secondary-subtle' },
              { label: 'Accent', cls: 'bg-accent' },
              { label: 'Accent Hover', cls: 'bg-accent-hover' },
              { label: 'Accent Subtle', cls: 'bg-accent-subtle' },
              { label: 'Success', cls: 'bg-success' },
              { label: 'Warning', cls: 'bg-warning' },
              { label: 'Danger', cls: 'bg-danger' },
              { label: 'Surface', cls: 'bg-surface' },
              { label: 'Surface Elevated', cls: 'bg-surface-elevated' },
              { label: 'Surface Muted', cls: 'bg-surface-muted' },
              { label: 'App Background', cls: 'bg-app-bg' },
            ].map(({ label, cls }) => (
              <div key={label} className="rounded-lg border border-border overflow-hidden">
                <div className={`h-12 ${cls}`} />
                <div className="px-3 py-2 bg-surface">
                  <span className="text-xs text-foreground-secondary">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === TYPOGRAPHY === */}
        <section>
          <SectionTitle>الخطوط والأحجام (Typography)</SectionTitle>
          <SectionDescription>نماذج للأحجام والأوزان المعتمدة في المشروع.</SectionDescription>
          <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
            <p className="text-3xl font-extrabold text-foreground">عنوان رئيسي (3xl / extrabold)</p>
            <p className="text-2xl font-bold text-foreground">عنوان ثانوي (2xl / bold)</p>
            <p className="text-xl font-bold text-foreground">عنوان فرعي (xl / bold)</p>
            <p className="text-lg font-semibold text-foreground">عنوان صغير (lg / semibold)</p>
            <p className="text-base text-foreground">نص أساسي (base) - هذا نص عربي تجريبي لاختبار قابلية القراءة والتباين في الوضعين الفاتح والداكن.</p>
            <p className="text-sm text-foreground-secondary">نص ثانوي (sm / secondary) - يُستخدم للتعليقات التوضيحية والنصوص المساندة.</p>
            <p className="text-xs text-foreground-muted">نص مصغّر (xs / muted) - يُستخدم للملاحظات والتواريخ.</p>
          </div>
        </section>

        {/* === BUTTONS === */}
        <section>
          <SectionTitle>الأزرار (Buttons)</SectionTitle>
          <SectionDescription>خمسة أنماط، أربعة أحجام، حالات التحميل والتعطيل.</SectionDescription>

          <div className="space-y-8">
            {/* Variants */}
            <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
              <h3 className="text-sm font-semibold text-foreground-secondary">الأنماط (Variants)</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">أساسي (Primary)</Button>
                <Button variant="secondary">ثانوي (Secondary)</Button>
                <Button variant="outline">محيط (Outline)</Button>
                <Button variant="ghost">شبح (Ghost)</Button>
                <Button variant="danger">خطر (Danger)</Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
              <h3 className="text-sm font-semibold text-foreground-secondary">الأحجام (Sizes)</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">صغير (sm)</Button>
                <Button size="md">متوسط (md)</Button>
                <Button size="lg">كبير (lg)</Button>
                <Button size="icon" aria-label="إضافة عنصر">
                  <Plus className="w-5 h-5" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* With Icons */}
            <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
              <h3 className="text-sm font-semibold text-foreground-secondary">مع أيقونات (With Icons)</h3>
              <div className="flex flex-wrap gap-3">
                <Button leadingIcon={Download}>تحميل</Button>
                <Button variant="secondary" trailingIcon={ArrowRight}>التالي</Button>
                <Button variant="danger" leadingIcon={Trash2}>حذف</Button>
                <Button variant="outline" leadingIcon={Eye}>معاينة</Button>
              </div>
            </div>

            {/* States */}
            <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
              <h3 className="text-sm font-semibold text-foreground-secondary">الحالات (States)</h3>
              <div className="flex flex-wrap gap-3">
                <Button loading>جاري التحميل...</Button>
                <Button variant="secondary" loading>حفظ...</Button>
                <Button disabled>معطّل (Disabled)</Button>
                <Button variant="outline" disabled>محيط معطّل</Button>
              </div>
            </div>
          </div>
        </section>

        {/* === INPUT === */}
        <section>
          <SectionTitle>حقل الإدخال (Input)</SectionTitle>
          <SectionDescription>يدعم التسمية والنص المساعد والخطأ والأيقونات وحالة التعطيل.</SectionDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl border border-border p-6 space-y-5">
              <Input
                label="الاسم الكامل"
                placeholder="أدخل اسمك الكامل"
                helperText="الاسم كما سيظهر في السيرة الذاتية."
              />
              <Input
                label="البريد الإلكتروني"
                type="email"
                placeholder="email@example.com"
                startIcon={Mail}
                required
              />
              <Input
                label="كلمة المرور"
                type="password"
                placeholder="••••••••"
                startIcon={Lock}
                endIcon={Eye}
              />
            </div>

            <div className="bg-surface rounded-xl border border-border p-6 space-y-5">
              <Input
                label="البحث"
                placeholder="ابحث هنا..."
                startIcon={Search}
                helperText="ابحث في السير الذاتية المحفوظة."
              />
              <Input
                label="المسمى الوظيفي"
                placeholder="مهندس برمجيات"
                error="هذا الحقل مطلوب."
                endIcon={AlertCircle}
                required
              />
              <Input
                label="حقل معطّل"
                placeholder="لا يمكن التعديل"
                disabled
              />
            </div>
          </div>
        </section>

        {/* === TEXTAREA === */}
        <section>
          <SectionTitle>منطقة النص (Textarea)</SectionTitle>
          <SectionDescription>يدعم عداد الأحرف والنص المساعد وحالة الخطأ.</SectionDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl border border-border p-6 space-y-5">
              <Textarea
                label="الملخص المهني"
                placeholder="اكتب ملخصاً مختصراً عن خبراتك ومهاراتك..."
                helperText="يظهر في بداية السيرة الذاتية."
              />
              <Textarea
                label="وصف محدود"
                placeholder="اكتب وصفاً مختصراً..."
                maxLength={200}
                showCharacterCount
                defaultValue="هذا نص تجريبي لاختبار عداد الأحرف."
              />
            </div>

            <div className="bg-surface rounded-xl border border-border p-6 space-y-5">
              <Textarea
                label="ملاحظات (خطأ)"
                placeholder="..."
                error="يجب ألا يتجاوز النص 500 حرف."
              />
              <Textarea
                label="حقل معطّل"
                placeholder="لا يمكن التعديل"
                disabled
                rows={3}
              />
            </div>
          </div>
        </section>

        {/* === CARDS === */}
        <section>
          <SectionTitle>البطاقات (Cards)</SectionTitle>
          <SectionDescription>أربعة أنماط مع عناصر فرعية: Header وTitle وDescription وContent وFooter.</SectionDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>بطاقة افتراضية (Default)</CardTitle>
                <CardDescription>الشكل الأساسي للبطاقة مع خلفية Surface وحدود خفيفة.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-secondary">محتوى البطاقة يظهر هنا. يمكن وضع أي عناصر داخل CardContent.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">إجراء</Button>
                <Button size="sm" variant="ghost">إلغاء</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>بطاقة مرتفعة (Elevated)</CardTitle>
                <CardDescription>تستخدم ظلاً خفيفاً وخلفية مرتفعة لإبراز المحتوى المهم.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-secondary">مناسبة لإبراز العناصر ذات الأولوية مثل ملخص السيرة الذاتية.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="secondary">عرض التفاصيل</Button>
              </CardFooter>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>بطاقة محددة (Outlined)</CardTitle>
                <CardDescription>خلفية شفافة مع حدود واضحة. مناسبة للقوائم.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-secondary">تُستخدم عادة داخل مجموعات متكررة مثل بطاقات الخبرات.</p>
              </CardContent>
            </Card>

            <Card variant="muted">
              <CardHeader>
                <CardTitle>بطاقة صامتة (Muted)</CardTitle>
                <CardDescription>خلفية مكتومة للعناصر الأقل أهمية بصرياً.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-secondary">مناسبة للملاحظات والتلميحات والمعلومات الجانبية.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* === BADGES === */}
        <section>
          <SectionTitle>الشارات (Badges)</SectionTitle>
          <SectionDescription>سبعة أنماط دلالية وحجمان. غير تفاعلية افتراضياً.</SectionDescription>

          <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground-secondary mb-3">الحجم المتوسط (md)</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="neutral">محايد (Neutral)</Badge>
                <Badge variant="primary">أساسي (Primary)</Badge>
                <Badge variant="secondary">ثانوي (Secondary)</Badge>
                <Badge variant="success">نجاح (Success)</Badge>
                <Badge variant="warning">تحذير (Warning)</Badge>
                <Badge variant="danger">خطر (Danger)</Badge>
                <Badge variant="accent">مميز (Accent)</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground-secondary mb-3">الحجم الصغير (sm)</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="neutral" size="sm">محايد</Badge>
                <Badge variant="primary" size="sm">أساسي</Badge>
                <Badge variant="secondary" size="sm">ثانوي</Badge>
                <Badge variant="success" size="sm">نجاح</Badge>
                <Badge variant="warning" size="sm">تحذير</Badge>
                <Badge variant="danger" size="sm">خطر</Badge>
                <Badge variant="accent" size="sm">مميز</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* === RTL TEST === */}
        <section>
          <SectionTitle>اختبار اتجاه النص (RTL Test)</SectionTitle>
          <SectionDescription>التحقق من دعم الاتجاه العربي الأيمن بصورة صحيحة.</SectionDescription>
          <Card>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-foreground leading-relaxed">
                  هذا النص باللغة العربية لاختبار صحة محاذاة الاتجاه من اليمين إلى اليسار.
                  يجب أن تكون جميع العناصر بما في ذلك الأزرار والحقول والشارات متوافقة مع اتجاه القراءة العربي.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button leadingIcon={Plus} size="sm">إضافة عنصر جديد</Button>
                  <Input placeholder="حقل بحث..." startIcon={Search} />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-foreground-muted">
          <p>صفحة تطوير داخلية - CV Platform Design System</p>
        </div>
      </footer>
    </div>
  );
}
