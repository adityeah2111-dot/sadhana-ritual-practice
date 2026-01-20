import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" }
    })
};

const Privacy = () => {
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
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-muted-foreground">
                            Your privacy is fundamental to our practice. We collect minimal data and respect your boundaries.
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
                    <div className="max-w-3xl mx-auto prose prose-invert">
                        <motion.section
                            custom={0}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                            <p className="text-muted-foreground mb-4">
                                Sadhana is built with minimalism in mind—we only collect what's necessary:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Account Information:</strong> Email address for authentication purposes.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Practice Data:</strong> Session timestamps and duration to track your streak and progress.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Preferences:</strong> Timezone and preferred practice time for accurate scheduling.</span>
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
                            <h2 className="text-xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
                            <p className="text-muted-foreground mb-4">
                                Your data serves your practice, nothing more:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Track your daily practice streak and maintain continuity</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Send relevant reminders at your preferred practice time</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Authenticate your account securely</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Improve the app based on anonymous usage patterns</span>
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
                            <h2 className="text-xl font-semibold text-foreground mb-4">3. Data Storage & Security</h2>
                            <p className="text-muted-foreground mb-4">
                                Your data is protected with modern security practices:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>All data is encrypted in transit using TLS/SSL</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Data is stored on secure, encrypted servers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>We use Supabase for database and authentication services</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Regular security audits and updates</span>
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
                            <h2 className="text-xl font-semibold text-foreground mb-4">4. What We Don't Do</h2>
                            <p className="text-muted-foreground mb-4">
                                Equally important—here's what we never do:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">✕</span>
                                    <span>We never sell your personal data to third parties</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">✕</span>
                                    <span>We don't use your data for targeted advertising</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">✕</span>
                                    <span>We don't share your practice data with anyone</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">✕</span>
                                    <span>We don't track you across other websites</span>
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
                            <h2 className="text-xl font-semibold text-foreground mb-4">5. Your Rights</h2>
                            <p className="text-muted-foreground mb-4">
                                You have complete control over your data:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Access:</strong> Request a copy of all your data at any time</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Correction:</strong> Update or correct any inaccurate information</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Deletion:</strong> Request complete deletion of your account and all associated data</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Portability:</strong> Export your data in a standard format</span>
                                </li>
                            </ul>
                        </motion.section>

                        <motion.section
                            custom={5}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">6. Cookies & Analytics</h2>
                            <p className="text-muted-foreground mb-4">
                                We use minimal, essential cookies:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Authentication:</strong> To keep you logged in securely</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Preferences:</strong> To remember your settings</span>
                                </li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                We do not use third-party tracking cookies or invasive analytics.
                            </p>
                        </motion.section>

                        <motion.section
                            custom={6}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-card border border-border rounded-lg p-6 lg:p-8"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-4">7. Contact Us</h2>
                            <p className="text-muted-foreground mb-4">
                                Questions about your privacy? Reach out:
                            </p>
                            <p className="text-muted-foreground">
                                Email: <a href="mailto:privacy@sadhana.app" className="text-primary hover:underline">privacy@sadhana.app</a>
                            </p>
                            <p className="text-muted-foreground mt-4 text-sm">
                                We respond to all privacy inquiries within 48 hours.
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

export default Privacy;
