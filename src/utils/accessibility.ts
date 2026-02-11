import type { KeyboardEvent as ReactKeyboardEvent } from "react";

/**
 * Accessibility utilities for improving WCAG compliance
 */

/**
 * Generate unique ID for form labels and inputs
 */
export const generateId = (prefix: string = "id"): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * ARIA live region announcement helper
 */
export const announceToScreenReader = (
  message: string,
  priority: "polite" | "assertive" = "polite",
) => {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.style.position = "absolute";
  announcement.style.left = "-10000px";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Skip to main content link helper
 */
export const createSkipLink = (): HTMLElement => {
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to main content";
  skipLink.style.position = "absolute";
  skipLink.style.top = "-40px";
  skipLink.style.left = "0";
  skipLink.style.background = "#000";
  skipLink.style.color = "#fff";
  skipLink.style.padding = "8px";
  skipLink.style.zIndex = "100";
  skipLink.style.textDecoration = "none";

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "0";
  });

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });

  return skipLink;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get accessible color contrast ratio
 * WCAG AA requires 4.5:1 for normal text, 3:1 for large text
 * WCAG AAA requires 7:1 for normal text, 4.5:1 for large text
 */
export const getContrastRatio = (
  foreground: string,
  background: string,
): number => {
  const getLuminance = (color: string): number => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    const sRGB = [r, g, b].map((val) => {
      return val <= 0.03928
        ? val / 12.92
        : Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Keyboard navigation helper - handle common keyboard shortcuts
 */
export const handleKeyboardNavigation = (
  event: ReactKeyboardEvent,
  actions: {
    onEnter?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
  },
): void => {
  switch (event.key) {
    case "Enter":
      if (actions.onEnter) {
        event.preventDefault();
        actions.onEnter();
      }
      break;
    case "Escape":
      if (actions.onEscape) {
        event.preventDefault();
        actions.onEscape();
      }
      break;
    case "ArrowUp":
      if (actions.onArrowUp) {
        event.preventDefault();
        actions.onArrowUp();
      }
      break;
    case "ArrowDown":
      if (actions.onArrowDown) {
        event.preventDefault();
        actions.onArrowDown();
      }
      break;
    case "ArrowLeft":
      if (actions.onArrowLeft) {
        event.preventDefault();
        actions.onArrowLeft();
      }
      break;
    case "ArrowRight":
      if (actions.onArrowRight) {
        event.preventDefault();
        actions.onArrowRight();
      }
      break;
    default:
      break;
  }
};

/**
 * Get accessible button attributes
 */
export const getAccessibleButtonAttributes = (
  ariaLabel: string,
  ariaPressed?: boolean,
) => ({
  "aria-label": ariaLabel,
  ...(ariaPressed !== undefined && { "aria-pressed": ariaPressed }),
});

/**
 * Focus trap utility for modals
 */
export const createFocusTrap = (element: HTMLElement | null) => {
  if (!element) return { trap: () => {}, release: () => {} };

  const focusableElements = element.querySelectorAll(
    'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  return {
    trap: () => {
      element.addEventListener("keydown", handleKeyDown);
      firstElement?.focus();
    },
    release: () => {
      element.removeEventListener("keydown", handleKeyDown);
    },
  };
};
