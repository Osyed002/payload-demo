import { Block } from 'payload';

export const GalleryBlock: Block = {
  slug: 'gallery',
  imageAltText: 'Gallery block',
  fields: [
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'galleries',
      required: true,
    },
  ],
};