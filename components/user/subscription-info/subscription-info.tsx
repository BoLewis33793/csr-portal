import { Modal } from "@/components/modal";
import { Subscription, Vehicle } from "@/lib/definitions";
import { RiEdit2Line, RiSaveLine, RiVisaFill, RiCloseLine, RiArrowLeftRightLine, RiAddLine } from "@remixicon/react";
import { use, useEffect, useState } from "react";

export default function SubscriptionInfo({ subscription }: { subscription: Subscription | undefined}) {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(undefined);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [swapChoice, setSwapChoice] = useState<string>('');

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleCancelCancel = () => {
    setShowCancelModal(false);
  };

  const handleCancelConfirm = () => {
    console.log("Subscription Cancelled!");
    setShowCancelModal(false);
  };

  const handleRemoveClick = () => {
    setShowRemoveModal(true);
  };

  const handleRemoveCancel = () => {
    setShowRemoveModal(false);
  };

  const handleRemoveConfirm = () => {
    console.log("Vehicle removed");
    setShowRemoveModal(false);
  };

  const handleTransferClick = () => {
    setShowTransferModal(true);
  };

  const handleTransferCancel = () => {
    setShowTransferModal(false);
    setSelectedVehicle(undefined);
    setSwapChoice('');
  };

  const handleTransferConfirm = () => {
    if (!selectedVehicle) return;
  
    // Do your transfer logic here
    const transferData = {
      currentVehicle: subscription?.vehicle_id,
      toVehicle: selectedVehicle,
      swap: swapChoice,
    };
  
    console.log('Transferring:', transferData);
    // Make your API call or state update here
  
    // Reset state after confirming
    setSelectedVehicle(undefined);
    setSwapChoice('');
    setShowTransferModal(false);
  };
  

  useEffect (() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await fetch(`/api/users/user/${subscription?.user_id}/vehicles`);
        const data = await res.json();
        console.log("Fetched subscriptions:", data);
        setVehicles(data);
      } catch (error) {
        console.error("Failed to fetch vehicles: ", error);
      }
    };

    fetchSubscriptions();
  }, [subscription?.user_id]);

  const subscription_info_labels = [
    { label: "Plan", value: subscription?.plan_type },
    { label: "Frequency", value: subscription?.frequency },
    { label: "Status", value: subscription?.status },
    { label: "Amount", value: subscription?.amount },
    { label: "Start Date", value: subscription?.start_date ? new Date(subscription.start_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }) : undefined},
    { label: "Renewal Date", value: subscription?.renewal_date ? new Date(subscription.renewal_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }) : undefined}
  ];

  const card_info_labels = [
    { label: "Type", value: subscription?.card_type },
    {
      label: "Number",
      value: subscription?.card_number
        ? `**** ${subscription.card_number.slice(-4)}`
        : undefined,
    },
    { label: "Expiration", value: subscription?.card_expiration },
  ];

  const vehicle_info_labels = [
    { label: "Make", value: subscription?.make },
    { label: "Model", value: subscription?.model },
    { label: "Color", value: subscription?.color },
    { label: "Year", value: subscription?.year },
    { label: "Plate Number", value: subscription?.plate_number }
  ];

  return (
    <div className="flex flex-col flex-1 rounded-xl space-y-6 overflow-y-auto">
      <div className="flex flex-1 flex-col border p-6 rounded-xl">
        <div className="flex justify-between mb-4">
          <span className="text-black-100 font-semibold">Subscription Information</span>
          <div className="flex flex-row space-x-2">
            <button
            onClick={handleCancelClick}
              className="flex flex-row text-grey-300 text-[12px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
            >
              <p className="hidden desktop-large:block">Cancel</p>
              <RiCloseLine className="w-[14px] h-[14px]"/>
            </button>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 desktop-large:grid-cols-3 grid-rows-2 gap-y-6 gap-x-6">
            {subscription_info_labels.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[14px] text-grey-300">{label}</p>
                <p className="pt-1">
                  {value}
                </p>
              </div>
            ))}
        </div>
        <span className="text-black-100 font-semibold mt-4 mb-2">Payment Method</span>
        <div className="grid grid-cols-2 desktop-large:grid-cols-3 gap-6 border rounded-xl p-6">
          {card_info_labels.map(({ label, value }) => (
            <div key={label} className="flex flex-col">
              <span className="text-sm text-grey-300">{label}</span>
              <span className="text-base font-medium text-black-100 pt-1">{value || '—'}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col rounded-xl">
        <div className="flex justify-between">
          <span className="text-black-100 font-semibold">Vehicle</span>
          <div className="flex flex-row space-x-2">
                {!subscription?.make ? (
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
        <div className="flex-1 flex flex-col rounded-xl mt-2 border overflow-hidden">
          {subscription?.make ? (
                <div className="grid grid-cols-2 desktop-large:grid-cols-3 gap-6 rounded-xl p-6 flex-1 h-full">
                  {vehicle_info_labels.map(({ label, value }) => (
                    <div key={label} className="flex flex-col">
                      <span className="text-sm text-grey-300">{label}</span>
                      <span className="text-base font-medium text-black-100 pt-1">{value || '—'}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-grey-300 italic border m-2 rounded-xl p-6">
                  No vehicle currently assigned to this subscription.
                </div>
              )}
        </div>
      </div>
      {showCancelModal && (
        <Modal>
          <h2 className="text-lg font-semibold mb-4">Cancel Subscription</h2>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to cancel this subscription?
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancelCancel}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleCancelConfirm}
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}
      {showRemoveModal && (
        <Modal>
          <h2 className="text-lg font-semibold mb-4">Remove Vehicle</h2>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to remove this vehicle from the subscription?
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

          {/* dropdown */}
          <label htmlFor="sub-select" className="block text-sm text-gray-600 mb-2">
            Select the vehicle to transfer to<span className="text-red-500">*</span>
          </label>
          <select
            id="sub-select"
            value={selectedVehicle?.id || ''}
            onChange={(e) =>
              setSelectedVehicle(vehicles.find((v) => v.id === Number(e.target.value)))
            }
            className="w-full border border-gray-300 rounded-md p-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">-- choose a vehicle --</option>
            {vehicles
              .filter((v) => v.id !== subscription?.vehicle_id)
              .map((v) => (
                <option key={v.id} value={v.id}>
                  {v.year} {v.make} {v.model}
                </option>
              ))}
          </select>

          {selectedVehicle?.subscription_id && (
            <>
              <label className="block text-sm text-gray-600 mb-2">
                This vehicle already has a subscription. Would you like to swap it with the selected one?
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
              onClick={handleTransferConfirm}
              disabled={!selectedVehicle}
              className={`px-4 py-2 rounded-md text-white ${
                selectedVehicle
                  ? 'bg-blue-100 hover:bg-blue-600'
                  : 'bg-blue-300 cursor-not-allowed'
              }`}
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}