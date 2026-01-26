import { sanityClient } from '../sanity';

export interface SanitySocial {
  name: string;
  handle: string;
  url: string;
  icon: string;
}

export interface SanityNavItem {
  key: string;
  label: { en?: string; th?: string; ar?: string };
  href: string;
}

export interface SanityStatistic {
  value: string;
  label: { en?: string; th?: string; ar?: string };
}

export interface SanitySiteSettings {
  _id: string;
  siteName?: string;
  siteUrl?: string;
  defaultSeo?: {
    metaTitle?: { en?: string; th?: string; ar?: string };
    metaDescription?: { en?: string; th?: string; ar?: string };
    ogImage?: any;
  };
  heroTitle?: { en?: string; th?: string; ar?: string };
  heroSubtitle?: { en?: string; th?: string; ar?: string };
  heroVideoUrl?: string;
  heroPoster?: any;
  missionTitle?: { en?: string; th?: string; ar?: string };
  missionDescription?: { en?: string; th?: string; ar?: string };
  statistics?: SanityStatistic[];
  addresses?: string[];
  phones?: string[];
  email?: string;
  socials?: SanitySocial[];
  navigation?: SanityNavItem[];
  footerLinks?: Array<{
    label: { en?: string; th?: string; ar?: string };
    href: string;
  }>;
  copyright?: { en?: string; th?: string; ar?: string };
}

// Singleton document ID
const SITE_SETTINGS_ID = 'siteSettings';

// Get site settings
export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityClient.fetch(
    `
    *[_type == "siteSettings" && _id == $id][0] {
      _id,
      siteName,
      siteUrl,
      defaultSeo,
      heroTitle,
      heroSubtitle,
      "heroVideoUrl": heroVideo.asset->url,
      heroPoster,
      missionTitle,
      missionDescription,
      statistics,
      addresses,
      phones,
      email,
      socials,
      navigation,
      footerLinks,
      copyright
    }
  `,
    { id: SITE_SETTINGS_ID }
  );
}

// Get just contact info
export async function getContactInfo(): Promise<{
  addresses: string[];
  phones: string[];
  email: string;
  socials: SanitySocial[];
} | null> {
  const settings = await getSiteSettings();
  if (!settings) return null;
  return {
    addresses: settings.addresses || [],
    phones: settings.phones || [],
    email: settings.email || '',
    socials: settings.socials || [],
  };
}

// Get navigation
export async function getNavigation(): Promise<SanityNavItem[]> {
  const settings = await getSiteSettings();
  return settings?.navigation || [];
}
