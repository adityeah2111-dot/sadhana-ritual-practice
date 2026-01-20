import { motion } from 'framer-motion';
import { Flame, Calendar, Clock, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  streak: number;
  totalSessions: number;
  totalMinutes: number;
}

const AnimatedNumber = ({ value, delay = 0 }: { value: number; delay?: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {value.toLocaleString()}
    </motion.span>
  );
};

const StatsCard = ({ streak, totalSessions, totalMinutes }: StatsCardProps) => {
  const stats = [
    {
      label: 'Day Streak',
      value: streak,
      icon: Flame,
      highlight: streak > 0,
      suffix: streak === 1 ? 'day' : 'days',
      description: streak > 7 ? 'On fire!' : streak > 0 ? 'Keep going' : 'Start today',
    },
    {
      label: 'Total Sessions',
      value: totalSessions,
      icon: Calendar,
      highlight: false,
      suffix: totalSessions === 1 ? 'session' : 'sessions',
      description: totalSessions > 30 ? 'Dedicated' : totalSessions > 10 ? 'Building habits' : 'Getting started',
    },
    {
      label: 'Practice Time',
      value: totalMinutes,
      icon: Clock,
      highlight: false,
      suffix: 'mins',
      description: totalMinutes >= 60 ? `${Math.floor(totalMinutes / 60)}+ hours` : 'Time invested',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Your Progress
        </h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 divide-x divide-border">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            className="flex flex-col items-center p-6 hover:bg-muted/30 transition-colors"
          >
            {/* Icon */}
            <motion.div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                stat.highlight
                  ? 'bg-primary/15 text-primary glow-crimson-subtle'
                  : 'bg-muted/50 text-muted-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <stat.icon className={`h-5 w-5 ${stat.highlight ? 'animate-pulse' : ''}`} />
            </motion.div>

            {/* Value */}
            <p
              className={`text-3xl sm:text-4xl font-semibold tracking-tight ${
                stat.highlight ? 'text-primary' : 'text-foreground'
              }`}
            >
              <AnimatedNumber value={stat.value} delay={0.3 + index * 0.1} />
            </p>

            {/* Label */}
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>

            {/* Description badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`mt-3 px-2 py-0.5 rounded-full text-xs ${
                stat.highlight 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-muted/50 text-muted-foreground'
              }`}
            >
              {stat.description}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsCard;
