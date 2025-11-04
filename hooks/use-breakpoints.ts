import * as React from "react";

export function useBreakpoint(resolution: number) {
  const [breakpoint, setBreakPoint] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mql = window.matchMedia(`(max-width: ${resolution - 1}px)`);
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
  }, [resolution]);

  return !!breakpoint;
}
