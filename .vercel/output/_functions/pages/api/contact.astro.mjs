export { renderers } from '../../renderers.mjs';

const VALIDATION_PATTERNS = {
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
  name: /^[\p{L}\p{M}][\p{L}\p{M}\s\-']*[\p{L}\p{M}]$|^[\p{L}\p{M}]$/u};
const HTML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;"
};
function sanitizeHTML(input) {
  if (typeof input !== "string") {
    return "";
  }
  return input.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] || char);
}
function stripHTMLTags(input) {
  if (typeof input !== "string") {
    return "";
  }
  return input.replace(/<[^>]*>/g, "");
}
function sanitizeForDisplay(input) {
  if (typeof input !== "string") {
    return "";
  }
  const stripped = stripHTMLTags(input);
  return sanitizeHTML(stripped);
}
function sanitizePhone(input) {
  if (typeof input !== "string") {
    return "";
  }
  return input.replace(/[^\d+\-() ]/g, "").trim();
}
function sanitizeEmail(input) {
  if (typeof input !== "string") {
    return "";
  }
  return input.toLowerCase().trim();
}
function sanitizeURL(input) {
  if (typeof input !== "string") {
    return "";
  }
  let url = input.trim();
  const dangerousProtocols = ["javascript:", "data:", "vbscript:", "file:"];
  const lowerUrl = url.toLowerCase();
  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return "";
    }
  }
  return url;
}
function sanitizeName(input) {
  if (typeof input !== "string") {
    return "";
  }
  return input.replace(/[^\p{L}\p{M}\s\-']/gu, "").trim();
}
function sanitizeTextarea(input) {
  if (typeof input !== "string") {
    return "";
  }
  return sanitizeForDisplay(input);
}
function sanitizeFormData(data) {
  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value !== "string") {
      sanitized[key] = "";
      continue;
    }
    switch (key) {
      case "email":
        sanitized[key] = sanitizeEmail(value);
        break;
      case "phone":
      case "whatsapp":
      case "phone-country":
        sanitized[key] = sanitizePhone(value);
        break;
      case "firstName":
      case "surname":
        sanitized[key] = sanitizeName(value);
        break;
      case "remark":
        sanitized[key] = sanitizeTextarea(value);
        break;
      default:
        sanitized[key] = sanitizeForDisplay(value);
    }
  }
  return sanitized;
}
function validateRequired(value) {
  const trimmed = value?.trim() || "";
  return {
    isValid: trimmed.length > 0,
    error: trimmed.length > 0 ? void 0 : "This field is required"
  };
}
function validateEmail(value) {
  if (!value || value.trim() === "") {
    return { isValid: true };
  }
  const sanitized = sanitizeEmail(value);
  const isValid = VALIDATION_PATTERNS.email.test(sanitized);
  return {
    isValid,
    error: isValid ? void 0 : "Please enter a valid email address"
  };
}
function validatePhone(value, countryCode) {
  if (!value || value.trim() === "") {
    return { isValid: true };
  }
  const sanitized = sanitizePhone(value);
  if (!VALIDATION_PATTERNS.phone.test(sanitized)) {
    return {
      isValid: false,
      error: "Phone number contains invalid characters"
    };
  }
  const digitsOnly = sanitized.replace(/\D/g, "");
  const isValidLength = digitsOnly.length >= 7 && digitsOnly.length <= 15;
  return {
    isValid: isValidLength,
    error: isValidLength ? void 0 : "Please enter a valid phone number (7-15 digits)"
  };
}
function validateURL(value) {
  if (!value || value.trim() === "") {
    return { isValid: true };
  }
  const sanitized = sanitizeURL(value);
  if (sanitized === "") {
    return {
      isValid: false,
      error: "Invalid URL protocol"
    };
  }
  const isValid = VALIDATION_PATTERNS.url.test(sanitized);
  return {
    isValid,
    error: isValid ? void 0 : "Please enter a valid URL (including http:// or https://)"
  };
}
function validateName(value) {
  if (!value || value.trim() === "") {
    return { isValid: true };
  }
  const sanitized = sanitizeName(value);
  const isValid = VALIDATION_PATTERNS.name.test(sanitized) && sanitized.length >= 1;
  return {
    isValid,
    error: isValid ? void 0 : "Please enter a valid name (letters only)"
  };
}
function validateMinLength(value, minLength) {
  const length = value?.trim().length || 0;
  const isValid = length >= minLength;
  return {
    isValid,
    error: isValid ? void 0 : `Must be at least ${minLength} characters`
  };
}
function validateMaxLength(value, maxLength) {
  const length = value?.length || 0;
  const isValid = length <= maxLength;
  return {
    isValid,
    error: isValid ? void 0 : `Must be no more than ${maxLength} characters`
  };
}
function validatePattern(value, pattern) {
  if (!value || value.trim() === "") {
    return { isValid: true };
  }
  const isValid = pattern.test(value);
  return {
    isValid,
    error: isValid ? void 0 : "Invalid format"
  };
}
function validateField(value, rules) {
  for (const rule of rules) {
    let result;
    switch (rule.type) {
      case "required":
        result = validateRequired(value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;
      case "email":
        result = validateEmail(value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;
      case "phone":
        result = validatePhone(value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;
      case "url":
        result = validateURL(value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;
      case "name":
        result = validateName(value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;
      case "minLength":
        result = validateMinLength(value, rule.value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;
      case "maxLength":
        result = validateMaxLength(value, rule.value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;
      case "pattern":
        result = validatePattern(value, rule.value);
        if (!result.isValid) {
          return { isValid: false, error: rule.message || result.error };
        }
        break;
    }
  }
  return { isValid: true };
}
function validateForm(formData, fieldRules) {
  const errors = {};
  let isValid = true;
  for (const [fieldName, rules] of Object.entries(fieldRules)) {
    const value = formData[fieldName] || "";
    const result = validateField(value, rules);
    if (!result.isValid) {
      isValid = false;
      errors[fieldName] = result.error || "Invalid input";
    }
  }
  return { isValid, errors };
}
const CONTACT_FORM_RULES = {
  firstName: [
    { type: "required", message: "First name is required" },
    { type: "name", message: "Please enter a valid first name" },
    { type: "minLength", value: 1, message: "First name is too short" },
    { type: "maxLength", value: 50, message: "First name is too long" }
  ],
  surname: [
    { type: "required", message: "Surname is required" },
    { type: "name", message: "Please enter a valid surname" },
    { type: "minLength", value: 1, message: "Surname is too short" },
    { type: "maxLength", value: 50, message: "Surname is too long" }
  ],
  phone: [
    { type: "required", message: "Phone number is required" },
    { type: "phone", message: "Please enter a valid phone number" }
  ],
  email: [
    { type: "required", message: "Email is required" },
    { type: "email", message: "Please enter a valid email address" }
  ],
  whatsapp: [
    { type: "phone", message: "Please enter a valid WhatsApp number" }
  ],
  remark: [
    { type: "maxLength", value: 2e3, message: "Message is too long (max 2000 characters)" }
  ]
};
function validateContactForm(formData) {
  return validateForm(formData, CONTACT_FORM_RULES);
}

const CSRF_TOKEN_HEADER = "X-CSRF-Token";
const TOKEN_LENGTH = 32;
function validateCSRFFromRequest(request) {
  const token = request.headers.get(CSRF_TOKEN_HEADER);
  if (!token) {
    return false;
  }
  if (token.length !== TOKEN_LENGTH * 2) {
    return false;
  }
  if (!/^[0-9a-f]+$/i.test(token)) {
    return false;
  }
  return true;
}
function validateRequestOrigin(request, allowedOrigins = []) {
  const origin = request.headers.get("Origin");
  const referer = request.headers.get("Referer");
  if (!origin && !referer) {
    return true;
  }
  const originToCheck = origin || (referer ? new URL(referer).origin : null);
  if (!originToCheck) {
    return true;
  }
  if (originToCheck.includes("localhost") || originToCheck.includes("127.0.0.1")) {
    return true;
  }
  if (allowedOrigins.length > 0) {
    return allowedOrigins.some((allowed) => originToCheck.includes(allowed));
  }
  return true;
}

const rateLimitMap = /* @__PURE__ */ new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1e3;
const MAX_REQUESTS_PER_WINDOW = 5;
function checkRateLimit(clientId) {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientId);
  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(clientId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    });
    return true;
  }
  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  clientData.count++;
  return true;
}
function getClientId(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
}
const ALLOWED_ORIGINS = [
  "bmg.co.th",
  "www.bmg.co.th",
  "bangkokmoderngranite.com",
  "www.bangkokmoderngranite.com"
];
const prerender = false;
const POST = async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
    // Security headers
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Cache-Control": "no-store, no-cache, must-revalidate"
  };
  try {
    if (!validateRequestOrigin(request, ALLOWED_ORIGINS)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid request origin"
        }),
        { status: 403, headers }
      );
    }
    if (!validateCSRFFromRequest(request)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid or missing CSRF token"
        }),
        { status: 403, headers }
      );
    }
    const clientId = getClientId(request);
    if (!checkRateLimit(clientId)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Too many requests. Please try again later."
        }),
        { status: 429, headers: { ...headers, "Retry-After": "60" } }
      );
    }
    let formData;
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      formData = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const body = await request.formData();
      formData = Object.fromEntries(
        Array.from(body.entries()).map(([key, value]) => [key, String(value)])
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unsupported content type"
        }),
        { status: 415, headers }
      );
    }
    const sanitizedData = sanitizeFormData(formData);
    const validation = validateContactForm(sanitizedData);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Validation failed. Please check your input.",
          errors: validation.errors
        }),
        { status: 400, headers }
      );
    }
    if (!formData.consent || formData.consent !== "true") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please accept the consent checkbox to submit the form.",
          errors: { consent: "Consent is required" }
        }),
        { status: 400, headers }
      );
    }
    const processedData = {
      firstName: sanitizedData.firstName,
      surname: sanitizedData.surname,
      phone: sanitizedData.phone,
      "phone-country": sanitizedData["phone-country"],
      email: sanitizedData.email,
      whatsapp: sanitizedData.whatsapp,
      position: sanitizedData.position,
      projectType: sanitizedData.projectType,
      budget: sanitizedData.budget,
      consideration: sanitizedData.consideration,
      timeline: sanitizedData.timeline,
      remark: sanitizedData.remark
    };
    console.log("Contact form submission received:", {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      clientId,
      data: {
        ...processedData,
        email: processedData.email.replace(/(.{2}).*(@.*)/, "$1***$2")
        // Mask email in logs
      }
    });
    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for your inquiry! We will contact you soon."
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An unexpected error occurred. Please try again later."
      }),
      { status: 500, headers }
    );
  }
};
const GET = async () => {
  return new Response(
    JSON.stringify({
      success: false,
      message: "Method not allowed"
    }),
    {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        Allow: "POST"
      }
    }
  );
};
const ALL = async () => {
  return new Response(
    JSON.stringify({
      success: false,
      message: "Method not allowed"
    }),
    {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        Allow: "POST"
      }
    }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
