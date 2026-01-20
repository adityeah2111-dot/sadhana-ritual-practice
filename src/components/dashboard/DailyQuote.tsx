import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

// Curated quotes focused on discipline, practice, and consistency
const quotes = [
    {
        text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        author: "Aristotle",
    },
    {
        text: "The successful warrior is the average man, with laser-like focus.",
        author: "Bruce Lee",
    },
    {
        text: "Discipline is choosing between what you want now and what you want most.",
        author: "Abraham Lincoln",
    },
    {
        text: "Small disciplines repeated with consistency every day lead to great achievements gained slowly over time.",
        author: "John C. Maxwell",
    },
    {
        text: "The pain of discipline weighs ounces while the pain of regret weighs tons.",
        author: "Jim Rohn",
    },
    {
        text: "Motivation gets you going, but discipline keeps you growing.",
        author: "John C. Maxwell",
    },
    {
        text: "Don't count the days, make the days count.",
        author: "Muhammad Ali",
    },
    {
        text: "The secret of your future is hidden in your daily routine.",
        author: "Mike Murdock",
    },
    {
        text: "Success isn't always about greatness. It's about consistency.",
        author: "Dwayne Johnson",
    },
    {
        text: "You will never change your life until you change something you do daily.",
        author: "John C. Maxwell",
    },
    {
        text: "A journey of a thousand miles begins with a single step.",
        author: "Lao Tzu",
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
    },
    {
        text: "Practice does not make perfect. Only perfect practice makes perfect.",
        author: "Vince Lombardi",
    },
    {
        text: "The more I practice, the luckier I get.",
        author: "Gary Player",
    },
    {
        text: "Excellence is not a destination but a continuous journey that never ends.",
        author: "Brian Tracy",
    },
    {
        text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        author: "Ralph Waldo Emerson",
    },
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt",
    },
    {
        text: "It is not the mountain we conquer, but ourselves.",
        author: "Edmund Hillary",
    },
    {
        text: "The body achieves what the mind believes.",
        author: "Napoleon Hill",
    },
    {
        text: "Your body can stand almost anything. It's your mind you have to convince.",
        author: "Andrew Murphy",
    },
    {
        text: "Strength does not come from physical capacity. It comes from an indomitable will.",
        author: "Mahatma Gandhi",
    },
    {
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson",
    },
    {
        text: "Do today what others won't, so tomorrow you can do what others can't.",
        author: "Jerry Rice",
    },
    {
        text: "Champions keep playing until they get it right.",
        author: "Billie Jean King",
    },
    {
        text: "The difference between ordinary and extraordinary is that little extra.",
        author: "Jimmy Johnson",
    },
    {
        text: "Energy and persistence conquer all things.",
        author: "Benjamin Franklin",
    },
    {
        text: "He who conquers himself is the mightiest warrior.",
        author: "Confucius",
    },
    {
        text: "The master has failed more times than the beginner has even tried.",
        author: "Stephen McCranie",
    },
    {
        text: "Fall seven times, stand up eight.",
        author: "Japanese Proverb",
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
    },
    {
        text: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein",
    },
];

/**
 * DailyQuote - Shows a motivational quote that changes each day
 * Uses date-based selection for consistency throughout the day
 */
const DailyQuote = () => {
    // Select quote based on current date (same quote all day)
    const todayQuote = useMemo(() => {
        const today = new Date();
        const dayOfYear = Math.floor(
            (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        const quoteIndex = dayOfYear % quotes.length;
        return quotes[quoteIndex];
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-gradient-to-br from-card via-card to-primary/5 border border-border hover:border-primary/20 rounded-xl p-5 sm:p-6 relative overflow-hidden group transition-colors duration-300"
        >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />

            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Daily Wisdom
                </span>
            </div>

            {/* Quote */}
            <div className="relative">
                <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary/20" aria-hidden="true" />
                <blockquote className="pl-6">
                    <motion.p
                        className="text-foreground/90 leading-relaxed text-sm sm:text-base italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        "{todayQuote.text}"
                    </motion.p>
                    <motion.footer
                        className="mt-3 text-sm text-primary font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        — {todayQuote.author}
                    </motion.footer>
                </blockquote>
            </div>
        </motion.div>
    );
};

export default DailyQuote;
