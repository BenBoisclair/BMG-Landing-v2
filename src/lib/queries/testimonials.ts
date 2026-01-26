import { sanityClient } from '../sanity';

export interface SanityTestimonial {
  _id: string;
  name: string;
  role?: string;
  quote: { en?: string; th?: string; ar?: string };
  rating: number;
  avatar?: any;
  order: number;
}

// Get all testimonials
export async function getAllTestimonials(): Promise<SanityTestimonial[]> {
  return sanityClient.fetch(`
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
}
