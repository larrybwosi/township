import { defineType, defineField, defineArrayMember } from 'sanity'

export const studentGuideType = defineType({
  name: 'studentGuide',
  title: 'Student Starter Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge / Top Title (e.g., New Student Guide)',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description Text',
      type: 'text',
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
      name: 'checklist',
      title: 'Quick-start Checklist Items',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'contactLabel',
      title: 'Contact Link Label',
      type: 'string',
    }),
    defineField({
      name: 'contactHref',
      title: 'Contact Link HREF',
      type: 'string',
    }),
  ],
})
