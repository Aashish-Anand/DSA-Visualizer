import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { ProblemSection } from "./sections/ProblemSection";
import { HowItWorks } from "./sections/HowItWorks";
import { InteractiveDemo } from "./sections/InteractiveDemo";
import { FeaturesGrid } from "./sections/FeaturesGrid";
import { Roadmap } from "./sections/Roadmap";
import { FounderStory } from "./sections/FounderStory";
import { FinalCTA } from "./sections/FinalCTA";
import { Footer } from "./sections/Footer";

interface LandingPageProps {
  onLaunchApp: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export function LandingPage({ onLaunchApp, isDark, toggleTheme }: LandingPageProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Subtle dot grid background */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Navbar onLaunchApp={onLaunchApp} isDark={isDark} toggleTheme={toggleTheme} />

      <main>
        <HeroSection onLaunchApp={onLaunchApp} />
        <ProblemSection />
        <HowItWorks />
        <FeaturesGrid />
        <InteractiveDemo />
        <Roadmap />
        <FounderStory />
        <FinalCTA onLaunchApp={onLaunchApp} />
      </main>

      <Footer />
    </div>
  );
}
