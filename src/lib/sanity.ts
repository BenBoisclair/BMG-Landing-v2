import { createClient } from '@sanity/client';

// Environment variables are injected by Vite/Astro at build time
// They're loaded from .env via loadEnv in astro.config.mjs
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || '';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: import.meta.env.PROD,
});

// Type for language selection
export type Language = 'en' | 'th' | 'ar';

// Helper to get localized field value
export function getLocalizedValue<T>(
  obj: { en?: T; th?: T; ar?: T } | undefined,
  lang: Language,
  fallback?: T
): T | undefined {
  if (!obj) return fallback;
  return obj[lang] || obj['en'] || fallback;
}
