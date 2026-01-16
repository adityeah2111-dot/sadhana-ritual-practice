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
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--crimson) / 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, hsl(var(--crimson) / 0.1) 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <a href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <span className="text-xl font-semibold tracking-tight">Sadhana</span>
          </a>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 pb-20">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
              </div>
            </motion.div>

            <AuthForm 
              mode={mode} 
              onToggleMode={() => setMode(mode === 'signin' ? 'signup' : 'signin')} 
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center text-xs text-muted-foreground mt-8"
            >
              By continuing, you acknowledge our{' '}
              <a href="#" className="underline hover:text-foreground">Terms of Practice</a>
              {' '}and{' '}
              <a href="#" className="underline hover:text-foreground">Privacy Commitment</a>
            </motion.p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Auth;
