'use client';

import { useSearchParams } from 'next/navigation';
import UsersList from './users-list';

export default function UsersListWrapper() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query') || '';

  return <UsersList queryParam={queryParam} />;
}
