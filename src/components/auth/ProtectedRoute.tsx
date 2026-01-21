import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

interface ProtectedRouteProps {
  children: ReactNode;
  requireOnboarding?: boolean;
}

const ProtectedRoute = ({ children, requireOnboarding = true }: ProtectedRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const location = useLocation();
  const [onboardingJustCompleted, setOnboardingJustCompleted] = useState(() => {
    return sessionStorage.getItem('onboarding_completed') === 'true';
  });

  // Keep it stay updated if navigation happens within the same session
  useEffect(() => {
    const justCompleted = sessionStorage.getItem('onboarding_completed') === 'true';
    if (justCompleted && !onboardingJustCompleted) {
      setOnboardingJustCompleted(true);
    }
  }, [location, onboardingJustCompleted]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading your practice...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect to onboarding if not completed AND not just finished onboarding
  if (requireOnboarding && profile && !profile.onboarding_completed && !onboardingJustCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

