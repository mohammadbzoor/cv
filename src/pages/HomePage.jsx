import { Link } from 'react-router-dom';
import { CheckCircle2, FileText, FileCheck, ArrowRight, Layers, ShieldCheck, Code } from 'lucide-react';
import { ROUTE_PATHS } from '../app/routePaths';
import { ThemeToggle } from '../components/ui/ThemeToggle';

/**
 * HomePage component.
 * Lightweight landing page confirming project foundation with calm professional identity.
 */
export default function HomePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-app-bg text-foreground flex flex-col font-sans">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary text-on-primary rounded-lg shadow-2xs">
              <FileText className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">
                منصة السير الذاتية الذكية
              </h1>
              <p className="text-xs text-foreground-secondary">CV Platform v1.0.0</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-success-subtle text-success text-xs font-medium rounded-full border border-success/20">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              المرحلة الثانية مكتملة
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Hero Card */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-2xs text-center md:text-right space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-subtle text-primary rounded-md text-xs font-semibold">
            <Code className="w-4 h-4" aria-hidden="true" />
            البنية التحتية + نظام الثيمات + المكونات الأساسية
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-snug">
            تم إنشاء البنية الهندسية الأساسية للمشروع بنجاح
          </h2>
          <p className="text-foreground-secondary max-w-3xl text-sm md:text-base leading-relaxed">
            تم تأسيس المشروع مع نظام ثيمات يدعم الوضع الفاتح والداكن وتفضيل النظام، ومكونات واجهة مستخدم أساسية جاهزة لإعادة الاستخدام في مراحل البناء القادمة.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              to={ROUTE_PATHS.DESIGN_SYSTEM}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-medium text-sm rounded-lg hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 transition-colors shadow-2xs"
            >
              <span>عرض نظام التصميم والمكونات</span>
              <ArrowRight className="w-4 h-4 rotate-180" aria-hidden="true" />
            </Link>
            <Link
              to="/test-404-route"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-foreground font-medium text-sm rounded-lg border border-border hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 transition-colors"
            >
              <span>اختبار صفحة 404</span>
            </Link>
          </div>
        </section>

        {/* Color Palette */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-2xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-secondary" aria-hidden="true" />
              لوحة الألوان المهنية
            </h3>
            <p className="text-xs text-foreground-secondary mt-1">
              درجات ألوان هادئة ودافئة تتكيف تلقائياً مع الوضع الفاتح والداكن
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">Deep Slate</span>
                <span className="w-5 h-5 rounded-full bg-primary border border-border" />
              </div>
              <div className="h-10 bg-primary-subtle border border-border/60 rounded-lg px-3 flex items-center justify-between text-xs text-primary font-mono">
                <span>Primary</span>
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                الأزرار الرئيسية والعناوين الهامة والعناصر ذات الأولوية.
              </p>
            </div>

            <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">Muted Sage</span>
                <span className="w-5 h-5 rounded-full bg-secondary border border-border" />
              </div>
              <div className="h-10 bg-secondary-subtle border border-border/60 rounded-lg px-3 flex items-center justify-between text-xs text-secondary font-mono">
                <span>Secondary</span>
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                العناصر المساندة وحالات النجاح والروابط الثانوية.
              </p>
            </div>

            <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">Soft Terracotta</span>
                <span className="w-5 h-5 rounded-full bg-accent border border-border" />
              </div>
              <div className="h-10 bg-accent-subtle border border-border/60 rounded-lg px-3 flex items-center justify-between text-xs text-accent font-mono">
                <span>Accent</span>
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                التنبيهات والعلامات المهمة وإبراز العناصر بحذر.
              </p>
            </div>
          </div>
        </section>

        {/* Verification Checklist */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-2xs space-y-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-success" aria-hidden="true" />
            فحص المعايير
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-foreground-secondary">
            <li className="flex items-center gap-2.5 p-3 bg-app-bg rounded-lg border border-border/60">
              <FileCheck className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
              <span>دعم الوضع الفاتح والداكن وتفضيل النظام</span>
            </li>
            <li className="flex items-center gap-2.5 p-3 bg-app-bg rounded-lg border border-border/60">
              <FileCheck className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
              <span>مكونات Button وInput وTextarea وCard وBadge</span>
            </li>
            <li className="flex items-center gap-2.5 p-3 bg-app-bg rounded-lg border border-border/60">
              <FileCheck className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
              <span>تكامل React Router و Tailwind CSS v4</span>
            </li>
            <li className="flex items-center gap-2.5 p-3 bg-app-bg rounded-lg border border-border/60">
              <FileCheck className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
              <span>دعم كامل لـ RTL والعربية والإنجليزية</span>
            </li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-foreground-muted">
          <p>&copy; {new Date().getFullYear()} CV Platform - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
