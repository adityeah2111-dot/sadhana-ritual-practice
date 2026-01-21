import { motion } from "framer-motion";
import { Flame, Clock, Trophy, Zap, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Commit",
    description: "Choose your daily practice time. Make a commitment. No flexibility, no excuses.",
    icon: Clock,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    number: "02",
    title: "Practice",
    description: "Show up at your time. Complete your 15-30 minute session. No choices to make.",
    icon: Flame,
    gradient: "from-primary to-rose-600",
  },
  {
    number: "03",
    title: "Repeat",
    description: "Day after day. Build your streak. Become the person who practices daily.",
    icon: Trophy,
    gradient: "from-purple-500 to-indigo-600",
  },
];

const benefits = [
  "No equipment needed",
  "15-30 minutes daily",
  "Progressive difficulty",
  "Track your streak",
];

const HowItWorksSection = () => {
  return (
    <section id="practice" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 lg:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-xs uppercase tracking-[0.15em] text-primary mb-6"
          >
            <Zap className="w-3.5 h-3.5" />
            Simple Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-sm md:text-display-md font-semibold text-foreground mb-6"
          >
            Three steps. Every day.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            No complicated programs. No overwhelm. Just a simple system that works.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/30 transition-all duration-300 overflow-hidden">
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Step number */}
                  <div className="relative mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 text-5xl font-bold text-border/50 select-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 relative">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed relative">
                    {step.description}
                  </p>

                  {/* Connector line (hidden on mobile and last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-4 lg:-right-5 w-8 lg:w-10 border-t-2 border-dashed border-border z-10" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card/50 border border-border rounded-2xl p-6 lg:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
