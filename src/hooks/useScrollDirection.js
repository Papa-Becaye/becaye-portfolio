"use client";

import { useEffect, useState } from "react";

/** { scrolled, hidden } — navigation intelligente : se masque en descendant, réapparaît en remontant. */
export default function useScrollDirection({ threshold = 8, hideAfter = 480 } = {}) {
  const [state, setState] = useState({ scrolled: false, hidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      setState((prev) => {
        const scrolled = y > 24;
        let hidden = prev.hidden;
        if (Math.abs(delta) > threshold) hidden = delta > 0 && y > hideAfter;
        if (y < 80) hidden = false;
        return prev.scrolled === scrolled && prev.hidden === hidden ? prev : { scrolled, hidden };
      });
      if (Math.abs(delta) > threshold) lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, hideAfter]);

  return state;
}
