import { motion } from 'framer-motion';

interface SectionSkeletonProps {
    height?: string;
}

/**
 * SectionSkeleton - Loading placeholder for lazy-loaded sections
 * Shows a subtle pulse animation while content loads
 */
const SectionSkeleton = ({ height = '400px' }: SectionSkeletonProps) => {
    return (
        <div
            className="w-full bg-card/50 flex items-center justify-center"
            style={{ minHeight: height }}
        >
            <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-4"
            >
                {/* Animated loading indicator */}
                <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary/40"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.4, 1, 0.4]
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: 'easeInOut'
                            }}
                        />
                    ))}
                </div>
                <span className="text-xs text-muted-foreground">Loading...</span>
            </motion.div>
        </div>
    );
};

export default SectionSkeleton;
