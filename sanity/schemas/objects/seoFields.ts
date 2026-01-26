import { defineType } from 'sanity';

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO Fields',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'localizedString',
      description: 'Title for search engines (50-60 characters recommended)',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'localizedText',
      description: 'Description for search engines (150-160 characters recommended)',
    },
    {
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image displayed when shared on social media (1200x630px recommended)',
      options: {
        hotspot: true,
      },
    },
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
});
