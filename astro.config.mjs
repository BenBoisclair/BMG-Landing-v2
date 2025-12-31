// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import compress from 'vite-plugin-compression';

// https://astro.build/config
export default defineConfig({
  // Site URL for sitemap generation
  site: 'https://bmg-granite.com',

  // Integrations for build optimizations
  integrations: [
    // Generate sitemap.xml for better SEO and crawlability
    sitemap({
      // Include all localized pages
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          th: 'th',
          ar: 'ar',
        },
      },
      // Filter out any API routes
      filter: (page) => !page.includes('/api/'),
    }),
  ],

  // Static output is the default in Astro 5.x
  // Pages are prerendered by default; use `export const prerender = false`
  // in specific pages/API routes that need server-side rendering
  output: 'static',

  // Vercel adapter for SSR and API routes
  adapter: vercel(),

  vite: {
    plugins: [
      tailwindcss(),
      // Gzip compression for static assets
      compress({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      // Brotli compression for static assets (better compression)
      compress({
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
    ],
    build: {
      // Enable minification for production builds
      minify: 'esbuild',
      // Disable CSS code splitting to ensure all pages get complete Tailwind CSS
      cssCodeSplit: false,
      // Generate source maps for debugging (optional, can be disabled in production)
      sourcemap: false,
      // Rollup options for chunking
      rollupOptions: {
        output: {
          // Manual chunking for better caching
          manualChunks: {
            'vendor': ['@google/model-viewer'],
          },
        },
      },
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'th', 'ar'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // Security settings
  security: {
    checkOrigin: true,
  },

  experimental: {
    /**
     * Content Security Policy (CSP) Configuration
     *
     * This experimental feature (Astro 5.9+) adds CSP headers via meta tags
     * to protect against XSS attacks and unauthorized content injection.
     *
     * Astro automatically generates hashes for inline scripts and styles,
     * eliminating the need for 'unsafe-inline' in most cases.
     *
     * @see https://docs.astro.build/en/reference/experimental-flags/csp/
     */
    csp: {
      // Hash algorithm for script and style integrity
      algorithm: 'SHA-256',

      // Additional CSP directives for non-script/style content
      directives: [
        // Default fallback - only allow same origin
        "default-src 'self'",

        // Images - self, data URIs (for inline images), blob (for model-viewer)
        "img-src 'self' data: blob:",

        // Fonts - self + Google Fonts
        "font-src 'self' https://fonts.gstatic.com data:",

        // Connections - self + blob (for model-viewer WebGL)
        "connect-src 'self' blob:",

        // Frames - none (no iframes allowed)
        "frame-src 'none'",

        // Objects (plugins) - none (block Flash, Java, etc.)
        "object-src 'none'",

        // Base URI - only self (prevent base tag injection)
        "base-uri 'self'",

        // Form actions - only self (prevent form hijacking)
        "form-action 'self'",

        // Web Workers - self + blob (needed for model-viewer)
        "worker-src 'self' blob:",

        // Media (audio/video) - self
        "media-src 'self'",

        // Manifests - self
        "manifest-src 'self'",

        // Upgrade insecure requests
        'upgrade-insecure-requests',
      ],

      // Style sources configuration
      // Astro will automatically add hashes for inline styles
      styleDirective: {
        resources: [
          "'self'",
          'https://fonts.googleapis.com', // Google Fonts stylesheets
        ],
      },

      // Script sources configuration
      // Astro will automatically add hashes for inline scripts
      scriptDirective: {
        resources: [
          "'self'",
          'blob:', // Required for model-viewer Web Workers
        ],
        // 'unsafe-eval' may be needed for model-viewer WASM
        // If you encounter issues, uncomment the following:
        // hashes: [],
      },
    },
  },
});
