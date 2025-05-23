import { getUsers } from "@/lib/db";
import { User } from '@/lib/definitions';

import UsersNav from "@/components/navigation/users-nav";
import UsersListNav from "@/components/user/users-list-nav";
import UsersList from "@/components/user/users-list";

export default async function Page() {
  // Simulating a fetch:
  const data: Record<string, any>[] = await getUsers();

  // Fix: Cast or transform to User[]
  const users: User[] = data as User[];
  console.log('users: ', users);

    return (
      <div className="flex flex-col h-screen">
        <UsersNav />
        <UsersListNav />
        <UsersList users={users}/>
      </div>
    );
  }