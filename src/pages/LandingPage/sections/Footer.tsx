import { Play } from "lucide-react";
import { useFeedbackContext } from "@/hooks/useFeedbackContext";

export function Footer() {
  const { openModal } = useFeedbackContext();

  return (
    <footer className="border-t border-foreground/[0.04] px-6 md:px-10 py-10">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/15 border border-primary/20">
            <Play className="w-2.5 h-2.5 fill-primary text-primary" />
          </div>
          <span className="text-[13px] font-semibold tracking-tight text-foreground">
            AlgoLens
          </span>
        </div>

        <div className="flex items-center gap-6 text-[12px] text-muted-foreground">
          <a href="#roadmap" className="hover:text-foreground transition-colors">
            Roadmap
          </a>
          <a href="#story" className="hover:text-foreground transition-colors">
            Story
          </a>
          <button
            onClick={openModal}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Feedback
          </button>
        </div>

        <p className="text-[12px] text-muted-foreground/60">
          © {new Date().getFullYear()} AlgoLens
        </p>
      </div>
    </footer>
  );
}

