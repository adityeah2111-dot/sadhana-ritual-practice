import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Flame, Send, Clock, CheckCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            toast({ title: 'Missing Information', description: 'Please fill in all required fields.', variant: 'destructive' });
            return;
        }
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast({ title: 'Message Sent', description: "We'll get back to you within 24-48 hours." });
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <header className="border-b border-border bg-card/50 backdrop-blur-sm">
                    <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="h-4 w-4" /><span className="text-sm">Back to Home</span>
                        </Link>
                        <Link to="/" className="hidden md:flex items-center gap-2">
                            <Flame className="w-5 h-5 text-primary" />
                            <span className="text-xl font-semibold text-foreground">Sadhana</span>
                        </Link>
                        <div className="w-24" />
                    </div>
                </header>
                <main className="flex-1 flex items-center justify-center py-20">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto text-center px-4">
                        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-2xl font-semibold text-foreground mb-4">Message Received</h1>
                        <p className="text-muted-foreground mb-8">Thank you for reaching out. We'll get back to you within 24-48 hours.</p>
                        <Link to="/"><Button variant="crimson" size="lg">Return Home</Button></Link>
                    </motion.div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="h-4 w-4" /><span className="text-sm">Back to Home</span>
                    </Link>
                    <Link to="/" className="hidden md:flex items-center gap-2">
                        <Flame className="w-5 h-5 text-primary" />
                        <span className="text-xl font-semibold text-foreground">Sadhana</span>
                    </Link>
                    <div className="w-24" />
                </div>
            </header>

            <section className="py-16 border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
                <div className="container px-4 lg:px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                            <MessageSquare className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">Contact Us</h1>
                        <p className="text-muted-foreground">Questions, feedback, or need support? We're here to help.</p>
                    </motion.div>
                </div>
            </section>

            <main className="py-12 lg:py-16">
                <div className="container px-4 lg:px-6">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-card border border-border rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="font-medium text-foreground">Email Us</h3>
                                </div>
                                <a href="mailto:hello@sadhanaweb.vercel.app" className="text-primary hover:underline">hello@sadhanaweb.vercel.app</a>
                            </div>
                            <div className="bg-card border border-border rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="font-medium text-foreground">Response Time</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">We typically respond within 24-48 hours.</p>
                            </div>
                        </div>

                        <div className="md:col-span-3">
                            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 lg:p-8 space-y-4">
                                <h2 className="text-xl font-semibold text-foreground mb-4">Send a Message</h2>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                                    <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What's this about?" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us how we can help..." rows={5} required
                                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" />
                                </div>
                                <Button type="submit" variant="crimson" size="lg" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Sending...</>) : (<><Send className="w-4 h-4 mr-2" />Send Message</>)}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-8 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Sadhana. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Contact;
