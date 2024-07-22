import Zod from "zod";

const productTypeRequest = Zod.object({
  id: Zod.number(),
  page: Zod.number(),
  search: Zod.string(),
});

const commonRequest = Zod.object({
  page: Zod.number(),
  search: Zod.string(),
});
export type ProductSchemaInput = Zod.infer<typeof commonRequest>;
export type ProductTypeRequestSchema = Zod.infer<typeof productTypeRequest>;
