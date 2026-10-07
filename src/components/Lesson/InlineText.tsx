/** Render inline code safely, without interpreting HTML from lesson content. */
export function InlineText({ text }: { text: string }) {
  return <>{text.split(/(`[^`]+`)/g).map((part, index) => part.startsWith("`") && part.endsWith("`") ? <code key={index} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em] text-foreground">{part.slice(1, -1)}</code> : part)}</>;
}
