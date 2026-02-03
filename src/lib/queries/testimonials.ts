import { sanityClient } from '../sanity';

// Localized string type for all 5 supported languages
interface LocalizedString {
  en?: string;
  th?: string;
  ar?: string;
  hi?: string;
  zh?: string;
}

export interface SanityTestimonial {
  _id: string;
  name: string;
  role?: string;
  quote: LocalizedString;
  rating: number;
  avatar?: any;
  order: number;
}

// Get all testimonials with error handling
export async function getAllTestimonials(): Promise<SanityTestimonial[]> {
  try {
    const result = await sanityClient.fetch(`
      *[_type == "testimonial"] | order(order asc) {
        _id,
        name,
        role,
        quote,
        rating,
        avatar,
        order
      }
    `);
    return result || [];
  } catch (error) {
    console.error('Failed to fetch testimonials from Sanity:', error);
    return [];
  }
}
