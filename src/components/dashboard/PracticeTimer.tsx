import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, RotateCcw, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PracticeTimerProps {
  isActive: boolean;
  onStart: () => void;
  onComplete: (durationSeconds: number) => void;
  onCancel: () => void;
  initialSeconds?: number;
}

const PracticeTimer = ({
  isActive,
  onStart,
  onComplete,
  onCancel,
  initialSeconds = 0,
}: PracticeTimerProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(false);

  // Calculate progress for the circular indicator (20 min = 1200 seconds as target)
  const targetDuration = 1200;
  const progress = useMemo(() => Math.min(seconds / targetDuration, 1), [seconds]);
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const formatTime = useCallback((totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleStart = () => {
    setSeconds(0);
    setIsPaused(false);
    onStart();
  };

  const handleComplete = () => {
    onComplete(seconds);
    setSeconds(0);
    setIsPaused(false);
  };

  const handleCancel = () => {
    onCancel();
    setSeconds(0);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused((p) => !p);
  };

  const canComplete = seconds >= 60;
  const minutesPracticed = Math.floor(seconds / 60);

  return (
    <div
      className="flex flex-col items-center"
      role="region"
      aria-label="Practice timer"
    >
      {/* Screen reader live region for timer updates */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {isActive
          ? `Timer: ${formatTime(seconds)}. ${isPaused ? 'Paused' : 'In session'}`
          : 'Ready to begin practice'
        }
      </div>
      {/* Timer Display */}
      <motion.div
        className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Background glow when active */}
        <AnimatePresence>
          {isActive && !isPaused && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, hsl(var(--crimson) / 0.15) 0%, transparent 70%)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* SVG Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 280 280">
          {/* Background track */}
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="4"
          />

          {/* Progress arc */}
          <motion.circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="drop-shadow-[0_0_10px_hsl(var(--crimson)/0.5)]"
          />

          {/* Glowing dot at the end of progress */}
          {isActive && progress > 0 && (
            <motion.circle
              cx={140 + 120 * Math.cos(2 * Math.PI * progress - Math.PI / 2)}
              cy={140 + 120 * Math.sin(2 * Math.PI * progress - Math.PI / 2)}
              r="8"
              fill="hsl(var(--primary))"
              className="drop-shadow-[0_0_12px_hsl(var(--crimson))]"
              animate={{
                scale: isPaused ? 1 : [1, 1.2, 1],
                opacity: isPaused ? 0.5 : 1
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </svg>

        {/* Inner content */}
        <div className="absolute inset-8 rounded-full bg-card border border-border flex flex-col items-center justify-center glow-crimson-subtle">
          {/* Status icon */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`mb-2 ${isActive && !isPaused ? 'text-primary' : 'text-muted-foreground'}`}
          >
            {isActive ? (
              <Flame className={`w-6 h-6 ${!isPaused ? 'animate-pulse' : ''}`} />
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30" />
            )}
          </motion.div>

          {/* Timer */}
          <motion.p
            key={seconds}
            className="text-5xl sm:text-6xl font-mono font-semibold text-foreground tracking-tight"
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
          >
            {formatTime(seconds)}
          </motion.p>

          {/* Status text */}
          <motion.p
            className="text-sm text-muted-foreground mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isActive ? (isPaused ? 'Paused' : 'In Session') : 'Ready to begin'}
          </motion.p>

          {/* Minutes practiced indicator */}
          {isActive && minutesPracticed > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
            >
              <span className="text-xs text-primary font-medium">
                {minutesPracticed} min{minutesPracticed !== 1 ? 's' : ''} practiced
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="flex items-center gap-3 mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {!isActive ? (
          <Button
            size="lg"
            variant="crimson"
            className="px-10 h-14 text-base"
            onClick={handleStart}
          >
            <Play className="h-5 w-5 mr-2" />
            Start Practice
          </Button>
        ) : (
          <>
            <Button
              variant="ghost"
              size="lg"
              className="h-12"
              onClick={handleCancel}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Cancel
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-12"
              onClick={togglePause}
            >
              {isPaused ? (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              )}
            </Button>

            <Button
              size="lg"
              variant="crimson"
              className="h-12 px-6"
              onClick={handleComplete}
              disabled={!canComplete}
            >
              <Square className="h-4 w-4 mr-2" />
              Complete
            </Button>
          </>
        )}
      </motion.div>

      {/* Minimum time notice */}
      <AnimatePresence>
        {isActive && !canComplete && (
          <motion.p
            className="text-xs text-muted-foreground mt-4"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Practice for at least 1 minute to complete
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PracticeTimer;
