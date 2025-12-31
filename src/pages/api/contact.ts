/**
 * Contact Form API Endpoint
 *
 * Handles contact form submissions with validation, sanitization, and CSRF protection.
 * This endpoint processes POST requests from the contact form.
 */

import type { APIRoute } from 'astro';
import {
  sanitizeFormData,
  validateContactForm,
  type FormValidationResult,
} from '../../utils/validation';
import {
  validateCSRFFromRequest,
  validateRequestOrigin,
} from '../../utils/csrf';

// ============================================
// TYPES
// ============================================

interface ContactFormData {
  firstName: string;
  surname: string;
  phone: string;
  'phone-country'?: string;
  email: string;
  whatsapp?: string;
  position?: string;
  projectType?: string;
  budget?: string;
  consideration?: string;
  timeline?: string;
  remark?: string;
  consent?: string;
}

interface APIResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  data?: Partial<ContactFormData>;
}

// ============================================
// RATE LIMITING (Simple in-memory implementation)
// ============================================

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientId);

  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(clientId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  clientData.count++;
  return true;
}

function getClientId(request: Request): string {
  // Try to get client IP from headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  return forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';
}

// ============================================
// ALLOWED ORIGINS
// ============================================

const ALLOWED_ORIGINS = [
  'bmg.co.th',
  'www.bmg.co.th',
  'bangkokmoderngranite.com',
  'www.bangkokmoderngranite.com',
];

// ============================================
// API HANDLERS
// ============================================

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    // Security headers
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
  };

  try {
    // 1. Validate request origin
    if (!validateRequestOrigin(request, ALLOWED_ORIGINS)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid request origin',
        } satisfies APIResponse),
        { status: 403, headers }
      );
    }

    // 2. Validate CSRF token
    if (!validateCSRFFromRequest(request)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid or missing CSRF token',
        } satisfies APIResponse),
        { status: 403, headers }
      );
    }

    // 3. Check rate limiting
    const clientId = getClientId(request);
    if (!checkRateLimit(clientId)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Too many requests. Please try again later.',
        } satisfies APIResponse),
        { status: 429, headers: { ...headers, 'Retry-After': '60' } }
      );
    }

    // 4. Parse request body
    let formData: Record<string, string>;
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      formData = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const body = await request.formData();
      formData = Object.fromEntries(
        Array.from(body.entries()).map(([key, value]) => [key, String(value)])
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Unsupported content type',
        } satisfies APIResponse),
        { status: 415, headers }
      );
    }

    // 5. Sanitize input data
    const sanitizedData = sanitizeFormData(formData);

    // 6. Validate form data
    const validation: FormValidationResult = validateContactForm(sanitizedData);

    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Validation failed. Please check your input.',
          errors: validation.errors,
        } satisfies APIResponse),
        { status: 400, headers }
      );
    }

    // 7. Check consent checkbox
    if (!formData.consent || formData.consent !== 'true') {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please accept the consent checkbox to submit the form.',
          errors: { consent: 'Consent is required' },
        } satisfies APIResponse),
        { status: 400, headers }
      );
    }

    // 8. Process the form submission
    // In a real implementation, this would:
    // - Save to a database
    // - Send notification emails
    // - Integrate with a CRM
    // - etc.

    const processedData: ContactFormData = {
      firstName: sanitizedData.firstName,
      surname: sanitizedData.surname,
      phone: sanitizedData.phone,
      'phone-country': sanitizedData['phone-country'],
      email: sanitizedData.email,
      whatsapp: sanitizedData.whatsapp,
      position: sanitizedData.position,
      projectType: sanitizedData.projectType,
      budget: sanitizedData.budget,
      consideration: sanitizedData.consideration,
      timeline: sanitizedData.timeline,
      remark: sanitizedData.remark,
    };

    // Log for debugging (remove in production or use proper logging)
    console.log('Contact form submission received:', {
      timestamp: new Date().toISOString(),
      clientId,
      data: {
        ...processedData,
        email: processedData.email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Mask email in logs
      },
    });

    // 9. Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your inquiry! We will contact you soon.',
      } satisfies APIResponse),
      { status: 200, headers }
    );
  } catch (error) {
    // Log error for debugging
    console.error('Contact form error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      } satisfies APIResponse),
      { status: 500, headers }
    );
  }
};

// Handle other methods
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      success: false,
      message: 'Method not allowed',
    } satisfies APIResponse),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        Allow: 'POST',
      },
    }
  );
};

export const ALL: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      success: false,
      message: 'Method not allowed',
    } satisfies APIResponse),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        Allow: 'POST',
      },
    }
  );
};
