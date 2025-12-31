/**
 * Client-side Form Validation and Submission Handler
 *
 * This script provides real-time validation feedback and handles
 * form submission with sanitization to prevent XSS attacks.
 */

// ============================================
// VALIDATION PATTERNS (matching server-side)
// ============================================

const VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/,
  phone: /^[\d\s\-()]+$/,
  phoneDigitsOnly: /^\d{7,15}$/,
  url: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
  name: /^[\p{L}\p{M}][\p{L}\p{M}\s\-']*[\p{L}\p{M}]$|^[\p{L}\p{M}]$/u,
};

// ============================================
// SANITIZATION FUNCTIONS
// ============================================

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

function sanitizeHTML(input: string): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] || char);
}

function stripHTMLTags(input: string): string {
  if (typeof input !== 'string') return '';
  return input.replace(/<[^>]*>/g, '');
}

function sanitizeForDisplay(input: string): string {
  if (typeof input !== 'string') return '';
  return sanitizeHTML(stripHTMLTags(input));
}

function sanitizePhone(input: string): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[^\d+\-() ]/g, '').trim();
}

function sanitizeEmail(input: string): string {
  if (typeof input !== 'string') return '';
  return input.toLowerCase().trim();
}

function sanitizeName(input: string): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[^\p{L}\p{M}\s\-']/gu, '').trim();
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

function validateRequired(value: string, translations: ValidationTranslations): ValidationResult {
  const trimmed = value?.trim() || '';
  return {
    isValid: trimmed.length > 0,
    error: trimmed.length > 0 ? undefined : translations.required,
  };
}

function validateEmail(value: string, translations: ValidationTranslations): ValidationResult {
  if (!value || value.trim() === '') return { isValid: true };
  const sanitized = sanitizeEmail(value);
  const isValid = VALIDATION_PATTERNS.email.test(sanitized);
  return {
    isValid,
    error: isValid ? undefined : translations.invalidEmail,
  };
}

function validatePhone(value: string, translations: ValidationTranslations): ValidationResult {
  if (!value || value.trim() === '') return { isValid: true };
  const sanitized = sanitizePhone(value);
  if (!VALIDATION_PATTERNS.phone.test(sanitized)) {
    return { isValid: false, error: translations.invalidPhone };
  }
  const digitsOnly = sanitized.replace(/\D/g, '');
  const isValidLength = digitsOnly.length >= 7 && digitsOnly.length <= 15;
  return {
    isValid: isValidLength,
    error: isValidLength ? undefined : translations.invalidPhone,
  };
}

function validateName(value: string, translations: ValidationTranslations): ValidationResult {
  if (!value || value.trim() === '') return { isValid: true };
  const sanitized = sanitizeName(value);
  const isValid = VALIDATION_PATTERNS.name.test(sanitized) && sanitized.length >= 1;
  return {
    isValid,
    error: isValid ? undefined : translations.invalidName,
  };
}

function validateUrl(value: string, translations: ValidationTranslations): ValidationResult {
  if (!value || value.trim() === '') return { isValid: true };
  const isValid = VALIDATION_PATTERNS.url.test(value.trim());
  return {
    isValid,
    error: isValid ? undefined : translations.invalidUrl,
  };
}

function validateMaxLength(value: string, maxLength: number, translations: ValidationTranslations): ValidationResult {
  const length = value?.length || 0;
  const isValid = length <= maxLength;
  return {
    isValid,
    error: isValid ? undefined : translations.tooLong,
  };
}

// ============================================
// TYPES
// ============================================

interface ValidationTranslations {
  required: string;
  invalidEmail: string;
  invalidPhone: string;
  invalidUrl: string;
  invalidName: string;
  tooShort: string;
  tooLong: string;
  invalidFormat: string;
  formSuccess: string;
  formError: string;
  submitting: string;
}

interface FormValidatorConfig {
  form: HTMLFormElement;
  translations: ValidationTranslations;
  onSubmit?: (data: Record<string, string>) => Promise<void>;
}

// ============================================
// FORM VALIDATOR CLASS
// ============================================

export class FormValidator {
  private form: HTMLFormElement;
  private translations: ValidationTranslations;
  private onSubmitCallback?: (data: Record<string, string>) => Promise<void>;
  private isSubmitting = false;

  constructor(config: FormValidatorConfig) {
    this.form = config.form;
    this.translations = config.translations;
    this.onSubmitCallback = config.onSubmit;
    this.init();
  }

  private init(): void {
    // Attach blur event listeners for real-time validation
    const fields = this.form.querySelectorAll('[data-form-field]');
    fields.forEach((field) => {
      const input = field.querySelector('[data-input]') as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (input) {
        // Validate on blur
        input.addEventListener('blur', () => this.validateField(field as HTMLElement));

        // Clear error on input (but don't validate until blur)
        input.addEventListener('input', () => {
          const fieldEl = field as HTMLElement;
          if (fieldEl.classList.contains('has-error')) {
            this.validateField(fieldEl);
          }
        });
      }
    });

    // Handle form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  private validateField(fieldElement: HTMLElement): ValidationResult {
    const fieldName = fieldElement.dataset.fieldName || '';
    const validationType = fieldElement.dataset.validationType || 'text';
    const isRequired = fieldElement.dataset.required === 'true';
    const input = fieldElement.querySelector('[data-input]') as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const errorMessage = fieldElement.querySelector('[data-error-message]') as HTMLElement;

    if (!input) return { isValid: true };

    const value = input.value;
    let result: ValidationResult = { isValid: true };

    // Check required first
    if (isRequired) {
      result = validateRequired(value, this.translations);
      if (!result.isValid) {
        this.showFieldError(fieldElement, errorMessage, result.error || '');
        return result;
      }
    }

    // If empty and not required, it's valid
    if (!value || value.trim() === '') {
      this.clearError(fieldElement, errorMessage);
      return { isValid: true };
    }

    // Type-specific validation
    switch (validationType) {
      case 'email':
        result = validateEmail(value, this.translations);
        break;
      case 'phone':
        result = validatePhone(value, this.translations);
        break;
      case 'url':
        result = validateUrl(value, this.translations);
        break;
      case 'name':
        result = validateName(value, this.translations);
        break;
      case 'text':
        // For textarea/text, just check max length
        result = validateMaxLength(value, 2000, this.translations);
        break;
      case 'select':
        // Select validation is handled by required check
        result = { isValid: true };
        break;
    }

    if (result.isValid) {
      this.showValid(fieldElement, errorMessage);
    } else {
      this.showFieldError(fieldElement, errorMessage, result.error || '');
    }

    return result;
  }

  private showFieldError(fieldElement: HTMLElement, errorMessage: HTMLElement | null, message: string): void {
    fieldElement.classList.remove('is-valid');
    fieldElement.classList.add('has-error');
    if (errorMessage) {
      errorMessage.textContent = message;
    }
  }

  private showValid(fieldElement: HTMLElement, errorMessage: HTMLElement | null): void {
    fieldElement.classList.remove('has-error');
    fieldElement.classList.add('is-valid');
    if (errorMessage) {
      errorMessage.textContent = '';
    }
  }

  private clearError(fieldElement: HTMLElement, errorMessage: HTMLElement | null): void {
    fieldElement.classList.remove('has-error', 'is-valid');
    if (errorMessage) {
      errorMessage.textContent = '';
    }
  }

  private validateAllFields(): boolean {
    const fields = this.form.querySelectorAll('[data-form-field]');
    let allValid = true;

    fields.forEach((field) => {
      const result = this.validateField(field as HTMLElement);
      if (!result.isValid) {
        allValid = false;
      }
    });

    return allValid;
  }

  private getFormData(): Record<string, string> {
    const formData = new FormData(this.form);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        // Apply field-specific sanitization
        switch (key) {
          case 'email':
            data[key] = sanitizeEmail(value);
            break;
          case 'phone':
          case 'whatsapp':
          case 'phone-country':
            data[key] = sanitizePhone(value);
            break;
          case 'firstName':
          case 'surname':
            data[key] = sanitizeName(value);
            break;
          default:
            data[key] = sanitizeForDisplay(value);
        }
      }
    });

    return data;
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    if (this.isSubmitting) return;

    // Validate all fields
    const isValid = this.validateAllFields();

    if (!isValid) {
      // Focus on first error field
      const firstError = this.form.querySelector('.has-error [data-input]') as HTMLElement;
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    // Get sanitized form data
    const data = this.getFormData();

    // Show loading state
    this.isSubmitting = true;
    const submitButton = this.form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalButtonText = submitButton?.textContent || '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = this.translations.submitting;
    }

    try {
      if (this.onSubmitCallback) {
        await this.onSubmitCallback(data);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showFormMessage(this.translations.formError, 'error');
    } finally {
      this.isSubmitting = false;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  }

  private showFormMessage(message: string, type: 'success' | 'error'): void {
    // Check if message element already exists
    let messageEl = this.form.querySelector('[data-form-message]') as HTMLElement;

    if (!messageEl) {
      messageEl = document.createElement('div');
      messageEl.setAttribute('data-form-message', '');
      messageEl.setAttribute('role', 'alert');
      messageEl.className = 'mt-4 p-4 rounded-md text-sm';
      this.form.appendChild(messageEl);
    }

    messageEl.textContent = message;
    messageEl.classList.remove('bg-green-50', 'text-green-800', 'bg-red-50', 'text-red-800', 'hidden');

    if (type === 'success') {
      messageEl.classList.add('bg-green-50', 'text-green-800');
    } else {
      messageEl.classList.add('bg-red-50', 'text-red-800');
    }
  }

  public showSuccess(message?: string): void {
    this.showFormMessage(message || this.translations.formSuccess, 'success');
    this.form.reset();
    // Clear all validation states
    const fields = this.form.querySelectorAll('[data-form-field]');
    fields.forEach((field) => {
      const errorMessage = field.querySelector('[data-error-message]') as HTMLElement;
      this.clearError(field as HTMLElement, errorMessage);
    });
  }

  public showError(message?: string): void {
    this.showFormMessage(message || this.translations.formError, 'error');
  }
}

// ============================================
// INITIALIZATION HELPER
// ============================================

export function initContactFormValidation(translations: ValidationTranslations): FormValidator | null {
  const form = document.querySelector('#contact form') as HTMLFormElement;

  if (!form) {
    console.warn('Contact form not found');
    return null;
  }

  const validator = new FormValidator({
    form,
    translations,
    onSubmit: async (data) => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          validator.showSuccess();
        } else {
          const errorData = await response.json().catch(() => ({}));
          validator.showError(errorData.message || translations.formError);
        }
      } catch (error) {
        console.error('Network error:', error);
        validator.showError(translations.formError);
      }
    },
  });

  return validator;
}

// Export for use in Astro components
export type { ValidationTranslations, FormValidatorConfig };
