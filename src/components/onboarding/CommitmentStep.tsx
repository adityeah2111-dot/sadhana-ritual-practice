import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommitmentStepProps {
  onAccept: () => void;
}

const commitments = [
  {
    text: 'I commit to showing up every day, even when I do not feel like it.',
    emphasis: 'every day',
  },
  {
    text: 'I understand that consistency matters more than intensity.',
    emphasis: 'consistency',
  },
  {
    text: 'I will not skip days, even if I can only do the minimum.',
    emphasis: 'not skip',
  },
  {
    text: 'I accept that discipline is freedom.',
    emphasis: 'discipline is freedom',
  },
];

const CommitmentStep = ({ onAccept }: CommitmentStepProps) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const allChecked = checkedItems.length === commitments.length;

  const toggleItem = (index: number) => {
    setCheckedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
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
          <Flame className="h-8 w-8 text-primary" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-3xl font-semibold text-foreground mb-3"
      >
        The Practitioner's Oath
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground mb-8"
      >
        Before you begin, commit to these principles. This is not casual—it's a ritual.
      </motion.p>

      {/* Commitment cards */}
      <div className="bg-card border border-border rounded-xl overflow-hidden mb-8">
        {commitments.map((commitment, index) => {
          const isChecked = checkedItems.includes(index);
          
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              onClick={() => toggleItem(index)}
              className={`w-full flex items-start gap-4 p-4 text-left border-b border-border last:border-0 transition-colors ${
                isChecked ? 'bg-primary/5' : 'hover:bg-muted/30'
              }`}
            >
              {/* Checkbox */}
              <div
                className={`mt-0.5 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
                  isChecked
                    ? 'bg-primary text-primary-foreground'
                    : 'border-2 border-muted-foreground/30'
                }`}
              >
                <AnimatePresence>
                  {isChecked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Text */}
              <div className="flex-1">
                <p
                  className={`text-sm leading-relaxed transition-colors ${
                    isChecked ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {commitment.text.split(commitment.emphasis).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={isChecked ? 'text-primary font-medium' : 'font-medium text-foreground'}>
                          {commitment.emphasis}
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <div className="flex items-center justify-center gap-1.5 mb-2">
          {commitments.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                checkedItems.includes(index) ? 'w-6 bg-primary' : 'w-1.5 bg-border'
              }`}
              animate={checkedItems.includes(index) ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {checkedItems.length} of {commitments.length} acknowledged
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          size="lg"
          variant="crimson"
          className="px-8 h-12"
          onClick={onAccept}
          disabled={!allChecked}
        >
          {allChecked ? (
            <>
              I Accept This Commitment
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            'Acknowledge all commitments'
          )}
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs text-muted-foreground mt-6"
      >
        By continuing, you make this commitment to yourself.
      </motion.p>
    </div>
  );
};

export default CommitmentStep;
