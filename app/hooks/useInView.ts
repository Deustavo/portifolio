import { useEffect, useState, type RefObject } from "react";

/** Vira true na primeira vez que `threshold` do elemento aparece na tela, e para de observar. */
export function useInView(ref: RefObject<Element | null>, threshold: number) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        setSeen(true);
      },
      { threshold },
    );
    io.observe(ref.current!);
    return () => io.disconnect();
  }, [ref, threshold]);
  return seen;
}
