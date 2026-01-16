import { motion } from 'framer-motion';
import { LogOut, User, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Streak display */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Flame className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-3xl font-semibold text-foreground mb-4">
            Your Practice Awaits
          </h1>
          
          <p className="text-muted-foreground mb-8">
            The dashboard is being prepared. Soon you will begin your daily discipline here.
          </p>

          <div className="bg-card border border-border rounded-lg p-8">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-semibold text-foreground">0</p>
                <p className="text-sm text-muted-foreground mt-1">Day Streak</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-foreground">0</p>
                <p className="text-sm text-muted-foreground mt-1">Sessions</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-foreground">0</p>
                <p className="text-sm text-muted-foreground mt-1">Minutes</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            Practice features coming soon. Stay disciplined.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
