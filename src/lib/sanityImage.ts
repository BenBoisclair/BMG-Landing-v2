import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from './sanity';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Convenience functions for common image sizes
export const materialThumbnail = (src: SanityImageSource) =>
  urlFor(src).width(400).height(400).format('webp').url();

export const materialLarge = (src: SanityImageSource) =>
  urlFor(src).width(800).height(800).format('webp').url();

export const projectThumbnail = (src: SanityImageSource) =>
  urlFor(src).width(600).height(400).format('webp').url();

export const projectHero = (src: SanityImageSource) =>
  urlFor(src).width(1920).height(1080).format('webp').url();

export const testimonialAvatar = (src: SanityImageSource) =>
  urlFor(src).width(100).height(100).format('webp').url();

export const ogImage = (src: SanityImageSource) =>
  urlFor(src).width(1200).height(630).format('jpg').url();

// Generic responsive image helper
export function getResponsiveImageUrl(
  src: SanityImageSource,
  options: {
    width?: number;
    height?: number;
    format?: 'webp' | 'jpg' | 'png';
    quality?: number;
  } = {}
) {
  let image = urlFor(src);

  if (options.width) image = image.width(options.width);
  if (options.height) image = image.height(options.height);
  if (options.format) image = image.format(options.format);
  if (options.quality) image = image.quality(options.quality);

  return image.url();
}
