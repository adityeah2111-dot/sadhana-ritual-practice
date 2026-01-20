import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Sun, Sunset, Moon } from 'lucide-react';
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
    description: 'Start your day with discipline'
  },
  { 
    id: 'mid-morning', 
    label: 'Mid Morning', 
    time: '09:00:00', 
    display: '9:00 AM',
    icon: Sun,
    description: 'After your morning routine'
  },
  { 
    id: 'afternoon', 
    label: 'Afternoon', 
    time: '14:00:00', 
    display: '2:00 PM',
    icon: Sunset,
    description: 'Break from your work'
  },
  { 
    id: 'evening', 
    label: 'Evening', 
    time: '18:00:00', 
    display: '6:00 PM',
    icon: Sunset,
    description: 'End your workday strong'
  },
  { 
    id: 'night', 
    label: 'Night', 
    time: '21:00:00', 
    display: '9:00 PM',
    icon: Moon,
    description: 'Wind down before sleep'
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="text-center max-w-lg mx-auto"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-8">
        <Clock className="h-8 w-8 text-primary" />
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">
        When Will You Practice?
      </h2>

      <p className="text-muted-foreground mb-8">
        Choose a time that you can commit to every single day. Consistency is non-negotiable.
      </p>

      <div className="space-y-3 mb-8">
        {timeSlots.map((slot, index) => (
          <motion.button
            key={slot.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            onClick={() => setSelected(slot.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all ${
              selected === slot.id
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              selected === slot.id ? 'bg-primary/20' : 'bg-muted'
            }`}>
              <slot.icon className={`h-5 w-5 ${
                selected === slot.id ? 'text-primary' : 'text-muted-foreground'
              }`} />
            </div>
            <div className="flex-1 text-left">
              <p className={`font-medium ${
                selected === slot.id ? 'text-foreground' : 'text-foreground'
              }`}>
                {slot.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {slot.description}
              </p>
            </div>
            <span className={`text-sm font-mono ${
              selected === slot.id ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {slot.display}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="lg" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button 
          size="lg" 
          className="flex-1" 
          onClick={handleContinue}
          disabled={!selected}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

export default PracticeTimeStep;
