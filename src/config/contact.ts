/**
 * Contact Configuration
 *
 * This file manages contact information using environment variables.
 * For local development, create a .env file based on .env.example
 * For production, set these environment variables in your hosting platform.
 *
 * Note: In Astro's static build mode, environment variables are resolved at build time.
 * Use import.meta.env for client-safe public variables (PUBLIC_ prefix)
 * and process.env for server-side only variables.
 */

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
  icon: string;
}

export interface ContactConfig {
  address: string[];
  phone: string[];
  email: string;
  socials: SocialLink[];
}

/**
 * Parse a comma-separated string into an array
 * Supports escaped commas with backslash
 */
function parseCommaSeparated(value: string | undefined, defaultValue: string[] = []): string[] {
  if (!value) return defaultValue;
  // Split by comma, but not escaped commas
  return value.split(/(?<!\\),/).map(s => s.replace(/\\,/g, ',').trim()).filter(Boolean);
}

/**
 * Parse social media configuration from environment variables
 * Format: name|handle|url|icon (comma-separated for multiple)
 */
function parseSocials(value: string | undefined, defaultSocials: SocialLink[]): SocialLink[] {
  if (!value) return defaultSocials;

  try {
    const socialStrings = value.split(';;').filter(Boolean);
    return socialStrings.map(social => {
      const [name, handle, url, icon] = social.split('|').map(s => s.trim());
      return { name, handle, url, icon };
    }).filter(s => s.name && s.handle && s.url && s.icon);
  } catch {
    console.warn('Failed to parse CONTACT_SOCIALS, using defaults');
    return defaultSocials;
  }
}

// Default values - used as fallback if environment variables are not set
const defaultAddress = [
  '9/11 Moo 10 Boromraj-Chonnee Road',
  'Sala Dhammasop, Taweewattana',
  'Bangkok 10170'
];

const defaultPhones = ['+66 2 888 7788', '+66 0877896226', '+66 81 445 9999'];

const defaultEmail = 'bmgthai@bmg.co.th';

const defaultSocials: SocialLink[] = [
  {
    name: 'Facebook',
    handle: 'BMG บางกอกโมเดอร์นแกรนิต',
    url: 'https://www.facebook.com/bmgthailand',
    icon: 'facebook'
  },
  {
    name: 'Line',
    handle: '@bmgstone',
    url: 'https://page.line.me/bmgstone?openQrModal=true',
    icon: 'line'
  },
  {
    name: 'Instagram',
    handle: 'bangkokmoderngranite',
    url: 'https://www.instagram.com/bangkokmoderngranite',
    icon: 'instagram'
  },
  {
    name: 'YouTube',
    handle: 'bmgthai granite',
    url: 'https://www.youtube.com/channel/UC9FCyP3XZHRkvK9vnnh8IMg',
    icon: 'youtube'
  },
];

/**
 * Get contact configuration from environment variables
 * Falls back to default values if environment variables are not set
 */
export function getContactConfig(): ContactConfig {
  return {
    address: parseCommaSeparated(
      import.meta.env.CONTACT_ADDRESS,
      defaultAddress
    ),
    phone: parseCommaSeparated(
      import.meta.env.CONTACT_PHONES,
      defaultPhones
    ),
    email: import.meta.env.CONTACT_EMAIL || defaultEmail,
    socials: parseSocials(
      import.meta.env.CONTACT_SOCIALS,
      defaultSocials
    ),
  };
}

// Export the config object directly for convenience
export const contactConfig = getContactConfig();
