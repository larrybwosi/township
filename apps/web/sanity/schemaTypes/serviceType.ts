import { defineType, defineField } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'City Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'link',
      title: 'Link HREF',
      type: 'string',
    }),
    defineField({
      name: 'color',
      title: 'Tailwind Color Classes (e.g. bg-blue-50 text-blue-600)',
      type: 'string',
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name (e.g., Bus, Wifi, ShieldCheck, BookOpen, Trash2, Droplets)',
      type: 'string',
    }),
  ],
})
