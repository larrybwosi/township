import { defineType, defineField } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Culture', value: 'Culture' },
          { title: 'Education', value: 'Education' },
          { title: 'Community', value: 'Community' },
          { title: 'Sport', value: 'Sport' },
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'attendees',
      title: 'Expected Attendees (e.g. 5,000+)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image URL',
      type: 'url',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'featured',
      title: 'Is Featured Event',
      type: 'boolean',
    }),
  ],
})
