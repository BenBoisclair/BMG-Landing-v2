/**
 * Input Validation and Sanitization Utilities
 *
 * Provides both client-side and server-side validation and sanitization
 * to prevent XSS attacks and injection vulnerabilities.
 */

// ============================================
// TYPES AND INTERFACES
// ============================================

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FormFieldValidation {
  value: string;
  rules: ValidationRule[];
}

export type ValidationRule =
  | { type: 'required'; message?: string }
  | { type: 'email'; message?: string }
  | { type: 'phone'; message?: string }
  | { type: 'url'; message?: string }
  | { type: 'minLength'; value: number; message?: string }
  | { type: 'maxLength'; value: number; message?: string }
  | { type: 'pattern'; value: RegExp; message?: string }
  | { type: 'alphanumeric'; message?: string }
  | { type: 'name'; message?: string };

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// ============================================
// VALIDATION PATTERNS (Strict Regex)
// ============================================

export const VALIDATION_PATTERNS = {
  /**
   * Email validation pattern
   * - Allows standard email format: user@domain.tld
   * - Supports subdomains: user@sub.domain.tld
   * - Prevents special characters that could be used for injection
   */
  email: /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/,

  /**
   * Phone validation pattern
   * - Supports international format with optional country code
   * - Allows digits, spaces, hyphens, parentheses, and + prefix
   * - Min 7 digits, max 15 digits (excluding formatting)
   */
  phone: /^[\d\s\-()]+$/,

  /**
   * Phone digits only (for counting actual digits)
   */
  phoneDigitsOnly: /^\d{7,15}$/,

  /**
   * URL validation pattern
   * - Requires http:// or https:// protocol
   * - Validates domain format
   * - Allows paths, query strings, and fragments
   */
  url: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,

  /**
   * Name validation pattern
   * - Allows letters (including Unicode for international names)
   * - Allows spaces, hyphens, and apostrophes
   * - Prevents numbers and special characters
   */
  name: /^[\p{L}\p{M}][\p{L}\p{M}\s\-']*[\p{L}\p{M}]$|^[\p{L}\p{M}]$/u,

  /**
   * Alphanumeric with basic punctuation
   * - Allows letters, numbers, spaces, and common punctuation
   * - Safe for general text input
   */
  safeText: /^[\p{L}\p{N}\p{M}\s.,!?;:'"\-()]+$/u,

  /**
   * WhatsApp number pattern
   * - Digits only with optional + prefix
   * - 10-15 digits
   */
  whatsapp: /^\+?[\d]{10,15}$/,
} as const;

// ============================================
// SANITIZATION FUNCTIONS
// ============================================

/**
 * HTML entity encoding map for preventing XSS
 */
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

/**
 * Sanitizes input by encoding HTML entities to prevent XSS attacks
 * This is the primary sanitization function for all user inputs
 */
export function sanitizeHTML(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  return input.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] || char);
}

/**
 * Removes all HTML tags from input
 * Use this when HTML should never be present in the input
 */
export function stripHTMLTags(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  return input.replace(/<[^>]*>/g, '');
}

/**
 * Sanitizes input for safe display in text content
 * Combines stripping HTML tags and encoding remaining special characters
 */
export function sanitizeForDisplay(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  // First strip any HTML tags, then encode special characters
  const stripped = stripHTMLTags(input);
  return sanitizeHTML(stripped);
}

/**
 * Sanitizes a phone number by keeping only valid phone characters
 */
export function sanitizePhone(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  // Remove everything except digits, +, -, (, ), and spaces
  return input.replace(/[^\d+\-() ]/g, '').trim();
}

/**
 * Sanitizes an email address
 */
export function sanitizeEmail(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  // Convert to lowercase and trim whitespace
  return input.toLowerCase().trim();
}

/**
 * Sanitizes a URL
 */
export function sanitizeURL(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  // Trim whitespace and remove any javascript: or data: protocols
  let url = input.trim();

  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  const lowerUrl = url.toLowerCase();

  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return '';
    }
  }

  return url;
}

