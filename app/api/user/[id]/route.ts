import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '@/lib/db'; // Make sure this is the correct path to your function

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    console.log('User ID: ', id);
    const user = await getUserById(id); // ✅ Use your DB function
    console.log('User API: ', user);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

