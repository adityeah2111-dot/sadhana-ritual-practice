import { motion } from "framer-motion";
import { Target, Repeat, Volume2 } from "lucide-react";

const principles = [
  {
    icon: Target,
    title: "Discipline over motivation",
    description: "Motivation fades. Discipline remains. We build systems that don't depend on how you feel.",
  },
  {
    icon: Repeat,
    title: "Ritual over routine",
    description: "A routine is something you do. A ritual is something you become. This is your daily sadhana.",
  },
  {
    icon: Volume2,
    title: "Silence over noise",
    description: "No social feeds. No influencer culture. No transformation stories. Just you and your practice.",
  },
];

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="py-24 lg:py-32 bg-card">
      <div className="container px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-primary mb-4 block"
          >
            Philosophy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-sm md:text-display-md font-semibold text-foreground mb-6"
          >
            This is not a fitness app.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Sadhana is a practice system built on ancient principles of discipline. 
            It's for people who are done with motivation-dependent fitness.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-8 lg:p-10 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <principle.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
