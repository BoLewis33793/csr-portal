import { NextRequest, NextResponse } from 'next/server';
import { getUserPaymentHistoryById } from '@/lib/db'; // Make sure this is the correct path to your function

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  console.log('id: ', id);

  if (!id) {
    return NextResponse.json({ error: 'No user ID' }, { status: 400 });
  }

  try {
    console.log('User ID: ', id);
    const userCards = await getUserPaymentHistoryById(id); // ✅ Use your DB function
    console.log('User Payment History API: ', userCards);

    if (!userCards) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(userCards);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}