// /api/users/user/[id]/vehicles/[vehicleId]/transfer/route.ts
import { NextResponse } from 'next/server';
import {
  transferOneVehicle,
  transferOneVehicleNoSubscription, transferTwoVehicles,

} from '@/lib/db';

export async function POST(request: Request) {
  try {
    const {
      currentVehicleId,
      currentVehicleSubscriptionId,
      newSubscriptionVehicleId,
      newSubscriptionId,
      swapChoice,
    } = await request.json();

    console.log(
      currentVehicleId,
      currentVehicleSubscriptionId,
      newSubscriptionVehicleId,
      newSubscriptionId,
      swapChoice,
      );

      if (!currentVehicleSubscriptionId) {
        // If the current vehicle has no subscription, assign a new one
        await transferOneVehicleNoSubscription(
          currentVehicleId,
          newSubscriptionId
        );
      } else if (swapChoice === 'yes') {
        // Swap both subscriptions
        await transferTwoVehicles(
          currentVehicleId,
          currentVehicleSubscriptionId,
          newSubscriptionVehicleId,
          newSubscriptionId
        );
      } else {
        // Remove sub from new vehicle, assign it to current vehicle
        await transferOneVehicle(
          currentVehicleId,
          newSubscriptionVehicleId,
          newSubscriptionId
        );
      }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error in transfer route:', error);
    return NextResponse.json(
      { error: 'Internal server error during subscription transfer' },
      { status: 500 }
    );
  }
}
