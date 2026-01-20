import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';
import CommitmentStep from '@/components/onboarding/CommitmentStep';
import PracticeTimeStep from '@/components/onboarding/PracticeTimeStep';
import TimezoneStep from '@/components/onboarding/TimezoneStep';

type OnboardingStep = 'commitment' | 'practice-time' | 'timezone';

const Onboarding = () => {
  const [step, setStep] = useState<OnboardingStep>('commitment');
  const [practiceTime, setPracticeTime] = useState<string>('06:00:00');
  const navigate = useNavigate();
  const { completeOnboarding } = useProfile();
  const { toast } = useToast();

  const handleCommitmentAccept = () => {
    setStep('practice-time');
  };

  const handlePracticeTimeSelect = (time: string) => {
    setPracticeTime(time);
    setStep('timezone');
  };

  const handleTimezoneSelect = async (timezone: string) => {
    const result = await completeOnboarding(practiceTime, timezone);
    
    if (result) {
      toast({
        title: 'Welcome, Practitioner',
        description: 'Your journey begins now. Stay disciplined.',
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleBack = () => {
    if (step === 'practice-time') setStep('commitment');
    if (step === 'timezone') setStep('practice-time');
  };

  // Progress indicator
  const steps = ['commitment', 'practice-time', 'timezone'];
  const currentStepIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-center h-16">
            <span className="text-xl font-semibold tracking-tight text-foreground">
              Sadhana
            </span>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full bg-border h-1">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait">
          {step === 'commitment' && (
            <CommitmentStep key="commitment" onAccept={handleCommitmentAccept} />
          )}
          {step === 'practice-time' && (
            <PracticeTimeStep
              key="practice-time"
              onSelect={handlePracticeTimeSelect}
              onBack={handleBack}
            />
          )}
          {step === 'timezone' && (
            <TimezoneStep
              key="timezone"
              onSelect={handleTimezoneSelect}
              onBack={handleBack}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Step indicator */}
      <footer className="py-6">
        <div className="flex items-center justify-center gap-2">
          {steps.map((s, index) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentStepIndex ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
