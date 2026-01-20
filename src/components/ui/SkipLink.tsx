import { motion } from 'framer-motion';

interface SkipLinkProps {
    href?: string;
    children?: React.ReactNode;
}

/**
 * SkipLink - Accessibility component for keyboard users
 * Allows users to skip directly to main content without tabbing through navigation
 * Only visible when focused (tab key)
 */
const SkipLink = ({
    href = '#main-content',
    children = 'Skip to main content'
}: SkipLinkProps) => {
    return (
        <motion.a
            href={href}
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:font-medium focus:text-sm"
            initial={{ opacity: 0, y: -20 }}
            whileFocus={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.a>
    );
};

export default SkipLink;
