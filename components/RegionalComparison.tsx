"use client";

import { Country } from "@/types/types";
import { useCountryStore } from "@/stores/countryStore";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { Container } from "@/components/Container";

type RegionGraphProps = {
  allCountries: Country[];
};

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function RegionalComparison({
  allCountries,
}: RegionGraphProps) {
  const selectedCountry = useCountryStore(
    (state) => state.selectedCountry
  );

  if (!selectedCountry) {
    return (
      <div className="flex min-h-[320px] w-full items-center justify-center rounded-xl bg-white p-6 text-center text-gray-400">
        Select a country to view region comparison
      </div>
    );
  }

  const totalAreaOfRegions = allCountries.reduce(
    (acc, country) => {
      if (country.region) {
        acc[country.region] =
          (acc[country.region] || 0) + country.area;
      }

      return acc;
    },
    {} as Record<string, number>
  );

  const regionTotal =
    totalAreaOfRegions[selectedCountry.region];

  const chartData = {
    labels: [
      selectedCountry.region,
      selectedCountry.name.common,
    ],

    datasets: [
      {
        label: "Regional Area %",
        data: [
          ((regionTotal - selectedCountry.area) /
            regionTotal) *
            100,

          (selectedCountry.area / regionTotal) * 100,
        ],

        backgroundColor: [
          "rgba(119, 166, 212, 0.8)",
          "rgba(221, 76, 41, 0.8)",
        ],

        borderColor: [
          "rgb(119, 166, 212)",
          "rgb(221, 76, 41)",
        ],

        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <Container
      primary
      content={
        <div className="flex h-full min-h-[320px] w-full flex-col p-4 sm:p-6">
          
          <h2 className="mb-4 text-center text-lg font-semibold sm:text-xl">
            Country Area vs Regional Area (%)
          </h2>

          <div className="relative flex-1">
            <div className="absolute inset-0">
              <Doughnut
                data={chartData}
                options={options}
              />
            </div>
          </div>
        </div>
      }
    />
  );
}