"use client";

import Image from "next/image";
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

export default function PopulationComparison(allCountries: PopulationTableProps) {
  const selectedCountry =
    useCountryStore(
      (state) => state.selectedCountry
    );
    const flattenedCountries = allCountries.allCountries

    //Population comparison - top 5 most populated countries + selected country if not in top 5
    const topPopulatedCountries = flattenedCountries
        .sort((a, b) => b.population - a.population)
        .slice(0, 5);
        
    if(selectedCountry && !topPopulatedCountries.includes(selectedCountry)) {
        topPopulatedCountries.push(selectedCountry)
    }

    const TotalPopulationBarChart = () => {
        const data = {
            labels: topPopulatedCountries.map(c => c.name.common),
            datasets: [
                {
                    label: selectedCountry ? "Total Population Compaired to Top 5 Populated Countries" : "Top 5 Populated Countries",
                    data: topPopulatedCountries.map(c => c.population),
                    backgroundColor: "rgba(119, 166, 212, 0.5)",
                    borderColor: "rgba(119, 166, 212, 1)",
                    borderWidth: 1,
                }
            ]
        };

        const options = {
            responsive: true,
        };

        return <Bar data={data} options={options} className="h-92" />;
    };

    //Population density comparison - top 5 most densely populated countries + selected country if not in top 5
    const topPopulationDensity = flattenedCountries.map(country => {
        return {
            name: country.name.common,
            populationDensity: country.population / country.area
        }
    }).sort((a, b) => b.populationDensity - a.populationDensity).slice(0, 5)
    if(selectedCountry && !topPopulationDensity.find(c => c.name === selectedCountry.name.common)) {
        topPopulationDensity.push({ name: selectedCountry.name.common, populationDensity: selectedCountry.population / selectedCountry.area })
    }

    const PopulationDensityBarChart = () => {
        const data = {
            labels: topPopulationDensity.map(c => c.name),
            datasets: [
                {
                    label: selectedCountry ? "Population Density (people per sq km) Compaired to Top 5 Most Dense Countries" : "Top 5 Most Densely Populated Countries",
                    data: topPopulationDensity.map(c => c.populationDensity),
                    backgroundColor: "rgba(221, 76, 41, 0.5)",
                    borderColor: "rgba(221, 76, 41, 1)",
                    borderWidth: 1,
                }
            ]
        };

        const options = {
            responsive: true,
        };

        return <Bar data={data} options={options} className="h-92" />;
    };

  return (
    <div>
      <div className="py-4">
        <TotalPopulationBarChart />
      </div>
      <div className="py-4">
        <PopulationDensityBarChart />
      </div>
    </div>
  );
}