import { motion } from 'framer-motion';
import { format, isToday, isYesterday } from 'date-fns';
import { CheckCircle2, Clock, Calendar, Sparkles } from 'lucide-react';

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
    .slice(0, 7);

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '0m';
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours}h ${remainingMins}m`;
  };

  const formatDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM d');
  };

  const getSessionIntensity = (seconds: number | null) => {
    if (!seconds) return 'light';
    const mins = seconds / 60;
    if (mins >= 30) return 'intense';
    if (mins >= 15) return 'moderate';
    return 'light';
  };

  if (completedSessions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Recent Sessions
          </h3>
        </div>
        <div className="p-8 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4"
          >
            <Sparkles className="w-7 h-7 text-muted-foreground/50" />
          </motion.div>
          <p className="text-foreground font-medium mb-1">No sessions yet</p>
          <p className="text-sm text-muted-foreground">
            Start your first practice to begin tracking
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Recent Sessions
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {completedSessions.length} session{completedSessions.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="divide-y divide-border">
        {completedSessions.map((session, index) => {
          const intensity = getSessionIntensity(session.duration_seconds);
          const isIntense = intensity === 'intense';
          
          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className="flex items-center justify-between px-6 py-4 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Status icon with intensity indicator */}
                <div className={`relative ${isIntense ? 'glow-crimson-subtle' : ''}`}>
                  <CheckCircle2 
                    className={`h-5 w-5 ${isIntense ? 'text-primary' : 'text-muted-foreground'}`} 
                  />
                  {isIntense && (
                    <motion.div
                      className="absolute -inset-1 rounded-full bg-primary/20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Date info */}
                <div>
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    {formatDateLabel(session.completed_at!)}
                    {isToday(new Date(session.completed_at!)) && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded bg-primary/10 text-primary font-medium uppercase">
                        New
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(session.completed_at!), 'h:mm a')}
                  </p>
                </div>
              </div>

              {/* Duration badge */}
              <div 
                className={`px-3 py-1.5 rounded-lg ${
                  isIntense 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted/50 text-muted-foreground'
                }`}
              >
                <span className="text-sm font-medium">
                  {formatDuration(session.duration_seconds)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer hint */}
      {completedSessions.length >= 5 && (
        <div className="px-6 py-3 border-t border-border bg-muted/10">
          <p className="text-xs text-muted-foreground text-center">
            Keep practicing to build your streak
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default RecentSessions;
