'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserField } from 'lib/definitions';
import { useEffect, useState } from 'react';
import { RiEdit2Line, RiSaveLine } from "@remixicon/react";
import { personalInfoSchema, addressSchema } from "lib/userSchema";
import type { z } from "zod";

type PersonalInfo = z.infer<typeof personalInfoSchema>;
type AddressInfo = z.infer<typeof addressSchema>;

export default function UserInfo({ userInfo }: { userInfo: User | undefined }) {
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingAddressInfo, setIsEditingAddressInfo] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    formState: { errors: personalErrors },
    reset: resetPersonal,
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
  });

  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    formState: { errors: addressErrors },
    reset: resetAddress,
  } = useForm<AddressInfo>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmitPersonal = async (data: PersonalInfo) => {
    try {
      const res = await fetch(`/api/users/user/${user?.id}/personal-info/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Failed to update personal info:', errorData.message || res.statusText);
      } else {
        console.log('Personal info updated successfully');
        setIsEditingPersonalInfo(false);
        await fetchAndSetUser(); // refresh form with updated data
      }
    } catch (error) {
      console.error('Network error while updating personal info:', error);
    }
  };

  const onSubmitAddress = async (data: AddressInfo) => {
    try {
      const res = await fetch(`/api/users/user/${user?.id}/address/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Failed to update address info:', errorData.message || res.statusText);
      } else {
        console.log('Address info updated successfully');
        setIsEditingAddressInfo(false);
        await fetchAndSetUser(); // refresh form with updated data
      }
    } catch (error) {
      console.error('Network error while updating address info:', error);
    }
  };

  const onError = (errors: any) => {
    console.error("Validation errors:", errors);
  };

  async function fetchAndSetUser() {
    if (!userInfo?.id) return;
    try {
      const res = await fetch(`/api/users/user/${userInfo.id}`);
      const data = await res.json();
      setUser(data);
  
      // Format date_of_birth to YYYY-MM-DD for input[type="date"]
      const formattedDOB = data.date_of_birth
        ? new Date(data.date_of_birth).toISOString().split('T')[0]
        : '';
  
      resetPersonal({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        date_of_birth: formattedDOB,
        gender: data.gender,
      });
  
      resetAddress({
        street_address: data.street_address,
        city: data.city,
        state: data.state,
        postal_code: data.postal_code,
        country: data.country,
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }
  

  useEffect(() => {
    fetchAndSetUser();
  }, [userInfo?.id]);

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
                <button type="submit" className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center">
                  Save
                  <RiSaveLine className="w-[16px] h-[16px]" />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (isEditingPersonalInfo) {
                    resetPersonal(); // revert changes if cancelling
                  }
                  setIsEditingPersonalInfo(prev => !prev);
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
              { label: 'Email Address', name: 'email', colSpan: 'col-span-2 md:col-span-1' },
              { label: 'Phone Number', name: 'phone_number' },
              { label: 'Date of Birth', name: 'date_of_birth', type: 'date' },
              { label: 'Gender', name: 'gender' },
            ].map(({ label, name, type = 'text', colSpan }) => (
              <div key={name} className={colSpan}>
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
                      ? user?.[name] ? new Date(user[name] as string).toLocaleDateString('en-US') : ''
                      : user?.[name as keyof UserField]}
                  </p>
                )}
                {personalErrors[name as keyof PersonalInfo] && (
                  <p className="text-red-500 text-sm">{personalErrors[name as keyof PersonalInfo]?.message as string}</p>
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
                <button type="submit" className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center">
                  Save
                  <RiSaveLine className="w-[16px] h-[16px]" />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (isEditingAddressInfo) {
                    resetAddress(); // revert changes if cancelling
                  }
                  setIsEditingAddressInfo(prev => !prev);
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
                  <p className="pt-1">{user?.[name as keyof UserField]}</p>
                )}
                {addressErrors[name as keyof AddressInfo] && (
                  <p className="text-red-500 text-sm">{addressErrors[name as keyof AddressInfo]?.message as string}</p>
                )}
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}