import { defineType } from 'sanity';

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
    },
    {
      name: 'th',
      title: 'ไทย (Thai)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'ar',
      title: 'العربية (Arabic)',
      type: 'text',
      rows: 4,
    },
  ],
});
