import { RiEdit2Line } from "@remixicon/react";

export default function PaymentHistory() {
  return (
    <div className="flex-1 flex flex-col m-4 space-y-6 overflow-hidden">
      <span className="font-semibold text-black text-[20px]">Payment History</span>

      <div className="flex-1 flex flex-col border rounded-xl p-4 space-y-2 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto text-left border-separate border-spacing-y-2">
            <thead className="text-[14px]">
              <tr>
                <th className="min-w-[100px] px-4 py-3">Name</th>
                <th className="min-w-[100px] px-4 py-3">Status</th>
                <th className="min-w-[150px] px-4 py-3">Date</th>
                <th className="min-w-[100px] px-4 py-3">Amount</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {[...Array(50)].map((_, i) => (
                <tr
                  key={i}
                  className="hover:bg-blue-50 cursor-pointer transition-colors h-12"
                >
                  <td className="px-4 py-2 first:rounded-l-2xl">
                    Single Wash
                  </td>
                  <td className="px-4 py-2">
                    <p className="inline-block py-[3px] px-3 bg-green-200 text-green-100 rounded-2xl">Paid</p>
                  </td>
                  <td className="px-4 py-2">08-17-2024</td>
                  <td className="px-4 py-2 last:rounded-r-2xl">
                    $12.99
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}