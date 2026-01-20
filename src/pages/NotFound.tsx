import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Flame, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /><span className="text-sm">Back to Home</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            <span className="text-xl font-semibold text-foreground">Sadhana</span>
          </Link>
          <div className="w-24" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-md mx-auto">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-[120px] lg:text-[160px] font-bold leading-none bg-gradient-to-b from-primary via-primary/60 to-primary/20 bg-clip-text text-transparent">
              404
            </span>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6"
          >
            <Search className="w-8 h-8 text-primary" />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-3">
              Page Not Found
            </h1>
            <p className="text-muted-foreground mb-2">
              The path you seek does not exist.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Perhaps you were looking for your practice?
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/">
              <Button variant="crimson" size="lg" className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Flame className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Zen Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-sm text-muted-foreground italic"
          >
            "The obstacle is the path."
          </motion.p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border relative z-10 text-center">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Sadhana. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NotFound;
