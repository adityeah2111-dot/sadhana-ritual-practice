import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        this.setState({ errorInfo });

        // In production, you would send this to an error reporting service
        // e.g., Sentry, LogRocket, etc.
        if (import.meta.env.PROD) {
            // reportErrorToService(error, errorInfo);
        }
    }

    private handleRefresh = () => {
        window.location.reload();
    };

    private handleGoHome = () => {
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen bg-background flex flex-col">
                    {/* Header */}
                    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
                        <div className="container mx-auto px-4 lg:px-6">
                            <div className="flex items-center justify-center h-16">
                                <div className="flex items-center gap-2">
                                    <Flame className="w-5 h-5 text-primary" />
                                    <span className="text-xl font-semibold tracking-tight text-foreground">
                                        Sadhana
                                    </span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Error Content */}
                    <main className="flex-1 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-md w-full text-center"
                        >
                            {/* Icon */}
                            <div className="w-20 h-20 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-6">
                                <AlertTriangle className="w-10 h-10 text-destructive" />
                            </div>

                            <h1 className="text-2xl font-semibold text-foreground mb-3">
                                Something Went Wrong
                            </h1>

                            <p className="text-muted-foreground mb-6">
                                We encountered an unexpected error. The practice continues—please try again.
                            </p>

                            {/* Error details (only in development) */}
                            {import.meta.env.DEV && this.state.error && (
                                <div className="bg-card border border-border rounded-lg p-4 mb-6 text-left overflow-auto max-h-40">
                                    <p className="text-xs font-mono text-destructive mb-2">
                                        {this.state.error.message}
                                    </p>
                                    {this.state.errorInfo && (
                                        <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
                                            {this.state.errorInfo.componentStack}
                                        </pre>
                                    )}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button
                                    variant="crimson"
                                    size="lg"
                                    onClick={this.handleRefresh}
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Try Again
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={this.handleGoHome}
                                >
                                    <Home className="w-4 h-4 mr-2" />
                                    Go Home
                                </Button>
                            </div>

                            <p className="text-xs text-muted-foreground mt-8">
                                If this problem persists, please contact{' '}
                                <a href="mailto:support@sadhana.app" className="text-primary hover:underline">
                                    support@sadhana.app
                                </a>
                            </p>
                        </motion.div>
                    </main>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
