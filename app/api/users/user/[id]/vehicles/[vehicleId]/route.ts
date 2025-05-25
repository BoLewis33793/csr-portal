import { NextRequest, NextResponse } from 'next/server';
import { getVehicleById } from '@/lib/db'; // Make sure this is the correct path to your function

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vehicleId: string }> },
) {
  const id = (await params).vehicleId;

  console.log('id: ', id);

  if (!id) {
    return NextResponse.json({ error: 'No vehicle ID' }, { status: 400 });
  }

  try {
    console.log('User ID: ', id);
    const vehicle = await getVehicleById(id); // ✅ Use your DB function
    console.log('Vehicle API: ', vehicle);

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicles not found' }, { status: 404 });
    }

    return NextResponse.json(vehicle);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}