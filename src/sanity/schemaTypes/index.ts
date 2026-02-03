import { type SchemaTypeDefinition } from "sanity";
import testimonial from "./testimonial";
import faq from "./faq";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testimonial, faq],
};
