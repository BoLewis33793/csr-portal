'use client';
import { useState } from "react";

export default function UserInfoNav() {
  const [selectedButton, setSelectedButton] = useState("Customer Info");

  const buttons = ["Customer Info", "Payment Info", "Subscriptions", "Vehicles"];

  const buttonClass = (button: string) =>
    button === selectedButton
      ? "flex whitespace-nowrap text-blue-100 bg-blue-50 py-2 px-3 rounded-3xl"
      : "flex whitespace-nowrap text-black-100 py-2 px-3 rounded-3xl";

  return (
    <div className="flex flex-col w-[220px] items-start p-10 space-y-6">
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
  );
}