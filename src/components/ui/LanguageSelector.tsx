import { useState, useEffect } from 'react';
import { Check, ChevronDown, Languages, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    { code: 'ar', label: 'Arabic', native: 'العربية' },
    { code: 'it', label: 'Italian', native: 'Italiano' },
    { code: 'ko', label: 'Korean', native: '한국어' },
];

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

const LanguageSelector = () => {
    const [currentLang, setCurrentLang] = useState('en');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const cookies = document.cookie.split(';');
        const transCookie = cookies.find(c => c.trim().startsWith('googtrans='));
        if (transCookie) {
            const langCode = transCookie.split('=')[1].split('/').pop();
            if (langCode) setCurrentLang(langCode);
        }
    }, []);

    const handleLanguageChange = (langCode: string) => {
        document.cookie = `googtrans=/auto/${langCode}; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=/auto/${langCode}; path=/;`;
        setCurrentLang(langCode);
        window.location.reload();
    };

    const currentLanguageLabel = LANGUAGES.find(l => l.code === currentLang)?.label || 'Language';

    const filteredLanguages = LANGUAGES.filter(lang =>
        lang.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.native.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative">
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
                <DropdownMenuContent align="end" className="w-[250px] max-h-[400px] overflow-hidden flex flex-col">
                    <div className="p-2 border-b border-border sticky top-0 bg-popover z-10">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                            <Input
                                placeholder="Search language..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-8 pl-8 text-xs bg-secondary/50 border-transparent focus:border-primary/20"
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto max-h-[300px] p-1">
                        {filteredLanguages.length === 0 ? (
                            <div className="p-4 text-center text-xs text-muted-foreground">
                                No language found
                            </div>
                        ) : (
                            filteredLanguages.map((lang) => (
                                <DropdownMenuItem
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className="flex items-center justify-between cursor-pointer py-2"
                                >
                                    <span className="flex flex-col">
                                        <span className="text-sm font-medium">{lang.native}</span>
                                        <span className="text-xs text-muted-foreground">{lang.label}</span>
                                    </span>
                                    {currentLang === lang.code && (
                                        <Check className="w-4 h-4 text-primary" />
                                    )}
                                </DropdownMenuItem>
                            ))
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LanguageSelector;
