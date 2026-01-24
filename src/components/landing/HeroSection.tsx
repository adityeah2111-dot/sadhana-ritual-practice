import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import { useState, useEffect } from "react";

// Background images
const backgroundImages = [
  { url: "/hero-bg-1.jpg", alt: "Morning meditation practice" },
  { url: "/hero-bg-2.jpg", alt: "Yoga warrior pose at sunrise" },
  { url: "/hero-bg-3.jpg", alt: "Focused breathing exercise" },
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  useEffect(() => {
    // Preload images
    backgroundImages.forEach((img, index) => {
      const image = new Image();
      image.src = img.url;
      image.onload = () => {
        setImagesLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });

    // Cycle images every 6 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />

        <AnimatePresence mode="sync">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 dark:filter-none filter sepia-[0.15] saturate-[0.8] contrast-[1.05] brightness-[1.05]"
              style={{
                backgroundImage: imagesLoaded[currentImageIndex]
                  ? `url(${backgroundImages[currentImageIndex].url})`
                  : 'none',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Elegant overlays for text readability */}
        {/* Adjusted gradients: More transparency in middle to let image show, heavy fade at edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)] dark:opacity-80 opacity-60" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      {/* Main content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[100svh] pt-20 pb-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-md rounded-full border border-border/40 shadow-sm">
              <Flame className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold text-foreground/80 uppercase tracking-widest">
                Discipline over motivation
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl xs:text-5xl sm:text-7xl lg:text-[7rem] font-bold tracking-tighter leading-[1.05] mb-8"
          >
            <span className="text-foreground">Your daily</span>
            <br />
            <span className="text-gradient-crimson">ritual.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-8 sm:mb-10 leading-relaxed"
          >
            No choices. No distractions.
            <span className="text-foreground font-medium"> Just show up.</span>
            <br />
            <span className="text-muted-foreground/80">Every day. Same time. Non-negotiable.</span>
          </motion.p>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            <Button
              asChild
              variant="hero"
              size="lg"
              className="w-full sm:w-auto group text-base px-8 py-5 h-auto rounded-lg shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300"
            >
              <Link to="/auth">
                <span>Start Your Practice</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Instant Access • Cancel Anytime
            </p>
          </motion.div>


        </div>
      </div>

      {/* Scroll indicator - visible on all screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border-[1.5px] border-muted-foreground/60 flex items-start justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-primary/70"
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
