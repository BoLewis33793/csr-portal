import { AddModal } from "@/components/add-modal";
import { Modal } from "@/components/modal";
import { Payment_Card, Subscription, Vehicle } from "@/lib/definitions";
import { RiEdit2Line, RiSaveLine, RiVisaFill, RiCloseLine, RiArrowLeftRightLine, RiAddLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function VehicleInfo({
  vehicleInfo,
  vehicles,
}: {
  vehicleInfo: Vehicle | undefined;
  vehicles: Vehicle[];
}) {
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
  
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | undefined>(undefined);
  const [swapChoice, setSwapChoice] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cardList, setCardList] = useState<Payment_Card[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isEditingVehiclesInfo, setIsEditingVehicleInfo] = useState(false);

  const handleRemoveClick = () => {
    setShowRemoveModal(true);
  };

  const handleRemoveCancel = () => {
    setShowRemoveModal(false);
  };

  const handleRemoveConfirm = async () => {
    try {
      const res = await fetch(`/api/users/user/${vehicle?.user_id}/vehicles/${vehicle?.id}/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vehicleId: vehicle?.id }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to remove subscription');
      }
  
      console.log('Subscription removed successfully');

    } catch (error) {
      console.error('Error:', error);
    }
    fetchVehicle();
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

  const handleTransferConfirm = async () => {
    if (!selectedSubscription) {
      console.error('No subscription selected for transfer.');
      return;
    }
  
    const transferData = {
      currentVehicleId: vehicle?.id,
      currentVehicleSubscriptionId: vehicle?.subscription_id,
      newSubscriptionVehicleId: selectedSubscription.vehicle_id,
      newSubscriptionId: selectedSubscription.id,
      swapChoice: swapChoice,
    };
  
    console.log('Transferring:', transferData);
  
    try {
      const res = await fetch(`/api/users/user/${vehicle?.user_id}/vehicles/${vehicle?.id}/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transferData),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to transfer subscription');
      }
  
      const responseData = await res.json();
      console.log('Transfer successful:', responseData);
  
      // Optionally refresh or update UI state here
    } catch (error) {
      console.error('Transfer error:', error);
    } finally {
      fetchVehicle();
      setSelectedSubscription(undefined);
      setSwapChoice('');
      setShowTransferModal(false);
    }
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  }
  const handleAddCancel = () => {
    setSelectedPlan('');
    setSelectedFrequency('');
    setSelectedPaymentMethod('');
    setShowAddModal(false);
  };

  const handleAddConfirm = () => {
    console.log('Added Subscription!');

    setSelectedPlan('');
    setSelectedFrequency('');
    setSelectedPaymentMethod('');;
    setShowAddModal(false);
  };

  const toggleEditPersonalInfo = () => setIsEditingVehicleInfo(prev => !prev);

  const handleChange = () => {};

  const fetchVehicle = async () => {
    try {
      const res = await fetch(`/api/users/user/${vehicleInfo?.user_id}/vehicles/${vehicleInfo?.id}`);
      const data = await res.json();
      console.log("Fetched vehicle:", data);
      setVehicle(data);
    } catch (error) {
      console.error("Failed to fetch vehicles: ", error);
    }
  };

  useEffect (() => {
    if (!vehicleInfo?.id || !vehicleInfo?.user_id) return;
    fetchVehicle();
  }, [vehicleInfo]);

  useEffect (() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await fetch(`/api/users/user/${vehicleInfo?.user_id}/subscriptions`);
        const data = await res.json();
        console.log("Fetched subscriptions:", data);
        setSubscriptions(data);
      } catch (error) {
        console.error("Failed to fetch vehicles: ", error);
      }
    };

    fetchSubscriptions();
  }, [vehicleInfo]);

  useEffect(() => {
    async function fetchPaymentCards() {
      try {
        const res = await fetch(`/api/users/user/${vehicleInfo?.user_id}/payment-cards`);
        const data = await res.json();
        setCardList(data);
      } catch (error) {
        console.error("Failed to fetch Payment Cards:", error);
      }
    }

    fetchPaymentCards();
  }, [vehicleInfo]);

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
                className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 hover:text-blue-100 hover:border-blue-100 rounded-2xl items-center"
              >
                <p className="hidden desktop-large:block">Save</p>
                <RiSaveLine className="w-[16px] h-[16px]"/>
              </button>
            }
            {isEditingVehiclesInfo && 
              <button 
                onClick={toggleEditPersonalInfo}
                className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 hover:text-red-100 hover:border-red-100 rounded-2xl items-center"
              >
                <p className="hidden desktop-large:block">Cancel</p>
                <RiEdit2Line className="w-[16px] h-[16px]"/>
              </button>
            }
            {!isEditingVehiclesInfo && 
              <button 
                onClick={toggleEditPersonalInfo}
                className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 hover:text-blue-100 hover:border-blue-100 rounded-2xl items-center"
              >
                <p className="hidden desktop-large:block">Edit</p>
                <RiEdit2Line className="w-[16px] h-[16px]"/>
              </button>
            }
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
                <button
                  onClick={handleTransferClick}
                  className="flex flex-row text-grey-300 text-[12px] gap-1 py-1 px-2 border border-grey-200 hover:text-blue-100 hover:border-blue-100 rounded-2xl items-center"
                >
                  <p className="hidden desktop-large:block">Transfer</p>
                  <RiArrowLeftRightLine className="w-[14px] h-[14px]" />
                </button>
                {!vehicle?.subscription_name ? (
                  <button
                    onClick={handleAddClick}
                    className="flex flex-row text-grey-300 text-[12px] gap-1 py-1 px-2 border border-grey-200 hover:text-blue-100 hover:border-blue-100 rounded-2xl items-center"
                  >
                    <p className="hidden desktop-large:block">Add</p>
                    <RiAddLine className="w-[14px] h-[14px]" />
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={handleRemoveClick}
                      className="flex flex-row text-grey-300 text-[12px] gap-1 py-1 px-2 border border-grey-200 hover:text-red-100 hover:border-red-100 rounded-2xl items-center"
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
        <Modal>
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
        </Modal>
      )}
      {showTransferModal && (
        <Modal>
          <h2 className="text-lg font-semibold mb-4">Transfer Subscription</h2>

          {/* Dropdown */}
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
              .filter((s) => s.id !== vehicle?.subscription_id)
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
          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleTransferCancel}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleTransferConfirm}
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
        </Modal>
      )}
      {showAddModal && (
        <AddModal>
          <h2 className="text-lg font-semibold mb-4">Add Subscription</h2>

          <div className="space-y-4 mb-6">
            {/* Plan Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Plan</option>
                <option value="basic">Basic</option>
                <option value="premium">Gold</option>
                <option value="enterprise">Premium</option>
              </select>
            </div>

            {/* Frequency Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
              <select
                value={selectedFrequency}
                onChange={(e) => setSelectedFrequency(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Frequency</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* Payment Method Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Payment Method</option>
                {cardList.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.card_type + ' ' + card.card_number.slice(-4)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleAddCancel}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleAddConfirm}
              className="px-4 py-2 rounded-md bg-blue-100 text-white hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </AddModal>
      )}
    </div>
  );
}