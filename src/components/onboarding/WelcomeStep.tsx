import { motion } from 'framer-motion';
import { Flame, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeStepProps {
    onContinue: () => void;
    userName?: string;
}

const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

const WelcomeStep = ({ onContinue, userName }: WelcomeStepProps) => {
    return (
        <div className="text-center max-w-lg mx-auto px-4">
            {/* Animated flame icon with particles */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative inline-flex items-center justify-center mb-8"
            >
                {/* Orbiting particles */}
                <motion.div
                    className="absolute w-32 h-32"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-primary/40"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `rotate(${angle}deg) translateY(-48px) translateX(-50%)`,
                            }}
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                    ))}
                </motion.div>

                {/* Main flame container */}
                <motion.div
                    animate={floatingAnimation}
                    className="relative"
                >
                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl scale-150" />
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Flame className="h-12 w-12 text-primary" />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Welcome text */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                    Welcome{userName ? `, ${userName}` : ''}
                </h1>
                <p className="text-xl text-primary font-medium mb-4">
                    to Sadhana
                </p>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground mb-8 leading-relaxed"
            >
                You're about to begin a journey of daily discipline.
                This isn't just another fitness app—it's a commitment to yourself.
            </motion.p>

            {/* Feature highlights */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-4 mb-10"
            >
                {[
                    { label: 'Daily Practice', subtext: '15+ minutes' },
                    { label: 'Build Streaks', subtext: 'Stay consistent' },
                    { label: 'Transform', subtext: 'Mind & body' },
                ].map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="bg-card/50 border border-border rounded-xl p-4"
                    >
                        <p className="text-sm font-medium text-foreground mb-1">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.subtext}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Quote */}
            <motion.blockquote
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-10 px-4"
            >
                <p className="text-sm text-muted-foreground italic">
                    "The journey of a thousand miles begins with a single step."
                </p>
                <footer className="text-xs text-muted-foreground mt-2">— Lao Tzu</footer>
            </motion.blockquote>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
            >
                <Button
                    size="lg"
                    variant="crimson"
                    className="px-10 h-14 text-base"
                    onClick={onContinue}
                >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Begin My Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xs text-muted-foreground mt-6"
            >
                Takes about 2 minutes to complete
            </motion.p>
        </div>
    );
};

export default WelcomeStep;
