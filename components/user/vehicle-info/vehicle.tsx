import { Subscription, Vehicle } from "@/lib/definitions";
import { RiEdit2Line, RiSaveLine, RiVisaFill, RiCloseLine, RiArrowLeftRightLine, RiAddLine } from "@remixicon/react";
import { use, useEffect, useState } from "react";

export default function VehicleInfo({
  vehicle,
  vehicles,
}: {
  vehicle: Vehicle | undefined;
  vehicles: Vehicle[];
}) {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | undefined>(undefined);
  const [swapChoice, setSwapChoice] = useState<string>('');

  const handleRemoveClick = () => {
    setShowRemoveModal(true);
  };

  const handleRemoveCancel = () => {
    setShowRemoveModal(false);
  };

  const handleRemoveConfirm = () => {
    // TODO: Handle the removal logic here (e.g., call an API or update state)
    console.log("Vehicle removed");
    setShowRemoveModal(false);
  };

  const handleTransferClick = () => {
    setShowTransferModal(true);
  };

  const handleTransferCancel = () => {
    setShowTransferModal(false);
    setSelectedSubscription(undefined);
    setSwapChoice('');
  };

  const handleTransferConfirm = (id: string) => {
    // TODO: Handle the removal logic here (e.g., call an API or update state)
    console.log("Vehicle removed");
    setShowTransferModal(false);
  };

  const [isEditingVehiclesInfo, setIsEditingVehicleInfo] = useState(false);
  const toggleEditPersonalInfo = () => setIsEditingVehicleInfo(prev => !prev);

  const handleChange = () => {};

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect (() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await fetch(`/api/users/user/${vehicle?.user_id}/subscriptions`);
        const data = await res.json();
        console.log("Fetched subscriptions:", data);
        setSubscriptions(data);
      } catch (error) {
        console.error("Failed to fetch vehicles: ", error);
      }
    };

    fetchSubscriptions();
  }, [vehicle?.user_id]);

  const vehicle_labels = [
    { label: "Make", value: vehicle?.make },
    { label: "Model", value: vehicle?.model },
    { label: "Color", value: vehicle?.color },
    { label: "Year", value: vehicle?.year },
    { label: "Plate Number", value: vehicle?.plate_number }
  ];

  const subscription_labels = [
    { label: "Plan", value: vehicle?.subscription_name },
    { label: "Status", value: vehicle?.subscription_status },
    { label: "Frequency", value: vehicle?.subscription_frequency }
  ];

  return (
    <div className="flex-1 flex flex-col rounded-xl space-y-6">
      <div className="flex flex-col flex-1 border p-6 rounded-xl">
        <div className="flex justify-between pb-2">
          <span className="text-black-100 font-semibold">Vehicle Information</span>
          <div className="flex flex-row space-x-2">
            {isEditingVehiclesInfo && 
              <button 
                onClick={toggleEditPersonalInfo}
                className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
              >
                <p className="hidden desktop-large:block">Save</p>
                <RiSaveLine className="w-[16px] h-[16px]"/>
              </button>
            }
            <button 
              onClick={toggleEditPersonalInfo}
              className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
            >
              <p className="hidden desktop-large:block">{isEditingVehiclesInfo ? 'Cancel' : 'Edit'}</p>
              <RiEdit2Line className="w-[16px] h-[16px]"/>
            </button>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 desktop-large:grid-cols-3 grid-rows-5 desktop-large:grid-rows-4 desktop-large:gap-y-2 gap-x-6">
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
          <div className="flex flex-1 flex-col row-start-4 desktop-large:row-start-3 row-end-6 desktop-large:row-end-5 col-start-1 col-end-3 desktop-large:col-end-4 rounded-xl space-y-2">
            <div className="flex justify-between">
              <span className="text-black-100 font-semibold">Subscription</span>
              <div className="flex flex-row space-x-2">
                {!vehicle?.subscription_name ? (
                  <button
                    className="flex flex-row text-grey-300 text-[12px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
                  >
                    <p className="hidden desktop-large:block">Add</p>
                    <RiAddLine className="w-[14px] h-[14px]" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleTransferClick}
                      className="flex flex-row text-grey-300 text-[12px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
                    >
                      <p className="hidden desktop-large:block">Transfer</p>
                      <RiArrowLeftRightLine className="w-[14px] h-[14px]" />
                    </button>
                    <button 
                      onClick={handleRemoveClick}
                      className="flex flex-row text-grey-300 text-[12px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
                    >
                      <p className="hidden desktop-large:block">Remove</p>
                      <RiCloseLine className="w-[14px] h-[14px]" />
                    </button>
                  </>
                )}
              </div>
            </div>
            {vehicle?.subscription_name ? (
              <div className="flex-1 items-center grid grid-cols-2 desktop-large:grid-cols-3 gap-6 border rounded-xl p-6">
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
                  {Array.from({ length: 3 }).map((_, index) => {
                    return (
                      <tr 
                        key={index}
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
      {showRemoveModal && (
        <div className="fixed inset-[-25] z-50 flex items-center justify-center">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black-100 bg-opacity-50"></div>

          {/* Modal content */}
          <div className="relative z-10 bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Remove Subscription</h2>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to remove this subscription from the vehicle?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleRemoveCancel}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveConfirm}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {showTransferModal && (
        <div className="fixed inset-[-30] z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black-100 bg-opacity-50" />

          {/* Modal */}
          <div className="relative z-10 bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Transfer Subscription</h2>

            {/* dropdown */}
            <label htmlFor="sub-select" className="block text-sm text-gray-600 mb-2">
              Select the subscription to transfer <span className="text-red-500">*</span>
            </label>
            <select
              id="sub-select"
              value={selectedSubscription?.id || ''}
              onChange={(e) =>
                setSelectedSubscription(subscriptions.find((s) => s.id === Number(e.target.value)))
              }
              className="w-full border border-gray-300 rounded-md p-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="">-- choose a subscription --</option>
              {subscriptions
                .filter((s) => s.id !== vehicle?.subscription_id) // exclude the current vehicle
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.plan_type + ' ' + s.frequency}
                  </option>
                ))}
            </select>

            {selectedSubscription?.vehicle_id && (
              <>
                <label className="block text-sm text-gray-600 mb-2">
                  This subscription already has a vehicle. Would you like to swap it with the selected one?
                  <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center space-x-6 mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="swap-subscription"
                      value="yes"
                      checked={swapChoice === 'yes'}
                      onChange={() => setSwapChoice('yes')}
                      className="form-radio text-blue-100"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="swap-subscription"
                      value="no"
                      checked={swapChoice === 'no'}
                      onChange={() => setSwapChoice('no')}
                      className="form-radio text-blue-100"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </>
            )}

            {/* buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleTransferCancel}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                }}
                disabled={!selectedSubscription}
                className={`px-4 py-2 rounded-md text-white ${
                  selectedSubscription
                    ? 'bg-blue-100 hover:bg-blue-600'
                    : 'bg-blue-300 cursor-not-allowed'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}