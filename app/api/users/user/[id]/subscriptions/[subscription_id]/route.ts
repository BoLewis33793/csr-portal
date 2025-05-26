import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptionById } from '@/lib/db'; // Make sure this is the correct path to your function

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subscription_id: string }> },
) {
  const id = (await params).subscription_id;

  console.log('id: ', id);

  if (!id) {
    return NextResponse.json({ error: 'No vehicle ID' }, { status: 400 });
  }

  try {
    console.log('Subscription ID: ', id);
    const subscription = await getSubscriptionById(id); // ✅ Use your DB function
    console.log('Subscription API: ', subscription);

    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}