import { Outlet } from 'react-router-dom';
import { SkipLink } from '../SkipLink';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { cn } from '../../../utils/cn';

/**
 * Main Application Layout component.
 * Provides semantic HTML structure (header, main, footer), skip link, navbar, and main content container.
 */
export function AppLayout({ children, className, mainClassName }) {
  return (
    <div className={cn('min-h-screen bg-app-bg text-foreground flex flex-col font-sans', className)}>
      <SkipLink />
      <Navbar />

      <main id="main-content" tabIndex={-1} className={cn('flex-1 w-full', mainClassName)}>
        {children || <Outlet />}
      </main>

      <Footer />
    </div>
  );
}
