import z from "zod";

const CountryResponse = z.object({
  id: z.number(),
  name: z.string(),
});

const countryData = z.object({
  data: CountryResponse.array().nullable(),
});

const stateData = z.object({
  id: z.number(),
  name: z.string(),
  countryId: z.number(),
});

const stateDataResponse = z.object({
  data: stateData.array().nullable(),
});
export type countryreaponseData = z.infer<typeof countryData>;
export type stateResponseData = z.infer<typeof stateDataResponse>;
