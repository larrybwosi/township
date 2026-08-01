import { defineType, defineField, defineArrayMember } from 'sanity'

export const placeType = defineType({
  name: 'place',
  title: 'Place',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Dining', value: 'Dining' },
          { title: 'Cafes', value: 'Cafes' },
          { title: 'Shopping', value: 'Shopping' },
          { title: 'Parks', value: 'Parks' },
          { title: 'Stay', value: 'Stay' },
          { title: 'Nightlife', value: 'Nightlife' },
        ],
      },
    }),
    defineField({
      name: 'rating',
      title: 'Rating (0 to 5)',
      type: 'number',
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews Count',
      type: 'number',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image URL',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'openNow',
      title: 'Is Open Now',
      type: 'boolean',
    }),
    defineField({
      name: 'span',
      title: 'Layout Span (small/large)',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Large', value: 'large' },
        ],
      },
    }),
    defineField({
      name: 'link',
      title: 'Explore Link (e.g., /explore/dining)',
      type: 'string',
    }),
  ],
})
