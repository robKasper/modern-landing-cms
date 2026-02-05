import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Users', value: 'users' },
          { title: 'Clock', value: 'clock' },
          { title: 'Zap', value: 'zap' },
          { title: 'Check', value: 'check' },
          { title: 'Star', value: 'star' },
          { title: 'Shield', value: 'shield' },
          { title: 'Settings', value: 'settings' },
          { title: 'Chart', value: 'chart' },
          { title: 'Globe', value: 'globe' },
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
})
