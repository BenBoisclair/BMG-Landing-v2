/**
 * Contact Form Client-Side Handler
 *
 * Handles form submission with validation, sanitization, CSRF protection,
 * and user feedback.
 */

import {
  sanitizeFormData,
  validateContactForm,
  validateField,
  type ValidationRule,
} from '../utils/validation';
import {
  getCSRFToken,
  getCSRFHeaderName,
  regenerateCSRFToken,
} from '../utils/csrf';

// ============================================
// TYPES
// ============================================

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  errorMessage: string | null;
  fieldErrors: Record<string, string>;
}

interface FormElements {
  form: HTMLFormElement;
  submitButton: HTMLButtonElement;
  statusContainer: HTMLElement | null;
  fields: NodeListOf<Element>;
}

// ============================================
// CONSTANTS
// ============================================

const API_ENDPOINT = '/api/contact';
const SUBMISSION_TIMEOUT_MS = 30000; // 30 seconds

// Validation rules for each field type
const FIELD_VALIDATION_RULES: Record<string, ValidationRule[]> = {
  firstName: [
    { type: 'required', message: 'First name is required' },
    { type: 'name', message: 'Please enter a valid first name' },
  ],
  surname: [
    { type: 'required', message: 'Surname is required' },
    { type: 'name', message: 'Please enter a valid surname' },
  ],
  phone: [
    { type: 'required', message: 'Phone number is required' },
    { type: 'phone', message: 'Please enter a valid phone number' },
  ],
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Please enter a valid email address' },
  ],
  whatsapp: [{ type: 'phone', message: 'Please enter a valid WhatsApp number' }],
  remark: [
    { type: 'maxLength', value: 2000, message: 'Message is too long (max 2000 characters)' },
  ],
};

// ============================================
// FORM STATE MANAGEMENT
// ============================================

let formState: FormState = {
  isSubmitting: false,
  isSuccess: false,
  errorMessage: null,
  fieldErrors: {},
};

function resetFormState(): void {
  formState = {
    isSubmitting: false,
    isSuccess: false,
    errorMessage: null,
    fieldErrors: {},
  };
}

// ============================================
// UI UTILITIES
// ============================================

function showFieldError(fieldContainer: Element, errorMessage: string): void {
  fieldContainer.classList.add('has-error');
  fieldContainer.classList.remove('is-valid');

  const errorElement = fieldContainer.querySelector('[data-error-message]');
  if (errorElement) {
    errorElement.textContent = errorMessage;
  }
}

function clearFieldError(fieldContainer: Element): void {
  fieldContainer.classList.remove('has-error');

  const errorElement = fieldContainer.querySelector('[data-error-message]');
  if (errorElement) {
    errorElement.textContent = '';
  }
}

function showFieldValid(fieldContainer: Element): void {
  fieldContainer.classList.remove('has-error');
  fieldContainer.classList.add('is-valid');

  const errorElement = fieldContainer.querySelector('[data-error-message]');
  if (errorElement) {
    errorElement.textContent = '';
  }
}

function showFormStatus(container: HTMLElement | null, success: boolean, message: string): void {
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-lg ${success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'} transition-all duration-300">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0">
          ${
            success
              ? '<svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>'
              : '<svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>'
          }
        </div>
        <div>
          <p class="${success ? 'text-green-800' : 'text-red-800'} font-medium">${message}</p>
        </div>
      </div>
    </div>
  `;

  container.classList.remove('hidden');
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideFormStatus(container: HTMLElement | null): void {
  if (!container) return;
  container.classList.add('hidden');
  container.innerHTML = '';
}

function setSubmitButtonState(button: HTMLButtonElement, isLoading: boolean): void {
  button.disabled = isLoading;

  if (isLoading) {
    const originalText = button.textContent || 'Submit';
    button.dataset.originalText = originalText;
    button.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Submitting...
    `;
    button.classList.add('opacity-75', 'cursor-not-allowed');
  } else {
    button.textContent = button.dataset.originalText || 'Submit';
    button.classList.remove('opacity-75', 'cursor-not-allowed');
  }
}

// ============================================
// VALIDATION
// ============================================

function validateFieldOnBlur(fieldContainer: Element): boolean {
  const fieldName = fieldContainer.getAttribute('data-field-name');
  const input = fieldContainer.querySelector('[data-input]') as HTMLInputElement | HTMLTextAreaElement | null;

  if (!fieldName || !input) return true;

  const rules = FIELD_VALIDATION_RULES[fieldName];
  if (!rules) return true;

  const result = validateField(input.value, rules);

  if (!result.isValid && result.error) {
    showFieldError(fieldContainer, result.error);
    return false;
  }

  if (input.value.trim()) {
    showFieldValid(fieldContainer);
  } else {
    clearFieldError(fieldContainer);
  }

  return true;
}

function validateAllFields(form: HTMLFormElement): boolean {
  const fields = form.querySelectorAll('[data-form-field]');
  let isValid = true;

  fields.forEach((field) => {
    if (!validateFieldOnBlur(field)) {
      isValid = false;
    }
  });

  return isValid;
}

// ============================================
// FORM DATA COLLECTION
// ============================================

