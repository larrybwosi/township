import { defineType, defineField, defineArrayMember } from 'sanity'

export const homeHeroType = defineType({
  name: 'homeHero',
  title: 'Home Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Headline Text',
      type: 'string',
    }),
    defineField({
      name: 'accentText',
      title: 'Headline Accent Text',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description Text',
      type: 'text',
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImageUrl',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'quickLink',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'desc', title: 'Description', type: 'string' }),
            defineField({ name: 'href', title: 'HREF Link', type: 'string' }),
            defineField({ name: 'accent', title: 'Is Accent Styled', type: 'boolean' }),
            defineField({ name: 'iconName', title: 'Icon Name (e.g. GraduationCap, Building2, MapPin)', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
})
