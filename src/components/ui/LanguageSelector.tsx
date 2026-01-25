import { useState, useEffect } from 'react';
import { Check, ChevronDown, Globe, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LANGUAGES = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'es', label: 'Spanish', native: 'Español' },
    { code: 'fr', label: 'French', native: 'Français' },
    { code: 'de', label: 'German', native: 'Deutsch' },
    { code: 'ja', label: 'Japanese', native: '日本語' },
    { code: 'ru', label: 'Russian', native: 'Русский' },
    { code: 'pt', label: 'Portuguese', native: 'Português' },
    { code: 'zh-CN', label: 'Chinese (Simplified)', native: '简体中文' },
];

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

const LanguageSelector = () => {
    const [currentLang, setCurrentLang] = useState('en');

    useEffect(() => {
        // Read the googtrans cookie to set initial state
        const cookies = document.cookie.split(';');
        const transCookie = cookies.find(c => c.trim().startsWith('googtrans='));
        if (transCookie) {
            const langCode = transCookie.split('=')[1].split('/').pop();
            if (langCode) setCurrentLang(langCode);
        }
    }, []);

    const handleLanguageChange = (langCode: string) => {
        // Google Translate works by setting a cookie 'googtrans' 
        // Format: /source_lang/target_lang (e.g., /auto/es or /en/es)

        // 1. Set the cookie for the root path and domain
        document.cookie = `googtrans=/auto/${langCode}; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=/auto/${langCode}; path=/;`; // Fallback

        // 2. Update state implies selection
        setCurrentLang(langCode);

        // 3. Reload page to apply translation
        window.location.reload();
    };

    const currentLanguageLabel = LANGUAGES.find(l => l.code === currentLang)?.label || 'Language';

    return (
        <div className="relative">
            {/* Hidden container for the Google script to attach to */}
            <div id="google_translate_element" className="hidden" />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-card border-border hover:bg-secondary/50 hover:text-primary transition-all rounded-full"
                    >
                        <Languages className="w-4 h-4" />
                        <span className="hidden xs:inline">{currentLanguageLabel}</span>
                        <ChevronDown className="w-3 h-3 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px] max-h-[300px] overflow-y-auto">
                    {LANGUAGES.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className="flex items-center justify-between cursor-pointer"
                        >
                            <span className="flex flex-col">
                                <span className="text-sm font-medium">{lang.native}</span>
                                <span className="text-xs text-muted-foreground">{lang.label}</span>
                            </span>
                            {currentLang === lang.code && (
                                <Check className="w-4 h-4 text-primary" />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LanguageSelector;
