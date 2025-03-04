import { useCallback, useEffect, useRef, useState } from "react";


export const useScrollAdBanner = (fixed: boolean) => {
  const [isScrolledFixed, setIsFixed] = useState(false);
  const isFixedRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (!fixed) return;

    requestAnimationFrame(() => {
      const shouldBeFixed = window.scrollY > 250;

      if (isFixedRef.current !== shouldBeFixed) {
        isFixedRef.current = shouldBeFixed;
        setIsFixed(shouldBeFixed);
      }
    });
  }, [fixed]);

  useEffect(() => {
    if (!fixed) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fixed, handleScroll]);

  return [ isScrolledFixed ]
}