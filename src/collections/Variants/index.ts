import { CollectionConfig } from 'payload';

export const Variants: CollectionConfig = {
  slug: 'variants',
  admin: {
    useAsTitle: 'sku', // Use SKU as the title in the admin panel
    description: 'Manage product variants (e.g., different sizes or colors).',
    defaultColumns: ['sku', 'product', 'priceAdjustment', 'stockQuantity'],
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      label: 'Parent Product',
      index: true, // Improves query performance
    },
    {
      name: 'sku',
      type: 'text',
      unique: true,
      required: true,
      label: 'Variant SKU',
    },
    {
      name: 'priceAdjustment',
      type: 'number',
      label: 'Price Adjustment',
      defaultValue: 0,
      admin: {
        description: 'Price difference from the base product price (e.g., +10 for premium variant).',
      },
    },
    {
      name: 'stockQuantity',
      type: 'number',
      label: 'Stock Quantity',
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'options',
      type: 'array',
      label: 'Variant Options',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Option Name (e.g., Size, Color)',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Option Value (e.g., Small, Blue)',
          required: true,
        },
      ],
    },
  ],
};