import { Scroll } from "@react-three/drei";
import { memo, type ReactNode } from "react";

/**
 * StableScroll - A wrapper around @react-three/drei's Scroll component
 * that properly suppresses the "createRoot() already called" warning in React 19.
 *
 * This is a known compatibility issue between React 19 and @react-three/drei v10.
 * The Scroll component with `html` prop internally uses createRoot() for portal
 * rendering, which triggers warnings during HMR in development.
 *
 * IMPORTANT: The suppression MUST run at module-load time (not in useEffect),
 * because Scroll calls createRoot() during its render phase — before any
 * effect has a chance to fire. Module-level patching guarantees the filter
 * is in place before the first render.
 *
 * @see https://github.com/pmndrs/drei/issues/1940
 * @see https://github.com/facebook/react/issues/30020
 */

interface StableScrollProps {
  html: true;
  children: ReactNode;
  style?: React.CSSProperties;
}

// ── Module-level suppression (runs once at import time, dev only) ──────────
if (import.meta.env.DEV) {
  const SUPPRESS_PATTERN =
    /createRoot\(\) on a container that has already been passed to createRoot|You are calling ReactDOMClient\.createRoot\(\)|motion\(\) is deprecated\. Use motion\.create\(\) instead/;

  const _origError = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && SUPPRESS_PATTERN.test(args[0])) return;
    _origError.apply(console, args);
  };

  const _origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && SUPPRESS_PATTERN.test(args[0])) return;
    _origWarn.apply(console, args);
  };
}

/**
 * Memoised wrapper so Scroll only re-renders when children or style
 * actually change, reducing unnecessary createRoot() calls from drei.
 */
export const StableScroll: React.FC<StableScrollProps> = memo(
  ({ children, style }) => (
    <Scroll html style={style}>
      {children}
    </Scroll>
  ),
);

StableScroll.displayName = "StableScroll";
