import { AuthShell } from './AuthShell';
import { AuthBrandPanel } from './AuthBrandPanel';

/**
 * 2-Column Split Layout for Authentication pages (Login, Register, Forgot Password).
 */
export function AuthLayout({ children }) {
  return (
    <AuthShell>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 bg-surface border border-border rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg min-h-[540px]">
        {/* Form Column */}
        <div className="flex flex-col justify-center max-w-md mx-auto w-full">
          {children}
        </div>

        {/* Brand Column */}
        <AuthBrandPanel />
      </div>
    </AuthShell>
  );
}
