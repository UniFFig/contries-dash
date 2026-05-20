import { Container } from "@/components/Container";
import Image from "next/image";
import icon from "@/assets/icon.svg";
import CountriesTable from "@/components/CountryTable";
import { getAllCountries } from "@/services/restCountries";
import CountryDetails from "@/components/CountryDetails";
import PopulationComparison from "@/components/PopulationComparison";
import classNames from "classnames";

export default async function Home() {
  const countryList = await getAllCountries();

  const CARDS_CLASS = 'w-full h-full flex-1 flex items-center mt-8 ml-8'

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans px-16">
      <main className="flex flex-1 w-full h-fit flex-col items-center mt-16 pt-12 px-8 bg-primary_light sm:items-start rounded-4xl">
        <div className="flex w-full h-fit font-text_primary text-3xl text-center sm:text-left font-light tracking-tight align-middle">
          {/* Quick chatgpt generated icon for filler */}
          <Image src={icon} height={65} alt="Icon" className="inline-block -mr-[4px]" /> <span className="h-fit my-auto">Countries Dashboad</span>
        </div>

        {/* Content */}
        <div className="flex justify-between">
          {/* Left Column start*/}
            <div className={classNames(CARDS_CLASS, "ml-2! justify-start")}>
              <Container
                primary
                content={
                  <CountriesTable allCountries={countryList} />
                }
              />
            </div>
          {/* Left Column end*/}

          {/* Right Column */}
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className={classNames(CARDS_CLASS, "justify-start")}>
                  <CountryDetails />
                </div>
                <div className={classNames(CARDS_CLASS, "justify-start")}>
                  <CountryDetails />
                </div>
              </div>
              
              <div className={classNames(CARDS_CLASS, "justify-center")}>
                <PopulationComparison allCountries={countryList} />
              </div>
            </div>
          {/* Right Column end*/}
        </div>
      </main>
    </div>
  );
}
