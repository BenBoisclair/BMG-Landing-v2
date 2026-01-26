import { sanityClient } from '../sanity';

export interface SanityProject {
  _id: string;
  internalId: { current: string };
  name: { en?: string; th?: string; ar?: string };
  artTitle?: { en?: string; th?: string; ar?: string };
  description: { en?: string; th?: string; ar?: string };
  category: 'religious' | 'legacy' | 'architectural';
  material?: { en?: string; th?: string; ar?: string };
  customer?: string;
  location?: { en?: string; th?: string; ar?: string };
  mainImage: any;
  heroImage?: any;
  gallery: any[];
  seo?: {
    metaTitle?: { en?: string; th?: string; ar?: string };
    metaDescription?: { en?: string; th?: string; ar?: string };
    ogImage?: any;
  };
  order: number;
}

// Get all projects
export async function getAllProjects(): Promise<SanityProject[]> {
  return sanityClient.fetch(`
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
}

// Get projects by category
export async function getProjectsByCategory(
  category: 'religious' | 'legacy' | 'architectural'
): Promise<SanityProject[]> {
  return sanityClient.fetch(
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
}

// Get single project by ID
export async function getProjectById(id: string): Promise<SanityProject | null> {
  return sanityClient.fetch(
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
}

// Get projects grouped by category
export async function getProjectsGroupedByCategory(): Promise<{
  religious: SanityProject[];
  legacy: SanityProject[];
  architectural: SanityProject[];
}> {
  const projects = await getAllProjects();
  return {
    religious: projects.filter((p) => p.category === 'religious'),
    legacy: projects.filter((p) => p.category === 'legacy'),
    architectural: projects.filter((p) => p.category === 'architectural'),
  };
}
