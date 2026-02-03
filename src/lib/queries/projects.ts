import { sanityClient } from '../sanity';

// Localized string type for all 5 supported languages
interface LocalizedString {
  en?: string;
  th?: string;
  ar?: string;
  hi?: string;
  zh?: string;
}

export interface SanityProject {
  _id: string;
  internalId: { current: string };
  name: LocalizedString;
  artTitle?: LocalizedString;
  description: LocalizedString;
  category: 'religious' | 'legacy' | 'architectural';
  material?: LocalizedString;
  customer?: string;
  location?: LocalizedString;
  mainImage: any;
  heroImage?: any;
  gallery: any[];
  seo?: {
    metaTitle?: LocalizedString;
    metaDescription?: LocalizedString;
    ogImage?: any;
  };
  order: number;
}

// Get all projects with error handling
export async function getAllProjects(): Promise<SanityProject[]> {
  try {
    const result = await sanityClient.fetch(`
      *[_type == "project"] | order(category asc, order asc) {
        _id,
        internalId,
        name,
        artTitle,
        description,
        category,
        material,
        customer,
        location,
        mainImage,
        heroImage,
        gallery,
        seo,
        order
      }
    `);
    return result || [];
  } catch (error) {
    console.error('Failed to fetch projects from Sanity:', error);
    return [];
  }
}

// Get projects by category with error handling
export async function getProjectsByCategory(
  category: 'religious' | 'legacy' | 'architectural'
): Promise<SanityProject[]> {
  try {
    const result = await sanityClient.fetch(
      `
      *[_type == "project" && category == $category] | order(order asc) {
        _id,
        internalId,
        name,
        artTitle,
        description,
        category,
        material,
        customer,
        location,
        mainImage,
        heroImage,
        gallery,
        seo,
        order
      }
    `,
      { category }
    );
    return result || [];
  } catch (error) {
    console.error(`Failed to fetch projects for category ${category}:`, error);
    return [];
  }
}

// Get single project by ID with error handling
export async function getProjectById(id: string): Promise<SanityProject | null> {
  try {
    return await sanityClient.fetch(
      `
      *[_type == "project" && internalId.current == $id][0] {
        _id,
        internalId,
        name,
        artTitle,
        description,
        category,
        material,
        customer,
        location,
        mainImage,
        heroImage,
        gallery,
        seo,
        order
      }
    `,
      { id }
    );
  } catch (error) {
    console.error(`Failed to fetch project with id ${id}:`, error);
    return null;
  }
}

// Get projects grouped by category with error handling
export async function getProjectsGroupedByCategory(): Promise<{
  religious: SanityProject[];
  legacy: SanityProject[];
  architectural: SanityProject[];
}> {
  try {
    const projects = await getAllProjects();
    return {
      religious: projects.filter((p) => p.category === 'religious'),
      legacy: projects.filter((p) => p.category === 'legacy'),
      architectural: projects.filter((p) => p.category === 'architectural'),
    };
  } catch (error) {
    console.error('Failed to group projects by category:', error);
    return { religious: [], legacy: [], architectural: [] };
  }
}
