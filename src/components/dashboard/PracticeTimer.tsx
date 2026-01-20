import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';
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

  return (
    <div className="flex flex-col items-center">
      {/* Timer Display */}
      <motion.div
        className="relative w-64 h-64 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-border" />
        
        {/* Active ring animation */}
        <AnimatePresence>
          {isActive && !isPaused && (
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-primary/50"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: [0.5, 1, 0.5], 
                scale: [0.98, 1, 0.98] 
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          )}
        </AnimatePresence>

        {/* Inner circle */}
        <div className="absolute inset-4 rounded-full bg-card border border-border flex items-center justify-center">
          <div className="text-center">
            <motion.p
              key={seconds}
              className="text-5xl font-mono font-semibold text-foreground tracking-tight"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
            >
              {formatTime(seconds)}
            </motion.p>
            <p className="text-sm text-muted-foreground mt-2">
              {isActive ? (isPaused ? 'Paused' : 'In Session') : 'Ready'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-8">
        {!isActive ? (
          <Button
            size="lg"
            className="px-8"
            onClick={handleStart}
          >
            <Play className="h-5 w-5 mr-2" />
            Start Practice
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="lg"
              onClick={handleCancel}
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Cancel
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={togglePause}
            >
              {isPaused ? (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </>
              )}
            </Button>

            <Button
              size="lg"
              className="px-8"
              onClick={handleComplete}
              disabled={seconds < 60}
            >
              <Square className="h-5 w-5 mr-2" />
              Complete
            </Button>
          </>
        )}
      </div>

      {isActive && seconds < 60 && (
        <p className="text-xs text-muted-foreground mt-4">
          Practice for at least 1 minute to complete
        </p>
      )}
    </div>
  );
};

export default PracticeTimer;
