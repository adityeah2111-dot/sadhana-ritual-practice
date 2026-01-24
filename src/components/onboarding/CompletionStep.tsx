import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface CompletionStepProps {
    onContinue: () => void;
    practiceTime: string;
}

const CompletionStep = ({ onContinue, practiceTime }: CompletionStepProps) => {
    const [showContent, setShowContent] = useState(false);

    // Format time for display
    const formatTime = (time: string) => {
        const hour = parseInt(time.split(':')[0]);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        return `${displayHour}:00 ${ampm}`;
    };

    useEffect(() => {
        // Trigger confetti on mount
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                clearInterval(interval);
                return;
            }

            const particleCount = 50 * (timeLeft / duration);

            // Crimson colored confetti
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fee2e2'],
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fee2e2'],
            });
        }, 250);

        // Show content after a brief delay
        setTimeout(() => setShowContent(true), 500);

        return () => clearInterval(interval);
    }, []);



    return (
        <div className="text-center max-w-lg mx-auto px-4">
            {/* Success Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="relative inline-flex items-center justify-center mb-8"
            >
                <motion.div
                    className="absolute inset-0 w-28 h-28 rounded-full bg-primary/30"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ left: '-14px', top: '-14px' }}
                />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-rose-500 flex items-center justify-center shadow-lg shadow-primary/30">
                    <CheckCircle className="h-12 w-12 text-white" />
                </div>
            </motion.div>

            {showContent && (
                <>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                    >
                        You're All Set!
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-primary font-medium mb-6"
                    >
                        Welcome to the practice, Warrior.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-muted-foreground mb-8"
                    >
                        Your journey begins now. Every day, show up at{' '}
                        <span className="text-primary font-semibold">{formatTime(practiceTime)}</span>{' '}
                        and give your best.
                    </motion.p>

                    {/* Summary Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-card border border-border rounded-xl p-6 mb-8"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Flame className="w-5 h-5 text-primary" />
                            <span className="font-semibold text-foreground">Your Practice at a Glance</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="bg-background/50 rounded-lg p-3">
                                <p className="text-xs text-muted-foreground mb-1">Daily Practice</p>
                                <p className="text-lg font-semibold text-foreground">{formatTime(practiceTime)}</p>
                            </div>
                            <div className="bg-background/50 rounded-lg p-3">
                                <p className="text-xs text-muted-foreground mb-1">Current Streak</p>
                                <p className="text-lg font-semibold text-primary">Day 0</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Motivational message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8"
                    >
                        <Sparkles className="w-5 h-5 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground italic">
                            "The secret of getting ahead is getting started."
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">— Mark Twain</p>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="space-y-3"
                    >
                        <Button
                            size="lg"
                            variant="crimson"
                            className="w-full sm:w-auto px-12 py-8 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300 group"
                            onClick={onContinue}
                        >
                            <Flame className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                            Go to Dashboard
                            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default CompletionStep;
