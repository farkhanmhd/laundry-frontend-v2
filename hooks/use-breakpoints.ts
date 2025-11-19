import * as React from "react";

export function useBreakpoint(width: number) {
  const [breakpoint, setBreakPoint] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mql = window.matchMedia(`(min-width: ${width}px)`);
    const onChange = () => {
      setBreakPoint(mql.matches);
    };
    // Initialize
    setBreakPoint(mql.matches);
    // Subscribe
    mql.addEventListener("change", onChange);
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [width]);

  return !!breakpoint;
}
