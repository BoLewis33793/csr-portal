'use client';
import { use, useEffect, useState } from "react";
import { User } from "@/lib/definitions";

import UserNav from "@/components/navigation/user-nav";
import UserInfo from "@/components/user/user-info";
import PaymentInfo from "@/components/user/payment-info";
import Subscriptions from "@/components/user/subscriptions";
import Vehicles from "@/components/user/vehicles";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState("Customer Info");

  const buttons = ["Customer Info", "Payment Info", "Subscriptions", "Vehicles"];

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/user/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  const buttonClass = (button: string) =>
    button === selectedButton
      ? "flex whitespace-nowrap text-blue-100 bg-blue-50 py-2 px-3 rounded-3xl"
      : "flex whitespace-nowrap text-black-100 py-2 px-3 rounded-3xl";

  if (loading) return <div className="p-10">Loading...</div>;
  if (!user) return <div className="p-10">User not found.</div>;

  return (
    <div className="flex flex-col h-screen">
      <UserNav />
      <div className="flex flex-col desktop-large:flex-row flex-1 mx-2 mb-2 rounded-xl bg-yellow-100 border shadow overflow-hidden">
        <div className="flex flex-row desktop-large:flex-col w-[220px] items-start px-10 py-6 desktop-large:pt-12 desktop-large:pl-10 space-x-6 desktop-large:space-x-0 desktop-large:space-y-6">
          {buttons.map((button) => (
            <button
              key={button}
              onClick={() => setSelectedButton(button)}
              className={buttonClass(button)}
            >
              {button}
            </button>
          ))}
        </div>
        <div className="hidden desktop-large:block w-px mt-12 mb-10 bg-gray-200" />
        <div className="flex-1 overflow-y-auto pb-10 px-10 desktop-large:p-10">
          {selectedButton === "Customer Info" && <UserInfo user={user} />}
          {selectedButton === "Payment Info" && <PaymentInfo />}
          {selectedButton === "Subscriptions" && <Subscriptions />}
          {selectedButton === "Vehicles" && <Vehicles />}
        </div>
      </div>
    </div>
  );
}
