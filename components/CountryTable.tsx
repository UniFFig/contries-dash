"use client";

import React, {
  useMemo,
  useState,
  useEffect,
} from "react";

import { Country } from "@/types/types";
import SortableHeader from "@/components/SortableHeader";
import { interactiveComponent } from "@/utils/commonStyles";
import { useCountryStore } from "@/stores/countryStore";
import classNames from "classnames";

type CountriesTableProps = {
  allCountries: Country[];
};

const getSortableValue = (
  country: Country,
  key: keyof Country
) => {
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
  const [sortKey, setSortKey] =
    useState<keyof Country>("index");

  const [sortDirection, setSortDirection] =
    useState<"asc" | "desc">("asc");

  const [page, setPage] = useState(1);

  const pageSize = 25;

  const selectedCountry = useCountryStore(
    (state) => state.selectedCountry
  );

  const setSelectedCountry = useCountryStore(
    (state) => state.setSelectedCountry
  );

  useEffect(() => {
    setPage(1);
  }, [search, sortDirection, sortKey]);

  const handleSort = (key: keyof Country) => {
    if (sortKey === key) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const countriesSorted = useMemo(() => {
    return [...allCountries].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
  }, [allCountries]);

  const filteredCountries = useMemo(() => {
    const filtered = countriesSorted.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      const aValue = getSortableValue(a, sortKey);
      const bValue = getSortableValue(b, sortKey);

      if (
        typeof aValue === "number" &&
        typeof bValue === "number"
      ) {
        return sortDirection === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      return sortDirection === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [
    countriesSorted,
    search,
    sortKey,
    sortDirection,
  ]);

  const paginatedCountries = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredCountries.slice(
      start,
      start + pageSize
    );
  }, [filteredCountries, page]);

  const totalPages =
    Math.ceil(filteredCountries.length / pageSize) || 1;

  const renderSortArrow = (key: keyof Country) => {
    if (sortKey !== key) return "↕";

    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Countries of the World
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Select a country to view details
        </p>

        <input
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={classNames(interactiveComponent, "mt-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm")}
        />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          
          <thead className="sticky top-0 z-10 bg-gray-100 text-left">
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
            {paginatedCountries.map((country) => {
              const isSelected =
                selectedCountry?.name.common ===
                country.name.common;

              return (
                <tr
                  key={country.name.common}
                  onClick={() =>
                    setSelectedCountry(country)
                  }
                  className={classNames(
                    "cursor-pointer transition-colors",
                    isSelected
                      ? "border-primary bg-background"
                      : "border-gray-200 hover:bg-gray-50"
                  )}
                >
                  <td
                    className={classNames(
                      "px-4 py-3 font-medium",
                      isSelected
                        ? "text-primary_light font-bold"
                        : "text-blue-700"
                    )}
                  >
                    {country.name.common}
                  </td>
                  <td
                    className={classNames(
                      "px-4 py-3",
                      isSelected &&
                        "font-medium text-primary_light font-bold"
                    )}
                  >
                    {country.population.toLocaleString()}
                  </td>
                </tr>
              );
            })}

            {paginatedCountries.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No countries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        
        <button
          onClick={() =>
            setPage((p) => Math.max(p - 1, 1))
          }
          disabled={page === 1}
          className={classNames(
            interactiveComponent,
            "rounded border px-3 py-1 transition hover:bg-primary hover:text-white disabled:cursor-default disabled:opacity-50"
          )}
        >
          Previous
        </button>

        <div className="text-center text-sm text-gray-600">
          Page {page} of {totalPages}
        </div>

        <button
          onClick={() =>
            setPage((p) =>
              Math.min(p + 1, totalPages)
            )
          }
          disabled={page === totalPages}
          className={classNames(
            interactiveComponent,
            "rounded border px-3 py-1 transition hover:bg-primary hover:text-white disabled:cursor-default disabled:opacity-50"
          )}
        >
          Next
        </button>
      </div>

      {/* Footer */}
      <div className="border-t px-4 py-3 text-sm text-gray-500">
        Showing {paginatedCountries.length} countries
      </div>
    </div>
  );
}