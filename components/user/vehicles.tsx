import { 
  RiEdit2Line,
  RiVisaFill,
} from "@remixicon/react";

export default function Vehicles() {
  const status = [
    "Active", "Overdue", "Cancelled", "Trialing", "Expired", "Refunded"
  ];

  return (
    <div className="flex flex-col space-y-2 h-full overflow-hidden">
      <span className="font-semibold text-black text-[20px]">Vehicles</span>

      <div className="flex-1 flex flex-col border rounded-xl p-4 overflow-hidden">
        {/* scrollable table wrapper */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto text-left border-separate border-spacing-y-2">
              <thead className="text-[14px]">
                <tr>
                  <th className="min-w-[140px] min-w-[100px] px-4 py-3">Make/Model</th>
                  <th className="min-w-[80px] px-4 py-3">Color</th>
                  <th className="min-w-[60px] px-4 py-3">Year</th>
                  <th className="min-w-[100px] px-4 py-3">Plate No.</th>
                  <th className="min-w-[140px] px-4 py-3">Plan</th>
                  <th className="min-w-[100px] px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {[...Array(3)].map((_, i) => (
                  <tr
                    key={i}
                    className="hover:bg-blue-50 cursor-pointer transition-colors h-14"
                  >
                    <td className="min-w-[140px] px-4 py-2 first:rounded-l-2xl">Toyota Camry</td>
                    <td className="min-w-[80px] px-4 py-2">White</td>
                    <td className="min-w-[60px] px-4 py-2">2020</td>
                    <td className="min-w-[100px] px-4 py-2">CH179T</td>
                    <td className="min-w-[140px] px-4 py-2">Monthly Pro Plan</td>
                    <td className="min-w-[100px] px-4 py-2">
                      <p className="inline-block py-[3px] px-3 bg-green-200 text-green-100 rounded-2xl">Active</p>
                    </td>
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