function collectFormData(form: HTMLFormElement): Record<string, string> {
  const formData = new FormData(form);
  const data: Record<string, string> = {};

  formData.forEach((value, key) => {
    data[key] = String(value);
  });

  // Handle consent checkbox specifically
  const consentCheckbox = form.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
  if (consentCheckbox) {
    data.consent = consentCheckbox.checked ? 'true' : 'false';
  }

  return data;
}

// ============================================
// FORM SUBMISSION
// ============================================

async function submitForm(form: HTMLFormElement, elements: FormElements): Promise<void> {
  // Prevent double submission
  if (formState.isSubmitting) return;

  // Hide any previous status messages
  hideFormStatus(elements.statusContainer);

  // Validate consent
  const consentCheckbox = form.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
  if (!consentCheckbox?.checked) {
    showFormStatus(elements.statusContainer, false, 'Please accept the consent checkbox to submit the form.');
    return;
  }

  // Validate all fields
  if (!validateAllFields(form)) {
    showFormStatus(elements.statusContainer, false, 'Please correct the errors above and try again.');
    return;
  }

  // Collect form data
  const rawData = collectFormData(form);
  const sanitizedData = sanitizeFormData(rawData);

  // Final validation with sanitized data
  const validation = validateContactForm(sanitizedData);
  if (!validation.isValid) {
    // Show field-specific errors
    Object.entries(validation.errors).forEach(([fieldName, errorMessage]) => {
      const fieldContainer = form.querySelector(`[data-field-name="${fieldName}"]`);
      if (fieldContainer) {
        showFieldError(fieldContainer, errorMessage);
      }
    });

    showFormStatus(elements.statusContainer, false, 'Please correct the errors above and try again.');
    return;
  }

  // Start submission
  formState.isSubmitting = true;
  setSubmitButtonState(elements.submitButton, true);

  try {
    // Get CSRF token
    const csrfToken = getCSRFToken();

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SUBMISSION_TIMEOUT_MS);

    // Submit to API
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [getCSRFHeaderName()]: csrfToken,
      },
      body: JSON.stringify({
        ...sanitizedData,
        consent: 'true',
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const result = await response.json();

    if (response.ok && result.success) {
      // Success!
      formState.isSuccess = true;
      showFormStatus(elements.statusContainer, true, result.message || 'Thank you for your inquiry! We will contact you soon.');

      // Reset form
      form.reset();
      form.querySelectorAll('[data-form-field]').forEach((field) => {
        field.classList.remove('has-error', 'is-valid');
      });

      // Regenerate CSRF token for next submission
      regenerateCSRFToken();
    } else {
      // Handle validation errors from server
      if (result.errors) {
        Object.entries(result.errors).forEach(([fieldName, errorMessage]) => {
          const fieldContainer = form.querySelector(`[data-field-name="${fieldName}"]`);
          if (fieldContainer) {
            showFieldError(fieldContainer, errorMessage as string);
          }
        });
      }

      showFormStatus(elements.statusContainer, false, result.message || 'Submission failed. Please try again.');
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      showFormStatus(elements.statusContainer, false, 'Request timed out. Please try again.');
    } else {
      console.error('Form submission error:', error);
      showFormStatus(elements.statusContainer, false, 'An error occurred. Please try again later.');
    }
  } finally {
    formState.isSubmitting = false;
    setSubmitButtonState(elements.submitButton, false);
  }
}

// ============================================
// INITIALIZATION
// ============================================

export function initContactForm(): void {
  const form = document.querySelector('#contact form') as HTMLFormElement | null;

  if (!form) {
    console.warn('Contact form not found');
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;

  if (!submitButton) {
    console.warn('Submit button not found');
    return;
  }

  // Create status container if it doesn't exist
  let statusContainer = form.querySelector('[data-form-status]') as HTMLElement | null;
  if (!statusContainer) {
    statusContainer = document.createElement('div');
    statusContainer.setAttribute('data-form-status', '');
    statusContainer.className = 'hidden mb-4';
    statusContainer.setAttribute('role', 'alert');
    statusContainer.setAttribute('aria-live', 'polite');
    form.insertBefore(statusContainer, form.firstChild);
  }

  const elements: FormElements = {
    form,
    submitButton,
    statusContainer,
    fields: form.querySelectorAll('[data-form-field]'),
  };

  // Add CSRF token input
  let csrfInput = form.querySelector('input[name="csrf_token"]') as HTMLInputElement | null;
  if (!csrfInput) {
    csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrf_token';
    form.appendChild(csrfInput);
  }
  csrfInput.value = getCSRFToken();

  // Set up event listeners for field validation on blur
  elements.fields.forEach((field) => {
    const input = field.querySelector('[data-input]');
    if (input) {
      input.addEventListener('blur', () => validateFieldOnBlur(field));
      input.addEventListener('input', () => {
        // Clear error state on input
        if (field.classList.contains('has-error')) {
          clearFieldError(field);
        }
      });
    }
  });

  // Handle form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitForm(form, elements);
  });

  // Reset form state on page unload
  window.addEventListener('beforeunload', resetFormState);
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
}
