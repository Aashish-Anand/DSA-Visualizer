import { useEffect, useRef, useState } from "react";

/** Scroll only the diagram's horizontal viewport; manual inspection can disable it. */
export function useFollowActive<T extends Element = HTMLDivElement>(index: number | null) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<T>(null);
  const [follow, setFollow] = useState(true);
  useEffect(() => {
    if (!follow || index === null) return;
    const viewport = viewportRef.current, active = activeRef.current;
    if (!viewport || !active) return;
    const frame = viewport.getBoundingClientRect(), item = active.getBoundingClientRect();
    if (item.left < frame.left) viewport.scrollLeft += item.left - frame.left - 12;
    else if (item.right > frame.right) viewport.scrollLeft += item.right - frame.right + 12;
  }, [index, follow]);
  return { viewportRef, activeRef, follow, setFollow };
}
