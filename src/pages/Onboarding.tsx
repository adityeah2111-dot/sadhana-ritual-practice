import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Flame, Clock, Globe, Check, Target, Sparkles, PartyPopper } from 'lucide-react';
import WelcomeStep from '@/components/onboarding/WelcomeStep';
import CommitmentStep from '@/components/onboarding/CommitmentStep';
import GoalStep from '@/components/onboarding/GoalStep';
import PracticeTimeStep from '@/components/onboarding/PracticeTimeStep';
import TimezoneStep from '@/components/onboarding/TimezoneStep';
import CompletionStep from '@/components/onboarding/CompletionStep';
import PersonalInfoStep from '@/components/onboarding/PersonalInfoStep';
import { User } from 'lucide-react';

type OnboardingStep = 'welcome' | 'personal-info' | 'commitment' | 'goals' | 'practice-time' | 'timezone' | 'completion';

const stepConfig = [
  { id: 'welcome', label: 'Welcome', icon: Sparkles },
  { id: 'commitment', label: 'Commitment', icon: Flame },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'practice-time', label: 'Schedule', icon: Clock },
  { id: 'timezone', label: 'Timezone', icon: Globe },
  { id: 'completion', label: 'Complete', icon: PartyPopper },
];

const Onboarding = () => {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [practiceTime, setPracticeTime] = useState<string>('06:00:00');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [personalInfo, setPersonalInfo] = useState<{ name: string; dateOfBirth: string; gender: string }>({ name: '', dateOfBirth: '', gender: '' });
  const [direction, setDirection] = useState<1 | -1>(1);
  const navigate = useNavigate();
  const { completeOnboarding } = useProfile();
  const { user, isAnonymous } = useAuth();
  const { toast } = useToast();

  const currentStepIndex = stepConfig.findIndex(s => s.id === step);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step !== 'welcome') {
        handleBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  const handleBack = useCallback(() => {
    setDirection(-1);
    const steps: OnboardingStep[] = isAnonymous
      ? ['welcome', 'personal-info', 'commitment', 'goals', 'practice-time', 'timezone', 'completion']
      : ['welcome', 'commitment', 'goals', 'practice-time', 'timezone', 'completion'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  }, [step, isAnonymous]);

  const handleWelcomeContinue = () => {
    setDirection(1);
    // For anonymous users, collect personal info first
    if (isAnonymous) {
      setStep('personal-info');
    } else {
      setStep('commitment');
    }
  };

  const handlePersonalInfoContinue = (data: { name: string; dateOfBirth: string; gender: string }) => {
    setPersonalInfo(data);
    setDirection(1);
    setStep('commitment');
  };

  const handleCommitmentAccept = () => {
    setDirection(1);
    setStep('goals');
  };

  const handleGoalsSelect = (goals: string[]) => {
    setSelectedGoals(goals);
    setDirection(1);
    setStep('practice-time');
  };

  const handlePracticeTimeSelect = (time: string) => {
    setPracticeTime(time);
    setDirection(1);
    setStep('timezone');
  };

  const handleTimezoneSelect = async (timezone: string) => {
    const result = await completeOnboarding(
      practiceTime,
      timezone,
      personalInfo.name || undefined,
      personalInfo.name || undefined,
      personalInfo.dateOfBirth || undefined,
      personalInfo.gender || undefined
    );

    // Always proceed to completion step, even if save failed
    // The completion step will redirect to dashboard
    setDirection(1);
    setStep('completion');

    // Set flag to prevent redirect loop (in case DB save failed)
    sessionStorage.setItem('onboarding_completed', 'true');

    if (!result) {
      // Non-blocking notification - user can still proceed
      toast({
        title: 'Note',
        description: 'Your preferences will be saved when you sign in.',
        variant: 'default',
      });
    }
  };

  const handleCompletionContinue = useCallback(() => {
    // Ensure flag is set before navigating - use replace to prevent back button issues
    sessionStorage.setItem('onboarding_completed', 'true');
    toast({
      title: 'Welcome, Practitioner',
      description: 'Your journey begins now. Stay disciplined.',
    });
    // Use replace to prevent going back to onboarding
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  // Extract name from email for personalization
  const userName = user?.email?.split('@')[0] || '';

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Simplified Background - static for better mobile performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-muted/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-muted/15 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-center h-16">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Flame className="w-5 h-5 text-primary" />
              <span className="text-xl font-semibold tracking-tight text-foreground">
                Sadhana
              </span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Step Progress Indicator - Hidden on welcome and completion steps */}
      <AnimatePresence>
        {step !== 'welcome' && step !== 'completion' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-card/30 relative z-10"
          >
            <div className="container mx-auto px-4 lg:px-6 py-6">
              <div className="max-w-xl mx-auto">
                <div className="flex items-center justify-between relative">
                  {/* Progress line background */}
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />

                  {/* Progress line filled */}
                  <motion.div
                    className="absolute top-5 left-0 h-0.5 bg-primary"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentStepIndex - 1) / (stepConfig.length - 3)) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />

                  {/* Only show middle steps in progress bar */}
                  {stepConfig.slice(1, -1).map((stepItem, index) => {
                    const adjustedIndex = index + 1;
                    const isCompleted = adjustedIndex < currentStepIndex;
                    const isCurrent = adjustedIndex === currentStepIndex;
                    const Icon = stepItem.icon;

                    return (
                      <div key={stepItem.id} className="relative z-10 flex flex-col items-center">
                        <motion.div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted
                            ? 'bg-primary text-primary-foreground'
                            : isCurrent
                              ? 'bg-muted border-2 border-primary text-primary'
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
                          className={`mt-2 text-xs font-medium transition-colors hidden sm:block ${isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 overflow-hidden relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full will-change-transform"
          >
            {step === 'welcome' && (
              <WelcomeStep onContinue={handleWelcomeContinue} userName={userName} />
            )}
            {step === 'personal-info' && (
              <PersonalInfoStep
                onContinue={handlePersonalInfoContinue}
                onBack={handleBack}
              />
            )}
            {step === 'commitment' && (
              <CommitmentStep onAccept={handleCommitmentAccept} />
            )}
            {step === 'goals' && (
              <GoalStep onSelect={handleGoalsSelect} onBack={handleBack} />
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
            {step === 'completion' && (
              <CompletionStep
                onContinue={handleCompletionContinue}
                practiceTime={practiceTime}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer with step count - Hidden on welcome and completion */}
      <AnimatePresence>
        {step !== 'welcome' && step !== 'completion' && (
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-4 border-t border-border bg-card/30 relative z-10"
          >
            <div className="text-center">
              <span className="text-xs text-muted-foreground">
                Step {currentStepIndex} of {stepConfig.length - 2}
              </span>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
