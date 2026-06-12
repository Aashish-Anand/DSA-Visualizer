import { motion } from "framer-motion";

export function FounderStory() {
  return (
    <section id="story" className="py-32 md:py-40 px-6 md:px-10 border-t border-white/[0.04]">
      <div className="max-w-[700px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[13px] font-medium text-primary uppercase tracking-[0.15em] mb-6"
        >
          Why AlgoLens
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-[clamp(1.1rem,2.5vw,1.35rem)] leading-[1.7] text-muted-foreground">
            <span className="text-foreground font-medium">I built AlgoLens because I watched people I care about struggle with DSA.</span>{" "}
            They weren&apos;t struggling because they weren&apos;t smart enough. They were struggling
            because the teaching tools were broken.
          </p>

          <p className="text-[clamp(1.1rem,2.5vw,1.35rem)] leading-[1.7] text-muted-foreground">
            Every platform threw dense code at them and said &ldquo;figure it out.&rdquo;
            Nobody showed them <em>what the code was actually doing</em>. Once I started
            building visualizations, the same concepts that took hours to explain
            clicked in seconds.
          </p>

          <p className="text-[clamp(1.1rem,2.5vw,1.35rem)] leading-[1.7] text-muted-foreground">
            AlgoLens is the tool I wish existed when I was learning.
          </p>

          <div className="pt-8 border-t border-white/[0.06]">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                A
              </div>
              <div>
                <p className="text-[15px] font-semibold">Aashish Anand</p>
                <p className="text-[13px] text-muted-foreground">Creator of AlgoLens</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
