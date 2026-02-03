import { sanityClient } from '../sanity';

// Localized string type for all 5 supported languages
interface LocalizedString {
  en?: string;
  th?: string;
  ar?: string;
  hi?: string;
  zh?: string;
}

export interface SanityModel3D {
  _id: string;
  name: LocalizedString;
  description?: LocalizedString;
  modelFileUrl: string;
  thumbnail?: any;
  order: number;
}

// Get all 3D models with error handling
export async function getAll3DModels(): Promise<SanityModel3D[]> {
  try {
    const result = await sanityClient.fetch(`
      *[_type == "model3d"] | order(order asc) {
        _id,
        name,
        description,
        "modelFileUrl": modelFile.asset->url,
        thumbnail,
        order
      }
    `);
    return result || [];
  } catch (error) {
    console.error('Failed to fetch 3D models from Sanity:', error);
    return [];
  }
}

// Get single 3D model by ID with error handling
export async function get3DModelById(id: string): Promise<SanityModel3D | null> {
  try {
    return await sanityClient.fetch(
      `
      *[_type == "model3d" && _id == $id][0] {
        _id,
        name,
        description,
        "modelFileUrl": modelFile.asset->url,
        thumbnail,
        order
      }
    `,
      { id }
    );
  } catch (error) {
    console.error(`Failed to fetch 3D model with id ${id}:`, error);
    return null;
  }
}
