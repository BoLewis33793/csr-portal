'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/definitions';

type UsersListProps = {
  queryParam: string;
};

export default function UsersList({ queryParam }: UsersListProps) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/users?query=${encodeURIComponent(queryParam)}`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, [queryParam]);

  const handleClick = (id: number) => {
    router.push(`/dashboard/users/user/${id}`);
  };

  return (
    <div className="flex flex-col flex-1 mx-2 my-2 rounded-lg border border-grey-200 bg-yellow-100 shadow overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto text-left border-b border-grey-200">
            <thead className="text-[14px]">
              <tr>
                <th className="min-w-[60px] px-4 py-2">ID</th>
                <th className="min-w-[120px] px-4 py-2">Name</th>
                <th className="min-w-[160px] px-4 py-2">Email</th>
                <th className="min-w-[140px] px-4 py-2">Phone</th>
                <th className="min-w-[100px] px-4 py-2">Vehicles</th>
                <th className="min-w-[100px] px-4 py-2">Subscriptions</th>
                <th className="min-w-[100px] px-4 py-2">Purchases</th>
                <th className="min-w-[140px] px-4 py-2">Last Wash</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {users.map((user, i) => (
                <tr
                  key={i}
                  className="h-[72px] border border-gray-200 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleClick(user.id)}
                >
                  <td className="w-1/12 px-4 py-2">#{user.id}</td>
                  <td className="w-1/6 px-4 py-2">
                    {user.first_name + ' ' + user.last_name}
                  </td>
                  <td className="w-1/4 px-4 py-2">{user.email}</td>
                  <td className="w-1/6 px-4 py-2">{user.phone_number}</td>
                  <td className="w-1/12 px-4 py-2">{user.vehicle_count}</td>
                  <td className="w-1/12 px-4 py-2">{user.subscription_count}</td>
                  <td className="w-1/12 px-4 py-2">{user.purchase_count}</td>
                  <td className="w-1/6 px-4 py-2">
                    {user.last_wash &&
                      new Date(user.last_wash).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination (stub) */}
      <div className="text-black px-4 py-2 text-sm flex justify-center items-center border-t border-grey-200">
        <button className="mx-1 px-3 py-1 bg-white rounded hover:bg-gray-200">1</button>
        <button className="mx-1 px-3 py-1 bg-white rounded hover:bg-gray-200">2</button>
        <button className="mx-1 px-3 py-1 bg-white rounded hover:bg-gray-200">3</button>
        <span className="mx-2">...</span>
        <button className="mx-1 px-3 py-1 bg-white rounded hover:bg-gray-200">10</button>
      </div>
    </div>
  );
}