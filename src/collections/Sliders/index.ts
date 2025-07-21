import { CollectionConfig } from 'payload';

export const Sliders: CollectionConfig = {
  slug: 'sliders',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
    // …additional fields (e.g., settings)
  ],
};