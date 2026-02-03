import { sanityClient } from '../sanity';

// Localized string type for all 5 supported languages
interface LocalizedString {
  en?: string;
  th?: string;
  ar?: string;
  hi?: string;
  zh?: string;
}

export interface SanityMaterial {
  _id: string;
  internalId: { current: string };
  name: LocalizedString;
  description: LocalizedString;
  category: 'premium' | 'luxury' | 'classic';
  mainImage: any;
  gallery: any[];
  price?: number;
  priceUnit?: string;
  seo?: {
    metaTitle?: LocalizedString;
    metaDescription?: LocalizedString;
    ogImage?: any;
  };
  order: number;
}

// Get all materials with error handling
export async function getAllMaterials(): Promise<SanityMaterial[]> {
  try {
    const result = await sanityClient.fetch(`
      *[_type == "material"] | order(category asc, order asc) {
        _id,
        internalId,
        name,
        description,
        category,
        mainImage,
        gallery,
        price,
        priceUnit,
        seo,
        order
      }
    `);
    return result || [];
  } catch (error) {
    console.error('Failed to fetch materials from Sanity:', error);
    return [];
  }
}

// Get materials by category with error handling
export async function getMaterialsByCategory(
  category: 'premium' | 'luxury' | 'classic'
): Promise<SanityMaterial[]> {
  try {
    const result = await sanityClient.fetch(
      `
      *[_type == "material" && category == $category] | order(order asc) {
        _id,
        internalId,
        name,
        description,
        category,
        mainImage,
        gallery,
        price,
        priceUnit,
        seo,
        order
      }
    `,
      { category }
    );
    return result || [];
  } catch (error) {
    console.error(`Failed to fetch materials for category ${category}:`, error);
    return [];
  }
}

// Get single material by ID with error handling
export async function getMaterialById(id: string): Promise<SanityMaterial | null> {
  try {
    return await sanityClient.fetch(
      `
      *[_type == "material" && internalId.current == $id][0] {
        _id,
        internalId,
        name,
        description,
        category,
        mainImage,
        gallery,
        price,
        priceUnit,
        seo,
        order
      }
    `,
      { id }
    );
  } catch (error) {
    console.error(`Failed to fetch material with id ${id}:`, error);
    return null;
  }
}

// Get material count by category with error handling
export async function getMaterialCountByCategory(): Promise<
  Record<string, number>
> {
  try {
    const result = await sanityClient.fetch(`{
      "premium": count(*[_type == "material" && category == "premium"]),
      "luxury": count(*[_type == "material" && category == "luxury"]),
      "classic": count(*[_type == "material" && category == "classic"]),
      "total": count(*[_type == "material"])
    }`);
    return result || { premium: 0, luxury: 0, classic: 0, total: 0 };
  } catch (error) {
    console.error('Failed to fetch material counts:', error);
    return { premium: 0, luxury: 0, classic: 0, total: 0 };
  }
}
