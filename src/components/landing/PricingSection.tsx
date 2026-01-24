import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Shield, Crown, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatAmount, getPlanDetails, type PlanType } from "@/lib/razorpay";

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const monthlyPlan = getPlanDetails('monthly');
  const yearlyPlan = getPlanDetails('yearly');
  const lifetimePlan = getPlanDetails('lifetime');

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-2xl" />
      </div>

      <div className="container px-4 lg:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-xs uppercase tracking-[0.15em] text-primary mb-6"
          >
            <Zap className="w-3.5 h-3.5" />
            Pricing
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Simple. Transparent. <span className="text-gradient-crimson">Fair.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            No hidden fees. No pay-to-skip. Just honest pricing for serious practitioners.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="relative inline-flex items-center bg-card border border-border rounded-full p-1 shadow-sm">
            <div
              className={`absolute top-1 bottom-1 rounded-full bg-primary shadow-md transition-all duration-300 ease-out ${selectedPlan === 'yearly' ? 'translate-x-full' : 'translate-x-0'
                }`}
              style={{
                width: 'calc(50% - 4px)',
                left: '1px',
              }}
            />

            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`relative z-10 px-6 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 min-w-[120px] ${selectedPlan === 'monthly' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`relative z-10 px-6 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 flex items-center gap-2 min-w-[120px] ${selectedPlan === 'yearly' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <span>Yearly</span>
              <span className={`text-xs px-0.5 py-0.5 rounded-full ${selectedPlan === 'yearly' ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                Save 33%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Monthly/Yearly Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">
                {selectedPlan === 'yearly' ? yearlyPlan.name : monthlyPlan.name}
              </h3>
              {selectedPlan === 'yearly' && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  Popular
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlan}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-foreground">
                      {selectedPlan === 'yearly' ? formatAmount(yearlyPlan.amount) : formatAmount(monthlyPlan.amount)}
                    </span>
                    <span className="text-muted-foreground">
                      /{selectedPlan === 'yearly' ? 'year' : 'month'}
                    </span>
                  </div>

                  {selectedPlan === 'yearly' && (
                    <p className="text-sm text-primary font-medium mt-2 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Just ₹200/month - Save {formatAmount(yearlyPlan.savings!)}
                    </p>
                  )}
                </div>

                <p className="text-muted-foreground mb-6">
                  {selectedPlan === 'yearly' ? yearlyPlan.description : monthlyPlan.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <Link to="/checkout" className="block">
              <Button
                variant={selectedPlan === 'yearly' ? 'crimson' : 'subtle'}
                className="w-full mb-6 h-12 text-base font-semibold"
              >
                Start 7-Day Free Trial
              </Button>
            </Link>

            <ul className="space-y-3">
              {(selectedPlan === 'yearly' ? yearlyPlan.features : monthlyPlan.features).map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Lifetime Plan - Featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 p-6 md:p-10 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border-2 border-primary/40 relative overflow-hidden shadow-xl shadow-primary/10"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            {/* Badge */}
            <div className="relative mb-6 md:mb-0 md:absolute md:top-8 md:right-8 w-fit px-4 py-2 bg-gradient-to-r from-primary to-rose-500 text-white text-sm font-bold rounded-full flex items-center gap-2 shadow-lg">
              <Crown className="w-4 h-4" />
              {lifetimePlan.badge}
            </div>

            <div className="relative grid md:grid-cols-2 gap-8">
              {/* Left Column - Pricing */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  {lifetimePlan.name}
                </h3>

                <div className="mb-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-6xl font-bold text-foreground">
                      {formatAmount(lifetimePlan.amount)}
                    </span>
                    <span className="text-2xl text-muted-foreground line-through">
                      {formatAmount(lifetimePlan.originalAmount!)}
                    </span>
                  </div>
                  <p className="text-primary font-bold text-lg mt-2">
                    Save {formatAmount(lifetimePlan.savings!)} - 50% OFF!
                  </p>
                </div>

                <p className="text-muted-foreground mb-6">
                  {lifetimePlan.description}
                </p>

                <Link to="/checkout">
                  <Button variant="hero" size="lg" className="w-fit mb-4 h-12 sm:h-14 text-base sm:text-lg font-bold px-4 sm:px-8">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    Get Lifetime Access Now
                  </Button>
                </Link>

                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Limited time offer</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Features */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-4">Everything included:</p>
                <ul className="space-y-3">
                  {lifetimePlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-medium">7-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-medium">Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            <span className="font-medium">Secure payments via Razorpay</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
