import { CollectionConfig } from "payload";

export const Carts: CollectionConfig = {
  slug: 'carts',
  admin: { useAsTitle: 'id' },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'variantSKU',
          type: 'text',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
      ],
    },
    { name: 'status', type: 'select', options: ['active', 'converted'], defaultValue: 'active' },
  ],
};