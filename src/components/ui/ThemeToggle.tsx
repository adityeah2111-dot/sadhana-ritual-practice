import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
    variant?: 'icon' | 'button' | 'dropdown';
    className?: string;
}

export function ThemeToggle({ variant = 'icon', className = '' }: ThemeToggleProps) {
    const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

    // Simple icon toggle (just switches between dark/light)
    if (variant === 'icon') {
        return (
            <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg hover:bg-muted/50 transition-colors ${className}`}
                aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={resolvedTheme}
                        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                    >
                        {resolvedTheme === 'dark' ? (
                            <Moon className="w-5 h-5 text-muted-foreground" />
                        ) : (
                            <Sun className="w-5 h-5 text-amber-500" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </button>
        );
    }

    // Button with label
    if (variant === 'button') {
        return (
            <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors ${className}`}
            >
                {resolvedTheme === 'dark' ? (
                    <>
                        <Moon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">Dark</span>
                    </>
                ) : (
                    <>
                        <Sun className="w-4 h-4 text-amber-500" />
                        <span className="text-sm text-foreground">Light</span>
                    </>
                )}
            </button>
        );
    }

    // Dropdown with all options
    return (
        <div className={`flex items-center gap-1 p-1 bg-muted/50 rounded-full ${className}`}>
            {[
                { value: 'light' as const, icon: Sun, label: 'Light' },
                { value: 'dark' as const, icon: Moon, label: 'Dark' },
                { value: 'system' as const, icon: Monitor, label: 'System' },
            ].map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`relative p-2 rounded-full transition-colors ${theme === value
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                    aria-label={`Set theme to ${label}`}
                >
                    {theme === value && (
                        <motion.div
                            layoutId="theme-indicator"
                            className="absolute inset-0 bg-card border border-border rounded-full shadow-sm"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                </button>
            ))}
        </div>
    );
}

export default ThemeToggle;
