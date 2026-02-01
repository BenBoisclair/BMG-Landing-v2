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
    {
      name: 'hi',
      title: 'हिन्दी (Hindi)',
      type: 'string',
    },
    {
      name: 'zh',
      title: '简体中文 (Chinese)',
      type: 'string',
    },
  ],
  options: {
    columns: 5,
  },
});
