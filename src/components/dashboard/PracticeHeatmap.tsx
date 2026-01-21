import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar } from 'lucide-react';

interface Session {
    id: string;
    completed_at: string | null;
    duration_seconds: number | null;
}

interface PracticeHeatmapProps {
    sessions: Session[];
}

const PracticeHeatmap = ({ sessions }: PracticeHeatmapProps) => {
    // Generate last 12 weeks of data (84 days)
    const heatmapData = useMemo(() => {
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        const days: { date: Date; level: number; minutes: number; count: number }[] = [];

        // Create a map of completed session dates to their total minutes
        const sessionMap = new Map<string, { minutes: number; count: number }>();

        sessions
            .filter((s) => s.completed_at)
            .forEach((session) => {
                const date = new Date(session.completed_at!);
                const dateKey = date.toISOString().split('T')[0];
                const minutes = Math.round((session.duration_seconds || 0) / 60);

                const existing = sessionMap.get(dateKey) || { minutes: 0, count: 0 };
                sessionMap.set(dateKey, {
                    minutes: existing.minutes + minutes,
                    count: existing.count + 1,
                });
            });

        // Generate 84 days (12 weeks) of data
        for (let i = 83; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            const dateKey = date.toISOString().split('T')[0];
            const data = sessionMap.get(dateKey);

            let level = 0;
            if (data) {
                // Determine intensity level based on minutes practiced
                if (data.minutes >= 30) level = 4;
                else if (data.minutes >= 20) level = 3;
                else if (data.minutes >= 10) level = 2;
                else if (data.minutes > 0) level = 1;
            }

            days.push({
                date,
                level,
                minutes: data?.minutes || 0,
                count: data?.count || 0,
            });
        }

        return days;
    }, [sessions]);

    // Group days into weeks (7 days each)
    const weeks = useMemo(() => {
        const result: typeof heatmapData[] = [];
        for (let i = 0; i < heatmapData.length; i += 7) {
            result.push(heatmapData.slice(i, i + 7));
        }
        return result;
    }, [heatmapData]);

    // Calculate stats for this period
    const periodStats = useMemo(() => {
        const activeDays = heatmapData.filter((d) => d.level > 0).length;
        const totalMinutes = heatmapData.reduce((sum, d) => sum + d.minutes, 0);
        return { activeDays, totalMinutes };
    }, [heatmapData]);

    const getIntensityClass = (level: number) => {
        switch (level) {
            case 0:
                return 'bg-muted/30 border-border/50';
            case 1:
                return 'bg-primary/20 border-primary/30';
            case 2:
                return 'bg-primary/40 border-primary/50';
            case 3:
                return 'bg-primary/60 border-primary/70';
            case 4:
                return 'bg-primary border-primary';
            default:
                return 'bg-muted/30 border-border/50';
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-5 sm:p-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-foreground">Practice History</h3>
                        <p className="text-xs text-muted-foreground">Last 12 weeks</p>
                    </div>
                </div>

                {/* Period stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-primary" />
                        <span>{periodStats.activeDays} days</span>
                    </div>
                    <div className="hidden sm:block">
                        {Math.round(periodStats.totalMinutes)} mins
                    </div>
                </div>
            </div>

            {/* Heatmap grid */}
            <div className="flex gap-1">
                {/* Day labels */}
                <div className="flex flex-col gap-1 mr-1">
                    {dayLabels.map((label, i) => (
                        <div
                            key={i}
                            className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center text-[9px] sm:text-[10px] text-muted-foreground"
                        >
                            {i % 2 === 1 ? label : ''}
                        </div>
                    ))}
                </div>

                {/* Weeks grid */}
                <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                            {week.map((day, dayIndex) => {
                                // Determine if tooltip should show below (for top rows)
                                const showBelow = dayIndex < 3;

                                return (
                                    <motion.div
                                        key={`${weekIndex}-${dayIndex}`}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            delay: weekIndex * 0.02 + dayIndex * 0.01,
                                            duration: 0.2,
                                        }}
                                        className="group relative"
                                    >
                                        <div
                                            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-[3px] border transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-primary/30 hover:ring-offset-1 hover:ring-offset-background ${getIntensityClass(
                                                day.level
                                            )}`}
                                        />

                                        {/* Tooltip - Dynamic positioning based on row */}
                                        <div className={`absolute left-1/2 -translate-x-1/2 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap ${showBelow
                                                ? 'top-full mt-2'
                                                : 'bottom-full mb-2'
                                            }`}>
                                            <p className="text-xs font-semibold text-white">
                                                {formatDate(day.date)}
                                            </p>
                                            {day.count > 0 ? (
                                                <p className="text-[10px] text-zinc-300 mt-0.5">
                                                    {day.count} session{day.count > 1 ? 's' : ''} · {day.minutes} min
                                                </p>
                                            ) : (
                                                <p className="text-[10px] text-zinc-400 mt-0.5">No practice</p>
                                            )}
                                            {/* Tooltip arrow - Dynamic */}
                                            <div className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent ${showBelow
                                                    ? 'bottom-full border-b-zinc-900'
                                                    : 'top-full border-t-zinc-900'
                                                }`} />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                <span className="text-[10px] sm:text-xs text-muted-foreground">Less</span>
                <div className="flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                        <div
                            key={level}
                            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[2px] border ${getIntensityClass(level)}`}
                        />
                    ))}
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground">More</span>
            </div>
        </motion.div>
    );
};

export default PracticeHeatmap;
