'use client';
import { useState } from "react";

import UserNav from "@/components/navigation/user-nav";
import UserInfo from "@/components/user/user-info";
import PaymentInfo from "@/components/user/payment-info";
import Subscriptions from "@/components/user/subscriptions";
import PaymentHistory from "@/components/user/payment-history";
import Vehicles from "@/components/user/vehicles";

import UsersList from "@/components/user/users-list";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const user = {
    first_name: "Bo",
    last_name: "Lewis",
    phone_number: "(770) 530-4152",
    email: "bo.lewis3434@gmail.com",
    status: "Overdue",
    membership: "Monthly",
    vehicles: 3,
    last_wash: "09-24-2024",
    date_of_birth: "06/11/2001",
    gender: "Male",
    address: {
      street_address: "135 Brights Way",
      city: "Dawsonville",
      state: "Georgia",
      postal_code: "30534",
      country: "United States"
    },
  };

  const [selectedButton, setSelectedButton] = useState("Customer Info");

  const buttons = ["Customer Info", "Payment Info", "Subscriptions", "Payment History", "Vehicles"];

  const buttonClass = (button: string) =>
    button === selectedButton
      ? "text-blue-100 bg-blue-300 py-2 px-3 rounded-3xl"
      : "text-black-100 py-2 px-3 rounded-3xl";

  return (
    <div className="flex flex-col h-screen">
      <UserNav />
      <div className="flex flex-row flex-1 m-2 rounded-xl bg-yellow-100 border shadow">
        <div className="flex flex-col w-[220px] items-start pt-12 pl-10 space-y-6">
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
        <div className="w-px mt-12 mb-10 bg-gray-200" />
        {selectedButton === "Customer Info" && <UserInfo />}
        {selectedButton === "Payment Info" && <PaymentInfo />}
        {selectedButton === "Subscriptions" && <Subscriptions />}
        {selectedButton === "Payment History" && <UsersList />}
        {selectedButton === "Vehicles" && <Vehicles />}
      </div>
    </div>
  );
}