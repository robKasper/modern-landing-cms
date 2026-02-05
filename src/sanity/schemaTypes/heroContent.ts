import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroContent',
  title: 'Hero Content',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer Text',
      type: 'string',
      description: 'Small text below buttons (e.g., "No credit card required")'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socialProofText',
      title: 'Social Proof Text',
      type: 'string',
      description: 'Text above company logos (e.g., "Trusted by 10,000+ teams")'
    }),
    defineField({
      name: 'companyLogos',
      title: 'Company Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Company Name',
              type: 'string',
            },
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
            },
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo'
            }
          }
        }
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
    }
  }
})
