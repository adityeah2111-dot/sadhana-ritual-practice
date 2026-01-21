import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flame, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import GoogleLoginPrompt from "@/components/auth/GoogleLoginPrompt";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAnonymous, signOut, loading } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

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
    { label: "FAQ", href: "#faq" },
  ];

  const getInitials = () => {
    if (profile?.display_name) {
      return profile.display_name.charAt(0).toUpperCase();
    }
    if (profile?.full_name) {
      return profile.full_name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const getAvatarContent = () => {
    if (profile?.avatar_url) {
      return (
        <img
          src={profile.avatar_url}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      );
    }
    return <span className="text-sm font-medium text-white">{getInitials()}</span>;
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
        role="banner"
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
              aria-label="Sadhana - Go to homepage"
            >
              <Flame className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="text-xl lg:text-2xl font-semibold tracking-tight text-foreground">
                Sadhana
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-8"
              role="navigation"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm px-1 py-0.5"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm px-1 py-0.5"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </nav>

            {/* Desktop CTA / User Profile */}
            <div className="hidden md:flex items-center gap-3">
              {!loading && user ? (
                // Logged in user - show profile
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu(!showUserMenu);
                    }}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isAnonymous
                      ? 'bg-muted border border-border'
                      : 'bg-gradient-to-br from-primary to-rose-500'
                      }`}>
                      {isAnonymous ? (
                        <User className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        getAvatarContent()
                      )}
                    </div>
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
                        <div className="p-3 border-b border-border">
                          <p className="text-sm font-medium text-foreground truncate">
                            {profile?.display_name || profile?.full_name || (isAnonymous ? 'Guest User' : user.email)}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {isAnonymous ? 'Anonymous account' : user.email}
                          </p>
                        </div>
                        <div className="p-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                          >
                            <Flame className="w-4 h-4" />
                            Dashboard
                          </Link>
                          <Link
                            to="/profile"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                          >
                            <User className="w-4 h-4" />
                            Profile
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
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
                // Not logged in - show auth buttons
                <>
                  <Link to="/auth">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button variant="crimson" size="sm">
                      Begin Practice
                    </Button>
                  </Link>
                </>
              ) : null}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile user avatar */}
              {!loading && user && (
                <Link to="/profile" className="p-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isAnonymous
                    ? 'bg-muted border border-border'
                    : 'bg-gradient-to-br from-primary to-rose-500'
                    }`}>
                    {isAnonymous ? (
                      <User className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <span className="text-xs font-medium text-white">{getInitials()}</span>
                    )}
                  </div>
                </Link>
              )}
              <button
                className="p-2 text-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? (
                  <X size={24} aria-hidden="true" />
                ) : (
                  <Menu size={24} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-background border-b border-border"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <nav
                className="container mx-auto px-4 py-6 flex flex-col gap-4"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  link.isRoute ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  )
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t border-border mt-2">
                  {user ? (
                    <>
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-center">
                          Go to Dashboard
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full justify-center" onClick={handleSignOut}>
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-center">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="crimson" className="w-full justify-center">
                          Begin Practice
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Google Login Prompt for anonymous users */}
      <GoogleLoginPrompt variant="banner" />
    </>
  );
};

export default Header;
