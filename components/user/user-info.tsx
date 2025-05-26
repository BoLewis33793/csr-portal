'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserField } from 'lib/definitions';
import { useState } from 'react';
import { RiEdit2Line, RiSaveLine } from "@remixicon/react";
import { personalInfoSchema, addressSchema } from "lib/userSchema";
import type { z } from "zod";

type UserInfoProps = {
  user: UserField;
};

type PersonalInfo = z.infer<typeof personalInfoSchema>;
type AddressInfo = z.infer<typeof addressSchema>;

export default function UserInfo({ user }: UserInfoProps) {
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingAddressInfo, setIsEditingAddressInfo] = useState(false);

  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    formState: { errors: personalErrors },
    reset: resetPersonal,
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      date_of_birth: user.date_of_birth,
      gender: user.gender,
    },
  });

  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    formState: { errors: addressErrors },
    reset: resetAddress,
  } = useForm<AddressInfo>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street_address: user.street_address,
      city: user.city,
      state: user.state,
      postal_code: user.postal_code,
      country: user.country,
    },
  });

  const onSubmitPersonal = (data: PersonalInfo) => {
    console.log("Valid Personal Info", data);
    setIsEditingPersonalInfo(false);
  };

  const onSubmitAddress = (data: AddressInfo) => {
    console.log("Valid Address Info", data);
    setIsEditingAddressInfo(false);
  };

  const onError = (errors: any) => {
    console.error("Validation errors:", errors);
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      <span className="font-semibold text-black-100 text-[20px]">Customer Info</span>
      <div className="flex-1 flex flex-col space-y-6">
        {/* Personal Info */}
        <form onSubmit={handleSubmitPersonal(onSubmitPersonal, onError)} className="flex flex-col flex-1 border rounded-xl p-6 space-y-2">
          <div className="flex justify-between pb-2">
            <span className="text-black-100 font-semibold">Personal Information</span>
            <div className="flex flex-row space-x-2">
              {isEditingPersonalInfo && (
                <button
                  type="submit"
                  className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
                >
                  Save
                  <RiSaveLine className="w-[16px] h-[16px]" />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsEditingPersonalInfo(prev => !prev);
                  resetPersonal();
                }}
                className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
              >
                {isEditingPersonalInfo ? 'Cancel' : 'Edit'}
                <RiEdit2Line className="w-[16px] h-[16px]" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-6 gap-x-6">
            {[
              { label: 'First Name', name: 'first_name' },
              { label: 'Last Name', name: 'last_name' },
              { label: 'Email Address', name: 'email' },
              { label: 'Phone Number', name: 'phone_number' },
              { label: 'Date of Birth', name: 'date_of_birth', type: 'date' },
              { label: 'Gender', name: 'gender' },
            ].map(({ label, name, type = 'text' }) => (
              <div key={name}>
                <label className="text-[14px] text-grey-300">{label}</label>
                {isEditingPersonalInfo ? (
                  <input
                    type={type}
                    {...registerPersonal(name as keyof PersonalInfo)}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <p className="pt-1">
                    {name === 'date_of_birth'
                      ? new Date(user[name as keyof UserField] as string).toLocaleDateString('en-US')
                      : user[name as keyof UserField]}
                  </p>
                )}
                {personalErrors[name as keyof PersonalInfo] && (
                  <p className="text-red-500 text-sm">
                    {personalErrors[name as keyof PersonalInfo]?.message as string}
                  </p>
                )}
              </div>
            ))}
          </div>
        </form>

        {/* Address Info */}
        <form onSubmit={handleSubmitAddress(onSubmitAddress, onError)} className="flex flex-col flex-1 border rounded-xl p-6 space-y-2">
          <div className="flex justify-between pb-2">
            <span className="text-black-100 font-semibold">Address</span>
            <div className="flex flex-row space-x-2">
              {isEditingAddressInfo && (
                <button
                  type="submit"
                  className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
                >
                  Save
                  <RiSaveLine className="w-[16px] h-[16px]" />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsEditingAddressInfo(prev => !prev);
                  resetAddress();
                }}
                className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center"
              >
                {isEditingAddressInfo ? 'Cancel' : 'Edit'}
                <RiEdit2Line className="w-[16px] h-[16px]" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-6 gap-x-6">
            {[
              { label: 'Street Address', name: 'street_address' },
              { label: 'City', name: 'city' },
              { label: 'State', name: 'state' },
              { label: 'Postal Code', name: 'postal_code' },
              { label: 'Country', name: 'country' },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="text-[14px] text-grey-300">{label}</label>
                {isEditingAddressInfo ? (
                  <input
                    {...registerAddress(name as keyof AddressInfo)}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <p className="pt-1">{user[name as keyof UserField]}</p>
                )}
                {addressErrors[name as keyof AddressInfo] && (
                  <p className="text-red-500 text-sm">
                    {addressErrors[name as keyof AddressInfo]?.message as string}
                  </p>
                )}
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}