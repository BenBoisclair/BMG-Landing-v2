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
const CSRF_COOKIE_NAME = 'bmg_csrf';
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
 * Validates CSRF token from request headers using double-submit cookie pattern
 * Use this in API route handlers
 *
 * Security: Uses timing-safe comparison to prevent timing attacks
 */
export function validateCSRFFromRequest(request: Request): boolean {
  const headerToken = request.headers.get(CSRF_TOKEN_HEADER);
  const cookieHeader = request.headers.get('Cookie');

  if (!headerToken) {
    return false;
  }

  // Basic token format validation
  if (headerToken.length !== TOKEN_LENGTH * 2) {
    return false;
  }

  // Check that token contains only valid hex characters
  if (!/^[0-9a-f]+$/i.test(headerToken)) {
    return false;
  }

  // Double-submit cookie validation: compare header token with cookie token
  if (!cookieHeader) {
    // No cookie header means the double-submit pattern cannot be validated
    // Reject the request for security
    return false;
  }

  const cookies = parseCookies(cookieHeader);
  const cookieToken = cookies[CSRF_COOKIE_NAME];

  if (!cookieToken) {
    // CSRF cookie not present - reject the request
    return false;
  }

  // Use timing-safe comparison to prevent timing attacks
  return timingSafeEqual(headerToken, cookieToken);
}

/**
 * Parse cookies from Cookie header string
 */
function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  const pairs = cookieHeader.split(';');

  for (const pair of pairs) {
    const [name, ...rest] = pair.trim().split('=');
    if (name) {
      cookies[name] = rest.join('=');
    }
  }

  return cookies;
}

/**
 * Timing-safe string comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Extracts and validates the origin from a request
 * Returns true if the origin matches the expected host
 *
 * Security: Uses exact domain matching to prevent subdomain bypass attacks
 * (e.g., attacker.localhost or evil-bmg.co.th)
 */
export function validateRequestOrigin(request: Request, allowedOrigins: string[] = []): boolean {
  const origin = request.headers.get('Origin');
  const referer = request.headers.get('Referer');

  // If no origin/referer, request might be from non-browser client
  // For API endpoints, we should require origin validation
  // Only allow same-origin requests (browsers always send origin for CORS)
  if (!origin && !referer) {
    // Check if this is a same-origin fetch (browsers may omit origin for same-origin)
    // For security, default to rejecting requests without origin in production
    // Note: Some same-origin requests may be blocked; adjust if needed for your use case
    return false;
  }

  let originToCheck: string | null = null;

  // Parse origin/referer safely
  try {
    if (origin) {
      originToCheck = origin;
    } else if (referer) {
      const refererUrl = new URL(referer);
      originToCheck = refererUrl.origin;
    }
  } catch {
    // Invalid URL format - reject the request
    return false;
  }

  if (!originToCheck) {
    // Origin could not be determined - reject for security
    return false;
  }

  // Parse the origin to extract hostname
  let hostname: string;
  try {
    const originUrl = new URL(originToCheck);
    hostname = originUrl.hostname;
  } catch {
    return false;
  }

  // Allow localhost only with exact match (prevents attacker.localhost)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return true;
  }

  // Check against allowed origins using exact domain matching
  if (allowedOrigins.length > 0) {
    return allowedOrigins.some((allowed) => {
      // Exact hostname match (e.g., "bmg.co.th" matches "bmg.co.th")
      if (hostname === allowed) {
        return true;
      }
      // Or hostname ends with .allowed (e.g., "www.bmg.co.th" matches "bmg.co.th")
      if (hostname.endsWith('.' + allowed)) {
        return true;
      }
      return false;
    });
  }

  return true;
}
