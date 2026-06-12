import { useState, useEffect, useLayoutEffect } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { AlgorithmPage } from "@/pages/AlgorithmPage";
import { LandingPage } from "@/pages/LandingPage/LandingPage";

function App() {
  const [currentView, setCurrentView] = useState<"landing" | "app">("landing");
  const [activeAlgorithm, setActiveAlgorithm] = useState("bubble-sort");
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  // Landing page is always dark mode. App view follows system preference.
  useLayoutEffect(() => {
    const shouldBeDark = currentView === "landing" ? true : isDark;
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, [isDark, currentView]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (currentView === "landing") {
    return <LandingPage onLaunchApp={() => setCurrentView("app")} />;
  }

  return (
    <div className="flex min-h-[100dvh] lg:h-screen bg-background text-foreground overflow-y-auto lg:overflow-hidden">
      <Sidebar
        activeAlgorithm={activeAlgorithm}
        onSelectAlgorithm={setActiveAlgorithm}
      />
      <main className="flex-1 min-w-0 lg:overflow-hidden">
        <AlgorithmPage key={activeAlgorithm} algorithmId={activeAlgorithm} />
      </main>
    </div>
  );
}

export default App;
