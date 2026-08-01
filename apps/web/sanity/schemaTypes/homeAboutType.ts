import { defineType, defineField, defineArrayMember } from 'sanity'

export const homeAboutType = defineType({
  name: 'homeAbout',
  title: 'Home About',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [defineArrayMember({ type: 'text' })],
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'buttonHref',
      title: 'Button HREF',
      type: 'string',
    }),
    defineField({
      name: 'imageUrl',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'floatingCardValue',
      title: 'Floating Card Value (e.g., 30,000+)',
      type: 'string',
    }),
    defineField({
      name: 'floatingCardLabel',
      title: 'Floating Card Label',
      type: 'string',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'highlight',
          fields: [
            defineField({ name: 'iconName', title: 'Icon Name (e.g. TrendingUp, Award, Building)', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'desc', title: 'Description', type: 'text' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics Bar',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'iconName', title: 'Icon Name (e.g. Users, Building, MapPin, Calendar)', type: 'string' }),
            defineField({ name: 'value', title: 'Value (e.g. 120,000+)', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'desc', title: 'Description', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
})
