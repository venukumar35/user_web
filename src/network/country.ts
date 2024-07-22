import axios from "axios";
import ApiClient from "./api";
import ShowNotification from "../components/notification";

class UserRegisterApi {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async fetchCountryData(data: any) {
    try {
      const result = await ApiClient.get("/country", { data });

      const status =
        result.status == 200 || result.status == 201 ? true : false;

      if (status) {
        return result;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 0;
        const message = error.response?.data.message ?? "Something went wrong";

        ShowNotification(status, message);
      } else {
        ShowNotification(0, "Unexpected error occurs");
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async fetchState(data: any) {
    try {
      const result = await ApiClient.get("/country/state", { params: data });
      const status = result.status == 200 || result.status == 201;

      if (status) {
        return result;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 0;
        const message = error.response?.data.message ?? "Something went wrong";
        ShowNotification(status, message);
      } else {
        ShowNotification(0, "Unexpected error occurs");
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async userRegistory(data: any): Promise<boolean> {
    try {
      const response = await ApiClient.post("/user/", data);

      const status =
        response.status == 200 || response.status == 201 ? true : false;

      if (status) {
        ShowNotification(response.status, response.data.message);
        return true;
      } else {
        ShowNotification(status, response.data.message);
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 0;
        const message = error.response?.data.message ?? "Something went wrong";

        ShowNotification(status, message);
        return false;
      } else {
        ShowNotification(0, "Unexcepted error occurs");
        return false;
      }
    }
  }
}

const ObjectForCountry = new UserRegisterApi();

export default ObjectForCountry;
