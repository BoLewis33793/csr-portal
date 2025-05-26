// vehicles/vehicle_id/remove/route.ts
import { NextResponse } from 'next/server';
import { removeSubscriptionFromVehicle } from '@/lib/db'; // adjust path as needed

export async function POST(request: Request) {
  try {
    const { vehicleId } = await request.json();

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    await removeSubscriptionFromVehicle(vehicleId);

    return NextResponse.json({ success: true, vehicleId });
  } catch (error) {
    console.error('Error in POST /vehicles/vehicle_id/remove:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}