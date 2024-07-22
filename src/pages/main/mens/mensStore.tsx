import { create } from "zustand";
import { responseProduct } from "../../../responseType.tsx/productResponse";
import objectOfProduct from "../../../network/product";

interface product {
  getProduct: () => void;
  productData: responseProduct | null;
}

const productStore = create<product>((set) => ({
  productData: null,
  getProduct: async () => {
    const response = await objectOfProduct.ProductsCategory();

    set({
      productData: response?.data ?? null,
    });
  },
}));

export default productStore;
