import { sanityClient } from '../sanity';

export interface SanityModel3D {
  _id: string;
  name: { en?: string; th?: string; ar?: string };
  description?: { en?: string; th?: string; ar?: string };
  modelFileUrl: string;
  thumbnail?: any;
  order: number;
}

// Get all 3D models
export async function getAll3DModels(): Promise<SanityModel3D[]> {
  return sanityClient.fetch(`
    *[_type == "model3d"] | order(order asc) {
      _id,
      name,
      description,
      "modelFileUrl": modelFile.asset->url,
      thumbnail,
      order
    }
  `);
}

// Get single 3D model by ID
export async function get3DModelById(id: string): Promise<SanityModel3D | null> {
  return sanityClient.fetch(
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
}
