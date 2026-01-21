import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: 'dark' | 'light';
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('sadhana-theme') as Theme;
            if (stored) return stored;
        }
        return 'dark'; // Default to dark for Sadhana's aesthetic
    });

    const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove both classes first
        root.classList.remove('light', 'dark');

        let effectiveTheme: 'dark' | 'light';

        if (theme === 'system') {
            effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
            effectiveTheme = theme;
        }

        root.classList.add(effectiveTheme);
        setResolvedTheme(effectiveTheme);

        // Update meta theme-color for mobile status bar
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', effectiveTheme === 'dark' ? '#0a0a0a' : '#fafaf9');
        }

        // Store preference
        localStorage.setItem('sadhana-theme', theme);
    }, [theme]);

    // Listen for system theme changes
    useEffect(() => {
        if (theme !== 'system') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');
            const newTheme = e.matches ? 'dark' : 'light';
            root.classList.add(newTheme);
            setResolvedTheme(newTheme);

            // Update meta theme-color
            const metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#0a0a0a' : '#fafaf9');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        setThemeState(prev => {
            if (prev === 'dark') return 'light';
            if (prev === 'light') return 'dark';
            // If system, toggle based on current resolved theme
            return resolvedTheme === 'dark' ? 'light' : 'dark';
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
