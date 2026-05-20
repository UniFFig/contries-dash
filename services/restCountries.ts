import { Country } from "@/types/country";

const BASE_URL = "https://restcountries.com/v3.1";

export async function getAllCountries(): Promise<Country[]> {
  const response = await fetch(
    `${BASE_URL}/all?fields=name,population,region,capital,flags,languages,currencies,area`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return response.json();
}