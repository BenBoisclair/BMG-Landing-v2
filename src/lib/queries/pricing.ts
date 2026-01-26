import { sanityClient } from '../sanity';

export interface SanitySculptureType {
  id: string;
  label: { en?: string; th?: string; ar?: string };
  image?: any;
}

export interface SanityStoneGrade {
  id: string;
  label: { en?: string; th?: string; ar?: string };
  description?: { en?: string; th?: string; ar?: string };
  pricePerMm3: number;
  image?: any;
}

export interface SanityDetailLevel {
  id: string;
  label: { en?: string; th?: string; ar?: string };
  description?: { en?: string; th?: string; ar?: string };
  additionalCost: number;
  image?: any;
}

export interface SanityPricingConfig {
  _id: string;
  title?: { en?: string; th?: string; ar?: string };
  subtitle?: { en?: string; th?: string; ar?: string };
  sculptureTypes?: SanitySculptureType[];
  stoneGrades?: SanityStoneGrade[];
  detailLevels?: SanityDetailLevel[];
  maxDimension?: number;
  disclaimer?: { en?: string; th?: string; ar?: string };
  ctaButton?: { en?: string; th?: string; ar?: string };
}

// Singleton document ID
const PRICING_CONFIG_ID = 'pricingConfig';

// Get pricing configuration
export async function getPricingConfig(): Promise<SanityPricingConfig | null> {
  return sanityClient.fetch(
    `
    *[_type == "pricingConfig" && _id == $id][0] {
      _id,
      title,
      subtitle,
      sculptureTypes,
      stoneGrades,
      detailLevels,
      maxDimension,
      disclaimer,
      ctaButton
    }
  `,
    { id: PRICING_CONFIG_ID }
  );
}
