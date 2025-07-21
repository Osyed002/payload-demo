import { generateVariants } from '@/utilities/generateVariants';
import { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name', // Field to display as the title in the admin panel
    description: 'Manage your e-commerce products here.',
    defaultColumns: ['name', 'price', 'sku', 'stockQuantity'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Name',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Base Price',
      min: 0,
      admin: {
        description: 'Base price of the product in USD.',
      },
    },
    {
      name: 'sku',
      type: 'text',
      unique: true,
      label: 'SKU',
      required: true,
    },
    {
      name: 'stockQuantity',
      type: 'number',
      label: 'Stock Quantity',
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'images',
      type: 'array',
      label: 'Product Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Assumes a 'media' collection for uploads
          required: true,
        },
      ],
    },
    {
      name: 'variants',
      type: 'relationship',
      relationTo: 'variants',
      hasMany: true,
      label: 'Variants',
      admin: {
        description: 'Associate variants (e.g., size, color) with this product.',
      },
    },
    {
      name: 'options',
      type: 'array',
      label: 'Product Options',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Option Name (e.g., Size, Color)',
          required: true,
        },
        {
          name: 'values',
          type: 'array',
          label: 'Option Values',
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Value (e.g., Small, Blue)',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {

        if (req.context?.skipVariantHook) return
        try {
          if (operation !== 'create' && operation !== 'update') return

          const productId = doc.id
          const options = Array.isArray(doc.options) ? doc.options : [];
          const combinations = generateVariants(options)

          const existing = await req.payload.find({
            collection: 'variants',
            where: { product: { equals: productId } },
            limit: 100,
          })

          for (const v of existing.docs) {
            await req.payload.delete({ collection: 'variants', id: v.id })
          }

          const createdVariantIds: number[] = []

          for (const combo of combinations) {
            const sku = `${doc.sku}-${combo.map(o => o.value).join('-')}`.toUpperCase()

            const newVariant = await req.payload.create({
              collection: 'variants',
              data: {
                product: productId,
                sku,
                options: combo,
                priceAdjustment: 0,
                stockQuantity: 0,
              },
            })

            createdVariantIds.push(newVariant.id as number)
          }

          await req.payload.update({
            collection: 'products',
            id: productId,
            data: {
              variants: createdVariantIds,
            },
            overrideAccess: true,
            context: {
              skipVariantHook: true,
            },
          })
        } catch (err) {
          console.error('❌ Error in afterChange hook:', err)
        }
      },
    ],
  },
};