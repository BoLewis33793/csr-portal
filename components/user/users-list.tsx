'use client';
import { useRouter } from 'next/navigation';

export default function UsersList() {
    const user = {
        id: 1,
        first_name: "Bo",
        last_name: "Lewis",
        phone_number: "(770) 530-4152",
        email: "bo.lewis3434343434343434@gmail.com",
        status: "Overdue",
        membership: "Monthly",
        vehicles: 3,
        last_wash: "09-24-2024",
        date_of_birth: "06/11/2001",
        gender: "Male",
        address: {
          street_address: "135 Brights Way",
          city: "Dawsonville",
          state: "Georgia",
          postal_code: "30534",
          country: "United States"
        },
      };

    const router = useRouter();

    const handleClick = () => {
        router.push(`/dashboard/users/${user.id}`)
    };

    return (
        <div className="flex flex-col flex-1 mx-2 my-2 rounded-lg border border-grey-200 bg-yellow-100 overflow-hidden shadow">
            {/* SCROLLABLE TABLE CONTAINER */}
            <div className="w-full overflow-x-auto">
              <table className="w-full table-auto text-left border-b border-grey-200">
                  <thead className="text-[14px]">
                  <tr>
                      <th className="min-w-[60px] px-4 py-2">ID</th>
                      <th className="min-w-[120px] px-4 py-2">Name</th>
                      <th className="min-w-[160px] px-4 py-2">Email</th>
                      <th className="min-w-[140px] px-4 py-2">Phone</th>
                      <th className="min-w-[100px] px-4 py-2">Vehicles</th>
                      <th className="min-w-[100px] px-4 py-2">Plan</th>
                      <th className="min-w-[100px] px-4 py-2">Status</th>
                      <th className="min-w-[140px] px-4 py-2">Last Wash</th>
                  </tr>
                  </thead>
                  <tbody className="text-[14px]">
                  {[...Array(50)].map((_, i) => (
                      <tr key={i} className='h-[64px] border border-gray-200 hover:border-blue-100 cursor-pointer' onClick={handleClick}>
                      <td className="w-1/12 px-4 py-2">#{user.id}</td>
                      <td className="w-1/6 px-4 py-2">{user.first_name + " " + user.last_name}</td>
                      <td className="w-1/4 px-4 py-2">{user.email}</td>
                      <td className="w-1/6 px-4 py-2">{user.phone_number}</td>
                      <td className="w-1/12 px-4 py-2">{user.vehicles}</td>
                      <td className="w-1/12 px-4 py-2">{user.membership}</td>
                      <td className="w-1/12 px-4 py-2">{user.status}</td>
                      <td className="w-1/6 px-4 py-2">{user.last_wash}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
            </div>
        
            {/* Pagination Bar */}
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