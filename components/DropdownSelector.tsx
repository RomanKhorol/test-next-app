"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function DropDownSelector() {
  const [makes, setMakes] = useState<{ id: number; name: string }[]>([]);
  const [years] = useState(() => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - 2014 },
      (_, i) => currentYear - i,
    );
  });
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    async function fetchMakes() {
      try {
        const response = await fetch("/api/cars");
        const data = await response.json();
        setMakes(data);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    }

    fetchMakes();
  }, []);

  const isButtonEnabled = selectedMake && selectedYear;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <label htmlFor="makes" className="block text-lg font-semibold mb-2">
        Select Make:
      </label>
      <select
        id="makes"
        value={selectedMake}
        onChange={(e) => setSelectedMake(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Please change make
        </option>
        {makes.map((make) => (
          <option key={make.id} value={make.id}>
            {make.name}
          </option>
        ))}
      </select>

      <label htmlFor="years" className="block text-lg font-semibold mb-2">
        Select Year:
      </label>
      <select
        id="years"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Please select a year
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Show the button only when both fields are selected */}
      <div className="mt-4">
        {isButtonEnabled && (
          <Link href={`/result/${selectedMake}/${selectedYear}`} passHref>
            <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Search
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
