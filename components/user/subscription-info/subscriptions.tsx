import { RiArrowLeftLongLine, RiVisaFill, RiAddLine } from "@remixicon/react";

import { Payment_Card, Subscription, Vehicle } from "@/lib/definitions";
import { useState, useEffect } from "react";

import SubscriptionInfo from "./subscription-info";
import { AddModal } from "@/components/add-modal";
import { CachedRouteKind } from "next/dist/server/response-cache";

export default function Subscriptions({ id }: { id: number }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isSubscriptionSelected, setIsSubscriptionSelected] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | undefined>(undefined);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(undefined);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [swapChoice, setSwapChoice] = useState<string>('');
  const [cardList, setCardList] = useState<Payment_Card[]>([]);
  

  const handleClick = (id: number) => {
    const selectedSubscription = subscriptions.find(subscription => subscription.id === id);
    if (selectedSubscription) {
      setSubscription(selectedSubscription);
      setIsSubscriptionSelected(true);
    }
  }

  const handleAddClick = () => {
    setShowAddModal(true);
  }
  const handleAddCancel = () => {
    setSelectedPlan('');
    setSelectedFrequency('');
    setSelectedPaymentMethod('');;
    setSelectedVehicle(undefined);
    setSwapChoice('');
    setShowAddModal(false);
  };

  const handleAddConfirm = () => {
    console.log('Added Subscription!');
    console.log('Selected Vehicle: ', selectedVehicle);

    setSelectedPlan('');
    setSelectedFrequency('');
    setSelectedPaymentMethod('');;
    setSelectedVehicle(undefined);
    setSwapChoice('');
    setShowAddModal(false);
  };

  useEffect (() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await fetch(`/api/users/user/${id}/subscriptions`);
        const data = await res.json();
        console.log("Fetched subscriptions:", data);
        setSubscriptions(data);
      } catch (error) {
        console.error("Failed to fetch vehicles: ", error);
      }
    };

    fetchSubscriptions();
  }, [id]);

  useEffect(() => {
    async function fetchPaymentCards() {
      try {
        const res = await fetch(`/api/users/user/${id}/payment-cards`);
        const data = await res.json();
        setCardList(data);
      } catch (error) {
        console.error("Failed to fetch Payment Cards:", error);
      }
    }

    fetchPaymentCards();
  }, [id]);

  useEffect (() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(`/api/users/user/${id}/vehicles`);
        const data = await res.json();
        console.log("Fetched vehicles:", data);
        setVehicles(data);
      } catch (error) {
        console.error("Failed to fetch vehicles: ", error);
      }
    };

    fetchVehicles();
  }, [id]);

  return (
    <div className="flex flex-col space-y-3 h-full overflow-hidden">
      <span className="font-semibold text-black text-[20px]">
        {isSubscriptionSelected ? (
          <div className="flex items-center text-[24px] text-black-100">
            <button 
                onClick={() => {
                  setIsSubscriptionSelected(false);
                }}
                className='bg-yellow-100 mr-2 py-[3px] px-[5px] border border-grey-200 rounded shadow'>
                <RiArrowLeftLongLine className='h-4 w-6 text-grey-300'/>
            </button>
            <span className='pl-[4px] text-[18px]'>
              {subscription?.plan_type}
            </span>
            <div className="min-w-[50px] px-4 py-2">
              <p className="py-[3px] px-3 bg-green-200 text-[14px] text-green-100 rounded-2xl">{subscription?.status}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-between">
            <span className='pl-[4px] text-[22px]'>
              Subscriptions
            </span>
            <button
            onClick={handleAddClick}
              className="flex flex-row text-grey-300 text-[12px] mr-2 gap-1 py-1 px-2 border border-grey-200 hover:text-blue-100 hover:border-blue-100 rounded-2xl items-center"
            >
              Add
              <RiAddLine className="w-[14px] h-[14px]"/>
            </button>
          </div>
        )}
      </span>
      {isSubscriptionSelected ? (
        <SubscriptionInfo subscriptionInfo={subscription}/>
      ) : (
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
                  {subscriptions.map((subscription, i) => (
                    <tr
                      key={i}
                      className="hover:bg-blue-50 cursor-pointer transition-colors h-14"
                      onClick={() => handleClick(subscription.id)}
                    >
                      <td className="min-w-[160px] px-4 py-2 first:rounded-l-2xl">{subscription.plan_type}</td>
                      <td className="min-w-[100px] px-4 py-2">
                        <p className="inline-block py-[3px] px-3 bg-green-200 text-green-100 rounded-2xl">{subscription.status}</p>
                      </td>
                      <td className="min-w-[120px] px-4 py-2">{subscription.frequency}</td>
                      <td className="min-w-[120px] px-4 py-2">
                        {subscription.start_date && new Date(subscription.start_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                        })}
                      </td>
                      <td className="min-w-[140px] px-4 py-2">
                        {subscription.renewal_date && new Date(subscription.renewal_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                          })}
                      </td>
                      <td className="min-w-[160px] px-4 py-2">
                        <div className="flex items-center">
                          <RiVisaFill className="mr-2 h-6 w-6" />
                          <span className="text-[14px]">
                            {subscription && subscription.card_number ? subscription.card_number.slice(-4) : '----'}
                          </span>
                        </div>
                      </td>
                      <td className="min-w-[100px] px-4 py-2 last:rounded-r-2xl">{subscription.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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

            {/* Vehicle Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
              <select
                value={selectedVehicle?.id || ''}
                onChange={(e) => {
                  const selectedId = Number(e.target.value);
                  const vehicle = vehicles.find(v => v.id === selectedId);
                  setSelectedVehicle(vehicle);
                }}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.plate_number})
                  </option>
                ))}
              </select>
            </div>
          </div>
          {selectedVehicle?.subscription_id && (
            <>
              <label className="block text-sm text-gray-600 mb-2">
                This vehicle already has a subscription. Would you like to swap it with this one?
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