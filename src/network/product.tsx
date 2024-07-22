import axios from "axios";
import ApiClient from "./api";
import ShowNotification from "../components/notification";
import {
  ProductSchemaInput,
  ProductTypeRequestSchema,
} from "../requestType.tsx/productRequest";

class ProductData {
  async ProductsCategory() {
    try {
      const result = await ApiClient.get("/product/category");

      if (result.status == 200 || result.status == 201) {
        return result;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 0;
        const message =
          error.response?.data.data.message ?? "Some thing went wrong";

        ShowNotification(status, message);
      } else {
        ShowNotification(0, "Unexcepted error occurs");
      }
    }
  }
  async ProductTypeById(input: ProductTypeRequestSchema) {
    try {
      const response = await ApiClient.get("/product/byId", { params: input });

      if (response.status == 200 || response.status == 201) {
        return response.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 0;
        const message =
          error.response?.data.data.message ?? "Some thing went wrong";

        ShowNotification(status, message);
      } else {
        ShowNotification(0, "Unexcepted error occurs");
      }
    }
  }

  async Product(input: ProductSchemaInput) {
    try {
      const result = await ApiClient.get("product/get", {
        params: input,
      });
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 0;
        const message =
          error.response?.data.data.message ?? "Some thing went wrong";

        ShowNotification(status, message);
      } else {
        ShowNotification(0, "Unexcepted error occurs");
      }
    }
  }
}

const objectOfProduct = new ProductData();

export default objectOfProduct;
