import { defineType, defineField } from 'sanity';

export const pricingConfig = defineType({
  name: 'pricingConfig',
  title: 'Pricing Calculator',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'localizedText',
    }),
    defineField({
      name: 'sculptureTypes',
      title: 'Sculpture Types',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'ID', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'label', title: 'Label', type: 'localizedString' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: {
              title: 'label.en',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'stoneGrades',
      title: 'Stone Grades',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'ID', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'label', title: 'Label', type: 'localizedString' },
            { name: 'description', title: 'Description', type: 'localizedText' },
            {
              name: 'pricePerMm3',
              title: 'Price per mm³',
              type: 'number',
              description: 'Price in USD per cubic millimeter',
            },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: {
              title: 'label.en',
              subtitle: 'pricePerMm3',
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Untitled',
                subtitle: subtitle ? `$${subtitle}/mm³` : '',
                media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'detailLevels',
      title: 'Detail Levels',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'ID', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'label', title: 'Label', type: 'localizedString' },
            { name: 'description', title: 'Description', type: 'localizedText' },
            {
              name: 'additionalCost',
              title: 'Additional Cost',
              type: 'number',
              description: 'Additional cost in USD',
            },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: {
              title: 'label.en',
              subtitle: 'additionalCost',
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Untitled',
                subtitle: subtitle !== undefined ? `+$${subtitle}` : '',
                media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'maxDimension',
      title: 'Maximum Dimension',
      type: 'number',
      description: 'Maximum dimension in millimeters (default 3000)',
      initialValue: 3000,
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer Text',
      type: 'localizedText',
      description: 'Disclaimer shown below the price estimate',
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button Text',
      type: 'localizedString',
      description: 'Text for the call-to-action button',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Pricing Calculator Configuration',
      };
    },
  },
});
