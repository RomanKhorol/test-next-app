import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { makeId: string; year: string } },
) {
  const { makeId, year } = params;

  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch vehicle models");
    }

    const { Results } = await response.json();

    return NextResponse.json(Results);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
}
