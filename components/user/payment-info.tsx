import { 
  RiVisaFill,
  RiAddFill
} from "@remixicon/react";

import PaymentCardInfo from "./payment-card-info";

export default function PaymentInfo() {
  const card_list = [
    {
      icon: RiVisaFill,
      card_number: "**** **** 2349",
      expiration_number: "exp 12/24",
    },
    {
      icon: RiVisaFill,
      card_number: "**** **** 7810",
      expiration_number: "exp 03/26",
    },
    {
      icon: RiVisaFill,
      card_number: "**** **** 5681",
      expiration_number: "exp 06/25",
    },
  ];

  return (
    <div className="flex flex-col space-y-3 h-full overflow-hidden">
      <span className="font-semibold text-black-100 text-[20px]">Payment Info</span>

      {/* Scrollable cards container */}
      <div className="overflow-x-auto border rounded-3xl">
        <PaymentCardInfo list={card_list}/>
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
