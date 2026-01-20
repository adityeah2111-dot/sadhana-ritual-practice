import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TimezoneStepProps {
  onSelect: (timezone: string) => void;
  onBack: () => void;
}

const popularTimezones = [
  { id: 'Asia/Kolkata', label: 'India (IST)', offset: '+5:30' },
  { id: 'Asia/Dubai', label: 'Dubai (GST)', offset: '+4:00' },
  { id: 'Asia/Singapore', label: 'Singapore (SGT)', offset: '+8:00' },
  { id: 'America/New_York', label: 'New York (EST)', offset: '-5:00' },
  { id: 'America/Los_Angeles', label: 'Los Angeles (PST)', offset: '-8:00' },
  { id: 'Europe/London', label: 'London (GMT)', offset: '+0:00' },
  { id: 'Australia/Sydney', label: 'Sydney (AEDT)', offset: '+11:00' },
];

const TimezoneStep = ({ onSelect, onBack }: TimezoneStepProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [detectedTimezone, setDetectedTimezone] = useState<string | null>(null);

  useEffect(() => {
    // Detect user's timezone
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setDetectedTimezone(tz);
    
    // Auto-select if it's in our list
    const found = popularTimezones.find(t => t.id === tz);
    if (found) {
      setSelected(tz);
    }
  }, []);

  const filteredTimezones = popularTimezones.filter(tz =>
    tz.label.toLowerCase().includes(search.toLowerCase()) ||
    tz.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
    if (selected) {
      onSelect(selected);
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
        <Globe className="h-8 w-8 text-primary" />
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">
        Your Timezone
      </h2>

      <p className="text-muted-foreground mb-8">
        We'll use this to send you practice reminders at the right time.
      </p>

      {detectedTimezone && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-6"
        >
          <p className="text-sm text-muted-foreground">
            Detected: <span className="text-foreground font-medium">{detectedTimezone}</span>
          </p>
        </motion.div>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search timezone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-2 mb-8 max-h-64 overflow-y-auto">
        {filteredTimezones.map((tz, index) => (
          <motion.button
            key={tz.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            onClick={() => setSelected(tz.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
              selected === tz.id
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <span className={`text-sm ${
              selected === tz.id ? 'text-foreground font-medium' : 'text-foreground'
            }`}>
              {tz.label}
            </span>
            <span className={`text-xs font-mono ${
              selected === tz.id ? 'text-primary' : 'text-muted-foreground'
            }`}>
              UTC{tz.offset}
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
          Complete Setup
        </Button>
      </div>
    </motion.div>
  );
};

export default TimezoneStep;
