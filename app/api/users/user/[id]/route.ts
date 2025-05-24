import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '@/lib/db'; // Adjust the path if needed

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const idParam = context.params.id;
  const id = Number(idParam);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}