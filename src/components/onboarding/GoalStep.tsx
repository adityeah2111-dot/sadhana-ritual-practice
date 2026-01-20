import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Dumbbell, Brain, Heart, Zap, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GoalStepProps {
    onSelect: (goals: string[]) => void;
    onBack: () => void;
}

const goals = [
    {
        id: 'strength',
        label: 'Build Strength',
        description: 'Get stronger and more capable',
        icon: Dumbbell,
        color: 'from-red-500/20 to-orange-500/20',
    },
    {
        id: 'discipline',
        label: 'Develop Discipline',
        description: 'Build unshakeable daily habits',
        icon: Target,
        color: 'from-primary/20 to-rose-500/20',
    },
    {
        id: 'mental',
        label: 'Mental Clarity',
        description: 'Sharpen focus and reduce stress',
        icon: Brain,
        color: 'from-purple-500/20 to-indigo-500/20',
    },
    {
        id: 'health',
        label: 'Better Health',
        description: 'Improve overall wellbeing',
        icon: Heart,
        color: 'from-pink-500/20 to-red-500/20',
    },
    {
        id: 'energy',
        label: 'More Energy',
        description: 'Feel energized throughout the day',
        icon: Zap,
        color: 'from-yellow-500/20 to-amber-500/20',
    },
];

const GoalStep = ({ onSelect, onBack }: GoalStepProps) => {
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

    const toggleGoal = (id: string) => {
        setSelectedGoals(prev =>
            prev.includes(id)
                ? prev.filter(g => g !== id)
                : prev.length < 3
                    ? [...prev, id]
                    : prev
        );
    };

    const handleContinue = () => {
        if (selectedGoals.length > 0) {
            onSelect(selectedGoals);
        }
    };

    return (
        <div className="text-center max-w-lg mx-auto px-4">
            {/* Icon */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative inline-flex items-center justify-center w-20 h-20 mb-8"
            >
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
                <div className="relative w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center glow-crimson-subtle">
                    <Target className="h-8 w-8 text-primary" />
                </div>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl font-semibold text-foreground mb-3"
            >
                What Are Your Goals?
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground mb-8"
            >
                Select up to <span className="text-primary font-medium">3 goals</span> that matter most to you.
            </motion.p>

            {/* Goal cards */}
            <div className="grid grid-cols-1 gap-3 mb-6">
                {goals.map((goal, index) => {
                    const isSelected = selectedGoals.includes(goal.id);
                    const Icon = goal.icon;

                    return (
                        <motion.button
                            key={goal.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                            onClick={() => toggleGoal(goal.id)}
                            disabled={!isSelected && selectedGoals.length >= 3}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${isSelected
                                    ? 'border-primary bg-primary/5 glow-crimson-subtle'
                                    : selectedGoals.length >= 3
                                        ? 'border-border bg-card/50 opacity-50 cursor-not-allowed'
                                        : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
                                }`}
                        >
                            {/* Icon */}
                            <div
                                className={`relative w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${goal.color}`}
                            >
                                <Icon
                                    className={`h-6 w-6 transition-colors ${isSelected ? 'text-primary' : 'text-foreground'
                                        }`}
                                />
                                <AnimatePresence>
                                    {isSelected && (
                                        <motion.div
                                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            transition={{ type: "spring", stiffness: 500 }}
                                        >
                                            <Check className="w-3 h-3 text-primary-foreground" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-left">
                                <p className={`font-medium ${isSelected ? 'text-foreground' : 'text-foreground'}`}>
                                    {goal.label}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">{goal.description}</p>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Selection count */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
            >
                <div className="flex items-center justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all ${i < selectedGoals.length ? 'bg-primary w-4' : 'bg-border'
                                }`}
                        />
                    ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    {selectedGoals.length} of 3 selected
                </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
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
                    disabled={selectedGoals.length === 0}
                >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xs text-muted-foreground mt-6"
            >
                You can always change these later in settings.
            </motion.p>
        </div>
    );
};

export default GoalStep;
