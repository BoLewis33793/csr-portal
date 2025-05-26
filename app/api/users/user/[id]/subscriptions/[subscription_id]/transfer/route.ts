import { NextResponse } from 'next/server';
import {
  transferOneSubscription,
  transferOneSubscriptionNoVehicle,
  transferTwoSubscriptions,
} from '@/lib/db';

export async function POST(request: Request) {
  try {
    const {
      currentVehicleId,
      currentSubscriptionId,
      newVehicleId,
      newVehicleSubscriptionId,
      swapChoice,
    } = await request.json();

    console.log(
      currentVehicleId,
      currentSubscriptionId,
      newVehicleId,
      newVehicleSubscriptionId,
      swapChoice
    );

    if (!currentVehicleId) {
      await transferOneSubscriptionNoVehicle(currentSubscriptionId, newVehicleId);
    } else if (swapChoice === 'yes') {
      await transferTwoSubscriptions(
        currentVehicleId,
        currentSubscriptionId,
        newVehicleId,
        newVehicleSubscriptionId
      );
    } else {
      await transferOneSubscription(currentVehicleId, currentSubscriptionId, newVehicleId);
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