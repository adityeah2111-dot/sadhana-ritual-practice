import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const forYou = [
  "You want structure, not options",
  "You value consistency over intensity",
  "You're tired of motivation-dependent routines",
  "You respect discipline and silence",
];

const notForYou = [
  "You want variety and choice every day",
  "You prefer social validation and likes",
  "You're looking for quick transformations",
  "You want entertainment with your workout",
];

const NotForEveryoneSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-display-sm md:text-display-md font-semibold text-foreground mb-6"
          >
            Sadhana is not for everyone.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            And that's intentional. We're building for a specific kind of person.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* For You */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 lg:p-10 rounded-xl bg-background border border-primary/20"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Sadhana is for you if:
            </h3>
            <ul className="space-y-4">
              {forYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not For You */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 lg:p-10 rounded-xl bg-background border border-border"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Sadhana is NOT for you if:
            </h3>
            <ul className="space-y-4">
              {notForYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center mt-0.5">
                    <X className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NotForEveryoneSection;
