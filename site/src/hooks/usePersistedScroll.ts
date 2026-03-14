import { useEffect, useRef } from "react";

export function usePersistedScroll(storageKey: string) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const restoreScroll = () => {
      const savedTop = sessionStorage.getItem(`${storageKey}-top`);
      const savedLeft = sessionStorage.getItem(`${storageKey}-left`);

      if (savedTop !== null) {
        element.scrollTop = Number(savedTop);
      }

      if (savedLeft !== null) {
        element.scrollLeft = Number(savedLeft);
      }
    };

    const handleScroll = () => {
      sessionStorage.setItem(`${storageKey}-top`, String(element.scrollTop));
      sessionStorage.setItem(`${storageKey}-left`, String(element.scrollLeft));
    };

    const frameId = requestAnimationFrame(restoreScroll);
    element.addEventListener("scroll", handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      element.removeEventListener("scroll", handleScroll);
    };
  }, [storageKey]);

  return elementRef;
}
