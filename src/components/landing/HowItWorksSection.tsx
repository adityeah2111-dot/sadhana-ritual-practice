import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Commit",
    description: "Choose your daily practice time. Make a commitment. No flexibility, no excuses.",
  },
  {
    number: "02",
    title: "Practice",
    description: "Show up at your time. Complete your 20-30 minute session. No choices to make.",
  },
  {
    number: "03",
    title: "Repeat",
    description: "Day after day. Build your streak. Become the person who practices daily.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="practice" className="py-24 lg:py-32 bg-background">
      <div className="container px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-primary mb-4 block"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-sm md:text-display-md font-semibold text-foreground"
          >
            Three steps. Every day.
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Number circle */}
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center z-10 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <span className="text-lg font-semibold text-primary">{step.number}</span>
                </div>

                {/* Content */}
                <div className={`flex-1 pt-4 md:pt-0 ${index % 2 === 0 ? "md:pr-24 md:text-right" : "md:pl-24 md:text-left"}`}>
                  <div className="md:max-w-sm inline-block">
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
