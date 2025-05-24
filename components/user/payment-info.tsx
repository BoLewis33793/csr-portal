'use client';
import { 
  RiVisaFill,
  RiAddFill
} from "@remixicon/react";
import { useEffect, useState } from "react";

import PaymentCardInfo from "./payment-card-info";
import { Payment_Card, Purchase } from "@/lib/definitions";

export default function PaymentInfo({ id }: { id: number }) {
  const [cardList, setCardList] = useState<Payment_Card[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPurchaseHistory() {
      try {
        const res = await fetch(`/api/users/user/purchases/${id}`);
        const data = await res.json();
        setPurchaseHistory(data);
      } catch (error) {
        console.error("Failed to fetch Purchase History:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPurchaseHistory();
  }, [id]);

  useEffect(() => {
    async function fetchPaymentCards() {
      try {
        const res = await fetch(`/api/users/user/payment-cards/${id}`);
        const data = await res.json();
        setCardList(data);
      } catch (error) {
        console.error("Failed to fetch Payment Cards:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPaymentCards();
  }, [id]);

  return (
    <div className="flex flex-col space-y-3 h-full overflow-hidden">
      <span className="font-semibold text-black-100 text-[20px]">Payment Info</span>

      {/* Scrollable cards container */}
      <div className="overflow-x-auto border rounded-3xl">
        <PaymentCardInfo list={cardList}/>
      </div>

      <span className="font-semibold text-black-100 text-[18px]">History</span>

      <div className="flex-1 flex flex-col border rounded-xl p-4 overflow-hidden">
        {/* scrollable table wrapper */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto text-left border-separate border-spacing-y-2">
              <thead className="text-[14px]">
                <tr>
                  <th className="min-w-[150px] px-4 py-3">Name</th>
                  <th className="min-w-[100px] px-4 py-3">Type</th>
                  <th className="min-w-[100px] px-4 py-3">Status</th>
                  <th className="min-w-[120px] px-4 py-3">Date</th>
                  <th className="min-w-[160px] px-4 py-3">Payment Method</th>
                  <th className="min-w-[100px] px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
              {purchaseHistory.map((purchase, i) => {
                const card = cardList.find(card => card.id === purchase.payment_card_id);

                return (
                  <tr key={i} className="hover:bg-blue-50 cursor-pointer transition-colors h-14">
                    <td className="min-w-[150px] px-4 py-2 first:rounded-l-2xl">{purchase.name}</td>
                    <td className="min-w-[100px] px-4 py-2">{purchase.type}</td>
                    <td className="min-w-[100px] px-4 py-2">
                      <p className="inline-block py-[3px] px-3 bg-green-200 text-green-100 rounded-2xl">{purchase.status}</p>
                    </td>
                    <td className="min-w-[120px] px-4 py-2">
                      {purchase.date && new Date(purchase.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </td>
                    <td className="min-w-[160px] px-4 py-2">
                      <div className="flex items-center">
                        <RiVisaFill className="mr-2 h-6 w-6" />
                        <span className="text-[14px]">
                          {card && card.card_number ? card.card_number.slice(-4) : '----'}
                        </span>
                      </div>
                    </td>
                    <td className="min-w-[100px] px-4 py-2 last:rounded-r-2xl">{purchase.amount}</td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}