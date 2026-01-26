import { defineType, defineField } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'internalId',
      title: 'Internal ID',
      type: 'slug',
      description: 'URL-safe identifier (e.g., "religious-buddha-statue")',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name.en',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localizedString',
      description: 'Short project name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artTitle',
      title: 'Artistic Title',
      type: 'localizedString',
      description: 'Full artistic/formal title for the project',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Religious', value: 'religious' },
          { title: 'Legacy & Memorial', value: 'legacy' },
          { title: 'Architectural', value: 'architectural' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'material',
      title: 'Material Used',
      type: 'localizedString',
      description: 'Description of the material(s) used',
    }),
    defineField({
      name: 'customer',
      title: 'Customer/Client',
      type: 'string',
      description: 'Name of the customer or organization',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'localizedString',
      description: 'Where the project is installed',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Primary thumbnail image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Large hero image for detail page',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Additional project images',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'category',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      const categoryLabels: Record<string, string> = {
        religious: 'Religious',
        legacy: 'Legacy & Memorial',
        architectural: 'Architectural',
      };
      return {
        title: title || 'Untitled Project',
        subtitle: categoryLabels[subtitle] || subtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name.en', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
});
