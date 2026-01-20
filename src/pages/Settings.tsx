import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Globe, Save, Sun, Sunset, Moon, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

const timeSlots = [
  { id: 'morning', label: 'Early Morning', time: '06:00:00', display: '6:00 AM', icon: Sun },
  { id: 'mid-morning', label: 'Mid Morning', time: '09:00:00', display: '9:00 AM', icon: Sun },
  { id: 'afternoon', label: 'Afternoon', time: '14:00:00', display: '2:00 PM', icon: Sunset },
  { id: 'evening', label: 'Evening', time: '18:00:00', display: '6:00 PM', icon: Sunset },
  { id: 'night', label: 'Night', time: '21:00:00', display: '9:00 PM', icon: Moon },
];

const popularTimezones = [
  { id: 'Asia/Kolkata', label: 'India (IST)', offset: '+5:30' },
  { id: 'Asia/Dubai', label: 'Dubai (GST)', offset: '+4:00' },
  { id: 'Asia/Singapore', label: 'Singapore (SGT)', offset: '+8:00' },
  { id: 'America/New_York', label: 'New York (EST)', offset: '-5:00' },
  { id: 'America/Los_Angeles', label: 'Los Angeles (PST)', offset: '-8:00' },
  { id: 'Europe/London', label: 'London (GMT)', offset: '+0:00' },
  { id: 'Australia/Sydney', label: 'Sydney (AEDT)', offset: '+11:00' },
];

const Settings = () => {
  const { profile, loading, updateProfile } = useProfile();
  const { toast } = useToast();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedTimezone, setSelectedTimezone] = useState<string | null>(null);
  const [timezoneSearch, setTimezoneSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (profile) {
      const matchingSlot = timeSlots.find(s => s.time === profile.practice_time);
      setSelectedTime(matchingSlot?.id || 'morning');
      setSelectedTimezone(profile.timezone || 'Asia/Kolkata');
    }
  }, [profile]);

  useEffect(() => {
    if (profile && selectedTime && selectedTimezone) {
      const currentSlot = timeSlots.find(s => s.time === profile.practice_time);
      const hasTimeChange = currentSlot?.id !== selectedTime;
      const hasTimezoneChange = profile.timezone !== selectedTimezone;
      setHasChanges(hasTimeChange || hasTimezoneChange);
    }
  }, [profile, selectedTime, selectedTimezone]);

  const handleSave = async () => {
    if (!selectedTime || !selectedTimezone) return;

    setSaving(true);
    const slot = timeSlots.find(s => s.id === selectedTime);
    
    const result = await updateProfile({
      practice_time: slot?.time || '06:00:00',
      timezone: selectedTimezone,
    });

    setSaving(false);

    if (result) {
      setHasChanges(false);
      toast({
        title: 'Settings updated',
        description: 'Your practice preferences have been saved.',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const filteredTimezones = popularTimezones.filter(tz =>
    tz.label.toLowerCase().includes(timezoneSearch.toLowerCase()) ||
    tz.id.toLowerCase().includes(timezoneSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back</span>
              </Link>
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              Sadhana
            </span>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 lg:px-6 py-12">
        <div className="max-w-lg mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Adjust your practice preferences.
            </p>
          </motion.div>

          {/* Practice Time Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-medium text-foreground">Practice Time</h2>
                <p className="text-sm text-muted-foreground">When do you want to practice?</p>
              </div>
            </div>

            <div className="space-y-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedTime(slot.id)}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg border transition-all ${
                    selectedTime === slot.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-background hover:border-primary/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedTime === slot.id ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    <slot.icon className={`h-4 w-4 ${
                      selectedTime === slot.id ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <span className="flex-1 text-left text-sm text-foreground">
                    {slot.label}
                  </span>
                  <span className={`text-xs font-mono ${
                    selectedTime === slot.id ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {slot.display}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Timezone Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-medium text-foreground">Timezone</h2>
                <p className="text-sm text-muted-foreground">For accurate reminders</p>
              </div>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search timezone..."
                value={timezoneSearch}
                onChange={(e) => setTimezoneSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredTimezones.map((tz) => (
                <button
                  key={tz.id}
                  onClick={() => setSelectedTimezone(tz.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                    selectedTimezone === tz.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-background hover:border-primary/50'
                  }`}
                >
                  <span className={`text-sm ${
                    selectedTimezone === tz.id ? 'text-foreground font-medium' : 'text-foreground'
                  }`}>
                    {tz.label}
                  </span>
                  <span className={`text-xs font-mono ${
                    selectedTimezone === tz.id ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    UTC{tz.offset}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="w-full"
              onClick={handleSave}
              disabled={!hasChanges || saving}
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {hasChanges ? 'Save Changes' : 'No Changes'}
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
