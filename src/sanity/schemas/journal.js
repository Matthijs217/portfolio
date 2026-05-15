import { defineField, defineType } from 'sanity';

export const journalSchema = defineType({
  name: 'journal',
  title: 'Journal',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'readtime',
      title: 'Leestijd',
      type: 'number',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Gepubliceerd op',
      type: 'date',
    }),
  ],
});
