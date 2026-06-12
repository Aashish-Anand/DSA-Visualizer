import { useState, useEffect, useLayoutEffect } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { AlgorithmPage } from "@/pages/AlgorithmPage";
import { LandingPage } from "@/pages/LandingPage/LandingPage";

function App() {
  const [currentView, setCurrentView] = useState<"landing" | "app">("landing");
  const [activeAlgorithm, setActiveAlgorithm] = useState("bubble-sort");
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("algoLens-theme");
      if (storedTheme) {
        return storedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem("algoLens-theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  // Setup Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#/app") {
        setCurrentView("app");
      } else {
        setCurrentView("landing");
      }
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Apply dark mode class to html element based solely on state
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Listen for system theme changes (only if no stored preference)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("algoLens-theme")) {
        setIsDark(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleLaunchApp = () => {
    window.location.hash = "#/app";
  };

  if (currentView === "landing") {
    return (
      <LandingPage 
        onLaunchApp={handleLaunchApp} 
        isDark={isDark}
        toggleTheme={toggleTheme} 
      />
    );
  }

  return (
    <div className="flex min-h-[100dvh] lg:h-screen bg-background text-foreground overflow-y-auto lg:overflow-hidden">
      <Sidebar
        activeAlgorithm={activeAlgorithm}
        onSelectAlgorithm={setActiveAlgorithm}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      <main className="flex-1 min-w-0 lg:overflow-hidden">
        <AlgorithmPage key={activeAlgorithm} algorithmId={activeAlgorithm} />
      </main>
    </div>
  );
}

export default App;
