import { 
    RiEdit2Line,
    RiVisaFill,
  } from "@remixicon/react";
  
  export default function Subscriptions() {
    const status = [
      "Active", "Overdue", "Cancelled", "Trialing", "Expired", "Refunded"
    ];
  
    return (
      <div className="flex flex-col space-y-3 h-full overflow-hidden">
        <span className="font-semibold text-black text-[20px]">Subscriptions</span>
  
        <div className="flex-1 flex flex-col border rounded-xl p-4 overflow-hidden">
          {/* scrollable table wrapper */}
          <div className="flex-1 overflow-y-auto">
            <div className="w-full overflow-x-auto">
              <table className="w-full table-auto text-left border-separate border-spacing-y-2">
                <thead className="text-[14px]">
                  <tr>
                    <th className="min-w-[160px] min-w-[100px] px-4 py-3">Plan</th>
                    <th className="min-w-[100px] px-4 py-3">Status</th>
                    <th className="min-w-[100px] px-4 py-3">Frequency</th>
                    <th className="min-w-[120px] px-4 py-3">Start Date</th>
                    <th className="min-w-[140px] px-4 py-3">Renewal Date</th>
                    <th className="min-w-[160px] px-4 py-3">Payment Method</th>
                    <th className="min-w-[100px] px-4 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-[14px]">
                  {[...Array(3)].map((_, i) => (
                    <tr
                      key={i}
                      className="hover:bg-blue-50 cursor-pointer transition-colors h-14"
                    >
                      <td className="min-w-[160px] px-4 py-2 first:rounded-l-2xl">Monthly Pro Plan</td>
                      <td className="min-w-[100px] px-4 py-2">
                        <p className="inline-block py-[3px] px-3 bg-green-200 text-green-100 rounded-2xl">Active</p>
                      </td>
                      <td className="min-w-[120px] px-4 py-2">Monthly</td>
                      <td className="min-w-[120px] px-4 py-2">08-17-2024</td>
                      <td className="min-w-[140px] px-4 py-2">11-17-2024</td>
                      <td className="min-w-[160px] px-4 py-2">
                        <div className="flex items-center">
                          <RiVisaFill className="mr-2 h-6 w-6" />
                          <span className="text-[14px]">2349</span>
                        </div>
                      </td>
                      <td className="min-w-[100px] px-4 py-2 last:rounded-r-2xl">$12.99</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }