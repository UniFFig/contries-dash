// app/components/CountriesTable.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Country } from "@/types/country";
import SortableHeader from "@/components/SortableHeader";
import { interactiveComponent } from "@/utils/commonStyles";
import { useCountryStore } from "@/stores/countryStore";
import classNames from "classnames";

type CountriesTableProps = {
  allCountries: Country[];
};

const getSortableValue = (country: Country, key: keyof Country) => {
  switch (key) {
    case "name":
      return country.name.common;

    case "population":
      return country.population;

    case "index":
      return country.index;

    default:
      return "";
  }
};

export default function CountriesTable({
    allCountries,
}: CountriesTableProps) {
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState<keyof Country>("index");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState(1);
    
    const pageSize = 25;

    const setSelectedCountry =
        useCountryStore(
            (state) => state.setSelectedCountry
    );

    useEffect(() => {
        setPage(1);
    }, [search, sortDirection, sortKey]);

    const handleSort = (key: keyof Country) => {
        if (sortKey === key) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
        setSortKey(key);
        setSortDirection("desc");
        }
    };

    const countriesSorted = useMemo(() => {
        return allCountries
            .sort((a, b) => a.name.common.localeCompare(b.name.common));
    }, [allCountries]);

    const filteredCountries = useMemo(() => {
        const filtered = countriesSorted.filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
        );

        return [...filtered].sort((a, b) => {
            const aValue = getSortableValue(a, sortKey);
            const bValue = getSortableValue(b, sortKey);

            if (typeof aValue === "number" && typeof bValue === "number") {
            return sortDirection === "asc"
                ? aValue - bValue
                : bValue - aValue;
            }

            return sortDirection === "asc"
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        });
    }, [countriesSorted, search, sortKey, sortDirection]);

    const paginatedCountries = useMemo(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        return filteredCountries.slice(start, end);
    }, [filteredCountries, page]);

    const totalPages = Math.ceil(filteredCountries.length / pageSize) || 1;

    const renderSortArrow = (key: keyof Country) => {
        if (sortKey !== key) return "↕";

        return sortDirection === "asc" ? "↑" : "↓";
    };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:min-w-[455px]">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Countries of the World
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Select a country to view more detailed information.
        </p>

        <input
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-blue-500"
        />
      </div>

      {/* Country Table start*/}
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-100 text-left">
                <tr>
                <SortableHeader
                    label="Country"
                    column="name"
                    sortKey={sortKey}
                    onSort={handleSort}
                    arrow={renderSortArrow("name")}
                />

                <SortableHeader
                    label="Population"
                    column="population"
                    sortKey={sortKey}
                    onSort={handleSort}
                    arrow={renderSortArrow("population")}
                />
                </tr>
            </thead>

            <tbody>
                {paginatedCountries.map((country) => (
                <tr
                    key={country.name.common}
                    onClick={() =>
                        setSelectedCountry(country)
                    }
                    className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                    <td className="px-4 py-3 font-medium text-blue-700" onClick={()=>{}}>
                        {country.name.common}
                    </td>
                    <td className="px-4 py-3" onClick={()=>{}}>
                        {country.population.toLocaleString()}
                    </td>
                </tr>
                ))}

                {paginatedCountries.length === 0 && (
                <tr>
                    <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-500"
                    >
                    No countries found.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
            <div className="flex items-center justify-between px-4 py-3 border-t">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className={classNames(interactiveComponent, "px-3 py-1 border rounded cursor-pointer disabled:opacity-50 disabled:cursor-default hover:bg-primary hover:text-white transition")}
                >
                    Previous
                </button>

                <div className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                </div>

                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className={classNames(interactiveComponent, "px-3 py-1 border rounded cursor-pointer disabled:opacity-50 disabled:cursor-default hover:bg-primary hover:text-white transition")}
                >
                    Next
                </button>
            </div>
        </div>
      {/* Country Table end */}

      {/* Footer */}
        <div className="border-t border-gray-200 px-4 py-3 text-sm text-gray-500">
            Showing {paginatedCountries.length} countries
        </div>
    </div>
  );
}
