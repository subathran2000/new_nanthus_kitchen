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


