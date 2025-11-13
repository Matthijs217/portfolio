import type { SchemaTypeDefinition } from "sanity";
import { blockContentType } from "./blockContent";
import { galleryType } from "./gallery.js";
import { pageType } from "./page";
import { postType } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, pageType, blockContentType, galleryType],
};
