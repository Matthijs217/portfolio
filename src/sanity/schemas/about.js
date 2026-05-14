import { defineType } from 'sanity';

export const aboutSchema = defineType({
  name: 'about',
  title: 'About Sectie',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Tekst',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'value1',
      title: 'Waarde 1',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'value2',
      title: 'Waarde 2',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'value3',
      title: 'Waarde 3',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ],
  preview: { 
    prepare() { 
      return {
        title: 'About Sectie'
      }
    }
  }
});
