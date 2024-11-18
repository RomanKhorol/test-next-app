// app/result/[makeId]/[year]/page.tsx
import { CarType, CarType2 } from "@/models/carType";
import Car from "@/components/Car";
import { Metadata } from "next";
import { StaticParams } from "@/models/statisParamsType";
import Link from "next/link";
import { FC } from "react";

async function getMakes() {
  try {
    const response = await fetch("http://localhost:3000/api/cars");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Data is not an array or missing", data);
      return [];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

const years = Array.from({ length: 10 }, (_, i) => 2024 - i);

export async function generateStaticParams() {
  const makes = await getMakes();
  const staticParams: StaticParams[] = makes.flatMap((make) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year.toString(),
    })),
  );
  console.log(staticParams);
  return staticParams;
}

interface Props {
  makeId: string;
  year: string;
}

export default async function ResultPage({
  params,
}: {
  params: Promise<StaticParams>;
}) {
  const { makeId, year } = await params;
  const response = await fetch(
    `http://localhost:3000/api/cars/${makeId}/${year}`,
  );
  const cars = await response.json();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Cars available
      </h1>
      <ul className="space-y-4">
        {cars.length > 0 ? (
          cars.map((car: CarType) => (
            <li
              key={car.Model_ID}
              className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 transition duration-200 max-w-xs mx-auto"
            >
              <Car car={car} />
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No cars available</p>
        )}
      </ul>
      <div className="text-center mb-6">
        <Link
          href="/"
          className=" mt-10 inline-block bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Go to Search Page
        </Link>
      </div>
    </div>
  );
}
