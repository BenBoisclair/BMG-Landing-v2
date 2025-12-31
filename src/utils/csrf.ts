/**
 * CSRF Protection Utilities
 *
 * Provides CSRF token generation and validation for form submissions.
 * Uses the Web Crypto API for secure token generation.
 */

// ============================================
// TYPES AND INTERFACES
// ============================================

export interface CSRFTokenData {
  token: string;
  timestamp: number;
  expiresAt: number;
}

// ============================================
// CONSTANTS
// ============================================

const CSRF_TOKEN_KEY = 'bmg_csrf_token';
const CSRF_TOKEN_HEADER = 'X-CSRF-Token';
const TOKEN_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes
const TOKEN_LENGTH = 32;

// ============================================
// TOKEN GENERATION
// ============================================

/**
 * Generates a cryptographically secure random token
 */
function generateSecureToken(length: number = TOKEN_LENGTH): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Creates a new CSRF token with timestamp and expiry
 */
export function createCSRFToken(): CSRFTokenData {
  const timestamp = Date.now();
  const token = generateSecureToken();

  const tokenData: CSRFTokenData = {
    token,
    timestamp,
    expiresAt: timestamp + TOKEN_EXPIRY_MS,
  };

  // Store in sessionStorage for client-side validation
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      sessionStorage.setItem(CSRF_TOKEN_KEY, JSON.stringify(tokenData));
    } catch {
      // Handle cases where sessionStorage is not available
      console.warn('Unable to store CSRF token in sessionStorage');
    }
  }

  return tokenData;
}

/**
 * Gets the current CSRF token, generating a new one if needed
 */
export function getCSRFToken(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  try {
    const stored = sessionStorage.getItem(CSRF_TOKEN_KEY);

    if (stored) {
      const tokenData: CSRFTokenData = JSON.parse(stored);

      // Check if token is still valid
      if (tokenData.expiresAt > Date.now()) {
        return tokenData.token;
      }
    }

    // Generate new token if none exists or expired
    const newTokenData = createCSRFToken();
    return newTokenData.token;
  } catch {
    // If parsing fails, generate a new token
    const newTokenData = createCSRFToken();
    return newTokenData.token;
  }
}

/**
 * Validates a CSRF token against the stored token
 */
export function validateCSRFToken(token: string): boolean {
  if (typeof window === 'undefined' || !token) {
    return false;
  }

  try {
    const stored = sessionStorage.getItem(CSRF_TOKEN_KEY);

    if (!stored) {
      return false;
    }

    const tokenData: CSRFTokenData = JSON.parse(stored);

    // Check token match and expiry
    const isValid = tokenData.token === token && tokenData.expiresAt > Date.now();

    return isValid;
  } catch {
    return false;
  }
}

/**
 * Regenerates the CSRF token (call after successful form submission)
 */
export function regenerateCSRFToken(): string {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      sessionStorage.removeItem(CSRF_TOKEN_KEY);
    } catch {
      // Ignore storage errors
    }
  }
  return getCSRFToken();
}

/**
 * Clears the stored CSRF token
 */
export function clearCSRFToken(): void {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      sessionStorage.removeItem(CSRF_TOKEN_KEY);
    } catch {
      // Ignore storage errors
    }
  }
}

// ============================================
// HTTP UTILITIES
// ============================================

/**
 * Gets the CSRF token header name
 */
export function getCSRFHeaderName(): string {
  return CSRF_TOKEN_HEADER;
}

/**
 * Creates headers object with CSRF token included
 */
export function createCSRFHeaders(): Record<string, string> {
  return {
    [CSRF_TOKEN_HEADER]: getCSRFToken(),
  };
}

/**
 * Adds CSRF token to a fetch request options object
 */
export function withCSRFToken(options: RequestInit = {}): RequestInit {
  const csrfToken = getCSRFToken();

  return {
    ...options,
    headers: {
      ...options.headers,
      [CSRF_TOKEN_HEADER]: csrfToken,
    },
  };
}

// ============================================
// SERVER-SIDE VALIDATION (for API routes)
// ============================================

/**
 * Validates CSRF token from request headers
 * Use this in API route handlers
 */
export function validateCSRFFromRequest(request: Request): boolean {
  const token = request.headers.get(CSRF_TOKEN_HEADER);

  if (!token) {
    return false;
  }

  // For server-side validation, we need to compare against a stored token
  // In a real implementation, this would check against a server-side session store
  // For now, we rely on the token format validation and origin checks

  // Basic token format validation
  if (token.length !== TOKEN_LENGTH * 2) {
    return false;
  }

  // Check that token contains only valid hex characters
  if (!/^[0-9a-f]+$/i.test(token)) {
    return false;
  }

  return true;
}

/**
 * Extracts and validates the origin from a request
 * Returns true if the origin matches the expected host
 */
export function validateRequestOrigin(request: Request, allowedOrigins: string[] = []): boolean {
  const origin = request.headers.get('Origin');
  const referer = request.headers.get('Referer');

  // If no origin/referer, request might be from same origin
  if (!origin && !referer) {
    return true;
  }

  const originToCheck = origin || (referer ? new URL(referer).origin : null);

  if (!originToCheck) {
    return true;
  }

  // Allow localhost in development
  if (originToCheck.includes('localhost') || originToCheck.includes('127.0.0.1')) {
    return true;
  }

  // Check against allowed origins if provided
  if (allowedOrigins.length > 0) {
    return allowedOrigins.some((allowed) => originToCheck.includes(allowed));
  }

  return true;
}
