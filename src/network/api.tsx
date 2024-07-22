import axios from "axios";

const apiUrl = "http://localhost:4095/api/";
export const imageUrl = "http://localhost:4095";
const ApiClient = axios.create({
  baseURL: apiUrl,
});

ApiClient.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (config: any) => {
    const token = await localStorage.getItem("Token");
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

ApiClient.interceptors.response.use(
  (response) => {
    return response;
  },

  async (err) => {
    if (err.response.status == 401 || err.response.status == 403) {
      localStorage.clear;
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
    return Promise.reject(err);
  }
);

export default ApiClient;
