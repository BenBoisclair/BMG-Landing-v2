import { defineType, defineField } from 'sanity';

export const model3d = defineType({
  name: 'model3d',
  title: '3D Model',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'modelFile',
      title: 'Model File',
      type: 'file',
      description: 'Upload GLB or GLTF file',
      options: {
        accept: '.glb,.gltf',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      description: 'Preview image for the 3D model',
      options: {
        hotspot: true,
      },
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
      media: 'thumbnail',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Untitled 3D Model',
        subtitle: '3D Model',
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
  ],
});
