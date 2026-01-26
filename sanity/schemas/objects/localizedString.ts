import { defineType } from 'sanity';

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'string',
    },
    {
      name: 'th',
      title: 'ไทย (Thai)',
      type: 'string',
    },
    {
      name: 'ar',
      title: 'العربية (Arabic)',
      type: 'string',
    },
  ],
  options: {
    columns: 3,
  },
});
