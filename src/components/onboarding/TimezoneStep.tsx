import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Search, ArrowLeft, Check, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TimezoneStepProps {
  onSelect: (timezone: string) => void;
  onBack: () => void;
}

const popularTimezones = [
  { id: 'Asia/Kolkata', label: 'India (IST)', offset: '+5:30', country: '🇮🇳' },
  { id: 'Asia/Dubai', label: 'Dubai (GST)', offset: '+4:00', country: '🇦🇪' },
  { id: 'Asia/Singapore', label: 'Singapore (SGT)', offset: '+8:00', country: '🇸🇬' },
  { id: 'America/New_York', label: 'New York (EST)', offset: '-5:00', country: '🇺🇸' },
  { id: 'America/Los_Angeles', label: 'Los Angeles (PST)', offset: '-8:00', country: '🇺🇸' },
  { id: 'Europe/London', label: 'London (GMT)', offset: '+0:00', country: '🇬🇧' },
  { id: 'Australia/Sydney', label: 'Sydney (AEDT)', offset: '+11:00', country: '🇦🇺' },
];

const TimezoneStep = ({ onSelect, onBack }: TimezoneStepProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [detectedTimezone, setDetectedTimezone] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setDetectedTimezone(tz);
    
    const found = popularTimezones.find(t => t.id === tz);
    if (found) {
      setSelected(tz);
    }
  }, []);

  const filteredTimezones = popularTimezones.filter(tz =>
    tz.label.toLowerCase().includes(search.toLowerCase()) ||
    tz.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = async () => {
    if (selected) {
      setIsSubmitting(true);
      await onSelect(selected);
      setIsSubmitting(false);
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
          <Globe className="h-8 w-8 text-primary" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-3xl font-semibold text-foreground mb-3"
      >
        Your Timezone
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground mb-6"
      >
        We'll send reminders at the right time for your location.
      </motion.p>

      {/* Detected timezone badge */}
      {detectedTimezone && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-4 py-2 mb-6"
        >
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm">
            Detected: <span className="text-foreground font-medium">{detectedTimezone}</span>
          </span>
        </motion.div>
      )}

      {/* Search input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative mb-4"
      >
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search timezone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-11 h-12 bg-card border-border"
        />
      </motion.div>

      {/* Timezone list */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="bg-card border border-border rounded-xl overflow-hidden mb-6 max-h-64 overflow-y-auto"
      >
        {filteredTimezones.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No timezones found matching "{search}"
          </div>
        ) : (
          filteredTimezones.map((tz, index) => {
            const isSelected = selected === tz.id;

            return (
              <motion.button
                key={tz.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.4 + index * 0.03 }}
                onClick={() => setSelected(tz.id)}
                className={`w-full flex items-center justify-between p-4 border-b border-border last:border-0 transition-colors ${
                  isSelected ? 'bg-primary/5' : 'hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Checkbox indicator */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'border-2 border-muted-foreground/30'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>

                  {/* Country flag */}
                  <span className="text-lg">{tz.country}</span>

                  {/* Label */}
                  <span
                    className={`text-sm text-left ${
                      isSelected ? 'text-foreground font-medium' : 'text-foreground'
                    }`}
                  >
                    {tz.label}
                  </span>
                </div>

                {/* Offset badge */}
                <span
                  className={`text-xs font-mono px-2 py-1 rounded ${
                    isSelected ? 'bg-primary/10 text-primary' : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  UTC{tz.offset}
                </span>
              </motion.button>
            );
          })
        )}
      </motion.div>

      {/* Selected confirmation */}
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
                All reminders will be sent in{' '}
                <span className="text-primary font-medium">
                  {popularTimezones.find(t => t.id === selected)?.label || selected}
                </span>
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
        <Button variant="outline" size="lg" onClick={onBack} className="flex-1 h-12" disabled={isSubmitting}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          size="lg"
          variant="crimson"
          className="flex-1 h-12"
          onClick={handleContinue}
          disabled={!selected || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Setting up...
            </>
          ) : (
            'Complete Setup'
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default TimezoneStep;
