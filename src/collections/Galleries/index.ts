import { CollectionConfig } from 'payload';

export const Galleries: CollectionConfig = {
  slug: 'galleries',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
    // … extra metadata if needed
  ],
};