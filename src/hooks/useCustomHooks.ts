import React, { useEffect, useRef, useCallback } from "react";

/**
 * Hook to detect if element is in viewport
 * Useful for lazy loading images and triggering animations
 */
export const useInView = (
  options: IntersectionObserverInit = {},
): [React.RefObject<HTMLDivElement>, boolean] => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = React.useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options,
      },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  // @ts-ignore - RefObject type inference issue
  return [ref, isInView] as const;
};

/**
 * Hook for debouncing values (e.g., search input)
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for throttling callbacks
 */
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 1000,
): T => {
  const lastRunRef = useRef<number>(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: any[]) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRunRef.current;

      if (timeSinceLastRun >= delay) {
        callback(...args);
        lastRunRef.current = now;
      } else {
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRunRef.current = Date.now();
        }, delay - timeSinceLastRun);
      }
    },
    [callback, delay],
  ) as T;
};

/**
 * Hook for lazy loading images
 */
export const useLazyLoadImage = (
  src: string,
): { isLoaded: boolean; error: boolean } => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);

    img.src = src;
  }, [src]);

  return { isLoaded, error };
};

/**
 * Hook for tracking previous value
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = React.useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

/**
 * Hook for managing async operations with loading/error states
 */
export const useAsync = <T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true,
): {
  status: "idle" | "pending" | "success" | "error";
  data: T | null;
  error: Error | null;
} => {
  const [status, setStatus] = React.useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const execute = useCallback(async () => {
    setStatus("pending");
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setStatus("error");
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { status, data, error };
};

/**
 * Hook for managing local storage with React state
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Failed to read from localStorage, use initial value
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // Failed to write to localStorage, silently ignore
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
};

/**
 * Hook for managing timeout with cleanup
 */
export const useTimeout = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setTimeout(() => savedCallback.current?.(), delay);

    return () => clearTimeout(id);
  }, [delay]);
};
