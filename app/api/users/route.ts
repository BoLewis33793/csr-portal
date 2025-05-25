import { getUsersWithSearch } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const users = await getUsersWithSearch(query);
  return NextResponse.json(users);
}