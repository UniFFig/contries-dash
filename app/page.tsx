import { Container } from "@/components/Container";
import Image from "next/image";
import icon from "@/assets/icon.svg";
import CountriesTable from "@/components/CountryTable";
import { getAllCountries } from "@/services/restCountries";

export default async function Home() {
  const countryList = await getAllCountries();
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
            <div className="w-full h-full flex-1 flex items-center justify-start mt-8 ml-2">
              <Container
                primary
                content={
                  <CountriesTable allCountries={countryList} />
                }
              />
            </div>
          {/* Left Column end*/}

          {/* Right Column */}
            <div className="w-full h-full flex-1 flex items-center justify-center mt-8 ml-8">

            </div>
          {/* Right Column end*/}
        </div>
      </main>
    </div>
  );
}
