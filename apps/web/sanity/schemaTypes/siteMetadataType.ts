import { defineField, defineType } from 'sanity'

export const siteMetadataType = defineType({
  name: 'siteMetadata',
  title: 'Site Metadata',
  type: 'document',
  fields: [
    defineField({
      name: 'appIdentifier',
      title: 'App Identifier',
      type: 'string',
      description: 'The target application identifier (e.g., "web", "rental", or "marketplace")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'themeColor',
      title: 'Theme Color',
      type: 'string',
    }),
  ],
})
