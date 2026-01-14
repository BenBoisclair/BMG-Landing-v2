import { d as defineMiddleware, s as sequence } from './chunks/index_C0NZTcqs.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_DMWZji4t.mjs';
import 'piccolore';
import './chunks/astro/server_DN3y_WhJ.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const response = await next();
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("text/html")) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set("X-Content-Type-Options", "nosniff");
    newHeaders.set("X-XSS-Protection", "1; mode=block");
    newHeaders.set("X-Frame-Options", "SAMEORIGIN");
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    newHeaders.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    newHeaders.set(
      "Permissions-Policy",
      [
        "accelerometer=()",
        // Motion sensors
        "camera=()",
        // Camera access
        "geolocation=()",
        // Location access
        "gyroscope=()",
        // Gyroscope sensor
        "magnetometer=()",
        // Magnetometer sensor
        "microphone=()",
        // Microphone access
        "payment=()",
        // Payment API
        "usb=()",
        // USB device access
        "interest-cohort=()"
        // FLoC tracking (deprecated but good to disable)
      ].join(", ")
    );
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
  return response;
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
