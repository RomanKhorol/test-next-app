// app/result/[makeId]/[year]/page.tsx
import { CarType } from "@/models/carType";
import Car from "@/components/Car";
import { Metadata } from "next";
import { StaticParams } from "@/models/statisParamsType";

async function getMakes() {
  try {
    const response = await fetch("http://localhost:3000/api/cars");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    if (Array.isArray(data.Results)) {
      return data.Results.map((make: CarType) => make.Make_ID);
    } else {
      throw new Error("Results is not an array");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

const years = Array.from({ length: 10 }, (_, i) => 2024 - i);

export async function generateStaticParams() {
  const makes = await getMakes();
  const staticParams: StaticParams[] = [];

  for (const makeId of makes) {
    years.forEach((year) => {
      staticParams.push({
        makeId: makeId.toString(),
        year: year.toString(),
      });
    });
  }

  return staticParams;
}

export const metadata: Metadata = {
  title: "Find Cars",
};

async function getCars(makeId: string, year: string) {
  const response = await fetch(
    `http://localhost:3000/api/cars/${makeId}/${year}`,
  );
  return response.json();
}

export default async function ResultPage({
  params,
}: {
  params: { makeId: string; year: string };
}) {
  const { makeId, year } = await params;
  const cars = await getCars(makeId, year);

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
    </div>
  );
}
