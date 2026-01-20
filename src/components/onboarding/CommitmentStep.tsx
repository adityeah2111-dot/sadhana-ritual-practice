import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommitmentStepProps {
  onAccept: () => void;
}

const commitments = [
  'I commit to showing up every day, even when I do not feel like it.',
  'I understand that consistency matters more than intensity.',
  'I will not skip days, even if I can only do the minimum.',
  'I accept that discipline is freedom.',
];

const CommitmentStep = ({ onAccept }: CommitmentStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="text-center max-w-lg mx-auto"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-8">
        <Flame className="h-8 w-8 text-primary" />
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">
        The Practitioner's Oath
      </h2>

      <p className="text-muted-foreground mb-8">
        Before you begin, understand what you're committing to. This is not a casual endeavor.
      </p>

      <div className="bg-card border border-border rounded-lg p-6 mb-8 text-left">
        <ul className="space-y-4">
          {commitments.map((commitment, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-foreground text-sm leading-relaxed">
                {commitment}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      <Button size="lg" className="px-8" onClick={onAccept}>
        I Accept This Commitment
      </Button>

      <p className="text-xs text-muted-foreground mt-6">
        By continuing, you acknowledge this commitment to yourself.
      </p>
    </motion.div>
  );
};

export default CommitmentStep;
