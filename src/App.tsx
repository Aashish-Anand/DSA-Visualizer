import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { AlgorithmPage } from "@/pages/AlgorithmPage";

function App() {
  const [activeAlgorithm, setActiveAlgorithm] = useState("bubble-sort");
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  // Apply dark mode class to html element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar
        activeAlgorithm={activeAlgorithm}
        onSelectAlgorithm={setActiveAlgorithm}
      />
      <main className="flex-1 overflow-hidden">
        <AlgorithmPage key={activeAlgorithm} algorithmId={activeAlgorithm} />
      </main>
    </div>
  );
}

export default App;
