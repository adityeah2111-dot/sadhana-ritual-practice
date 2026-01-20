import { motion } from 'framer-motion';
import { Flame, Calendar, Clock } from 'lucide-react';

interface StatsCardProps {
  streak: number;
  totalSessions: number;
  totalMinutes: number;
}

const StatsCard = ({ streak, totalSessions, totalMinutes }: StatsCardProps) => {
  const stats = [
    {
      label: 'Day Streak',
      value: streak,
      icon: Flame,
      highlight: streak > 0,
    },
    {
      label: 'Sessions',
      value: totalSessions,
      icon: Calendar,
      highlight: false,
    },
    {
      label: 'Minutes',
      value: totalMinutes,
      icon: Clock,
      highlight: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <div className="grid grid-cols-3 gap-6 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            className="flex flex-col items-center"
          >
            <div
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 ${
                stat.highlight
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <stat.icon className="h-5 w-5" />
            </div>
            <p
              className={`text-3xl font-semibold ${
                stat.highlight ? 'text-primary' : 'text-foreground'
              }`}
            >
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsCard;
