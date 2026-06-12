import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  Brackets,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

interface SidebarItem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface SidebarCategory {
  name: string;
  icon: string;
  items: SidebarItem[];
}

const CATEGORIES: SidebarCategory[] = [
  {
    name: "Searching",
    icon: "search",
    items: [
      { id: "linear-search", title: "Linear Search", difficulty: "Easy" },
      { id: "binary-search", title: "Binary Search", difficulty: "Easy" },
    ],
  },
  {
    name: "Linked Lists",
    icon: "network",
    items: [
      { id: "sll-search", title: "Search in Singly Linked List", difficulty: "Easy" },
    ],
  },
  {
    name: "Arrays",
    icon: "layers",
    items: [
      { id: "two-sum", title: "Two Sum", difficulty: "Easy" },
      { id: "stock-buy-sell", title: "Stock Buy and Sell", difficulty: "Medium" },
      { id: "kadane", title: "Kadane's Algorithm", difficulty: "Medium" },
      { id: "majority-element-1", title: "Majority Element 1", difficulty: "Easy" },
      { id: "majority-element-2", title: "Majority Element 2", difficulty: "Hard" },
    ],
  },
  {
    name: "Sorting",
    icon: "arrow-up-down",
    items: [
      { id: "bubble-sort", title: "Bubble Sort", difficulty: "Easy" },
      { id: "selection-sort", title: "Selection Sort", difficulty: "Easy" },
      { id: "insertion-sort", title: "Insertion Sort", difficulty: "Easy" },
      { id: "quick-sort", title: "Quick Sort", difficulty: "Medium" },
      { id: "merge-sort", title: "Merge Sort", difficulty: "Medium" },
      { id: "radix-sort", title: "Radix Sort", difficulty: "Medium" },
      { id: "counting-sort", title: "Counting Sort", difficulty: "Medium" },
    ],
  },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  brackets: <Brackets size={15} />,
  "arrow-up-down": <ArrowUpDown size={15} />,
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Hard: "bg-red-500/10 text-red-500 border-red-500/20",
};

interface SidebarProps {
  activeAlgorithm: string;
  onSelectAlgorithm: (id: string) => void;
}

export function Sidebar({ activeAlgorithm, onSelectAlgorithm }: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(CATEGORIES.map((c) => c.name))
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCategory = (name: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles size={14} className="text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground leading-tight">
              DSA Visual
            </span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest">
              Learn by Seeing
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold px-2 mb-2">
          Topics
        </div>

        {CATEGORIES.map((category) => {
          const isExpanded = expandedCategories.has(category.name);
          return (
            <div key={category.name} className="mb-1">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.name)}
                className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm font-medium text-foreground/80 hover:bg-muted/50 transition-colors"
              >
                {ICON_MAP[category.icon]}
                <span className="flex-1 text-left text-xs">{category.name}</span>
                {isExpanded ? (
                  <ChevronDown size={13} className="text-muted-foreground" />
                ) : (
                  <ChevronRight size={13} className="text-muted-foreground" />
                )}
              </button>

              {/* Items */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {category.items.map((item) => {
                    const isActive = item.id === activeAlgorithm;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectAlgorithm(item.id);
                          setIsMobileOpen(false);
                        }}
                        className={`relative flex items-center gap-2 w-full pl-7 pr-2 py-1.5 rounded-md text-xs transition-all ${
                          isActive
                            ? "text-primary font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-md bg-primary/10"
                            layoutId="sidebar-active"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                        <span className="relative flex-1 text-left leading-tight py-1">{item.title}</span>
                        <Badge
                          variant="outline"
                          className={`relative ml-auto text-[9px] px-1.5 py-0 h-4 ${
                            DIFFICULTY_COLORS[item.difficulty]
                          }`}
                        >
                          {item.difficulty}
                        </Badge>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border">
        <div className="text-[10px] text-muted-foreground text-center">
          Press{" "}
          <kbd className="px-1 py-0.5 rounded border border-border bg-muted text-[9px] font-mono">
            Space
          </kbd>{" "}
          to play
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-3 left-3 z-50 lg:hidden p-2 rounded-lg bg-card border border-border shadow-lg"
      >
        {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-border bg-sidebar h-screen sticky top-0 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsMobileOpen(false)}
          />
          <motion.aside
            className="fixed left-0 top-0 bottom-0 w-64 z-50 bg-sidebar border-r border-border shadow-2xl lg:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {sidebarContent}
          </motion.aside>
        </>
      )}
    </>
  );
}
