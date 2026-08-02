import { defineType, defineField, defineArrayMember } from 'sanity'

export const institutionType = defineType({
  name: 'institution',
  title: 'Institution',
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
          { title: 'Education', value: 'education' },
          { title: 'Health & Medical', value: 'health' },
          { title: 'Government', value: 'government' },
        ],
      },
    }),
    defineField({
      name: 'type',
      title: 'Type (e.g., Public University, Public Hospital)',
      type: 'string',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Institution Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'featured',
      title: 'Is Featured',
      type: 'boolean',
    }),
  ],
})
