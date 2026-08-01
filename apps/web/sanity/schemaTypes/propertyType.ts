import { defineType, defineField, defineArrayMember } from 'sanity'

export const propertyType = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Price per night (default)',
      type: 'number',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'House', value: 'house' },
          { title: 'Single Apartment House', value: 'apartment_single' },
          { title: 'Apartment Building', value: 'apartment_building' },
          { title: 'Guest House', value: 'guesthouse' },
          { title: 'Motel', value: 'motel' },
          { title: 'Hotel', value: 'hotel' },
        ],
      },
    }),
    defineField({
      name: 'townId',
      title: 'Town ID',
      type: 'string',
    }),
    defineField({
      name: 'ownerId',
      title: 'Owner ID',
      type: 'string',
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url',
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'units',
      title: 'Units (for multi-unit properties)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'unit',
          fields: [
            defineField({ name: 'id', title: 'Unit ID', type: 'string' }),
            defineField({ name: 'name', title: 'Unit Name', type: 'string' }),
            defineField({ name: 'price', title: 'Price per night', type: 'number' }),
            defineField({ name: 'rooms', title: 'Rooms count', type: 'number' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
})
