import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { LinkedListState } from "@/types";

interface LinkedListVisualizerProps {
  state: LinkedListState;
}

export function LinkedListVisualizer({ state }: LinkedListVisualizerProps) {
  const { nodes, headId, currId, target, foundId, status } = state;

  return (
    <div className="flex flex-col items-center w-full h-full p-4 overflow-x-auto min-h-[400px]">
      {/* Target Info */}
      <div className="flex flex-col items-center gap-2 mb-12 shrink-0">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Target</span>
        <div className={`w-14 h-14 flex items-center justify-center rounded-xl border-2 text-xl font-mono shadow-md transition-colors ${
          status === "found" ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-[0_0_15px_hsla(142,71%,45%,0.3)]" :
          status === "not-found" ? "bg-red-500/10 border-red-500 text-red-500" :
          "bg-card border-primary/50 text-foreground"
        }`}>
          {target}
        </div>
      </div>

      {/* Linked List */}
      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex items-center p-8 bg-card/30 rounded-2xl border border-border/50 min-w-max mx-auto">
        <AnimatePresence mode="popLayout">
          {nodes.map((node, index) => {
            const isHead = node.id === headId;
            const isCurr = node.id === currId;
            const isFound = node.id === foundId;
            const isSearched = currId !== null && nodes.findIndex(n => n.id === currId) > index;
            
            // If we found it, or if we've passed it, or if it's the current one
            const isActivePath = isSearched || isCurr || isFound;

            return (
              <div key={node.id} className="flex items-center shrink-0">
                
                {/* Node Container */}
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col items-center gap-3 relative"
                >
                  {/* Pointers (Top) */}
                  <div className="h-6 flex gap-2">
                    {isHead && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-bold text-primary">
                        HEAD
                      </motion.div>
                    )}
                    {isCurr && !isFound && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-bold text-amber-500">
                        CURR
                      </motion.div>
                    )}
                  </div>

                  {/* Node Box */}
                  <motion.div
                    className={`flex items-stretch rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                      isFound ? "border-emerald-500 shadow-[0_0_20px_hsla(142,71%,45%,0.4)] scale-110 z-10" :
                      isCurr ? "border-amber-500 shadow-md scale-105 z-10" :
                      isActivePath ? "border-border bg-card/80 opacity-60" :
                      "border-border bg-card shadow-sm"
                    }`}
                  >
                    {/* Data part */}
                    <div className={`w-14 h-12 flex items-center justify-center font-mono text-lg font-medium ${
                      isFound ? "bg-emerald-500/20 text-emerald-500" :
                      isCurr ? "bg-amber-500/10 text-amber-500" :
                      "bg-transparent text-foreground"
                    }`}>
                      {node.value}
                    </div>
                    {/* Pointer part */}
                    <div className="w-8 flex items-center justify-center border-l-2 border-inherit bg-muted/30">
                      <div className={`w-2 h-2 rounded-full ${
                        isFound ? "bg-emerald-500" :
                        isCurr ? "bg-amber-500" :
                        "bg-muted-foreground/50"
                      }`} />
                    </div>
                  </motion.div>

                  {/* Index/ID */}
                  <div className="text-[9px] text-muted-foreground font-mono mt-1 opacity-50">
                    Node {index}
                  </div>
                </motion.div>

                {/* Arrow to Next Node */}
                {node.nextId ? (
                  <motion.div 
                    className="w-12 mx-1 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ArrowRight className={`w-6 h-6 ${
                      isActivePath && !isCurr ? "text-amber-500" : "text-border"
                    }`} />
                  </motion.div>
                ) : (
                  <motion.div 
                    className="w-12 mx-1 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-[10px] font-mono text-muted-foreground border border-dashed border-muted-foreground/50 px-2 py-1 rounded">
                      null
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </AnimatePresence>
        </div>
      </div>

      {status === "found" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <Badge className="bg-emerald-500 text-white border-none px-4 py-1 text-sm">Target Found!</Badge>
        </motion.div>
      )}
      {status === "not-found" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <Badge variant="destructive" className="px-4 py-1 text-sm">Target Not Found (Reached null)</Badge>
        </motion.div>
      )}
    </div>
  );
}
