import { type SchemaTypeDefinition } from "sanity";
import testimonial from "./testimonial";
import faq from "./faq";
import feature from "./feature";
import pricingPlan from "./pricingPlan";
import heroContent from "./heroContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testimonial, faq, feature, pricingPlan, heroContent],
};
