import { NextRequest, NextResponse } from 'next/server';
import { getUsers } from '@/lib/db';
import { User } from '@/lib/definitions';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.toLowerCase() || '';

  const data: User[] = (await getUsers()) as User[];

  // Filter users on the server side by name or email containing the query
  const filteredUsers = data.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const email = user.email.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  return NextResponse.json(filteredUsers);
}
