"use client";

import { Country } from "@/types/country";
import { useCountryStore } from "@/stores/countryStore";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

type PopulationTableProps = {
  allCountries: Country[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PopulationComparison({
  allCountries,
}: PopulationTableProps) {
  const selectedCountry = useCountryStore(
    (state) => state.selectedCountry
  );

  const topPopulatedCountries = [...allCountries]
    .sort((a, b) => b.population - a.population)
    .slice(0, 5);

  if (
    selectedCountry &&
    !topPopulatedCountries.find(
      (c) => c.name.common === selectedCountry.name.common
    )
  ) {
    topPopulatedCountries.push(selectedCountry);
  }

  const topPopulationDensity = [...allCountries]
    .map((country) => ({
      name: country.name.common,
      populationDensity: country.population / country.area,
    }))
    .sort((a, b) => b.populationDensity - a.populationDensity)
    .slice(0, 5);

  if (
    selectedCountry &&
    !topPopulationDensity.find(
      (c) => c.name === selectedCountry.name.common
    )
  ) {
    topPopulationDensity.push({
      name: selectedCountry.name.common,
      populationDensity:
        selectedCountry.population / selectedCountry.area,
    });
  }

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const populationData = {
    labels: topPopulatedCountries.map((c) => c.name.common),
    datasets: [
      {
        label: selectedCountry
          ? `${selectedCountry.name.common} vs Top 5 Countries by Population`
          : "Top 5 Populated Countries",
        data: topPopulatedCountries.map((c) => c.population),
        backgroundColor: "rgba(119, 166, 212, 0.5)",
        borderColor: "rgba(119, 166, 212, 1)",
        borderWidth: 1,
      },
    ],
  };

  const densityData = {
    labels: topPopulationDensity.map((c) => c.name),
    datasets: [
      {
        label: selectedCountry
          ? `${selectedCountry.name.common} vs Top 5 Population Density`
          : "Top 5 Population Density",
        data: topPopulationDensity.map(
          (c) => c.populationDensity
        ),
        backgroundColor: "rgba(221, 76, 41, 0.5)",
        borderColor: "rgba(221, 76, 41, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex w-full flex-col gap-6">
      
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Total Population
        </h2>

        <div className="h-[300px] w-full sm:h-[400px]">
          <Bar data={populationData} options={commonOptions} />
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Population Density
        </h2>

        <div className="h-[300px] w-full sm:h-[400px]">
          <Bar data={densityData} options={commonOptions} />
        </div>
      </div>
    </div>
  );
}