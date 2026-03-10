// ============================================
// MENU DATA TYPES (Single Source of Truth)
// ============================================

export interface ItemOption {
  label: string;
  price: string;
}

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  options?: ItemOption[];
  popular?: boolean;
}

export interface SubCategory {
  title: string;
  items: FoodItem[];
}

export interface MainCategory {
  id: number;
  title: string;
  imageUrl: string;
  mealType: MealType[];
  subCategories: SubCategory[];
}

// ============================================
// FORM TYPES
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CateringFormData {
  name: string;
  email: string;
  eventType: string;
  date: string;
  guests: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export type MealType = "Lunch" | "Dinner" | "Breakfast" | "Dessert";

// ============================================
// SPECIAL ITEMS
// ============================================

export interface SpecialItem {
  src: string;
  alt: string;
  title: string;
  description: string;
  price?: string;
}
