import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';
import { Flame, Clock, Globe, Check } from 'lucide-react';
import CommitmentStep from '@/components/onboarding/CommitmentStep';
import PracticeTimeStep from '@/components/onboarding/PracticeTimeStep';
import TimezoneStep from '@/components/onboarding/TimezoneStep';

type OnboardingStep = 'commitment' | 'practice-time' | 'timezone';

const stepConfig = [
  { id: 'commitment', label: 'Commitment', icon: Flame },
  { id: 'practice-time', label: 'Schedule', icon: Clock },
  { id: 'timezone', label: 'Timezone', icon: Globe },
];

const Onboarding = () => {
  const [step, setStep] = useState<OnboardingStep>('commitment');
  const [practiceTime, setPracticeTime] = useState<string>('06:00:00');
  const [direction, setDirection] = useState<1 | -1>(1);
  const navigate = useNavigate();
  const { completeOnboarding } = useProfile();
  const { toast } = useToast();

  const handleCommitmentAccept = () => {
    setDirection(1);
    setStep('practice-time');
  };

  const handlePracticeTimeSelect = (time: string) => {
    setPracticeTime(time);
    setDirection(1);
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
    setDirection(-1);
    if (step === 'practice-time') setStep('commitment');
    if (step === 'timezone') setStep('practice-time');
  };

  const currentStepIndex = stepConfig.findIndex(s => s.id === step);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-primary" />
              <span className="text-xl font-semibold tracking-tight text-foreground">
                Sadhana
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Step Progress Indicator */}
      <div className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between relative">
              {/* Progress line background */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
              
              {/* Progress line filled */}
              <motion.div
                className="absolute top-5 left-0 h-0.5 bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStepIndex / (stepConfig.length - 1)) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />

              {stepConfig.map((stepItem, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const Icon = stepItem.icon;

                return (
                  <div key={stepItem.id} className="relative z-10 flex flex-col items-center">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-primary text-primary-foreground'
                          : isCurrent
                          ? 'bg-primary/20 border-2 border-primary text-primary'
                          : 'bg-card border-2 border-border text-muted-foreground'
                      }`}
                      animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0, repeatDelay: 2 }}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </motion.div>
                    <span
                      className={`mt-2 text-xs font-medium transition-colors ${
                        isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {stepItem.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {step === 'commitment' && (
              <CommitmentStep onAccept={handleCommitmentAccept} />
            )}
            {step === 'practice-time' && (
              <PracticeTimeStep
                onSelect={handlePracticeTimeSelect}
                onBack={handleBack}
              />
            )}
            {step === 'timezone' && (
              <TimezoneStep
                onSelect={handleTimezoneSelect}
                onBack={handleBack}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer with step count */}
      <footer className="py-4 border-t border-border bg-card/30">
        <div className="text-center">
          <span className="text-xs text-muted-foreground">
            Step {currentStepIndex + 1} of {stepConfig.length}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
