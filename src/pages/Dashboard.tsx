import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useSessions } from '@/hooks/useSessions';
import PracticeTimer from '@/components/dashboard/PracticeTimer';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentSessions from '@/components/dashboard/RecentSessions';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
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
      toast({
        title: 'Session started',
        description: 'Focus on your practice. The timer is running.',
      });
    }
  };

  const handleCompleteSession = async (durationSeconds: number) => {
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
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-xl font-semibold tracking-tight text-foreground">
              Sadhana
            </a>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{user?.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 lg:px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Timer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h1 className="text-2xl font-semibold text-foreground mb-8">
              {activeSession ? 'Stay Focused' : 'Begin Your Practice'}
            </h1>
            
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

          {/* Recent Sessions */}
          <RecentSessions sessions={sessions} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
