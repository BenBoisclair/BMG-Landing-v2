import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'hero', title: 'Hero Section' },
    { name: 'mission', title: 'Mission Section' },
    { name: 'statistics', title: 'Statistics' },
    { name: 'contact', title: 'Contact Info' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    // General Settings
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      initialValue: 'BMG Granite',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      group: 'general',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seoFields',
      group: 'general',
    }),

    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'localizedString',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localizedText',
      group: 'hero',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      group: 'hero',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'heroPoster',
      title: 'Hero Video Poster',
      type: 'image',
      group: 'hero',
      description: 'Fallback image while video loads',
      options: {
        hotspot: true,
      },
    }),

    // Mission Section
    defineField({
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'localizedString',
      group: 'mission',
    }),
    defineField({
      name: 'missionDescription',
      title: 'Mission Description',
      type: 'localizedText',
      group: 'mission',
    }),

    // Statistics
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      group: 'statistics',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string', description: 'e.g., "50+" or "1000"' },
            { name: 'label', title: 'Label', type: 'localizedString' },
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label.en',
            },
            prepare({ value, label }) {
              return {
                title: value || 'No value',
                subtitle: label || '',
              };
            },
          },
        },
      ],
    }),

    // Contact Info
    defineField({
      name: 'addresses',
      title: 'Addresses',
      type: 'array',
      group: 'contact',
      of: [{ type: 'text', rows: 2 }],
    }),
    defineField({
      name: 'phones',
      title: 'Phone Numbers',
      type: 'array',
      group: 'contact',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'socials',
      title: 'Social Media',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Platform', type: 'string' },
            { name: 'handle', title: 'Handle', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Line', value: 'line' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'handle',
            },
          },
        },
      ],
    }),

    // Navigation
    defineField({
      name: 'navigation',
      title: 'Navigation Links',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', title: 'Key', type: 'string', description: 'Internal reference' },
            { name: 'label', title: 'Label', type: 'localizedString' },
            { name: 'href', title: 'Link', type: 'string' },
          ],
          preview: {
            select: {
              title: 'label.en',
              subtitle: 'href',
            },
          },
        },
      ],
    }),

    // Footer
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'localizedString' },
            { name: 'href', title: 'Link', type: 'string' },
          ],
          preview: {
            select: {
              title: 'label.en',
              subtitle: 'href',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'localizedString',
      group: 'footer',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
