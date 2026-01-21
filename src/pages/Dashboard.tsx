import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, Settings, Flame, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useSessions } from '@/hooks/useSessions';
import PracticeTimer from '@/components/dashboard/PracticeTimer';
import StatsCard from '@/components/dashboard/StatsCard';
import PracticeHeatmap from '@/components/dashboard/PracticeHeatmap';
import RecentSessions from '@/components/dashboard/RecentSessions';
import DailyQuote from '@/components/dashboard/DailyQuote';
import UpgradeAccountDialog from '@/components/auth/UpgradeAccountDialog';
import { useToast } from '@/hooks/use-toast';
import { useSound } from '@/hooks/useSound';

const Dashboard = () => {
  const { user, signOut, isAnonymous } = useAuth();
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
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground hover:text-foreground/90 transition-colors">
              <Flame className="w-5 h-5 text-primary" />
              Sadhana
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

              {/* Anonymous user indicator */}
              {isAnonymous ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 border-primary/30 text-primary hover:bg-primary/10"
                  onClick={() => setShowUpgradeDialog(true)}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Save Progress</span>
                </Button>
              ) : (
                <Link to="/profile" className="flex items-center gap-1 sm:gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline max-w-[150px] truncate">{user?.email || user?.phone}</span>
                </Link>
              )}
              <Link to="/settings">
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="h-9">
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
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
              {activeSession ? 'Stay Focused' : getGreeting()}
            </h1>
            <p className="text-muted-foreground">
              {activeSession
                ? 'Your practice is in progress. Stay present.'
                : 'Ready when you are. Take a breath and begin.'}
            </p>
          </motion.div>

          {/* Daily Quote - for motivation */}
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

          {/* Anonymous user banner */}
          {isAnonymous && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">You're using a guest account</p>
                  <p className="text-xs text-muted-foreground">Create an account to save your progress permanently</p>
                </div>
              </div>
              <Button
                variant="crimson"
                size="sm"
                onClick={() => setShowUpgradeDialog(true)}
              >
                Save Progress
              </Button>
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