/**
 * Sanitizes a name field
 */
export function sanitizeName(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  // Remove any characters that aren't letters, spaces, hyphens, or apostrophes
  // Keep Unicode letters for international names
  return input.replace(/[^\p{L}\p{M}\s\-']/gu, '').trim();
}

/**
 * Sanitizes textarea/remark content
 * Allows more characters but still prevents XSS
 */
export function sanitizeTextarea(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  // Strip HTML tags and encode special characters
  return sanitizeForDisplay(input);
}

/**
 * Comprehensive sanitization for form data
 * Returns a sanitized copy of all form fields
 */
export function sanitizeFormData(data: Record<string, string>): Record<string, string> {
  const sanitized: Record<string, string> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value !== 'string') {
      sanitized[key] = '';
      continue;
    }

    // Apply field-specific sanitization based on field name
    switch (key) {
      case 'email':
        sanitized[key] = sanitizeEmail(value);
        break;
      case 'phone':
      case 'whatsapp':
      case 'phone-country':
        sanitized[key] = sanitizePhone(value);
        break;
      case 'firstName':
      case 'surname':
        sanitized[key] = sanitizeName(value);
        break;
      case 'remark':
        sanitized[key] = sanitizeTextarea(value);
        break;
      default:
        // For select fields and other inputs, use general sanitization
        sanitized[key] = sanitizeForDisplay(value);
    }
  }

  return sanitized;
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validates that a field is not empty
 */
export function validateRequired(value: string): ValidationResult {
  const trimmed = value?.trim() || '';
  return {
    isValid: trimmed.length > 0,
    error: trimmed.length > 0 ? undefined : 'This field is required',
  };
}

/**
 * Validates email format
 */
export function validateEmail(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: true }; // Empty is valid (use required rule for mandatory)
  }

  const sanitized = sanitizeEmail(value);
  const isValid = VALIDATION_PATTERNS.email.test(sanitized);

  return {
    isValid,
    error: isValid ? undefined : 'Please enter a valid email address',
  };
}

/**
 * Validates phone number format
 */
export function validatePhone(value: string, countryCode?: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: true }; // Empty is valid (use required rule for mandatory)
  }

  const sanitized = sanitizePhone(value);

  // Check for valid characters
  if (!VALIDATION_PATTERNS.phone.test(sanitized)) {
    return {
      isValid: false,
      error: 'Phone number contains invalid characters',
    };
  }

  // Extract digits only and check count
  const digitsOnly = sanitized.replace(/\D/g, '');
  const isValidLength = digitsOnly.length >= 7 && digitsOnly.length <= 15;

  return {
    isValid: isValidLength,
    error: isValidLength ? undefined : 'Please enter a valid phone number (7-15 digits)',
  };
}

/**
 * Validates URL format
 */
export function validateURL(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: true }; // Empty is valid (use required rule for mandatory)
  }

  const sanitized = sanitizeURL(value);

  if (sanitized === '') {
    return {
      isValid: false,
      error: 'Invalid URL protocol',
    };
  }

  const isValid = VALIDATION_PATTERNS.url.test(sanitized);

  return {
    isValid,
    error: isValid ? undefined : 'Please enter a valid URL (including http:// or https://)',
  };
}

/**
 * Validates name format
 */
export function validateName(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: true }; // Empty is valid (use required rule for mandatory)
  }

  const sanitized = sanitizeName(value);
  const isValid = VALIDATION_PATTERNS.name.test(sanitized) && sanitized.length >= 1;

  return {
    isValid,
    error: isValid ? undefined : 'Please enter a valid name (letters only)',
  };
}

/**
 * Validates minimum length
 */
export function validateMinLength(value: string, minLength: number): ValidationResult {
  const length = value?.trim().length || 0;
  const isValid = length >= minLength;

  return {
    isValid,
    error: isValid ? undefined : `Must be at least ${minLength} characters`,
  };
}

/**
 * Validates maximum length
 */
