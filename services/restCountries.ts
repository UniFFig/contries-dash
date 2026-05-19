import { Country } from "@/types/country";

const BASE_URL = "https://restcountries.com/v3.1";

export async function getAllCountries(): Promise<Country[]> {
  const response = await fetch(
    `${BASE_URL}/all?fields=name,population,region,capital,flags,languages,currencies`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return response.json();
}

export async function getCountryByName(name: string): Promise<any>{
  const response = await fetch(
    `${BASE_URL}/name/${encodeURIComponent(name)}?fullText=true&fields=name,population,region,capital,flags,languages,currencies`,
    {
      next: { revalidate: 3600 },
    })

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return response.json();
};