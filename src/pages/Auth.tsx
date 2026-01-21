import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground animate-pulse font-medium">Entering the path...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--crimson)/0.1),transparent_70%)]" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-screen-xl px-4 flex flex-col items-center py-10 sm:py-20">
        {/* Brand Presence */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12 text-center"
        >
          <a href="/" className="inline-flex flex-col items-center gap-3 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-rose-600 flex items-center justify-center shadow-xl shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-1">
              <div className="w-6 h-6 bg-white rounded-full opacity-90 shadow-inner" />
            </div>
            <span className="text-3xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors duration-300">Sadhana</span>
          </a>
        </motion.div>

        {/* Form Container */}
        <div className="w-full">
          <AuthForm
            mode={mode}
            onToggleMode={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          />
        </div>

        {/* Footer info/Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-6"
        >
          <div className="flex gap-8 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            <a href="/privacy" className="hover:text-primary transition-colors duration-200">Privacy</a>
            <a href="/terms" className="hover:text-primary transition-colors duration-200">Terms</a>
            <a href="/contact" className="hover:text-primary transition-colors duration-200">Support</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-border" />
            <p className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.3em]">
              Established 2026
            </p>
            <div className="h-px w-8 bg-border" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
