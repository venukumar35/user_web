import { z } from "zod";

const productData = z.object({
  id: z.number(),
  name: z.string(),
});

const productDetails = z.object({
  data: productData.array().nullable(),
});

const clrSchema = z.object({
  id: z.number(),
  productId: z.number(),
  colors: z.string(),
});

const imagesSchema = z.object({
  imgId: z.number(),
  productId: z.number(),
  imageUrl: z.string(),
  clrId: z.number(),
});

const sizesSchema = z.object({
  sizeId: z.number(),
  productId: z.number(),
  size: z.string(),
  clrId: z.number(),
  quantity: z.string(),
});

// Define the main schema for FinalProductResponse
const finalProductResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  seasonalName: z.string(),
  commonDesId: z.string(),
  fit: z.string(),
  materail: z.string(),
  care: z.string(),
  brandName: z.string(),
  origin: z.string(),
  productId: z.number(),
  occasion: z.string(),
  specialFeature: z.string(),
  topId: z.number(),
  productDescription: z.string(),
  weight: z.number(),
  printAndPattern: z.string(),
  length: z.number(),
  shoulder: z.number(),
  chest: z.number(),
  commonDescriptionId: z.number(),
  type: z.string(),
  sleeveTypeId: z.number(),
  neckTypeId: z.number(),
  colorFamily: z.string(),
  pocket: z.string(),
  btId: z.number(),
  bottomproductDescription: z.string(),
  btWeight: z.number(),
  btPrintAndPattern: z.string(),
  btLength: z.string(),
  btWaist: z.number(),
  btHip: z.number(),
  btcommonDescriptionId: z.number(),
  btType: z.string(),
  btcolorFamily: z.string(),
  btPocket: z.string(),
  btBeltLoop: z.boolean(),
  typeOfPantId: z.number(),
  typesOfPleatsId: z.number(),
  typesOfLengthId: z.number(),
  topbtId: z.number(),
  kurtaBt: z.number(),
  kurtasId: z.number(),
  transparencyOfTheFabric: z.boolean(),
  shIp: z.number(),
  pattern: z.string(),
  footLength: z.string(),
  soleMaterial: z.string(),
  upperMaterial: z.string(),
  closure: z.string(),
  toeType: z.string(),
  packageContains: z.number(),
  warrentyId: z.number(),
  warrantyYear: z.number(),
  shoesWarrentyId: z.number(),
  wdId: z.number(),
  model: z.string(),
  dailShape: z.string(),
  dialDiameter: z.string(),
  dialColor: z.string(),
  strapColor: z.string(),
  watchesWarrentyId: z.number(),
  offerId: z.number(),
  offerPercntage: z.number(),
  offerPrice: z.number(),
  offerValidityFromdate: z.date(),
  offerValidityTodate: z.date(),
  offerValidityFromTime: z.date(),
  offerValidityToTime: z.date(),
  storeName: z.string(),
  storeAddress: z.string(),
  storeCity: z.string(),
  storePincode: z.string(),
  storeState: z.string(),
  customerCareEmail: z.string(),
  colors: z.array(clrSchema),
  images: z.array(imagesSchema),
  sizes: z.array(sizesSchema),
});

const commonResponse = z.object({
  from: z.number(),
  to: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
  data: z.array(finalProductResponseSchema),
});

export type responseProduct = z.infer<typeof productDetails>;
export type ResponseOfProduct = z.infer<typeof commonResponse>;
export type ProductSchema = z.infer<typeof finalProductResponseSchema>;
