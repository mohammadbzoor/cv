import { Link } from 'react-router-dom';
import { CheckCircle2, FileText, FileCheck, ArrowRight, Layers, ShieldCheck, Code } from 'lucide-react';
import { ROUTE_PATHS } from '../app/routePaths';

/**
 * HomePage component.
 * Displays the foundational setup with a calm, professional editorial identity.
 *
 * @returns {JSX.Element} The rendered home verification page.
 */
export default function HomePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-app-bg text-foreground flex flex-col font-sans">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary text-surface-elevated rounded-lg shadow-2xs">
              <FileText className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">
                منصة السير الذاتية الذكية
              </h1>
              <p className="text-xs text-foreground-secondary">CV Platform v1.0.0</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-success-subtle text-success text-xs font-medium rounded-full border border-success/20">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            المرحلة الأولى مكتملة
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Hero Card */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-2xs text-center md:text-right space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-subtle text-primary rounded-md text-xs font-semibold">
            <Code className="w-4 h-4" aria-hidden="true" />
            تأسيس البنية الهندسية الهادئة
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-snug">
            تم إنشاء البنية الهندسية الأساسية للمشروع بنجاح
          </h2>
          <p className="text-foreground-secondary max-w-3xl text-sm md:text-base leading-relaxed">
            هذه الصفحة مؤقتة مخصصة لاختبار نجاح البنية التحتية والمكتبات الأساسية مع تطبيق الهوية البصرية المهنية الدافئة المناسبة لوثائق التوظيف ومحرر السير الذاتية.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              to={ROUTE_PATHS.CREATE}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-surface-elevated font-medium text-sm rounded-lg hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 transition-colors shadow-2xs"
            >
              <span>تجربة مسار غير معرّف (اختبار NotFoundPage)</span>
              <ArrowRight className="w-4 h-4 rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Calm Design Palette Demonstration */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-2xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-secondary" aria-hidden="true" />
              لوحة الألوان المهنية (Editorial Palette Tokens)
            </h3>
            <p className="text-xs text-foreground-secondary mt-1">
              درجات ألوان هادئة ودافئة مصممة لراحة العين أثناء العمل المطول على المستندات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary - Deep Slate */}
            <div className="bg-surface rounded-xl border border-border overflow-hidden p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-foreground">Deep Slate</span>
                <span className="w-4 h-4 rounded-full bg-primary" title="#344553" />
              </div>
              <div className="h-12 bg-primary-subtle border border-primary/10 rounded-lg p-3 flex items-center justify-between text-xs text-primary font-mono">
                <span>Primary</span>
                <span>#344553</span>
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                اللون الأساسي للأزرار الرئيسية والعناوين الهامة لتعزيز الوضوح والمهنية.
              </p>
            </div>

            {/* Secondary - Muted Sage */}
            <div className="bg-surface rounded-xl border border-border overflow-hidden p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-foreground">Muted Sage</span>
                <span className="w-4 h-4 rounded-full bg-secondary" title="#607D73" />
              </div>
              <div className="h-12 bg-secondary-subtle border border-secondary/10 rounded-lg p-3 flex items-center justify-between text-xs text-secondary font-mono">
                <span>Secondary</span>
                <span>#607D73</span>
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                اللون الثانوي المخصص للعناصر المساندة وحالات النجاح المعتدلة.
              </p>
            </div>

            {/* Accent - Soft Terracotta */}
            <div className="bg-surface rounded-xl border border-border overflow-hidden p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-foreground">Soft Terracotta</span>
                <span className="w-4 h-4 rounded-full bg-accent" title="#B9785D" />
              </div>
              <div className="h-12 bg-accent-subtle border border-accent/10 rounded-lg p-3 flex items-center justify-between text-xs text-accent font-mono">
                <span>Accent</span>
                <span>#B9785D</span>
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                لون التمييز الدافيء المحسوب لاستخدامه بحذر في التنبيهات وإبراز العناصر.
              </p>
            </div>
          </div>
        </section>

        {/* Verification Status */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-2xs space-y-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-success" aria-hidden="true" />
            فحص المعايير التحريرية والهندسية
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-foreground-secondary">
            <li className="flex items-center gap-2.5 p-3 bg-app-bg rounded-lg border border-border/60">
              <FileCheck className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
              <span>هوية بصرية دافئة وخالية من تدرجات النيون</span>
            </li>
            <li className="flex items-center gap-2.5 p-3 bg-app-bg rounded-lg border border-border/60">
              <FileCheck className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
              <span>تباين مريح للنصوص الطويلة والقراءة</span>
            </li>
            <li className="flex items-center gap-2.5 p-3 bg-app-bg rounded-lg border border-border/60">
              <FileCheck className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
              <span>تكامل حزم React Router & Tailwind CSS v4</span>
            </li>
            <li className="flex items-center gap-2.5 p-3 bg-app-bg rounded-lg border border-border/60">
              <FileCheck className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
              <span>دعم كامل للغة العربية والاتجاه الأيمن RTL</span>
            </li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-foreground-muted">
          <p>© {new Date().getFullYear()} CV Platform - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
