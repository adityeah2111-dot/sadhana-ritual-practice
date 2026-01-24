import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Lock, CreditCard, ArrowLeft, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePayment } from '@/hooks/usePayment';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import razorpayConfig, { formatAmount } from '@/lib/razorpay';

const Checkout = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { initiatePayment, isProcessing, subscription, fetchSubscription } = usePayment();
    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | 'lifetime'>('yearly');

    useEffect(() => {
        if (user) {
            fetchSubscription();
        }
    }, [user]);

    const plans = {
        monthly: {
            ...razorpayConfig.plans.monthly,
            features: [
                'Unlimited practice sessions',
                'Progress tracking & analytics',
                'Practice history heatmap',
                'Custom practice times',
                'Ad-free experience',
                'Priority support',
            ],
            popular: false,
        },
        yearly: {
            ...razorpayConfig.plans.yearly,
            features: [
                'Everything in Monthly',
                'Save ₹1,199 (33% off)',
                'Annual practice insights',
                'Early access to new features',
                'Dedicated support',
                'Lifetime updates',
            ],
            popular: true,
            savings: 1199,
        },
        lifetime: {
            ...razorpayConfig.plans.lifetime,
            features: [
                'Everything in Yearly',
                'One-time payment forever',
                'Founder badge & status',
                'Priority feature requests',
                'Direct access to team',
                'Early beta access',
            ],
            popular: false,
            savings: 5000,
        },
    };

    const handleCheckout = () => {
        if (!user) {
            navigate('/auth');
            return;
        }

        initiatePayment({
            planId: selectedPlan,
            onSuccess: () => {
                navigate('/dashboard');
            },
            onFailure: (error) => {
                console.error('Payment failed:', error);
            },
        });
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(-1)}
                            className="gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Button>

                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-muted-foreground">
                                Secure Checkout
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="max-w-5xl mx-auto">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Choose Your <span className="text-gradient-crimson">Plan</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Start your journey with discipline. 7-day free trial included.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        {/* Plan Selection */}
                        <div className="space-y-6">
                            {/* Billing Toggle */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex items-center justify-center gap-3 p-1.5 bg-muted/50 rounded-full w-fit mx-auto"
                            >
                                <button
                                    onClick={() => setSelectedPlan('monthly')}
                                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${selectedPlan === 'monthly'
                                        ? 'bg-card text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setSelectedPlan('yearly')}
                                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 relative ${selectedPlan === 'yearly'
                                        ? 'bg-card text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    Yearly
                                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        -33%
                                    </span>
                                </button>
                                <button
                                    onClick={() => setSelectedPlan('lifetime')}
                                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 relative ${selectedPlan === 'lifetime'
                                        ? 'bg-card text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    Lifetime
                                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        -50%
                                    </span>
                                </button>
                            </motion.div>

                            {/* Plan Cards */}
                            <div className="space-y-4">
                                {Object.entries(plans).map(([key, plan], index) => (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        onClick={() => setSelectedPlan(key as 'monthly' | 'yearly' | 'lifetime')}
                                        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selectedPlan === key
                                            ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                                            : 'border-border bg-card hover:border-primary/50'
                                            }`}
                                    >
                                        {plan.popular && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                                <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                                    <Sparkles className="w-3 h-3" />
                                                    BEST VALUE
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-3xl font-bold text-foreground">
                                                        {formatAmount(plan.amount)}
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        /{plan.period === 'lifetime' ? 'once' : (plan.period === 'monthly' ? 'month' : 'year')}
                                                    </span>
                                                </div>
                                                {'savings' in plan && (
                                                    <p className="text-sm text-primary font-medium mt-1">
                                                        Save {formatAmount(plan.savings)} per year
                                                    </p>
                                                )}
                                            </div>

                                            <div
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPlan === key
                                                    ? 'border-primary bg-primary'
                                                    : 'border-border'
                                                    }`}
                                            >
                                                {selectedPlan === key && (
                                                    <Check className="w-4 h-4 text-white" />
                                                )}
                                            </div>
                                        </div>

                                        <ul className="space-y-2.5">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm">
                                                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                                    <span className="text-foreground/90">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Trust Badges */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center justify-center gap-6 pt-6 text-sm text-muted-foreground"
                            >
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    Secure Payment
                                </div>
                                <div className="flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    SSL Encrypted
                                </div>
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-4 h-4" />
                                    Razorpay
                                </div>
                            </motion.div>
                        </div>

                        {/* Checkout Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="lg:sticky lg:top-24"
                        >
                            <div className="bg-gradient-to-br from-card via-card to-muted/30 border border-border rounded-2xl p-8 shadow-xl">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-primary" />
                                    Order Summary
                                </h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">
                                            {plans[selectedPlan].name}
                                        </span>
                                        <span className="font-semibold">
                                            {formatAmount(plans[selectedPlan].amount)}
                                        </span>
                                    </div>

                                    {selectedPlan === 'yearly' && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-primary">Savings</span>
                                            <span className="text-primary font-semibold">
                                                -{formatAmount(plans.yearly.savings)}
                                            </span>
                                        </div>
                                    )}

                                    {selectedPlan === 'lifetime' && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-primary">Savings</span>
                                            <span className="text-primary font-semibold">
                                                -{formatAmount(plans.lifetime.savings)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-border">
                                        <div className="flex justify-between items-center text-lg">
                                            <span className="font-bold">Total Due Today</span>
                                            <span className="font-bold text-2xl text-primary">
                                                ₹0
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Free for 7 days, then {formatAmount(plans[selectedPlan].amount)}
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    size="lg"
                                    onClick={handleCheckout}
                                    disabled={isProcessing}
                                    className="w-full h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Start 7-Day Free Trial
                                            <ArrowLeft className="w-5 h-5 rotate-180" />
                                        </span>
                                    )}
                                </Button>

                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    Cancel anytime. No questions asked.
                                </p>

                                {/* Benefits List */}
                                <div className="mt-8 pt-8 border-t border-border">
                                    <h4 className="font-semibold mb-4 text-sm">
                                        What happens next?
                                    </h4>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-primary text-xs font-bold">1</span>
                                            </div>
                                            <span>Instant access to all premium features</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-primary text-xs font-bold">2</span>
                                            </div>
                                            <span>7 days to try everything risk-free</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-primary text-xs font-bold">3</span>
                                            </div>
                                            <span>Billing starts only after trial ends</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Money-back guarantee */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/50 text-center"
                            >
                                <p className="text-sm font-medium text-foreground mb-1">
                                    30-Day Money-Back Guarantee
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Not satisfied? Get a full refund, no questions asked.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
