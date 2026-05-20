"use client";

import Image from "next/image";
import { Country } from "@/types/country";
import { useCountryStore } from "@/stores/countryStore";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Container } from "@/components/Container";

type RegionGraphProps = {
  allCountries: Country[];
};

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RegionalComparison(allCountries: RegionGraphProps) {
    const selectedCountry =
        useCountryStore(
        (state) => state.selectedCountry
    );

    if(!selectedCountry){
        return null
    }

    const flattenedCountries = allCountries.allCountries

    const totalAreaOfRegions = flattenedCountries.reduce((acc, country) => {
        if (country.region) {
            acc[country.region] = (acc[country.region] || 0) + country.area;
        } 
        return acc;
    }, {} as Record<string, number>);

    const labels = [selectedCountry?.region, selectedCountry?.name.common], 
    dataValues = [(totalAreaOfRegions[selectedCountry.region] - selectedCountry.area)/totalAreaOfRegions[selectedCountry.region] * 100, selectedCountry.area/totalAreaOfRegions[selectedCountry.region] * 100] 
    
    const chartData = {
        labels: labels,
        datasets: [
        {
            label: "Total Area(by Percentage)",
            data: dataValues,
            backgroundColor: [
            "rgba(119, 166, 212, 0.8)", 
            "rgba(221, 76, 41, 0.8)",
            ],
            borderColor: [
            "rgb(119, 166, 212)",
            "rgb(221, 76, 41)",
            ],
            borderWidth: 1,
            hoverOffset: 4,
        },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Forces chart to fit parent limits instead of looping size to infinity
        plugins: {
        legend: {
            position: "bottom" as const,
        },
        },
    };

    return (
        <Container
            primary={false}
            content={
            <div className="relative w-92 h-[515px] p-6 flex flex-col items-center justify-center">
                <h2 className="text-2xl text-center font-semibold text-gray-900">Country Area vs Total Regional Area (%)</h2>
                <Doughnut data={chartData} options={options} />
            </div>
            }
        />
    );
}