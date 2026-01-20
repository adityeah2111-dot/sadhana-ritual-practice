import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CheckCircle } from 'lucide-react';

interface Session {
  id: string;
  started_at: string;
  completed_at: string | null;
  duration_seconds: number | null;
}

interface RecentSessionsProps {
  sessions: Session[];
}

const RecentSessions = ({ sessions }: RecentSessionsProps) => {
  const completedSessions = sessions
    .filter((s) => s.completed_at)
    .slice(0, 5);

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '0m';
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours}h ${remainingMins}m`;
  };

  if (completedSessions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h3 className="text-lg font-medium text-foreground mb-4">
          Recent Sessions
        </h3>
        <p className="text-sm text-muted-foreground text-center py-8">
          No sessions yet. Start your first practice!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <h3 className="text-lg font-medium text-foreground mb-4">
        Recent Sessions
      </h3>
      <div className="space-y-3">
        {completedSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            className="flex items-center justify-between py-3 border-b border-border last:border-0"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {format(new Date(session.completed_at!), 'MMM d, yyyy')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(session.completed_at!), 'h:mm a')}
                </p>
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              {formatDuration(session.duration_seconds)}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentSessions;
