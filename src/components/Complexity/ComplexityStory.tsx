import { motion } from "framer-motion";

interface ComplexityStoryProps {
  paragraphs: string[];
}

/**
 * Highlights Big-O notation and keywords with colored spans.
 */
function highlightText(text: string): React.ReactNode {
  // Match O(...) notation, technical keywords, and emphasized phrases
  const regex = /O\([^)]+\)|HashMap|nested loops?|inner loop|outer loop|brute[- ]force|quadratic|linear|constant|squared|n²|log\s*n|complement/gi;
  const allMatches = [...text.matchAll(regex)];

  if (allMatches.length === 0) return text;

  const result: React.ReactNode[] = [];
  let lastIndex = 0;

  allMatches.forEach((match, i) => {
    const matchText = match[0];
    const start = match.index;

    // Push text before this match
    if (start > lastIndex) {
      result.push(text.slice(lastIndex, start));
    }

    const isComplexity = /^O\(/.test(matchText);
    result.push(
      <span
        key={i}
        className={`font-mono font-bold px-1 py-0.5 rounded ${
          isComplexity
            ? "bg-primary/15 text-primary"
            : "bg-viz-active/15 text-viz-active"
        }`}
      >
        {matchText}
      </span>
    );

    lastIndex = start + matchText.length;
  });

  // Push remaining text after last match
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}

export function ComplexityStory({ paragraphs }: ComplexityStoryProps) {
  return (
    <div className="space-y-3">
      {paragraphs.map((text, i) => {
        const isTitle = i === 0;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
          >
            {isTitle ? (
              <h3 className="text-base font-bold text-foreground mb-1">
                {highlightText(text)}
              </h3>
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {highlightText(text)}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
