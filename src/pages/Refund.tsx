import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, Flame, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" }
    })
};

const Refund = () => {
    const lastUpdated = "January 21, 2025";

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="flex items-center justify-between h-16">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="text-sm">Back to Home</span>
                        </Link>
                        <Link to="/" className="flex items-center gap-2">
                            <Flame className="w-5 h-5 text-primary" />
                            <span className="text-xl font-semibold tracking-tight text-foreground">
                                Sadhana
                            </span>
                        </Link>
                        <div className="w-24" />
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="py-16 lg:py-20 border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
                <div className="container px-4 lg:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <RotateCcw className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">
                            Refund Policy
                        </h1>
                        <p className="text-muted-foreground">
                            We stand behind our practice. If Sadhana isn't right for you, we'll make it right.
                        </p>
                        <p className="text-sm text-muted-foreground mt-4">
                            Last updated: {lastUpdated}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <main className="py-12 lg:py-16">
                <div className="container px-4 lg:px-6">
                    <div className="max-w-3xl mx-auto">
                        {/* Guarantee Banner */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 mb-8 text-center"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                                <CheckCircle className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground mb-2">
                                30-Day Money-Back Guarantee
                            </h2>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                Try Sadhana risk-free. If you're not satisfied within the first 30 days,
                                we'll refund your payment in full—no questions asked.
                            </p>
                        </motion.div>

                        <motion.section
                            custom={0}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">Eligibility</h2>
                            <p className="text-muted-foreground mb-4">
                                Our refund policy applies to:
                            </p>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                        <span className="text-primary text-xs">✓</span>
                                    </div>
                                    <span><strong className="text-foreground">Monthly Subscriptions:</strong> Full refund if requested within 30 days of your first payment</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                        <span className="text-primary text-xs">✓</span>
                                    </div>
                                    <span><strong className="text-foreground">Annual Subscriptions:</strong> Full refund if requested within 30 days of purchase</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                        <span className="text-primary text-xs">✓</span>
                                    </div>
                                    <span><strong className="text-foreground">Lifetime Access:</strong> Full refund if requested within 30 days of purchase</span>
                                </li>
                            </ul>
                        </motion.section>

                        <motion.section
                            custom={1}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">How to Request a Refund</h2>
                            <div className="space-y-4 text-muted-foreground">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary font-medium">1</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Send us an email</p>
                                        <p className="text-sm">Contact us at <a href="mailto:support@sadhanaweb.vercel.app" className="text-primary hover:underline">support@sadhanaweb.vercel.app</a> with your refund request</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary font-medium">2</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Include your details</p>
                                        <p className="text-sm">Provide your account email and the reason for refund (optional, but helpful)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary font-medium">3</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Receive your refund</p>
                                        <p className="text-sm">We'll process your refund within 5-7 business days</p>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section
                            custom={2}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">After the 30-Day Period</h2>
                            <p className="text-muted-foreground mb-4">
                                After 30 days, refunds are evaluated on a case-by-case basis. We may offer:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Pro-rated refunds</strong> for annual subscriptions if significant issues occur</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Account credits</strong> for future use</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Subscription pause</strong> if you need a break</span>
                                </li>
                            </ul>
                        </motion.section>

                        <motion.section
                            custom={3}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">Cancellation vs. Refund</h2>
                            <p className="text-muted-foreground mb-4">
                                These are different processes:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-background border border-border rounded-lg p-4">
                                    <h3 className="font-medium text-foreground mb-2">Cancellation</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Stops future billing. Your subscription remains active until the end of your current billing period.
                                    </p>
                                </div>
                                <div className="bg-background border border-border rounded-lg p-4">
                                    <h3 className="font-medium text-foreground mb-2">Refund</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Returns your money and cancels access immediately. Only available within 30 days.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section
                            custom={4}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">Questions?</h2>
                            <p className="text-muted-foreground mb-4">
                                We're here to help. If you have any questions about refunds or billing:
                            </p>
                            <p className="text-muted-foreground">
                                Email: <a href="mailto:support@sadhanaweb.vercel.app" className="text-primary hover:underline">support@sadhanaweb.vercel.app</a>
                            </p>
                            <p className="text-muted-foreground mt-4 text-sm">
                                Our support team typically responds within 24 hours.
                            </p>
                        </motion.section>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 border-t border-border">
                <div className="container px-4 lg:px-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Sadhana. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Refund;
