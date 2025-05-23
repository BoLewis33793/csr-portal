import { RiEdit2Line } from "@remixicon/react";
import { User } from 'lib/definitions';

type UserInfoProps = {
  user: User;
};

export default function UserInfo({ user }: UserInfoProps) {

  console.log('User Info: ', user);

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
          <div className="flex justify-between">
            <span className="text-black-100 font-semibold">Personal Information</span>
            <button className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center">
              Edit
              <RiEdit2Line className="w-[16px] h-[16px]"/>
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-y-6 gap-x-6">
            {personal_info_labels.map((item) => (
              <div key={item.label}>
                <p className="text-[14px] text-grey-300">{item.label}</p>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        <div>
      </div>
        </div>
        <div className="flex flex-col flex-1 border rounded-xl p-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-black-100 font-semibold">Address</span>
            <button className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center">
              Edit
              <RiEdit2Line className="w-[16px] h-[16px]"/>
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-y-6 gap-x-6">
            {address_labels.map((item) => (
              <div key={item.label}>
                <p className="text-[14px] text-grey-300">{item.label}</p>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}