import { Suspense } from 'react';
import UsersNav from '@/components/navigation/users-nav';
import UsersListNav from '@/components/user/users-list-nav';
import UsersListWrapper from '@/components/user/users-list-wrapper';
import UsersList from '@/components/user/users-list';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <UsersNav />
      <Suspense fallback={<div>Loading search bar...</div>}>
        <UsersListNav />
      </Suspense>
      <Suspense fallback={<div>Loading users...</div>}>
        <UsersListWrapper />
      </Suspense>
    </div>
  );
}
