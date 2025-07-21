import { CollectionConfig } from "payload";

export const Quotes: CollectionConfig = {
  slug: 'quotes',
  admin: { useAsTitle: 'id' },
  fields: [
    {
      name: 'cart',
      type: 'relationship',
      relationTo: 'carts',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'sent', 'accepted', 'rejected'],
      defaultValue: 'pending',
    },
  ],
};
