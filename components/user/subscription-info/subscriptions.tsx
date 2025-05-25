import { RiArrowLeftLongLine, RiVisaFill, RiAddLine } from "@remixicon/react";

import { Subscription } from "@/lib/definitions";
import { useState, useEffect } from "react";

import SubscriptionInfo from "./subscription-info";

export default function Subscriptions({ id }: { id: number }) {
  const status = [
    "Active", "Overdue", "Cancelled", "Trialing", "Expired", "Refunded"
  ];

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isSubscriptionSelected, setIsSubscriptionSelected] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | undefined>(undefined);

  const handleClick = (id: number) => {
    const selectedSubscription = subscriptions.find(subscription => subscription.id === id);
    if (selectedSubscription) {
      setSubscription(selectedSubscription);
      setIsSubscriptionSelected(true);
    }
  }

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
              className="flex flex-row text-grey-300 text-[12px] mr-2 gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center hover:bg-blue-100 hover:text-yellow-100"
            >
              Add
              <RiAddLine className="w-[14px] h-[14px]"/>
            </button>
          </div>
        )}
      </span>
      {isSubscriptionSelected ? (
        <SubscriptionInfo subscription={subscription}/>
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
    </div>
  );
}