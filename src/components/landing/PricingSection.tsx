import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Shield, Crown, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  "Daily guided practice sessions",
  "Progressive difficulty system",
  "Streak tracking and accountability",
  "Alarm-style reminders",
  "Progress analytics",
  "No ads, ever",
];

const lifetimeFeatures = [
  ...features,
  "Priority support",
  "Early access to new features",
  "Founder badge on profile",
];

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
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
            <Zap className="w-3.5 h-3.5" />
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-sm md:text-display-md font-semibold text-foreground mb-6"
          >
            Simple. Transparent. Fair.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            No hidden fees. No pay-to-skip. Just honest pricing.
          </motion.p>
        </div>

        {/* Billing Toggle - Improved Mobile Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-center justify-center mb-10 sm:mb-12"
        >
          <div className="relative inline-flex items-center bg-card border border-border rounded-full p-1 shadow-sm">
            {/* Background slider */}
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-primary shadow-md"
              initial={false}
              animate={{
                left: isYearly ? 'calc(50% + 2px)' : '4px',
                right: isYearly ? '4px' : 'calc(50% + 2px)',
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />

            {/* Monthly button */}
            <button
              onClick={() => setIsYearly(false)}
              className={`relative z-10 px-4 sm:px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${!isYearly ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Monthly
            </button>

            {/* Yearly button */}
            <button
              onClick={() => setIsYearly(true)}
              className={`relative z-10 px-4 sm:px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200 flex items-center gap-1.5 ${isYearly ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Yearly
              <span className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full transition-colors ${isYearly ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                }`}>
                -33%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Monthly/Yearly Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 h-full"
          >
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {isYearly ? 'Yearly' : 'Monthly'}
            </h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={isYearly ? 'yearly' : 'monthly'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-baseline gap-1 mb-2"
              >
                <span className="text-4xl font-bold text-foreground">
                  {isYearly ? '₹2,399' : '₹299'}
                </span>
                <span className="text-muted-foreground">
                  /{isYearly ? 'year' : 'month'}
                </span>
              </motion.div>
            </AnimatePresence>
            {isYearly && (
              <p className="text-sm text-muted-foreground mb-6">That's just ₹200/month</p>
            )}
            {!isYearly && <div className="mb-6" />}
            <Link to="/auth">
              <Button variant={isYearly ? "crimson" : "subtle"} className="w-full mb-8">
                Start Free Trial
              </Button>
            </Link>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Lifetime Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border-2 border-primary/30 relative overflow-hidden h-full"
          >
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="absolute -top--1 right-8 px-4 py-1 bg-gradient-to-r from-primary to-rose-500 text-white text-xs font-medium rounded-full flex items-center gap-1.5 shadow-lg">
              <Crown className="w-3.5 h-3.5" />
              Best Value
            </div>

            <div className="relative space-y-6">
              <div>
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Lifetime Access</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-foreground">₹4,999</span>
                  <span className="text-muted-foreground line-through">₹9,999</span>
                </div>
                <p className="text-sm text-primary font-medium mb-6">One-time payment. Forever access.</p>
                <Link to="/auth">
                  <Button variant="hero" size="lg" className="w-full mb-4">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Lifetime Access
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground text-center">
                  Limited availability • 30-day guarantee
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-4">Everything included:</p>
                <ul className="space-y-2.5">
                  {lifetimeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>7-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span>Prices in INR</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
