import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
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

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-background">
      <div className="container px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-primary mb-4 block"
          >
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 lg:p-10 rounded-xl bg-card border border-border hover:border-border/80 transition-colors"
          >
            <h3 className="text-lg font-medium text-muted-foreground mb-2">Monthly</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-semibold text-foreground">₹299</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Link to="/auth">
              <Button variant="subtle" className="w-full mb-8">
                Start Monthly
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

          {/* Yearly Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 lg:p-10 rounded-xl bg-card border-2 border-primary/30 relative glow-crimson-subtle"
          >
            <div className="absolute -top-3 left-8 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Save 33%
            </div>
            <h3 className="text-lg font-medium text-muted-foreground mb-2">Yearly</h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-semibold text-foreground">₹2,399</span>
              <span className="text-muted-foreground">/year</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">That's just ₹200/month</p>
            <Link to="/auth">
              <Button variant="crimson" className="w-full mb-8">
                Start Yearly
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
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          7-day free trial included. Cancel anytime. Prices in INR.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
