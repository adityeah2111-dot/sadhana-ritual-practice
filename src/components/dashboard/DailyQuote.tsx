import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

// Curated quotes focused on discipline, practice, and consistency from Vedic sources
const quotes = [
    {
        text: "You have the right to work, but never to the fruit of work. You should never engage in action for the sake of reward, nor should you long for inaction.",
        author: "Bhagavad Gita 2.47",
    },
    {
        text: "The mind is restless and difficult to restrain, but it is subdued by practice and detachment.",
        author: "Bhagavad Gita 6.35",
    },
    {
        text: "Yoga is the journey of the self, through the self, to the self.",
        author: "Bhagavad Gita 6.20",
    },
    {
        text: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
        author: "Bhagavad Gita 6.19",
    },
    {
        text: "The soul is neither born, and nor does it die. It has not come into being, does not come into being, and will not come into being.",
        author: "Bhagavad Gita 2.20",
    },
    {
        text: "One who sees inaction in action and action in inaction is intelligent among men.",
        author: "Bhagavad Gita 4.18",
    },
    {
        text: "Perform your obligatory duty, because action is indeed better than inaction.",
        author: "Bhagavad Gita 3.8",
    },
    {
        text: "Whatever happened, happened for the good. Whatever is happening, is happening for the good. Whatever will happen, will also happen for the good.",
        author: "Bhagavad Gita",
    },
    {
        text: "A person can rise through the efforts of his own mind; he can also degrade himself. Because each person is his own friend or enemy.",
        author: "Bhagavad Gita 6.5",
    },
    {
        text: "Set your heart upon your work but never its reward.",
        author: "Bhagavad Gita 2.47",
    },
    {
        text: "The wise see that there is action in the midst of inaction and inaction in the midst of action.",
        author: "Bhagavad Gita 4.18",
    },
    {
        text: "As the blazing fire reduces wood to ashes, similarly the fire of self-knowledge reduces all karma to ashes.",
        author: "Bhagavad Gita 4.37",
    },
    {
        text: "Let a man lift himself by his own self alone, let him not lower himself; for this self alone is the friend of oneself.",
        author: "Bhagavad Gita 6.5",
    },
    {
        text: "Through selfless service, you will always be fruitful and find the fulfillment of your desires.",
        author: "Bhagavad Gita 3.10",
    },
    {
        text: "There is neither this world, nor the world beyond. nor happiness for the one who doubts.",
        author: "Bhagavad Gita 4.40",
    },
    {
        text: "The truly wise mourn neither for the living nor the dead.",
        author: "Bhagavad Gita 2.11",
    },
    {
        text: "Reshape yourself through the power of your will. Those who have conquered themselves live in peace.",
        author: "Bhagavad Gita 6.6",
    },
    {
        text: "Arise, awake, and stop not until the goal is achieved.",
        author: "Katha Upanishad 1.3.14",
    },
    {
        text: "The Self is not known through study of scriptures, nor through intellect, nor through hearing. It is known through the Self alone.",
        author: "Katha Upanishad 1.2.23",
    },
    {
        text: "From the unreal lead me to the real, from darkness lead me to the light, from death lead me to immortality.",
        author: "Brihadaranyaka Upanishad 1.3.28",
    },
    {
        text: "As is the human body, so is the cosmic body. As is the human mind, so is the cosmic mind.",
        author: "Yajur Veda",
    },
    {
        text: "Truth alone triumphs, not falsehood. Through truth lies the divine path.",
        author: "Mundaka Upanishad 3.1.6",
    },
    {
        text: "That which is the finest essence — this whole world has that as its soul. That is Reality. That is the Self. That art thou.",
        author: "Chandogya Upanishad 6.8.7",
    },
    {
        text: "The Atman is not attained by the weak, nor by the lazy, nor by those without proper spiritual practices.",
        author: "Mundaka Upanishad 3.2.4",
    },
    {
        text: "He who has no attachments can really love others, for his love is pure and divine.",
        author: "Bhagavad Gita 2.64",
    },
    {
        text: "When a man dwells on the objects of sense, attachment arises. From attachment springs desire, and from desire comes anger.",
        author: "Bhagavad Gita 2.62",
    },
    {
        text: "Better is one's own dharma, though imperfectly performed, than the dharma of another well performed.",
        author: "Bhagavad Gita 3.35",
    },
    {
        text: "He who has conquered his breath, has conquered his mind. He who has conquered his mind, has conquered his world.",
        author: "Hatha Yoga Pradipika",
    },
    {
        text: "May all beings be happy. May all beings be healthy. May all beings experience prosperity. May none in the world suffer.",
        author: "Ancient Vedic Prayer",
    },
    {
        text: "The body is your temple. Keep it pure and clean for the soul to reside in.",
        author: "Ashtanga Vinyasa Yoga",
    },
];

/**
 * DailyQuote - Shows a motivational quote from Vedic wisdom that changes each day
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
