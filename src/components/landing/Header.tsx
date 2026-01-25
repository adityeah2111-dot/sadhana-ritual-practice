import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flame, User, LogOut, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import LanguageSelector from "@/components/ui/LanguageSelector";
import GoogleLoginPrompt from "@/components/auth/GoogleLoginPrompt";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAnonymous, signOut, loading } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setShowUserMenu(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowUserMenu(false);
    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu]);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  const navLinks = [
    { label: "Philosophy", href: "#philosophy" },
    { label: "Practice", href: "#practice" },
    { label: "Pricing", href: "#pricing" },
    { label: "Learn", href: "/learn", isRoute: true },
    { label: "Contact", href: "/contact", isRoute: true },
  ];

  const getInitials = () => {
    if (profile?.display_name) return profile.display_name.charAt(0).toUpperCase();
    if (profile?.full_name) return profile.full_name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isScrolled
          ? 'bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm'
          : 'bg-transparent'
          }`}
        role="banner"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              aria-label="Sadhana - Go to homepage"
            >
              <div className="relative">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-primary transition-transform group-hover:scale-110" aria-hidden="true" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-foreground">
                Sadhana
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              role="navigation"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </nav>

            {/* Desktop CTA / User Profile */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Language Selector */}
              <LanguageSelector variant="icon" />

              {/* Theme Toggle */}
              <ThemeToggle variant="icon" />

              {!loading && user ? (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu(!showUserMenu);
                    }}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${isAnonymous
                      ? 'bg-muted border border-border'
                      : 'bg-gradient-to-br from-primary to-rose-500'
                      }`}>
                      {isAnonymous ? (
                        <User className="w-4 h-4 text-muted-foreground" />
                      ) : profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-medium text-white">{getInitials()}</span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground max-w-[100px] truncate">
                      {profile?.display_name || (isAnonymous ? 'Guest' : 'Account')}
                    </span>
                  </button>

                  {/* User dropdown menu */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-xl overflow-hidden"
                      >
                        <div className="p-3 border-b border-border bg-muted/30">
                          <p className="text-sm font-medium text-foreground truncate">
                            {profile?.display_name || profile?.full_name || (isAnonymous ? 'Guest User' : user.email)}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {isAnonymous ? 'Anonymous account' : user.email}
                          </p>
                        </div>
                        <div className="p-1.5">
                          <Link
                            to="/dashboard"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center justify-between px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <Flame className="w-4 h-4 text-primary" />
                              Dashboard
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </Link>
                          <Link
                            to="/profile"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center justify-between px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Profile
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </Link>
                          <div className="my-1 border-t border-border" />
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : !loading ? (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button variant="crimson" size="sm" className="shadow-sm">
                      Start Practice
                    </Button>
                  </Link>
                </>
              ) : null}
            </div>

            {/* Mobile Right Section */}
            <div className="flex lg:hidden items-center gap-1">
              {/* Mobile Language Selector */}
              <LanguageSelector variant="icon" />

              {/* Hamburger menu */}
              <button
                className="p-2 text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Full Screen Overlay */}
      {createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70] lg:hidden"
            >
              {/* Full screen menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-background flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 h-14 border-b border-border">
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground text-lg">Sadhana</span>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted/50 text-foreground"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Navigation links */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {link.isRoute ? (
                        <Link
                          to={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between py-3 px-5 text-lg font-medium text-foreground active:bg-muted/50 rounded-xl transition-colors"
                        >
                          {link.label}
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between py-3 px-5 text-lg font-medium text-foreground active:bg-muted/50 rounded-xl transition-colors"
                        >
                          {link.label}
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </a>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Settings Section for Mobile */}
                <div className="px-4 py-3 border-t border-border space-y-2">
                  <div className="flex items-center justify-between py-2 px-2">
                    <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                    <ThemeToggle variant="dropdown" />
                  </div>
                </div>

                {/* Bottom section with safe area */}
                <div className="p-4 pb-8 border-t border-border space-y-3" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
                  {user ? (
                    <>
                      {/* User info card */}
                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl hover:bg-muted/50 transition-colors active:scale-95 transition-transform"
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${isAnonymous ? 'bg-muted border border-border' : 'bg-gradient-to-br from-primary to-rose-500'
                          }`}>
                          {isAnonymous ? (
                            <User className="w-5 h-5 text-muted-foreground" />
                          ) : profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-base font-medium text-white">{getInitials()}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-base truncate">
                            {profile?.display_name || (isAnonymous ? 'Guest' : 'User')}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {isAnonymous ? 'Not signed in' : user.email}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </Link>

                      <div className="grid grid-cols-2 gap-3">
                        <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="crimson" className="w-full h-12 text-base">
                            <Flame className="w-4 h-4 mr-2" />
                            Dashboard
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full h-12 text-base text-muted-foreground"
                          onClick={handleSignOut}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="crimson" className="w-full h-14 text-lg shadow-lg">
                          Start Your Practice
                        </Button>
                      </Link>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full h-12 text-base">
                          Already have an account? Sign In
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Google Login Prompt for anonymous users */}
      <GoogleLoginPrompt variant="banner" />
    </>
  );
};

export default Header;
