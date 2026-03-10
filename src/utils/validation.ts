import type {
  ValidationResult,
  ContactFormData,
  CateringFormData,
} from "../types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateContactForm = (
  data: ContactFormData,
): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.name?.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.subject?.trim()) {
    errors.subject = "Subject is required";
  } else if (data.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  }

  if (!data.message?.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates catering form data
 */
export const validateCateringForm = (
  data: CateringFormData,
): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.name?.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.eventType?.trim()) {
    errors.eventType = "Event type is required";
  }

  if (!data.date?.trim()) {
    errors.date = "Event date is required";
  }

  if (!data.guests?.trim()) {
    errors.guests = "Number of guests is required";
  } else {
    const guestCount = parseInt(data.guests, 10);
    if (isNaN(guestCount) || guestCount < 1) {
      errors.guests = "Please enter a valid number of guests";
    } else if (guestCount > 500) {
      errors.guests = "Please contact us directly for large events";
    }
  }

  if (!data.message?.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
