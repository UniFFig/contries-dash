import Image from "next/image";
import icon from "@/assets/icon.svg";
import CountriesTable from "@/components/CountryTable";
import CountryDetails from "@/components/CountryDetails";
import PopulationComparison from "@/components/PopulationComparison";
import RegionalComparison from "@/components/RegionalComparison";

import { getAllCountries } from "@/services/restCountries";

export default async function Home() {
  const countryList = await getAllCountries();

  return (
    <div className="flex min-h-screen w-full justify-center bg-background p-4 md:p-6">
      <main className="flex min-h-[calc(100vh-2rem)] w-full max-w-[1800px] flex-col rounded-2xl bg-primary_light p-4 md:p-6 xl:p-10">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
          <Image
            src={icon}
            alt="Countries Dashboard Icon"
            height={60}
            className="shrink-0"
          />

          <div>
            <h1 className="text-2xl font-light tracking-tight text-text_primary sm:text-3xl xl:text-4xl">
              Countries Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              Explore population, geography, and regional statistics from around the world.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid flex-1 grid-cols-1 gap-6 xl:grid-cols-12">

          {/* Left Column */}
          <div className="min-h-0 xl:col-span-5">
            <div className="flex h-full min-h-[500px] w-full min-w-0">
              <CountriesTable allCountries={countryList} />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex min-h-0 flex-col gap-6 xl:col-span-7">

            {/* Top Cards */}
            <div className="grid auto-rows-fr grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="flex min-h-[320px] w-full min-w-0 justify-center">
                <CountryDetails />
              </div>
              <div className="flex min-h-[320px] w-full min-w-0 justify-center! lg:justify-start!">
                <RegionalComparison allCountries={countryList} />
              </div>
            </div>

            {/* Bottom Charts */}
            <div className="flex w-full min-w-0">
              <PopulationComparison allCountries={countryList} />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}