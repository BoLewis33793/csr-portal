import { 
  RiVisaFill,
  RiAddFill
} from "@remixicon/react";

export default function PaymentInfo() {
  return (
    <div className="flex flex-col space-y-3 h-full overflow-hidden">
      <span className="font-semibold text-black-100 text-[20px]">Payment Info</span>

      {/* Scrollable cards container */}
      <div className="overflow-x-auto border rounded-3xl">
        <div className="flex flex-row space-x-3 p-3 min-w-max">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="min-h-[160px] min-w-[240px] grid grid-rows-[auto_1fr_auto] p-4 bg-black-100 rounded-2xl text-white shadow"
            >
              <RiVisaFill className="h-10 w-10" />
              <div className="flex justify-center items-center">
                <span className="text-xl tracking-widest">**** **** 2349</span>
              </div>
              <div className="flex justify-end">
                <span className="text-md">exp 12/24</span>
              </div>
            </div>
          ))}
          <button
              className="flex min-h-[160px] min-w-[240px] p-4 bg-blue-100 rounded-2xl text-yellow-100 hover:bg-blue-400 shadow"
            >
              <RiAddFill className="h-[36px] w-[36px]"/>
          </button>
        </div>
      </div>

      <span className="font-semibold text-black-100 text-[18px]">History</span>

      <div className="flex-1 flex flex-col border rounded-xl p-4 overflow-hidden">
        {/* scrollable table wrapper */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto text-left border-separate border-spacing-y-2">
              <thead className="text-[14px]">
                <tr>
                  <th className="min-w-[120px] px-4 py-3">Name</th>
                  <th className="min-w-[100px] px-4 py-3">Status</th>
                  <th className="min-w-[120px] px-4 py-3">Date</th>
                  <th className="min-w-[160px] px-4 py-3">Payment Method</th>
                  <th className="min-w-[100px] px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {[...Array(50)].map((_, i) => (
                  <tr
                    key={i}
                    className="hover:bg-blue-50 cursor-pointer transition-colors h-14"
                  >
                    <td className="min-w-[120px] px-4 py-2 first:rounded-l-2xl">Single Wash</td>
                    <td className="min-w-[100px] px-4 py-2">
                      <p className="inline-block py-[3px] px-3 bg-green-200 text-green-100 rounded-2xl">Paid</p>
                    </td>
                    <td className="min-w-[120px] px-4 py-2">08-17-2024</td>
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
