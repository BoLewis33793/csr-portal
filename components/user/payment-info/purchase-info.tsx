import { Purchase, Vehicle } from "@/lib/definitions";
import { RiEdit2Line, RiSaveLine, RiVisaFill, RiCloseLine, RiArrowLeftRightLine, RiAddLine } from "@remixicon/react";
import { useState } from "react";

export default function PurchaseInfo({ purchase }: { purchase: Purchase | undefined}) {

  return (
    <div className="flex-1 flex flex-col rounded-xl space-y-6 overflow-y-auto">
      <div className="flex flex-col flex-1 border p-6 rounded-xl overflow-x-auto">
        <div className="flex justify-between pb-2">
          <span className="text-black-100 font-semibold">Vehicle Information</span>
          <div className="flex flex-row space-x-2">
            {isEditingVehiclesInfo && 
              <button 
                onClick={toggleEditPersonalInfo}
                className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
              >
                Save
                <RiSaveLine className="w-[16px] h-[16px]"/>
              </button>
            }
            <button 
              onClick={toggleEditPersonalInfo}
              className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
            >

              {isEditingVehiclesInfo ? 'Cancel' : 'Edit'}
              <RiEdit2Line className="w-[16px] h-[16px]"/>
            </button>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-3 grid-rows-4 gap-y-2 gap-x-6">
          {vehicle_labels.map(({ label, value }) => (
            <div key={label}>
              <p className="text-[14px] text-grey-300">{label}</p>
              {isEditingVehiclesInfo ? (
                <input
                  defaultValue={value}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="pt-1">
                  {value}
                </p>
              )}
            </div>
          ))}
          <div className="flex flex-1 flex-col row-start-3 row-end-5 col-start-1 col-end-4 rounded-xl space-y-2">
            <div className="flex justify-between">
              <span className="text-black-100 font-semibold">Subscription</span>
              <div className="flex flex-row space-x-2">
                <button 
                  onClick={toggleEditSubscription}
                  className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
                >
                  Add
                  <RiAddLine className="w-[14px] h-[14px]"/>
                </button>
                <button 
                  onClick={toggleEditSubscription}
                  className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
                >
                  Transfer
                  <RiArrowLeftRightLine className="w-[14px] h-[14px]"/>
                </button>
                <button 
                  onClick={toggleEditSubscription}
                  className="flex flex-row text-grey-300 text-[12px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
                >
                  Remove
                  <RiCloseLine className="w-[14px] h-[14px]"/>
                </button>
              </div>
            </div>
            {vehicle?.subscription_name ? (
              <div className="grid grid-cols-3 gap-6 border rounded-xl p-6">
                {subscription_labels.map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-sm text-grey-300">{label}</span>
                    <span className="text-base font-medium text-black-100 pt-1">{value || '—'}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-grey-400 italic border rounded-xl p-6">
                No subscription currently assigned to this vehicle.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 rounded-xl">
        <span className="font-semibold text-black-100 text-[18px]">Washes</span>
        <div className="flex-1 flex flex-col border rounded-xl mt-2 p-4 overflow-hidden">
          {/* scrollable table wrapper */}
          <div className="flex-1 overflow-y-auto">
            <div className="w-full overflow-x-auto">
              <table className="w-full table-auto text-left border-separate border-spacing-y-2">
                <thead className="text-[14px]">
                  <tr>
                    <th className="min-w-[150px] px-4 py-3">Name</th>
                    <th className="min-w-[120px] px-4 py-3">Date</th>
                    <th className="min-w-[160px] px-4 py-3">Payment Method</th>
                    <th className="min-w-[120px] px-4 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-[14px]">
                  {Array.from({ length: 3 }).map(() => {
                    return (
                      <tr 
                        className="hover:bg-blue-50 cursor-pointer transition-colors h-14"
                      >
                        <td className="min-w-[150px] px-4 py-2 first:rounded-l-2xl">Deluxe Car Wash</td>
                        {/*<td className="min-w-[120px] px-4 py-2">
                          {purchase.date && new Date(purchase.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          })}
                        </td>*/}
                        <td className="min-w-[120px] px-4 py-2">01/12/2024</td>
                        <td className="min-w-[160px] px-4 py-2">
                          <div className="flex items-center">
                            <RiVisaFill className="mr-2 h-6 w-6" />
                            <span className="text-[14px]">
                              {/*card && card.card_number ? card.card_number.slice(-4) : '----'*/}
                              2349
                            </span>
                          </div>
                        </td>
                        <td className="min-w-[100px] px-4 py-2 last:rounded-r-2xl">12.99</td>
                      </tr>
                    );
                  })}
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}