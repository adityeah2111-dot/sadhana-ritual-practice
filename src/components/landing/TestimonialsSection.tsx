import { motion } from "framer-motion";
import { Quote, Star, Users, Flame, TrendingUp } from "lucide-react";

const testimonials = [
  {
    quote: "I've tried every fitness app. Sadhana is the only one that stuck. Because it doesn't let me choose. It just demands I show up.",
    author: "Arjun M.",
    context: "127 days streak",
    location: "Mumbai",
    avatar: "A",
    rating: 5,
  },
  {
    quote: "The silence is what got me. No leaderboards, no likes. Just me and my practice. It feels like my grandfather's discipline, made digital.",
    author: "Priya K.",
    context: "89 days streak",
    location: "Bangalore",
    avatar: "P",
    rating: 5,
  },
  {
    quote: "I wake up at 5 AM now. Not for motivation. Because it's what I do. Sadhana rewired how I think about consistency.",
    author: "Vikram S.",
    context: "203 days streak",
    location: "Delhi",
    avatar: "V",
    rating: 5,
  },
];

const stats = [
  { value: "10,000+", label: "Active practitioners", icon: Users },
  { value: "2.1M+", label: "Sessions completed", icon: Flame },
  { value: "87%", label: "30-day retention", icon: TrendingUp },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Gradient accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      <div className="container px-4 lg:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-xs uppercase tracking-[0.15em] text-primary mb-6"
          >
            <Users className="w-3.5 h-3.5" />
            Practitioners
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-sm md:text-display-md font-semibold text-foreground mb-6"
          >
            Those who practice, speak.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Real stories from real practitioners building daily discipline.
          </motion.p>
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
              <div className="p-8 lg:p-10 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Rating */}
                <div className="relative flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote icon */}
                <div className="relative mb-4">
                  <Quote className="w-8 h-8 text-primary/20" />
                </div>

                {/* Quote text */}
                <p className="relative text-foreground/90 leading-relaxed mb-8 flex-1 text-[15px]">
                  "{testimonial.quote}"
                </p>

                {/* Author info */}
                <div className="relative pt-6 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {testimonial.avatar}
                      </span>
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>

                    {/* Streak badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full">
                      <Flame className="w-3 h-3" />
                      {testimonial.context}
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
          className="mt-16 lg:mt-20"
        >
          <div className="max-w-3xl mx-auto bg-card/50 border border-border rounded-2xl p-8">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
