import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I've tried every fitness app. Sadhana is the only one that stuck. Because it doesn't let me choose. It just demands I show up.",
    author: "Arjun M.",
    context: "127 days streak",
    location: "Mumbai",
  },
  {
    quote: "The silence is what got me. No leaderboards, no likes. Just me and my practice. It feels like my grandfather's discipline, made digital.",
    author: "Priya K.",
    context: "89 days streak",
    location: "Bangalore",
  },
  {
    quote: "I wake up at 5 AM now. Not for motivation. Because it's what I do. Sadhana rewired how I think about consistency.",
    author: "Vikram S.",
    context: "203 days streak",
    location: "Delhi",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="container px-4 lg:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-primary mb-4 block"
          >
            Practitioners
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-sm md:text-display-md font-semibold text-foreground"
          >
            Those who practice, speak.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="p-8 lg:p-10 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-500 h-full flex flex-col">
                {/* Quote icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-primary/30 group-hover:text-primary/50 transition-colors" />
                </div>

                {/* Quote text */}
                <p className="text-foreground/90 leading-relaxed mb-8 flex-1 text-[15px]">
                  "{testimonial.quote}"
                </p>

                {/* Author info */}
                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                        {testimonial.context}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 lg:mt-20 flex flex-wrap items-center justify-center gap-8 lg:gap-16 text-center"
        >
          <div>
            <p className="text-3xl lg:text-4xl font-semibold text-foreground mb-1">10,000+</p>
            <p className="text-sm text-muted-foreground">Active practitioners</p>
          </div>
          <div className="w-px h-12 bg-border hidden lg:block" />
          <div>
            <p className="text-3xl lg:text-4xl font-semibold text-foreground mb-1">2.1M+</p>
            <p className="text-sm text-muted-foreground">Sessions completed</p>
          </div>
          <div className="w-px h-12 bg-border hidden lg:block" />
          <div>
            <p className="text-3xl lg:text-4xl font-semibold text-foreground mb-1">87%</p>
            <p className="text-sm text-muted-foreground">30-day retention</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
