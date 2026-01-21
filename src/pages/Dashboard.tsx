import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, Settings, Flame, Shield, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useSessions } from '@/hooks/useSessions';
import { useProfile } from '@/hooks/useProfile';
import PracticeTimer from '@/components/dashboard/PracticeTimer';
import StatsCard from '@/components/dashboard/StatsCard';
import PracticeHeatmap from '@/components/dashboard/PracticeHeatmap';
import RecentSessions from '@/components/dashboard/RecentSessions';
import DailyQuote from '@/components/dashboard/DailyQuote';
import UpgradeAccountDialog from '@/components/auth/UpgradeAccountDialog';
import { useToast } from '@/hooks/use-toast';
import { useSound } from '@/hooks/useSound';

const Dashboard = () => {
  const { user, signOut, isAnonymous, signInWithGoogle } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { playCompletionBell, playStart } = useSound();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const {
    sessions,
    stats,
    loading,
    activeSession,
    startSession,
    completeSession,
    cancelSession,
  } = useSessions();

  // Get user's first name for personalized greeting
  const getFirstName = () => {
    if (profile?.display_name) {
      return profile.display_name.split(' ')[0];
    }
    if (profile?.full_name) {
      return profile.full_name.split(' ')[0];
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      // Capitalize first letter
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return null;
  };

  const firstName = getFirstName();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleStartSession = async () => {
    const session = await startSession();
    if (session) {
      playStart(); // Play start sound
      toast({
        title: 'Session started',
        description: 'Focus on your practice. The timer is running.',
      });
    }
  };

  const handleCompleteSession = async (durationSeconds: number) => {
    playCompletionBell(); // Play completion bell sound
    const session = await completeSession(durationSeconds);
    if (session) {
      const minutes = Math.floor(durationSeconds / 60);
      toast({
        title: 'Session complete!',
        description: `Great work! You practiced for ${minutes} minute${minutes !== 1 ? 's' : ''}.`,
      });
    }
  };

  const handleCancelSession = async () => {
    await cancelSession();
    toast({
      title: 'Session cancelled',
      description: 'Your session was not recorded.',
      variant: 'destructive',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Loading your practice...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Enhanced */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground hover:text-foreground/90 transition-colors">
              <Flame className="w-5 h-5 text-primary" />
              <span className="hidden sm:inline">Sadhana</span>
            </Link>

            <div className="flex items-center gap-1 sm:gap-2">
              {/* Streak badge in header */}
              {stats.currentStreak > 0 && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mr-2"
                >
                  <Flame className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">
                    {stats.currentStreak} day streak
                  </span>
                </motion.div>
              )}

              {/* Anonymous user - Save Progress Button (Improved for Mobile) */}
              {isAnonymous ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 border-primary/30 text-primary hover:bg-primary/10 gap-1.5"
                  onClick={() => setShowUpgradeDialog(true)}
                >
                  <Save className="h-4 w-4" />
                  <span className="hidden xs:inline sm:inline">Save Progress</span>
                </Button>
              ) : (
                <Link to="/profile" className="flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-rose-500 flex items-center justify-center text-white text-xs font-medium">
                    {firstName?.charAt(0) || <User className="h-3.5 w-3.5" />}
                  </div>
                  <span className="hidden sm:inline text-sm text-muted-foreground max-w-[120px] truncate">
                    {firstName || user?.email?.split('@')[0]}
                  </span>
                </Link>
              )}

              <Link to="/settings">
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="h-9 w-9 sm:w-auto p-0 sm:px-3">
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 lg:px-6 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Welcome Section with First Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
              {activeSession ? 'Stay Focused' : (
                firstName
                  ? `${getGreeting()}, ${firstName}`
                  : getGreeting()
              )}
            </h1>
            <p className="text-muted-foreground">
              {activeSession
                ? 'Your practice is in progress. Stay present.'
                : 'Ready when you are. Take a breath and begin.'}
            </p>
          </motion.div>

          {/* Daily Quote - Vedic Wisdom */}
          <DailyQuote />

          {/* Timer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <PracticeTimer
              isActive={!!activeSession}
              onStart={handleStartSession}
              onComplete={handleCompleteSession}
              onCancel={handleCancelSession}
            />
          </motion.div>

          {/* Stats */}
          <StatsCard
            streak={stats.currentStreak}
            totalSessions={stats.totalSessions}
            totalMinutes={stats.totalMinutes}
          />

          {/* Practice Heatmap */}
          <PracticeHeatmap sessions={sessions} />

          {/* Recent Sessions */}
          <RecentSessions sessions={sessions} />

          {/* Anonymous user banner - Enhanced for Mobile */}
          {isAnonymous && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-primary/10 via-primary/5 to-rose-500/10 border border-primary/20 rounded-xl p-4 sm:p-5"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">You're using a guest account</p>
                    <p className="text-xs text-muted-foreground">Sign in with Google to save your progress permanently</p>
                  </div>
                </div>
                <Button
                  variant="crimson"
                  size="sm"
                  className="w-full sm:w-auto gap-2"
                  onClick={() => signInWithGoogle()}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Save with Google
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Upgrade Account Dialog */}
      <UpgradeAccountDialog
        isOpen={showUpgradeDialog}
        onClose={() => setShowUpgradeDialog(false)}
      />
    </div>
  );
};

// Helper function for time-based greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export default Dashboard;
