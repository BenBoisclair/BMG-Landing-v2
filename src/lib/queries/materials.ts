import { sanityClient } from '../sanity';

export interface SanityMaterial {
  _id: string;
  internalId: { current: string };
  name: { en?: string; th?: string; ar?: string };
  description: { en?: string; th?: string; ar?: string };
  category: 'premium' | 'luxury' | 'classic';
  mainImage: any;
  gallery: any[];
  seo?: {
    metaTitle?: { en?: string; th?: string; ar?: string };
    metaDescription?: { en?: string; th?: string; ar?: string };
    ogImage?: any;
  };
  order: number;
}

// Get all materials
export async function getAllMaterials(): Promise<SanityMaterial[]> {
  return sanityClient.fetch(`
    *[_type == "material"] | order(category asc, order asc) {
      _id,
      internalId,
      name,
      description,
      category,
      mainImage,
      gallery,
      seo,
      order
    }
  `);
}

// Get materials by category
export async function getMaterialsByCategory(
  category: 'premium' | 'luxury' | 'classic'
): Promise<SanityMaterial[]> {
  return sanityClient.fetch(
    `
    *[_type == "material" && category == $category] | order(order asc) {
      _id,
      internalId,
      name,
      description,
      category,
      mainImage,
      gallery,
      seo,
      order
    }
  `,
    { category }
  );
}

// Get single material by ID
export async function getMaterialById(id: string): Promise<SanityMaterial | null> {
  return sanityClient.fetch(
    `
    *[_type == "material" && internalId.current == $id][0] {
      _id,
      internalId,
      name,
      description,
      category,
      mainImage,
      gallery,
      seo,
      order
    }
  `,
    { id }
  );
}

// Get material count by category
export async function getMaterialCountByCategory(): Promise<
  Record<string, number>
> {
  const result = await sanityClient.fetch(`{
    "premium": count(*[_type == "material" && category == "premium"]),
    "luxury": count(*[_type == "material" && category == "luxury"]),
    "classic": count(*[_type == "material" && category == "classic"]),
    "total": count(*[_type == "material"])
  }`);
  return result;
}
