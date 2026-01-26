import { defineType, defineField } from 'sanity';

export const processStep = defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'document',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      description: 'Step number (1-5)',
      validation: (Rule) => Rule.required().min(1).max(10).integer(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      description: 'Full step title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleShort',
      title: 'Short Title',
      type: 'localizedString',
      description: 'Abbreviated title for mobile view',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedString',
      description: 'Brief summary of this step',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      description: 'Detailed explanation of this step',
    }),
    defineField({
      name: 'bulletPoints',
      title: 'Bullet Points',
      type: 'array',
      of: [
        {
          type: 'localizedString',
        },
      ],
      description: 'Key points for this step',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Visual representation of this step',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      stepNumber: 'stepNumber',
      title: 'title.en',
      media: 'image',
    },
    prepare({ stepNumber, title, media }) {
      return {
        title: `Step ${stepNumber}: ${title || 'Untitled'}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Step Number',
      name: 'stepNumberAsc',
      by: [{ field: 'stepNumber', direction: 'asc' }],
    },
  ],
});
