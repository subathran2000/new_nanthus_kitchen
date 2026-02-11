/**
 * Application routes — single source of truth.
 * Use these constants instead of hardcoded path strings.
 */

export const ROUTES = {
  HOME: "/",
  MENU: "/menu",
  SPECIAL: "/special",
  ABOUT: "/about",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
