import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Route-level error boundary — isolates page crashes so the whole app doesn't break.
 * Shows the actual error in dev mode to help debugging.
 */
export class RouteErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[RouteErrorBoundary] Page error:', error.message, error.stack, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="max-w-md text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-red-50">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold">This page couldn't load</h1>
              <p className="text-gray-500">
                Try refreshing. If the problem continues, clear your browser cache.
              </p>
              {import.meta.env.DEV && this.state.error && (
                <pre className="text-left text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40 text-red-600">
                  {this.state.error.message}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              )}
            </div>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
