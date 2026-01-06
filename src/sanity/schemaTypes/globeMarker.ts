import { defineField, defineType } from "sanity";

export const globeMarkerType = defineType({
  name: "globeMarker",
  title: "Globe Marker",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Naam",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label (kort)",
      type: "string",
      description: "Korte tekst die op de globe verschijnt (bijv. 'NL')",
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
      validation: (Rule) => Rule.required().min(-90).max(90),
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      validation: (Rule) => Rule.required().min(-180).max(180),
    }),
    defineField({
      name: "images",
      title: "Afbeeldingen",
      type: "array",
      of: [{ type: "image" }],
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
      description: "Bepaalt de volgorde waarin markers worden weergegeven",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "label",
    },
  },
});
