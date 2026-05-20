import { Container } from "@/components/Container";
import Image from "next/image";
import icon from "@/assets/icon.svg";
import CountriesTable from "@/components/CountryTable";
import { getAllCountries } from "@/services/restCountries";
import CountryDetails from "@/components/CountryDetails";
import PopulationComparison from "@/components/PopulationComparison";
import RegionalComparison from "@/components/RegionalComparison";
import classNames from "classnames";

export default async function Home() {
  const countryList = await getAllCountries();

  const CARD_CLASS =
    "w-full flex min-w-0";

  return (
    <div className="flex min-h-screen w-full justify-center bg-background px-4 py-6 sm:px-6 lg:px-10">
      <main className="flex w-full max-w-[1800px] flex-col rounded-2xl bg-primary_light p-4 sm:p-6 lg:p-10">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
          <Image
            src={icon}
            height={60}
            alt="Icon"
            className="shrink-0"
          />

          <h1 className="text-2xl font-light tracking-tight text-text_primary sm:text-3xl lg:text-4xl">
            Countries Dashboard
          </h1>
        </div>

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
          
          {/* Left Side */}
          <div className="xl:col-span-5">
            <div className={classNames(CARD_CLASS)}>
              <Container
                primary
                content={<CountriesTable allCountries={countryList} />}
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6 xl:col-span-7">
            {/* Top Right Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className={CARD_CLASS}>
                <CountryDetails />
              </div>
              <div className={CARD_CLASS}>
                <RegionalComparison allCountries={countryList} />
              </div>
            </div>

            {/* Bottom Card */}
            <div className={CARD_CLASS}>
              <PopulationComparison allCountries={countryList} />
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}