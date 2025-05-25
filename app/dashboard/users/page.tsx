import { getUsersWithSearch } from "@/lib/db";

import UsersNav from "@/components/navigation/users-nav";
import UsersListNav from "@/components/user/users-list-nav";
import UsersList from "@/components/user/users-list";
import { User } from "@/lib/definitions";

interface PageProps {
  searchParams?: { query?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams?.query || '';

  const users = await getUsersWithSearch(query) as User[];

  return (
    <div className="flex flex-col h-screen">
      <UsersNav />
      <UsersListNav />
      <UsersList users={users} />
    </div>
  );
}