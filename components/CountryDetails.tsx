"use client";

import Image from "next/image";
import { Container } from "./Container";
import { useCountryStore } from "@/stores/countryStore";

export default function CountryDetails() {
  const selectedCountry =
    useCountryStore(
      (state) => state.selectedCountry
    );

  if (!selectedCountry) {
    return (
      <div className="flex items-top text-center text-gray-400 ml-6">
        Select a Country for More Details
      </div>
    );
  }

  return (

    <Container
      primary={true}
      content={
        <div className="w-92 h-[515px] not-even:lp-6">
            <div className="flex flex-col items-center">
                <Image
                src={selectedCountry.flags.png}
                alt={selectedCountry.name.common}
                width={220}
                height={140}
                className="rounded-lg border"
                />
                <h2 className="mt-4 text-3xl font-bold">
                {selectedCountry.name.common}
                </h2>
            </div>
            <div className="mt-8 space-y-4">
                <div>
                    <h3 className="font-semibold">
                        Population
                    </h3>
                    <p>
                        {selectedCountry.population.toLocaleString()}
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold">
                        Region
                    </h3>

                    <p>{selectedCountry.region}</p>
                </div>
                <div>
                    <h3 className="font-semibold">
                        Capital
                    </h3>

                    <p>
                        {selectedCountry.capital?.join(", ")}
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold">
                        Languages
                    </h3>

                    <p>
                        {Object.values(
                        selectedCountry.languages || {}
                        ).join(", ")}
                    </p>
                </div>
            </div>
        </div>
    } />
  );
}