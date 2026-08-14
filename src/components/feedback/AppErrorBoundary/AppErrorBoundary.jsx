import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

/**
 * Application-level Error Boundary.
 *
 * This is intentionally a Class Component because React Error Boundaries
 * require the `componentDidCatch` and `getDerivedStateFromError` lifecycle
 * methods, which are only available in class components as of React 19.
 * This is the ONLY class component in the application.
 *
 * Catches unhandled render errors and displays a translated fallback UI.
 * Does NOT catch event handler errors (those should be handled with try/catch).
 * Does NOT send telemetry or connect to external services.
 * Does NOT display stack traces to end users.
 *
 * @class AppErrorBoundary
 */
export class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorCode: 'APP_RENDER_ERROR' };
  }

  static getDerivedStateFromError() {
    return { hasError: true, errorCode: 'APP_RENDER_ERROR' };
  }

  componentDidCatch(error, errorInfo) {
    // Log in development only; never log CV data
    if (import.meta.env.DEV) {
      console.error('[AppErrorBoundary] Uncaught render error:', error);
      console.error('[AppErrorBoundary] Component stack:', errorInfo?.componentStack);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-app-bg p-6">
          <div className="max-w-md w-full bg-surface border border-border rounded-2xl p-8 text-center space-y-5 shadow-lg">
            <div className="mx-auto w-14 h-14 flex items-center justify-center bg-danger-subtle text-danger rounded-full">
              <AlertTriangle className="w-7 h-7" aria-hidden="true" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-bold text-foreground">
                Something went wrong
              </h1>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                An unexpected error occurred. Your data is saved locally and should be available after reloading.
              </p>
              <p className="text-xs text-foreground-muted font-mono">
                Error code: {this.state.errorCode}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-medium text-sm rounded-lg hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 transition-colors shadow-2xs"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                Reload Application
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-foreground font-medium text-sm rounded-lg border border-border hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 transition-colors"
              >
                <Home className="w-4 h-4" aria-hidden="true" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
