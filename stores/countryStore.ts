import { create } from "zustand";
import { Country } from "@/types/country";

type CountryStore = {
  selectedCountry: Country | null;

  setSelectedCountry: (
    country: Country
  ) => void;
};

export const useCountryStore =
  create<CountryStore>((set) => ({
    selectedCountry: null,

    setSelectedCountry: (country) =>
      set({
        selectedCountry: country,
      }),
  }));