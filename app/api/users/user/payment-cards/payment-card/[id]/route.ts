import { NextRequest, NextResponse } from 'next/server';
import { getUserCardById } from '@/lib/db'; // Make sure this is the correct path to your function

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  console.log('IN payment-cards');

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid Card ID' }, { status: 400 });
  }

  try {
    console.log('Card ID: ', id);
    const userCards = await getUserCardById(id); // ✅ Use your DB function
    console.log('Payment History Card API: ', userCards);

    if (!userCards) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    return NextResponse.json(userCards);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}