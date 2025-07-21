import { Block } from 'payload';

export const SliderBlock: Block = {
  slug: 'slider',
  imageAltText: 'Slider block',
  fields: [
    {
      name: 'slider',
      type: 'relationship',
      relationTo: 'sliders',
      required: true,
    },
  ],
};