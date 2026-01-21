import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Target, Brain, Sparkles, ChevronRight, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const articles = [
    {
        id: 'discipline-over-motivation',
        category: 'Discipline',
        title: 'Why Discipline Beats Motivation',
        excerpt: 'Motivation is fleeting. Discipline is lasting. Learn why building systems of discipline will transform your practice.',
        icon: Target,
        gradient: 'from-red-500 to-orange-500',
    },
    {
        id: 'habit-formation',
        category: 'Habit Formation',
        title: 'The Science of Unbreakable Habits',
        excerpt: 'Understanding the habit loop and how to use cue, routine, and reward to build lasting practices.',
        icon: Brain,
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        id: 'yoga-philosophy',
        category: 'Yoga Philosophy',
        title: 'The Eight Limbs of Yoga',
        excerpt: 'Beyond asanas lies a complete system for living. Explore Patanjali\'s timeless wisdom.',
        icon: Flower2,
        gradient: 'from-teal-500 to-emerald-500',
    },
];

const LearnSection = () => {
    return (
        <section id="learn" className="py-24 lg:py-32 bg-card/30 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container px-4 lg:px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-xs uppercase tracking-[0.15em] text-primary mb-6"
                    >
                        <BookOpen className="w-3.5 h-3.5" />
                        Learn
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-display-sm md:text-display-md font-semibold text-foreground mb-6"
                    >
                        Knowledge for the <span className="text-gradient-crimson">Disciplined Mind</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-muted-foreground"
                    >
                        Explore the philosophy, science, and practice behind building an unshakeable daily ritual.
                    </motion.p>
                </div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {articles.map((article, index) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                            className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                        >
                            {/* Gradient top bar */}
                            <div className={`h-1.5 bg-gradient-to-r ${article.gradient}`} />

                            <div className="p-6">
                                {/* Category */}
                                <div className="flex items-center gap-2 mb-3">
                                    <article.icon className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                                        {article.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                    {article.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {article.excerpt}
                                </p>

                                {/* Read link */}
                                <Link
                                    to="/learn"
                                    className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all"
                                >
                                    Read article
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center"
                >
                    <Link to="/learn">
                        <Button variant="subtle" size="lg" className="gap-2">
                            <Sparkles className="w-4 h-4" />
                            Explore All Articles
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default LearnSection;
