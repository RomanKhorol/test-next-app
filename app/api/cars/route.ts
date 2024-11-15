import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch vehicle makes");
    }

    const { Results } = await response.json();

    const formattedResults = Results.map((make: any) => ({
      id: make.MakeId,
      name: make.MakeName,
    }));

    return NextResponse.json(formattedResults);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
}
