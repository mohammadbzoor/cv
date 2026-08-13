import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { ROUTE_PATHS } from '../app/routePaths';

/**
 * NotFoundPage component.
 * Fallback 404 route component updated with the calm professional theme tokens.
 *
 * @returns {JSX.Element} The rendered 404 page.
 */
export default function NotFoundPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-app-bg text-foreground flex items-center justify-center p-4 font-sans">
      <main className="max-w-md w-full bg-surface border border-border rounded-2xl p-8 text-center shadow-2xs space-y-6">
        <div className="mx-auto w-14 h-14 bg-warning-subtle text-warning rounded-full flex items-center justify-center">
          <AlertCircle className="w-7 h-7" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <p className="text-5xl font-extrabold text-primary tracking-tight">404</p>
          <h1 className="text-lg font-bold text-foreground">الصفحة غير موجودة</h1>
          <p className="text-xs text-foreground-secondary leading-relaxed">
            عذراً، الرابط الذي طلبت الوصول إليه غير موجود أو تم نقله.
          </p>
        </div>

        <div>
          <Link
            to={ROUTE_PATHS.HOME}
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-primary text-surface-elevated font-medium text-sm rounded-lg hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 transition-colors shadow-2xs"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>الرجوع إلى الصفحة الرئيسية</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
