import { createClient } from '@sanity/client';

// Environment variables are injected by Vite/Astro at build time
// They're loaded from .env via loadEnv in astro.config.mjs
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || '';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Validate required environment variables
if (!projectId && import.meta.env.PROD) {
  console.warn('Warning: PUBLIC_SANITY_PROJECT_ID is not set. Sanity queries will fail.');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: import.meta.env.PROD,
  requestTagPrefix: 'bmg',
  // Note: Request timeout is handled in individual query functions
  // using AbortController when needed for long-running queries
});

// Type for language selection
export type Language = 'en' | 'th' | 'ar' | 'hi' | 'zh';

// Helper to get localized field value
export function getLocalizedValue<T>(
  obj: { en?: T; th?: T; ar?: T; hi?: T; zh?: T } | undefined,
  lang: Language,
  fallback?: T
): T | undefined {
  if (!obj) return fallback;
  return obj[lang] || obj['en'] || fallback;
}
