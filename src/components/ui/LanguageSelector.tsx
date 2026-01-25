import { useState, useEffect } from 'react';
import { Check, ChevronDown, Languages, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageSelectorProps {
    variant?: 'default' | 'submenu';
}

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

const LanguageSelector = ({ variant = 'default' }: LanguageSelectorProps) => {
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

    // Nuclear option: Aggressively hide Google Banner via JS (Do not remove, just hide)
    useEffect(() => {
        const hideBanner = () => {
            // Target all known Google Translate banner classes
            const selectors = [
                '.goog-te-banner-frame',
                'iframe.goog-te-banner-frame',
                '.VIpgJd-ZVi9od-ORHb',
                '.VIpgJd-ZVi9od-ORHb-OEVmcd',
                '.VIpgJd-ZVi9od-aXJM1c',
                '#goog-gt-tt'
            ];

            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    const element = el as HTMLElement;
                    element.style.display = 'none';
                    element.style.visibility = 'hidden';
                    element.style.height = '0';
                    element.style.width = '0';
                    element.style.opacity = '0';
                    element.style.pointerEvents = 'none';
                    element.style.position = 'absolute';
                    element.style.zIndex = '-9999';
                });
            });

            // Fix body offset
            document.body.style.top = '0px';
            document.body.style.marginTop = '0px';
            document.body.style.position = ''; // Allow static

            // Fix HTML offset (critical for mobile)
            document.documentElement.style.height = '100%';
            document.documentElement.style.top = '0px';
            document.documentElement.style.marginTop = '0px';
            document.documentElement.style.position = '';
        };

        // Run immediately
        hideBanner();

        // Observe DOM changes - Watch BODY and HTML
        const observer = new MutationObserver((mutations) => {
            hideBanner();
        });

        observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });

        // Cleanup
        const interval = setInterval(hideBanner, 100); // More aggressive polling for first few seconds

        return () => {
            observer.disconnect();
            clearInterval(interval);
        };
    }, []);

    const currentLanguageLabel = LANGUAGES.find(l => l.code === currentLang)?.label || 'Language';

    const filteredLanguages = LANGUAGES.filter(lang =>
        lang.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.native.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (variant === 'submenu') {
        return (
            <>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="gap-2">
                        <Languages className="w-4 h-4" />
                        <span>{currentLanguageLabel}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-[200px] max-h-[300px] overflow-y-auto">
                        <div className="p-2 border-b border-border sticky top-0 bg-popover z-10">
                            <Input
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-8 px-2 text-xs bg-secondary/50 rounded border-transparent focus:outline-none"
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                        </div>
                        {filteredLanguages.map((lang) => (
                            <DropdownMenuItem
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className="flex items-center justify-between cursor-pointer py-2"
                            >
                                <span className="text-sm">{lang.native}</span>
                                {currentLang === lang.code && <Check className="w-4 h-4 text-primary" />}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            </>
        );
    }

    return (
        <div className="relative">
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
