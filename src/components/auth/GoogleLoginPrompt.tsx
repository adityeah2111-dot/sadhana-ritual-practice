import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface GoogleLoginPromptProps {
    onClose?: () => void;
    variant?: 'banner' | 'popup' | 'inline';
    message?: string;
}

// Google's official colors
const GoogleLogo = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(1, 0, 0, 1, 0, 0)">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </g>
    </svg>
);

const GoogleLoginPrompt = ({
    onClose,
    variant = 'banner',
    message = 'Save your progress permanently'
}: GoogleLoginPromptProps) => {
    const { signInWithGoogle, isAnonymous } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Show prompt after a delay for anonymous users
    useEffect(() => {
        if (isAnonymous && !isDismissed) {
            const timer = setTimeout(() => {
                const dismissed = sessionStorage.getItem('google_prompt_dismissed');
                if (!dismissed) {
                    setIsVisible(true);
                }
            }, 3000); // Show after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [isAnonymous, isDismissed]);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
        sessionStorage.setItem('google_prompt_dismissed', 'true');
        onClose?.();
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        await signInWithGoogle();
        // Loading will continue until redirect happens
    };

    if (!isAnonymous || !isVisible) return null;

    // Banner variant - top-right corner with Google-style design
    if (variant === 'banner') {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="fixed top-20 right-4 z-50 max-w-sm"
                >
                    <div className="bg-white dark:bg-[#202124] rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <GoogleLogo />
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Sign in with Google</span>
                            </div>
                            <button
                                onClick={handleDismiss}
                                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Dismiss"
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                {message}
                            </p>
                            <button
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white dark:bg-[#3c4043] border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-[#4a4d51] transition-colors disabled:opacity-50"
                            >
                                <GoogleLogo />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    {isLoading ? 'Connecting...' : 'Continue with Google'}
                                </span>
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="w-full mt-2 text-center text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 py-2 transition-colors"
                            >
                                Not now
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }

    // Popup variant - centered Google-style modal
    if (variant === 'popup') {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                    onClick={handleDismiss}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-[#202124] rounded-2xl shadow-2xl max-w-[400px] w-full overflow-hidden"
                    >
                        {/* Close button */}
                        <div className="flex justify-end p-3 pb-0">
                            <button
                                onClick={handleDismiss}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-10 pb-10 pt-2 text-center">
                            {/* Google Logo */}
                            <div className="flex justify-center mb-4">
                                <svg viewBox="0 0 75 24" width="75" height="24" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" fillRule="evenodd">
                                        <path d="M23.97 12.3c0-.77-.06-1.51-.18-2.22H12.35v4.2h6.52c-.28 1.5-1.13 2.77-2.4 3.62v3h3.89c2.28-2.1 3.6-5.19 3.6-8.6z" fill="#4285F4" />
                                        <path d="M12.35 24c3.24 0 5.96-1.07 7.95-2.9l-3.89-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.95H1.63v3.1C3.6 21.31 7.68 24 12.35 24z" fill="#34A853" />
                                        <path d="M5.63 14.3c-.24-.72-.38-1.49-.38-2.3s.14-1.58.38-2.3v-3.1H1.63C.59 8.5 0 10.18 0 12s.59 3.5 1.63 5.4l4-3.1z" fill="#FBBC05" />
                                        <path d="M12.35 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C18.3 1.18 15.58 0 12.35 0 7.68 0 3.6 2.69 1.63 6.6l4 3.1c.95-2.84 3.6-4.95 6.72-4.95z" fill="#EA4335" />
                                        <path d="M31.84 20.6c-3.12 0-5.59-2.57-5.59-5.9s2.47-5.9 5.59-5.9c1.68 0 2.89.66 3.79 1.52l1.41-1.41c-1.33-1.25-3.07-2.01-5.2-2.01-4.21 0-7.65 3.43-7.65 7.8s3.44 7.8 7.65 7.8c2.22 0 3.9-.73 5.21-2.11 1.35-1.35 1.77-3.25 1.77-4.78 0-.47-.04-.92-.11-1.36h-6.87v2.04h4.8c-.14 1.2-.52 2.02-1.09 2.62-.7.74-1.8 1.55-3.71 1.55zM47.8 9.02c-3.36 0-6.1 2.56-6.1 6.1 0 3.52 2.74 6.1 6.1 6.1 3.37 0 6.1-2.57 6.1-6.1 0-3.54-2.73-6.1-6.1-6.1zm0 9.8c-1.84 0-3.43-1.52-3.43-3.7 0-2.2 1.59-3.7 3.43-3.7 1.85 0 3.44 1.5 3.44 3.7 0 2.18-1.59 3.7-3.44 3.7zM62.4 9.02c-3.37 0-6.1 2.56-6.1 6.1 0 3.52 2.73 6.1 6.1 6.1 3.36 0 6.1-2.57 6.1-6.1 0-3.54-2.74-6.1-6.1-6.1zm0 9.8c-1.85 0-3.44-1.52-3.44-3.7 0-2.2 1.6-3.7 3.44-3.7s3.43 1.5 3.43 3.7c0 2.18-1.59 3.7-3.43 3.7z" fill="#747775" />
                                    </g>
                                </svg>
                            </div>

                            <h2 className="text-xl font-normal text-gray-800 dark:text-gray-100 mb-2">
                                Sign in
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                {message}
                            </p>

                            {/* Benefits */}
                            <div className="text-left mb-6 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Keep your streak across all devices</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Never lose your practice history</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Unlock all features and analytics</span>
                                </div>
                            </div>

                            {/* Google Sign In Button - Authentic Style */}
                            <button
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-[#4285f4] border border-gray-300 dark:border-transparent rounded-md hover:shadow-md transition-all disabled:opacity-50 group"
                            >
                                <div className="bg-white p-1 rounded-sm">
                                    <GoogleLogo />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-white">
                                    {isLoading ? 'Signing in...' : 'Sign in with Google'}
                                </span>
                            </button>

                            <button
                                onClick={handleDismiss}
                                className="w-full mt-3 text-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 py-2 transition-colors"
                            >
                                Maybe later
                            </button>

                            {/* Terms */}
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                                By continuing, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        );
    }

    // Inline variant - embedded Google-style card
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#202124] border border-gray-200 dark:border-gray-700 rounded-lg p-4"
        >
            <div className="flex items-center gap-3">
                <GoogleLogo />
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Connect your Google account
                    </p>
                </div>
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="px-4 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium rounded transition-colors disabled:opacity-50"
                >
                    {isLoading ? 'Saving...' : 'Sign in'}
                </button>
            </div>
        </motion.div>
    );
};

export default GoogleLoginPrompt;
