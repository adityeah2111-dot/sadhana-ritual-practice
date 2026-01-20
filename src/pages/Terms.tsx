import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" }
    })
};

const Terms = () => {
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
                            <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">
                            Terms of Service
                        </h1>
                        <p className="text-muted-foreground">
                            The principles that govern your practice with Sadhana. Read carefully before beginning.
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
                        <motion.section
                            custom={0}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                            <p className="text-muted-foreground mb-4">
                                By accessing or using Sadhana ("the Service"), you agree to be bound by these Terms of Service.
                                If you do not agree to these terms, do not use the Service.
                            </p>
                            <p className="text-muted-foreground">
                                These terms apply to all users, including visitors, registered users, and premium subscribers.
                            </p>
                        </motion.section>

                        <motion.section
                            custom={1}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                            <p className="text-muted-foreground mb-4">
                                Sadhana is a ritual-based fitness practice platform designed to help users build consistent
                                daily exercise habits through:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Timed practice sessions with guided structure</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Streak tracking and progress visualization</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Daily practice reminders</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Community accountability features</span>
                                </li>
                            </ul>
                        </motion.section>

                        <motion.section
                            custom={2}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">3. User Accounts</h2>
                            <p className="text-muted-foreground mb-4">
                                To access certain features, you must create an account. You agree to:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Provide accurate and complete registration information</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Maintain the security of your password</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Accept responsibility for all activities under your account</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Notify us immediately of any unauthorized use</span>
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
                            <h2 className="text-xl font-semibold text-foreground mb-4">4. The Practice Commitment</h2>
                            <p className="text-muted-foreground mb-4">
                                Sadhana is built on the principle of daily discipline. By using this service, you acknowledge:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Progress requires consistent daily effort from you</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>The app provides structure, but results depend on your commitment</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Breaking your streak is part of the journey—the practice continues</span>
                                </li>
                            </ul>
                        </motion.section>

                        <motion.section
                            custom={4}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">5. Subscription & Payment</h2>
                            <p className="text-muted-foreground mb-4">
                                Sadhana offers both free and premium tiers:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Free Tier:</strong> Basic practice tracking and reminders</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Premium:</strong> Advanced analytics, unlimited history, priority support</span>
                                </li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                Premium subscriptions are billed monthly or annually. You may cancel at any time,
                                and your subscription will remain active until the end of the billing period.
                            </p>
                        </motion.section>

                        <motion.section
                            custom={5}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">6. Acceptable Use</h2>
                            <p className="text-muted-foreground mb-4">
                                You agree not to:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">✕</span>
                                    <span>Use the Service for any unlawful purpose</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">✕</span>
                                    <span>Attempt to gain unauthorized access to the Service</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">✕</span>
                                    <span>Interfere with or disrupt the Service's infrastructure</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">✕</span>
                                    <span>Share your account credentials with others</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">✕</span>
                                    <span>Use automated tools to access the Service without permission</span>
                                </li>
                            </ul>
                        </motion.section>

                        <motion.section
                            custom={6}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
                            <p className="text-muted-foreground mb-4">
                                The Service is provided "as is" without warranties of any kind. Sadhana is not liable for:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Any injuries resulting from exercises performed during practice</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Service interruptions or data loss</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Inability to achieve fitness goals</span>
                                </li>
                            </ul>
                            <p className="text-muted-foreground mt-4 text-sm bg-primary/5 p-3 rounded-md border border-primary/10">
                                <strong className="text-foreground">Important:</strong> Please consult a healthcare professional
                                before beginning any exercise program. See our Health Disclaimer for more information.
                            </p>
                        </motion.section>

                        <motion.section
                            custom={7}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">8. Termination</h2>
                            <p className="text-muted-foreground mb-4">
                                Either party may terminate this agreement at any time:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">By You:</strong> Delete your account through settings or contact support</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">By Us:</strong> If you violate these terms or engage in harmful behavior</span>
                                </li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                Upon termination, your data will be handled according to our Privacy Policy.
                            </p>
                        </motion.section>

                        <motion.section
                            custom={8}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">9. Contact</h2>
                            <p className="text-muted-foreground mb-4">
                                Questions about these terms? Reach out:
                            </p>
                            <p className="text-muted-foreground">
                                Email: <a href="mailto:legal@sadhana.app" className="text-primary hover:underline">legal@sadhana.app</a>
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

export default Terms;
