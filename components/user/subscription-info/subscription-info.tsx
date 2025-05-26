import { AddModal } from "@/components/add-modal";
import { Modal } from "@/components/modal";
import { Payment_Card, Subscription, Vehicle } from "@/lib/definitions";
import { RiEdit2Line, RiSaveLine, RiVisaFill, RiCloseLine, RiArrowLeftRightLine, RiAddLine } from "@remixicon/react";
import { use, useEffect, useState } from "react";

export default function SubscriptionInfo({ subscriptionInfo }: { subscriptionInfo: Subscription | undefined}) {
  const [subscription, setSubscription] = useState<Subscription | undefined>(undefined);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(undefined);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [swapChoice, setSwapChoice] = useState<string>('');

  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | undefined>(undefined);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [swapChoiceAdd, setSwapChoiceAdd] = useState<string>('');

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

  const handleRemoveConfirm = async () => {
    try {
      const res = await fetch(`/api/users/user/${subscription?.user_id}/vehicles/${subscription?.vehicle_id}/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vehicleId: subscription?.vehicle_id }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to remove vehicle');
      }
  
      console.log('Vehicle removed successfully');

    } catch (error) {
      console.error('Error:', error);
    }
    fetchSubscription();
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

  const handleTransferConfirm = async () => {
    if (!selectedVehicle) {
      console.error('No subscription selected for transfer.');
      return;
    }
  
    const transferData = {
      currentVehicleId: subscription?.vehicle_id,
      currentSubscriptionId: subscription?.id,
      newVehicleId: selectedVehicle?.id,
      newVehicleSubscriptionId: selectedVehicle?.subscription_id,
      swapChoice: swapChoice,
    };
  
    console.log('Transferring:', transferData);
  
    try {
      const res = await fetch(`/api/users/user/${subscription?.user_id}/subscriptions/${subscription?.id}/transfer`, {
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
      fetchSubscription();
      setSelectedVehicle(undefined);
      setSwapChoice('');
      setShowTransferModal(false);
    }
  };

  const handleAddVehicleClick = () => {
    setShowAddVehicleModal(true);
  };

  const handleAddVehicleCancel = () => {
    setVehicleMake('');
    setVehicleModel('');
    setVehicleYear('');
    setVehicleColor('');
    setVehiclePlate('');
    setSelectedSubscription(undefined);
    setSwapChoice('');
    setShowAddVehicleModal(false);
  };

  const handleAddVehicleConfirm = () => {
    // Use the input state to add a new vehicle
    const newVehicle = {
      make: vehicleMake,
      model: vehicleModel,
      year: vehicleYear,
      color: vehicleColor,
      plate_number: vehiclePlate,
      subscription_id: selectedSubscription?.id || null
    };
    // Do something with newVehicle
    setVehicleMake('');
    setVehicleModel('');
    setVehicleYear('');
    setVehicleColor('');
    setVehiclePlate('');
    setSelectedSubscription(undefined);
    setSwapChoice('');
    setShowAddVehicleModal(false);
  };

  async function fetchSubscription() {
    try {
      const res = await fetch(`/api/users/user/${subscriptionInfo?.user_id}/subscriptions/${subscriptionInfo?.id}`);
      const data = await res.json();
      console.log('data: ', data);
      setSubscription(data);
    } catch (error) {
      console.error("Failed to fetch Subscription:", error);
    }
  }

  useEffect(() => {
    if (!subscriptionInfo?.id || !subscriptionInfo?.user_id) return;
    fetchSubscription();
  }, [subscriptionInfo?.id]);

  useEffect (() => {
    if (!subscriptionInfo?.id || !subscriptionInfo?.user_id) return;

    const fetchSubscriptions = async () => {
      try {
        const res = await fetch(`/api/users/user/${subscriptionInfo?.user_id}/vehicles`);
        const data = await res.json();
        console.log("Fetched subscriptions:", data);
        setVehicles(data);
      } catch (error) {
        console.error("Failed to fetch vehicles: ", error);
      }
    };
    fetchSubscriptions();
  }, [subscriptionInfo?.user_id]);

  useEffect (() => {
    if (!subscriptionInfo?.id || !subscriptionInfo?.user_id) return;

    const fetchSubscriptions = async () => {
      try {
        const res = await fetch(`/api/users/user/${subscriptionInfo?.user_id}/subscriptions`);
        const data = await res.json();
        console.log("Fetched subscriptions:", data);
        setSubscriptions(data);
      } catch (error) {
        console.error("Failed to fetch vehicles: ", error);
      }
    };

    fetchSubscriptions();
  }, [subscriptionInfo?.user_id]);

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
              className={`flex flex-row text-[12px] gap-1 py-1 px-2 border rounded-2xl items-center
                ${
                  subscription?.status?.toLowerCase() === "active"
                    ? "text-grey-300 border-grey-200 hover:text-red-100 hover:border-red-100"
                    : "text-grey-300 border-grey-200 hover:text-green-100 hover:border-green-100"
                }
              `}
            >
              <p className="hidden desktop-large:block">
                {subscription?.status?.toLowerCase() === "active" ? "Cancel" : "Activate"}
              </p>
              {subscription?.status?.toLowerCase() === "active" ? (
                <RiCloseLine className="w-[14px] h-[14px]" />
              ) : (
                <RiAddLine className="w-[14px] h-[14px]" />
              )}
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
            <button
              onClick={handleTransferClick}
              className="flex flex-row text-grey-300 text-[12px] gap-1 py-1 px-2 border border-grey-200 hover:text-blue-100 hover:border-blue-100 rounded-2xl items-center"
            >
              <p className="hidden desktop-large:block">Transfer</p>
              <RiArrowLeftRightLine className="w-[14px] h-[14px]" />
            </button>
            {!subscription?.make ? (
              <button 
                onClick={handleAddVehicleClick}
                className="flex flex-row text-grey-300 text-[12px] border border-grey-200 gap-1 py-1 px-2 hover:text-blue-100 hover:border-blue-100 rounded-2xl items-center"
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
      {showAddVehicleModal && (
        <AddModal>
          <h2 className="text-lg font-semibold mb-4">Add Vehicle</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Make */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
              <input
                type="text"
                value={vehicleMake}
                onChange={(e) => setVehicleMake(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input
                type="text"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="number"
                value={vehicleYear}
                onChange={(e) => setVehicleYear(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input
                type="text"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Plate Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plate Number</label>
              <input
                type="text"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleAddVehicleCancel}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleAddVehicleConfirm}
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