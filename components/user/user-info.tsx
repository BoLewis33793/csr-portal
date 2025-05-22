import { RiEdit2Line } from "@remixicon/react";

export default function UserInfo() {
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

  const personal_info_labels = [
    { label: "First Name", value: user.first_name },
    { label: "Last Name", value: user.last_name },
    { label: "Email Address", value: user.email },
    { label: "Phone Number", value: user.phone_number },
    { label: "Date of Birth", value: user.date_of_birth },
    { label: "Gender", value: user.gender }
  ];

  const address_labels = [
    { label: "Street Address", value: user.address.street_address },
    { label: "City", value: user.address.city },
    { label: "State", value: user.address.state },
    { label: "Postal Code", value: user.address.postal_code },
    { label: "Country", value: user.address.country },
  ];

  return (
    <div className="flex-1 flex flex-col m-10 space-y-6">
      <span className="font-semibold text-black-100 text-[20px]">Customer Info</span>
      <div className="flex-1 flex flex-col space-y-6">
        <div className="flex flex-col h-1/2 border rounded-xl p-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-black-100 font-semibold">Personal Information</span>
            <button className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center">
              Edit
              <RiEdit2Line className="w-[16px] h-[16px]"/>
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-y-4 gap-x-6">
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
        <div className="flex flex-col h-1/2 border rounded-xl p-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-black-100 font-semibold">Address</span>
            <button className="flex flex-row text-grey-300 text-[14px] gap-1 py-1 px-2 border border-grey-200 rounded-2xl items-center">
              Edit
              <RiEdit2Line className="w-[16px] h-[16px]"/>
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-y-4 gap-x-6">
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