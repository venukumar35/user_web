import { create } from "zustand";
import objectOfProduct from "../../../network/product";
import { z } from "zod";
import { ResponseOfProduct } from "../../../responseType.tsx/productResponse";

const productTypeResponse = z.object({
  id: z.number(),
  name: z.string(),
  itemsName: z.string(),
  itemsId: z.number(),
});

export type ProductTypeResponseSchema = z.infer<typeof productTypeResponse>;

interface prodctTypeData {
  page: number;
  search: string;
  isLoading: boolean;
  productTypeData: ProductTypeResponseSchema[] | null;
  productType: () => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  productId: number;
  setProductId: (productId: number) => void;
  productData: ResponseOfProduct | null;
  productDetails: () => void;
  reset: () => void;
}

const productTypeStroe = create<prodctTypeData>((set, get) => ({
  page: 1,
  search: "",
  productTypeData: null,
  productId: 1,
  productData: null,
  isLoading: true,
  productType: async () => {
    const { page, search, productId } = get();
    const data = {
      page: page,
      search: search,
      id: productId,
    };

    const result = await objectOfProduct.ProductTypeById(data);

    set({ productTypeData: result?.data?.data });
  },
  productDetails: async () => {
    const { page, search } = get();

    const data = {
      page: page,
      search: search,
    };

    const result = await objectOfProduct.Product(data);
    console.log(result.data, "data");

    set({
      productData: result.data,
      isLoading: false,
    });
  },
  setPage: (page: number) => set(() => ({ page })),
  setSearch: (search: string) => set(() => ({ page: 1, search })),
  setProductId: (productId: number) => set(() => ({ productId })),
  reset: () => {
    set({
      page: 1,
      search: "",
    });
  },
}));

export default productTypeStroe;
