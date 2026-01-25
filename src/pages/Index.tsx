import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import PhilosophySection from "@/components/landing/PhilosophySection";
import BackToTop from "@/components/ui/BackToTop";
import SkipLink from "@/components/ui/SkipLink";
import SectionSkeleton from "@/components/ui/SectionSkeleton";

// Lazy load below-the-fold sections for better initial page load
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const NotForEveryoneSection = lazy(() => import("@/components/landing/NotForEveryoneSection"));
const LearnSection = lazy(() => import("@/components/landing/LearnSection"));
const PricingSection = lazy(() => import("@/components/landing/PricingSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const CTASection = lazy(() => import("@/components/landing/CTASection"));
const Footer = lazy(() => import("@/components/landing/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sadhana | Your Daily Practice - Ritual-Based Fitness System</title>
        <meta name="description" content="Sadhana is a ritual-based fitness system for those done with motivation. No choices, no distractions. Show up. Practice. Leave. Repeat. Discipline over motivation." />
        <link rel="canonical" href="https://sadhanaweb.vercel.app/" />
      </Helmet>
      {/* Skip link for keyboard users */}
      <SkipLink href="#main-content">Skip to main content</SkipLink>

      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        {/* Above the fold - load immediately */}
        <HeroSection />
        <PhilosophySection />

        {/* Below the fold - lazy load for performance */}
        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <HowItWorksSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="600px" />}>
          <TestimonialsSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <NotForEveryoneSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <LearnSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="600px" />}>
          <PricingSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <FAQSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <CTASection />
        </Suspense>
      </main>

      <Suspense fallback={<SectionSkeleton height="300px" />}>
        <Footer />
      </Suspense>

      <BackToTop />
    </div>
  );
};

export default Index;
