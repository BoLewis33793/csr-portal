'use client';
import { RiEdit2Line, RiSaveLine } from "@remixicon/react";
import { User } from 'lib/definitions';
import { useState } from "react";

type UserInfoProps = {
  user: User;
};

export default function UserInfo({ user }: UserInfoProps) {
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const toggleEditPersonalInfo = () => setIsEditingPersonalInfo(prev => !prev);

  const [isEditingAddressInfo, setIsEditingAddressInfo] = useState(false);
  const toggleEditAddressInfo = () => setIsEditingAddressInfo(prev => !prev);

  const handleChange = () => {};

  const personal_info_labels = [
    { label: "First Name", value: user.first_name },
    { label: "Last Name", value: user.last_name },
    { label: "Email Address", value: user.email },
    { label: "Phone Number", value: user.phone_number },
    { label: "Date of Birth", value: user.date_of_birth },
    { label: "Gender", value: user.gender }
  ];

  const address_labels = [
    { label: "Street Address", value: user.street_address },
    { label: "City", value: user.city },
    { label: "State", value: user.state },
    { label: "Postal Code", value: user.postal_code },
    { label: "Country", value: user.country },
  ];

  return (
    <div className="flex flex-col h-full space-y-3">
      <span className="font-semibold text-black-100 text-[20px]">Customer Info</span>
      <div className="flex-1 flex flex-col space-y-6">
        <div className="flex flex-col flex-1 border rounded-xl p-6 space-y-2">
          <div className="flex justify-between pb-2">
            <span className="text-black-100 font-semibold">Personal Information</span>
            <div className="flex flex-row space-x-2">
              {isEditingPersonalInfo && 
                <button 
                  onClick={toggleEditPersonalInfo}
                  className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
                >
                  Save
                  <RiSaveLine className="w-[16px] h-[16px]"/>
                </button>
              }
              <button 
                onClick={toggleEditPersonalInfo}
                className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
              >

                {isEditingPersonalInfo ? 'Cancel' : 'Edit'}
                <RiEdit2Line className="w-[16px] h-[16px]"/>
              </button>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-y-6 gap-x-6">
            {personal_info_labels.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[14px] text-grey-300">{label}</p>
                {isEditingPersonalInfo ? (
                  <input
                    defaultValue={value}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <p className="pt-1">
                    {value === "date_of_birth"
                      ? new Date(value).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })
                      : value}
                  </p>
                )}
              </div>
            ))}
          </div>
        <div>
      </div>
        </div>
        <div className="flex flex-col flex-1 border rounded-xl p-6 space-y-2">
          <div className="flex justify-between pb-2">
            <span className="text-black-100 font-semibold">Address</span>
            <div className="flex flex-row space-x-2">
              {isEditingAddressInfo && 
                <button 
                  onClick={toggleEditAddressInfo}
                  className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
                >
                  Save
                  <RiSaveLine className="w-[16px] h-[16px]"/>
                </button>
              }
              <button 
                onClick={toggleEditAddressInfo}
                className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
              >

                {isEditingAddressInfo ? 'Cancel' : 'Edit'}
                <RiEdit2Line className="w-[16px] h-[16px]"/>
              </button>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-y-6 gap-x-6">
            {address_labels.map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[14px] text-grey-300">{label}</p>
                  {isEditingAddressInfo ? (
                    <input
                      defaultValue={value}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <p className="pt-1">
                      {value === "date_of_birth"
                        ? new Date(value).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                        : value}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}