import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sun, Sunset, Moon, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PracticeTimeStepProps {
  onSelect: (time: string) => void;
  onBack: () => void;
}

const timeSlots = [
  { 
    id: 'morning', 
    label: 'Early Morning', 
    time: '06:00:00', 
    display: '6:00 AM',
    icon: Sun,
    description: 'Start your day with discipline',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  { 
    id: 'mid-morning', 
    label: 'Mid Morning', 
    time: '09:00:00', 
    display: '9:00 AM',
    icon: Sun,
    description: 'After your morning routine',
    gradient: 'from-yellow-500/20 to-amber-500/20',
  },
  { 
    id: 'afternoon', 
    label: 'Afternoon', 
    time: '14:00:00', 
    display: '2:00 PM',
    icon: Sunset,
    description: 'Break from your work',
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  { 
    id: 'evening', 
    label: 'Evening', 
    time: '18:00:00', 
    display: '6:00 PM',
    icon: Sunset,
    description: 'End your workday strong',
    gradient: 'from-red-500/20 to-pink-500/20',
  },
  { 
    id: 'night', 
    label: 'Night', 
    time: '21:00:00', 
    display: '9:00 PM',
    icon: Moon,
    description: 'Wind down before sleep',
    gradient: 'from-indigo-500/20 to-purple-500/20',
  },
];

const PracticeTimeStep = ({ onSelect, onBack }: PracticeTimeStepProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) {
      const slot = timeSlots.find(s => s.id === selected);
      if (slot) onSelect(slot.time);
    }
  };

  return (
    <div className="text-center max-w-lg mx-auto px-4">
      {/* Icon with glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative inline-flex items-center justify-center w-20 h-20 mb-8"
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
        <div className="relative w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center glow-crimson-subtle">
          <Clock className="h-8 w-8 text-primary" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-3xl font-semibold text-foreground mb-3"
      >
        When Will You Practice?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground mb-8"
      >
        Choose a time you can commit to <span className="text-foreground font-medium">every single day</span>.
      </motion.p>

      {/* Time slot cards */}
      <div className="space-y-3 mb-8">
        {timeSlots.map((slot, index) => {
          const isSelected = selected === slot.id;
          const Icon = slot.icon;

          return (
            <motion.button
              key={slot.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
              onClick={() => setSelected(slot.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5 glow-crimson-subtle'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
              }`}
            >
              {/* Icon with gradient background */}
              <div
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  isSelected ? 'bg-primary/20' : 'bg-muted/50'
                }`}
              >
                <Icon
                  className={`h-6 w-6 transition-colors ${
                    isSelected ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                {isSelected && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 text-left">
                <p
                  className={`font-medium transition-colors ${
                    isSelected ? 'text-foreground' : 'text-foreground'
                  }`}
                >
                  {slot.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{slot.description}</p>
              </div>

              {/* Time badge */}
              <div
                className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-colors ${
                  isSelected ? 'bg-primary/10 text-primary' : 'bg-muted/50 text-muted-foreground'
                }`}
              >
                {slot.display}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected time confirmation */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">
                You'll practice at{' '}
                <span className="text-primary font-medium">
                  {timeSlots.find(s => s.id === selected)?.display}
                </span>{' '}
                every day
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3"
      >
        <Button variant="outline" size="lg" onClick={onBack} className="flex-1 h-12">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          size="lg"
          variant="crimson"
          className="flex-1 h-12"
          onClick={handleContinue}
          disabled={!selected}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
};

export default PracticeTimeStep;
