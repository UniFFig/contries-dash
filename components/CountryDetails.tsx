"use client";

import Image from "next/image";
import { Container } from "./Container";
import { useCountryStore } from "@/stores/countryStore";

export default function CountryDetails() {
  const selectedCountry = useCountryStore(
    (state) => state.selectedCountry
  );

  if (!selectedCountry) {
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center rounded-xl bg-white p-6 text-center text-gray-400">
        Select a Country for More Details
      </div>
    );
  }

  return (
    <Container
      primary={true}
      content={
        <div className="flex h-full w-full max-w-96 flex-col p-4 sm:p-6">
          
          <div className="flex flex-col items-center text-center">
            <div className="relative h-[140px] w-full max-w-[240px] overflow-hidden rounded-lg border">
              <Image
                src={selectedCountry.flags.png}
                alt={selectedCountry.name.common}
                fill
                className="object-cover"
              />
            </div>

            <h2 className="mt-4 break-words text-2xl font-bold sm:text-3xl">
              {selectedCountry.name.common}
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold">Population</h3>
              <p className="break-words">
                {selectedCountry.population.toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Region</h3>
              <p>{selectedCountry.region}</p>
            </div>

            <div>
              <h3 className="font-semibold">Capital</h3>
              <p className="break-words">
                {selectedCountry.capital?.join(", ")}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Languages</h3>
              <p className="break-words">
                {Object.values(
                  selectedCountry.languages || {}
                ).join(", ")}
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}