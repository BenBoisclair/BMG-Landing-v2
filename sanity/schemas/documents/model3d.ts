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
      description: 'Upload GLB or GLTF file (max 50 MB)',
      options: {
        accept: '.glb,.gltf',
      },
      validation: (Rule) =>
        Rule.required().custom(async (file, context) => {
          if (!file?.asset?._ref) return true;

          const client = context.getClient({ apiVersion: '2024-01-01' });
          const asset = await client.fetch(
            `*[_id == $ref][0].size`,
            { ref: file.asset._ref }
          );

          const maxSize = 50 * 1024 * 1024; // 50 MB
          if (asset && asset > maxSize) {
            return `File size (${(asset / 1024 / 1024).toFixed(1)} MB) exceeds maximum of 50 MB`;
          }
          return true;
        }),
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
