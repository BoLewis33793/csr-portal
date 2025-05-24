import { NextRequest, NextResponse } from 'next/server';
import { getUserSubscriptionsById } from '@/lib/db'; // Make sure this is the correct path to your function

export async function GET(
    request: NextRequest,
    context: { params: { id: string } }
  ) {
    const id = Number(context.params.id);

  console.log('id: ', id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    console.log('User ID: ', id);
    const subscriptions = await getUserSubscriptionsById(id); // ✅ Use your DB function
    console.log('Subscriptions API: ', subscriptions);

    if (!subscriptions) {
      return NextResponse.json({ error: 'Subscriptions not found' }, { status: 404 });
    }

    return NextResponse.json(subscriptions);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}