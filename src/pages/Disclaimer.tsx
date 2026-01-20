import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, Flame, Heart, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
    const lastUpdated = "January 21, 2025";

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="h-4 w-4" /><span className="text-sm">Back to Home</span>
                    </Link>
                    <Link to="/" className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-primary" />
                        <span className="text-xl font-semibold text-foreground">Sadhana</span>
                    </Link>
                    <div className="w-24" />
                </div>
            </header>

            <section className="py-16 lg:py-20 border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
                <div className="container px-4 lg:px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">Health Disclaimer</h1>
                        <p className="text-muted-foreground">Important information about using Sadhana for your fitness practice.</p>
                        <p className="text-sm text-muted-foreground mt-4">Last updated: {lastUpdated}</p>
                    </motion.div>
                </div>
            </section>

            <main className="py-12 lg:py-16">
                <div className="container px-4 lg:px-6">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* Important Notice */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 lg:p-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                    <Heart className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-foreground mb-2">Your Health Comes First</h2>
                                    <p className="text-muted-foreground">
                                        Sadhana is designed to support your fitness journey, but it is not a substitute for professional medical advice,
                                        diagnosis, or treatment. Always consult with a qualified healthcare provider before starting any new exercise program.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="bg-card border border-border rounded-lg p-6 lg:p-8">
                            <h2 className="text-xl font-semibold text-foreground mb-4">General Disclaimer</h2>
                            <p className="text-muted-foreground mb-4">
                                The content provided through Sadhana, including but not limited to exercise guidance, practice timers, and motivational content,
                                is for informational and educational purposes only.
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Sadhana does not provide medical advice or diagnose conditions</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Results vary based on individual effort, consistency, and physical condition</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>The app is a tool to support your practice, not replace professional guidance</span>
                                </li>
                            </ul>
                        </motion.section>

                        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="bg-card border border-border rounded-lg p-6 lg:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Activity className="w-5 h-5 text-primary" />
                                <h2 className="text-xl font-semibold text-foreground">Before You Begin</h2>
                            </div>
                            <p className="text-muted-foreground mb-4">Consult a physician before starting if you:</p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Have any pre-existing medical conditions</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Are pregnant or nursing</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Are recovering from injury or surgery</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Take medications that affect physical activity</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Have been inactive for an extended period</span>
                                </li>
                            </ul>
                        </motion.section>

                        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="bg-card border border-border rounded-lg p-6 lg:p-8">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Listen to Your Body</h2>
                            <p className="text-muted-foreground mb-4">
                                During any exercise or practice session:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Stop immediately</strong> if you experience pain, dizziness, or discomfort</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Stay hydrated</strong> and practice in a safe environment</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Warm up properly</strong> before intense activity</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span><strong className="text-foreground">Progress gradually</strong> and respect your limits</span>
                                </li>
                            </ul>
                        </motion.section>

                        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                            className="bg-card border border-border rounded-lg p-6 lg:p-8">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Assumption of Risk</h2>
                            <p className="text-muted-foreground">
                                By using Sadhana, you acknowledge that physical exercise involves inherent risks. You voluntarily assume all risks
                                associated with using this app and performing any exercises. Sadhana and its creators are not responsible for any
                                injuries, health issues, or damages that may result from your use of the service.
                            </p>
                        </motion.section>

                        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                            className="bg-card border border-border rounded-lg p-6 lg:p-8">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Questions?</h2>
                            <p className="text-muted-foreground">
                                If you have concerns about whether Sadhana is right for you, please consult your healthcare provider or
                                contact us at <a href="mailto:health@sadhana.app" className="text-primary hover:underline">health@sadhana.app</a>
                            </p>
                        </motion.section>
                    </div>
                </div>
            </main>

            <footer className="py-8 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Sadhana. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Disclaimer;
