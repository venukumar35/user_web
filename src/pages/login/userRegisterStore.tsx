/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import ObjectForCountry from "../../network/country";
import {
  countryreaponseData,
  stateResponseData,
} from "../../responseType.tsx/responseType";

interface userRegisterStore {
  allCountry: () => void;
  allState: (countryId: any) => void;
  countryData: countryreaponseData | null;
  stateData: stateResponseData | null;
  registerUser: (data: any) => Promise<boolean>;
  page: number;
  search: string;
  loading: boolean;
}

export const userRegister = create<userRegisterStore>((set, get) => ({
  countryData: null,
  page: 0,
  search: "",
  loading: false,
  stateData: null,
  allCountry: async () => {
    const { page, search } = get();
    const data = {
      page,
      search,
    };
    const result = await ObjectForCountry.fetchCountryData(data);

    set({
      countryData: result?.data.data ?? null,
    });
  },
  allState: async (countryId: any) => {
    const { page, search } = get();
    const data = {
      countryId,
      page,
      search,
    };
    const result = await ObjectForCountry.fetchState(data);
    set({
      stateData: result?.data.data,
    });
  },
  registerUser: (data: any): Promise<boolean> => {
    const result = ObjectForCountry.userRegistory(data);
    return result;
  },
}));