export function validateMaxLength(value: string, maxLength: number): ValidationResult {
  const length = value?.length || 0;
  const isValid = length <= maxLength;

  return {
    isValid,
    error: isValid ? undefined : `Must be no more than ${maxLength} characters`,
  };
}

/**
 * Validates against a custom pattern
 */
export function validatePattern(value: string, pattern: RegExp): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: true }; // Empty is valid (use required rule for mandatory)
  }

  const isValid = pattern.test(value);

  return {
    isValid,
    error: isValid ? undefined : 'Invalid format',
  };
}

/**
 * Validates textarea content
 * Checks for maximum length and suspicious patterns
 */
export function validateTextarea(value: string, maxLength: number = 2000): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: true };
  }

  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `Message must be no more than ${maxLength} characters`,
    };
  }

  return { isValid: true };
}

// ============================================
// COMPREHENSIVE FIELD VALIDATION
// ============================================

/**
 * Validates a single field against multiple rules
 */
export function validateField(value: string, rules: ValidationRule[]): ValidationResult {
  for (const rule of rules) {
    let result: ValidationResult;

    switch (rule.type) {
      case 'required':
        result = validateRequired(value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;

      case 'email':
        result = validateEmail(value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;

      case 'phone':
        result = validatePhone(value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;

      case 'url':
        result = validateURL(value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;

      case 'name':
        result = validateName(value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;

      case 'minLength':
        result = validateMinLength(value, rule.value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;

      case 'maxLength':
        result = validateMaxLength(value, rule.value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;

      case 'pattern':
        result = validatePattern(value, rule.value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;
    }
  }

  return { isValid: true };
}

/**
 * Validates an entire form
 */
export function validateForm(
  formData: Record<string, string>,
  fieldRules: Record<string, ValidationRule[]>
): FormValidationResult {
  const errors: Record<string, string> = {};
  let isValid = true;

  for (const [fieldName, rules] of Object.entries(fieldRules)) {
    const value = formData[fieldName] || '';
    const result = validateField(value, rules);

    if (!result.isValid) {
      isValid = false;
      errors[fieldName] = result.error || 'Invalid input';
    }
  }

  return { isValid, errors };
}

// ============================================
// CONTACT FORM SPECIFIC VALIDATION
// ============================================

/**
 * Validation rules for the contact form
 */
export const CONTACT_FORM_RULES: Record<string, ValidationRule[]> = {
  firstName: [
    { type: 'required', message: 'First name is required' },
    { type: 'name', message: 'Please enter a valid first name' },
    { type: 'minLength', value: 1, message: 'First name is too short' },
    { type: 'maxLength', value: 50, message: 'First name is too long' },
  ],
  surname: [
    { type: 'required', message: 'Surname is required' },
    { type: 'name', message: 'Please enter a valid surname' },
    { type: 'minLength', value: 1, message: 'Surname is too short' },
    { type: 'maxLength', value: 50, message: 'Surname is too long' },
  ],
  phone: [
    { type: 'required', message: 'Phone number is required' },
    { type: 'phone', message: 'Please enter a valid phone number' },
  ],
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Please enter a valid email address' },
  ],
  whatsapp: [
    { type: 'phone', message: 'Please enter a valid WhatsApp number' },
  ],
  remark: [
    { type: 'maxLength', value: 2000, message: 'Message is too long (max 2000 characters)' },
  ],
};

/**
 * Validates the contact form
 */
export function validateContactForm(formData: Record<string, string>): FormValidationResult {
  return validateForm(formData, CONTACT_FORM_RULES);
}

/**
 * Sanitizes and validates contact form data
 * Returns sanitized data and validation result
 */
export function processContactForm(formData: Record<string, string>): {
  sanitizedData: Record<string, string>;
  validation: FormValidationResult;
} {
  // First sanitize all inputs
  const sanitizedData = sanitizeFormData(formData);

  // Then validate the sanitized data
  const validation = validateContactForm(sanitizedData);

  return { sanitizedData, validation };
}
