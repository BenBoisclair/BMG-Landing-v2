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

  // CSP is configured via Vercel headers (vercel.json) instead of Astro's experimental CSP.
  // Astro's CSP auto-generates hashes which causes 'unsafe-inline' to be ignored by browsers,
  // breaking third-party libraries like Leaflet and model-viewer that inject dynamic content.
});
