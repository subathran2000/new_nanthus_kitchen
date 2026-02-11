import type { ReactNode, CSSProperties } from "react";

// ============================================
// MENU DATA TYPES (Single Source of Truth)
// ============================================

/**
 * Item option for menu items with variants (e.g., size, cooking style)
 */
export interface ItemOption {
  label: string;
  price: string;
}

/**
 * Individual food item in menu
 */
export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  options?: ItemOption[];
  popular?: boolean;
}

/**
 * Sub-category within a main menu category
 */
export interface SubCategory {
  title: string;
  items: FoodItem[];
}

/**
 * Main menu category (e.g., Kothu, Biryani, Grilled)
 */
export interface MainCategory {
  id: number;
  title: string;
  imageUrl: string;
  mealType: MealType[];
  subCategories: SubCategory[];
}

// ============================================
// COMPONENT PROPS
// ============================================

/**
 * Props for Section component
 */
export interface SectionProps {
  children: ReactNode;
  style?: CSSProperties;
  id?: string;
  className?: string;
}

// ============================================
// FORM TYPES
// ============================================

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

export type EventTypeValue = (typeof EventType)[keyof typeof EventType];

/**
 * Menu category type
 */
export type MealType = "Lunch" | "Dinner" | "Breakfast" | "Dessert";

// ============================================
// SPECIAL ITEMS
// ============================================

/**
 * Special item data for specials carousel
 */
export interface SpecialItem {
  src: string;
  alt: string;
  title: string;
  description: string;
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
