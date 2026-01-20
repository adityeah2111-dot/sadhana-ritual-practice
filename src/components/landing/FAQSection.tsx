import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long is each daily session?",
    answer: "Each session is 20-30 minutes. Short enough to fit into any schedule, long enough to create real change. We respect your time.",
  },
  {
    question: "Do I need any equipment?",
    answer: "No equipment required. All practices are bodyweight-based and can be done anywhere — at home, in a park, or while traveling.",
  },
  {
    question: "What if I miss a day?",
    answer: "Your streak breaks. That's the rule. But you can always return and start again. We track returns, not just streaks. Missing is human. Returning is discipline.",
  },
  {
    question: "Is this safe for beginners?",
    answer: "Yes. The system is progressive. Week 1 is different from Week 12. We meet you where you are and build from there. Always listen to your body.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. No questions asked. Cancel from your account settings. We don't believe in trapping anyone. If Sadhana isn't right for you, leave.",
  },
  {
    question: "How is my data protected?",
    answer: "We follow strict privacy practices. Your data is encrypted. We never sell your information. We don't even show your name to other users. You practice in silence.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, credit/debit cards, and net banking through Razorpay. All transactions are secure and encrypted.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Background accent */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
      />

      <div className="container px-4 lg:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.2em] text-primary mb-4 block"
            >
              FAQ
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-display-sm md:text-display-md font-semibold text-foreground"
            >
              Common questions
            </motion.h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-b border-border group"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary py-6 text-lg font-medium transition-colors duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

