import type { ReactNode } from "react";

/**
 * Props for FloatingCrystal 3D component
 */
export interface FloatingCrystalProps {
  position: [number, number, number];
  color: string;
  speed: number;
  rotationSpeed: number;
  scale: number;
}

/**
 * Props for Section component
 */
export interface SectionProps {
  children: ReactNode;
  style?: React.CSSProperties;
  [key: string]: any; // Allow other MUI Box props
}

/**
 * Contact form data interface
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Catering form data interface
 */
export interface CateringFormData {
  name: string;
  email: string;
  eventType: string;
  date: string;
  guests: string;
  message: string;
}

/**
 * Form validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Event type options for catering
 */
export const EventType = {
  WEDDING: "wedding",
  CORPORATE: "corporate",
  BIRTHDAY: "birthday",
  ANNIVERSARY: "anniversary",
  OTHER: "other",
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];

/**
 * Menu category type
 */
export type MealType = "Lunch" | "Dinner" | "Breakfast" | "Dessert";

/**
 * Special item data
 */
export interface SpecialItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price?: string;
}

/**
 * Navigation route type
 */
export type RouteType = "home" | "menu" | "special" | "about" | "contact";

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Form submission status
 */
export const FormStatus = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

export type FormStatusType = (typeof FormStatus)[keyof typeof FormStatus];

/**
 * Location data
 */
export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
