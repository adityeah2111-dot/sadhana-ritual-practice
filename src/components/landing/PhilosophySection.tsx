import { motion } from "framer-motion";
import { Target, Repeat, VolumeX, Sparkles, Quote } from "lucide-react";

const principles = [
  {
    icon: Target,
    title: "Discipline over motivation",
    description: "Motivation fades. Discipline remains. We build systems that don't depend on how you feel.",
    stat: "365",
    statLabel: "days/year",
  },
  {
    icon: Repeat,
    title: "Ritual over routine",
    description: "A routine is something you do. A ritual is something you become. This is your daily sadhana.",
    stat: "15",
    statLabel: "minutes/day",
  },
  {
    icon: VolumeX,
    title: "Silence over noise",
    description: "No social feeds. No influencer culture. No transformation stories. Just you and your practice.",
    stat: "0",
    statLabel: "distractions",
  },
];

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--crimson) / 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, hsl(var(--crimson) / 0.2) 0%, transparent 50%)`
        }} />
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
            <Sparkles className="w-3.5 h-3.5" />
            Our Philosophy
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

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 lg:p-10 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-300 h-full overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Icon */}
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <principle.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-semibold text-foreground mb-3">
                  {principle.title}
                </h3>
                <p className="relative text-muted-foreground leading-relaxed mb-6">
                  {principle.description}
                </p>

                {/* Stat */}
                <div className="relative pt-4 border-t border-border">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold text-primary">{principle.stat}</span>
                    <span className="text-sm text-muted-foreground">{principle.statLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative bg-background border border-border rounded-2xl p-8 lg:p-10 text-center">
            <Quote className="w-8 h-8 text-primary/30 mx-auto mb-4" />
            <blockquote className="text-lg lg:text-xl text-foreground italic mb-4">
              "सत्यं वद। धर्मं चर।"
            </blockquote>
            <p className="text-muted-foreground mb-2">
              Speak the truth. Practice righteousness.
            </p>
            <footer className="text-sm text-muted-foreground">
              — Taittiriya Upanishad
            </footer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophySection;
