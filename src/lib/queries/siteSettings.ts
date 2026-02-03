import { sanityClient } from '../sanity';

// Localized string type for all 5 supported languages
interface LocalizedString {
  en?: string;
  th?: string;
  ar?: string;
  hi?: string;
  zh?: string;
}

export interface SanitySocial {
  name: string;
  handle: string;
  url: string;
  icon: string;
}

export interface SanityNavItem {
  key: string;
  label: LocalizedString;
  href: string;
}

export interface SanityStatistic {
  value: string;
  label: LocalizedString;
}

export interface SanitySiteSettings {
  _id: string;
  siteName?: string;
  siteUrl?: string;
  defaultSeo?: {
    metaTitle?: LocalizedString;
    metaDescription?: LocalizedString;
    ogImage?: any;
  };
  heroTitle?: LocalizedString;
  heroSubtitle?: LocalizedString;
  heroVideoUrl?: string;
  heroVideoExternalUrl?: string;
  heroPoster?: any;
  missionTitle?: LocalizedString;
  missionDescription?: LocalizedString;
  statistics?: SanityStatistic[];
  materialsCategoryPremium?: LocalizedString;
  materialsCategoryLuxury?: LocalizedString;
  materialsCategoryClassic?: LocalizedString;
  materialsPageHeroImage?: any;
  projectsPageHeroImage?: any;
  processPageHeroImage?: any;
  contactPageHeroImage?: any;
  addresses?: string[];
  phones?: string[];
  email?: string;
  socials?: SanitySocial[];
  navigation?: SanityNavItem[];
  footerLinks?: Array<{
    label: LocalizedString;
    href: string;
  }>;
  copyright?: LocalizedString;
}

// Singleton document ID
const SITE_SETTINGS_ID = 'siteSettings';

// Get site settings with error handling
export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  try {
    return await sanityClient.fetch(
      `
      *[_type == "siteSettings" && _id == $id][0] {
        _id,
        siteName,
        siteUrl,
        defaultSeo,
        heroTitle,
        heroSubtitle,
        "heroVideoUrl": heroVideo.asset->url,
        heroVideoExternalUrl,
        heroPoster,
        missionTitle,
        missionDescription,
        statistics,
        materialsCategoryPremium,
        materialsCategoryLuxury,
        materialsCategoryClassic,
        materialsPageHeroImage,
        projectsPageHeroImage,
        processPageHeroImage,
        contactPageHeroImage,
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
  } catch (error) {
    console.error('Failed to fetch site settings from Sanity:', error);
    return null;
  }
}

// Get just contact info with error handling
export async function getContactInfo(): Promise<{
  addresses: string[];
  phones: string[];
  email: string;
  socials: SanitySocial[];
} | null> {
  try {
    const settings = await getSiteSettings();
    if (!settings) return null;
    return {
      addresses: settings.addresses || [],
      phones: settings.phones || [],
      email: settings.email || '',
      socials: settings.socials || [],
    };
  } catch (error) {
    console.error('Failed to fetch contact info:', error);
    return null;
  }
}

// Get navigation with error handling
export async function getNavigation(): Promise<SanityNavItem[]> {
  try {
    const settings = await getSiteSettings();
    return settings?.navigation || [];
  } catch (error) {
    console.error('Failed to fetch navigation:', error);
    return [];
  }
}
