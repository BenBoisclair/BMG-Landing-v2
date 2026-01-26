// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import compress from 'vite-plugin-compression';
import { loadEnv } from 'vite';

// Load environment variables from .env files
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
const PUBLIC_SANITY_PROJECT_ID = env.PUBLIC_SANITY_PROJECT_ID || '';
const PUBLIC_SANITY_DATASET = env.PUBLIC_SANITY_DATASET || 'production';
const PUBLIC_SANITY_API_VERSION = env.PUBLIC_SANITY_API_VERSION || '2024-01-01';

// https://astro.build/config
export default defineConfig({
  // Site URL for sitemap generation
  site: 'https://bmg-granite.com',

  // Integrations for build optimizations
  integrations: [
    // React integration required for Sanity Studio (must be before sanity)
    react(),
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
      // Filter out any API routes and studio
      filter: (page) => !page.includes('/api/') && !page.includes('/studio'),
    }),
    // Sanity CMS integration
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID || '',
      dataset: PUBLIC_SANITY_DATASET || 'production',
      studioBasePath: '/studio',
      useCdn: false, // Use false for server-side rendering, true for CDN caching
    }),
  ],

  // Static output with on-demand rendering for specific pages
  // Pages are prerendered by default; use `export const prerender = false`
  // for pages that need server-side rendering (like the Sanity Studio)
  output: 'static',

  // Vercel adapter for SSR and API routes
  adapter: vercel(),

  vite: {
    // Inject Sanity env vars at build time
    define: {
      'import.meta.env.PUBLIC_SANITY_PROJECT_ID': JSON.stringify(PUBLIC_SANITY_PROJECT_ID),
      'import.meta.env.PUBLIC_SANITY_DATASET': JSON.stringify(PUBLIC_SANITY_DATASET),
      'import.meta.env.PUBLIC_SANITY_API_VERSION': JSON.stringify(PUBLIC_SANITY_API_VERSION),
    },
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
