import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface NavbarProps {
  onLaunchApp: () => void;
}

export function Navbar({ onLaunchApp }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-6 md:px-10 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl"
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2.5 group">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 border border-primary/20 group-hover:bg-primary/25 transition-colors">
          <Play className="w-3 h-3 fill-primary text-primary" />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          AlgoLens
        </span>
      </a>

      {/* Center Links */}
      <div className="hidden lg:flex items-center gap-7 text-[13px] text-muted-foreground">
        <a href="#how-it-works" className="hover:text-foreground transition-colors duration-200">How it works</a>
        <a href="#demo" className="hover:text-foreground transition-colors duration-200">Demo</a>
        <a href="#roadmap" className="hover:text-foreground transition-colors duration-200">Roadmap</a>
        <a href="#story" className="hover:text-foreground transition-colors duration-200">Story</a>
      </div>

      {/* CTA */}
      <button
        onClick={onLaunchApp}
        className="h-8 px-4 text-[13px] font-medium text-primary-foreground bg-primary rounded-lg hover:brightness-110 transition-all active:scale-[0.97]"
      >
        Open App
      </button>
    </motion.nav>
  );
}
