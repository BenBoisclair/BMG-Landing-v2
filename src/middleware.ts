import { defineMiddleware } from 'astro:middleware';

/**
 * Security Headers Middleware
 *
 * Adds additional security headers to complement Astro's experimental CSP feature.
 *
 * The CSP is configured in astro.config.mjs using the experimental.csp option,
 * which adds a <meta> tag with the CSP directives. This middleware adds
 * supplementary security headers that cannot be set via meta tags.
 *
 * Headers added:
 * - X-Content-Type-Options: Prevents MIME type sniffing
 * - X-Frame-Options: Controls iframe embedding (legacy, also in CSP)
 * - X-XSS-Protection: XSS filter for older browsers
 * - Referrer-Policy: Controls referrer information leakage
 * - Strict-Transport-Security: Forces HTTPS connections (HSTS)
 * - Permissions-Policy: Restricts access to sensitive browser features
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
 */

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Only add security headers to HTML responses
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('text/html')) {
    // Clone the response to modify headers
    const newHeaders = new Headers(response.headers);

    // Prevent MIME type sniffing
    // This stops browsers from trying to guess the content type
    newHeaders.set('X-Content-Type-Options', 'nosniff');

    // Enable XSS filter in older browsers
    // Modern browsers have deprecated this in favor of CSP
    newHeaders.set('X-XSS-Protection', '1; mode=block');

    // Control iframe embedding
    // This is a legacy header; CSP frame-ancestors is preferred but
    // frame-ancestors cannot be set via meta tag, so we use this as backup
    newHeaders.set('X-Frame-Options', 'SAMEORIGIN');

    // Control referrer information
    // 'strict-origin-when-cross-origin' is a good balance of security and functionality
    newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // HTTP Strict Transport Security (HSTS)
    // Forces browsers to use HTTPS for all future requests to this domain
    // max-age=31536000 (1 year) is the recommended minimum for HSTS preload
    // includeSubDomains: applies HSTS to all subdomains
    // Note: Only add HSTS when the site is served over HTTPS
    // The header is ignored over HTTP, but it's good practice to check
    newHeaders.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );

    // Permissions Policy (formerly Feature Policy)
    // Restrict access to sensitive browser features
    // This is especially important for sites that don't need these features
    newHeaders.set(
      'Permissions-Policy',
      [
        'accelerometer=()',     // Motion sensors
        'camera=()',            // Camera access
        'geolocation=()',       // Location access
        'gyroscope=()',         // Gyroscope sensor
        'magnetometer=()',      // Magnetometer sensor
        'microphone=()',        // Microphone access
        'payment=()',           // Payment API
        'usb=()',               // USB device access
        'interest-cohort=()',   // FLoC tracking (deprecated but good to disable)
      ].join(', ')
    );

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
});
