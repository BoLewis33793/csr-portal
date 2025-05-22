'use client';
import { useState } from "react";
import Search from "../search";

export default function UsersListNav() {
  const [selected, setSelected] = useState("All");

  const buttons = ['All', 'Active', 'Overdue', 'Cancelled'];

  const handleClick = (label: string) => {
    if (label === selected) {
      // Deselecting current non-"All" filter reverts to "All"
      setSelected("All");
    } else {
      setSelected(label);
    }
  };

  return (
    <div className="h-[48px] px-4 flex items-center justify-between">
      <Search placeholder="Search user..." />
      
      <div className="flex space-x-2">
        {buttons.map((label) => (
          <button
            key={label}
            onClick={() => handleClick(label)}
            className={`px-3 py-1 text-sm font-medium rounded border transition-colors ${
              selected === label
                ? 'bg-blue-100 text-white shadow'
                : 'bg-yellow-100 text-black-100 hover:text-yellow-100 hover:bg-blue-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
