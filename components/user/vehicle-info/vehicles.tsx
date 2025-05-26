import { AddModal } from "@/components/add-modal";
import { Subscription, Vehicle } from "@/lib/definitions";
import { RiAddLine, RiArrowLeftLongLine } from "@remixicon/react";
import { useState, useEffect } from "react";
import Subscriptions from "../subscription-info/subscriptions";
import VehicleInfo from "./vehicle";

export default function Vehicles({ id }: { id: number }) {
  const status = [
    "Active", "Overdue", "Cancelled", "Trialing", "Expired", "Refunded"
  ];

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isVehicleSelected, setIsVehiclesSelected] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | undefined>(undefined);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [swapChoice, setSwapChoice] = useState<string>('');

  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);

  const handleAddVehicleClick = () => {
    setShowAddVehicleModal(true);
  };

  const handleAddVehicleCancel = () => {
    setVehicleMake('');
    setVehicleModel('');
    setVehicleYear('');
    setVehicleColor('');
    setVehiclePlate('');
    setSelectedSubscription(undefined);
    setSwapChoice('');
    setShowAddVehicleModal(false);
  };

  const handleAddVehicleConfirm = () => {
    // Use the input state to add a new vehicle
    const newVehicle = {
      make: vehicleMake,
      model: vehicleModel,
      year: vehicleYear,
      color: vehicleColor,
      plate_number: vehiclePlate,
      subscription_id: selectedSubscription?.id || null
    };
    // Do something with newVehicle
    setVehicleMake('');
    setVehicleModel('');
    setVehicleYear('');
    setVehicleColor('');
    setVehiclePlate('');
    setSelectedSubscription(undefined);
    setSwapChoice('');
    setShowAddVehicleModal(false);
  };

  const handleClick = (id: number) => { 
    const selectedVehicle = vehicles.find(v => v.id === id);
    if (selectedVehicle) {
      setVehicle(selectedVehicle);
      setIsVehiclesSelected(true);
    }
  }

  useEffect (() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await fetch(`/api/users/user/${id}/subscriptions`);
        const data = await res.json();
        console.log("Fetched subscriptions:", data);
        setSubscriptions(data);
      } catch (error) {
        console.error("Failed to fetch vehicles: ", error);
      }
    };

    fetchSubscriptions();
  }, [id]);

  useEffect (() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(`/api/users/user/${id}/vehicles`);
        const data = await res.json();
        console.log("Fetched vehicles:", data);
        setVehicles(data);
      } catch (error) {
        console.error("Failed to fetch vehicles: ", error);
      }
    };

    fetchVehicles();
  }, [id]);

  /*
    useEffect (() => {
      if (!isVehicleSelected || vehicleId === 0) return;
      
      const fetchVehicle = async () => {
        try {
          const res = await fetch(`/api/users/${id}/vehicles/${vehicleId}`);
          const data = await res.json();
          console.log("Fetched vehicles:", data);
          setVehicles(data);
        } catch (error) {
          console.error("Failed to fetch vehicles: ", error);
        }
      };

      fetchVehicle();
    }, [vehicleId]);
  */

  return (
    <div className="flex flex-1 flex-col space-y-2 h-full overflow-hidden">
      <span className="font-semibold text-black text-[20px]">
        {isVehicleSelected ? (
          <div className="flex items-center text-[24px] text-black-100 mb-2">
            <button 
                onClick={() => {
                  setIsVehiclesSelected(false);
                }}
                className='bg-yellow-100 mr-2 py-[3px] px-[5px] border border-grey-200 rounded shadow'
              >
                <RiArrowLeftLongLine className='h-4 w-6 text-grey-300'/>
            </button>
            <span className='pl-[4px] text-[18px]'>
              {vehicle?.year + ' ' + vehicle?.make + ' ' + vehicle?.model}
            </span>
            <div className="min-w-[50px] px-4 py-2">
              <p className="py-[3px] px-3 bg-green-200 text-[14px] text-green-100 rounded-2xl">Active</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-between">
            <span className='pl-[4px] text-[22px]'>
              Vehicles
            </span>
            <button
              onClick={handleAddVehicleClick}
              className="flex flex-row text-grey-300 text-[12px] mr-2 gap-1 py-1 px-2 border border-grey-200 hover:text-blue-100 hover:border-blue-100 rounded-2xl items-center"
            >
              Add
              <RiAddLine className="w-[14px] h-[14px]"/>
            </button>
          </div>
        )}
      </span>
      {isVehicleSelected ? (
        <div className="flex flex-col flex-1 overflow-y-auto">
          <VehicleInfo vehicleInfo={vehicle} vehicles={vehicles}/>
        </div>
      ) : (
        <div className="flex-1 flex flex-col border rounded-xl p-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="w-full overflow-x-auto">
              <table className="w-full table-auto text-left border-separate border-spacing-y-2">
                <thead className="text-[14px]">
                  <tr>
                    <th className="min-w-[140px] min-w-[100px] px-4 py-3">Make/Model</th>
                    <th className="min-w-[80px] px-4 py-3">Color</th>
                    <th className="min-w-[60px] px-4 py-3">Year</th>
                    <th className="min-w-[100px] px-4 py-3">Plate No.</th>
                    <th className="min-w-[140px] px-4 py-3">Plan</th>
                    <th className="min-w-[100px] px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[14px]">
                  {vehicles.map((vehicle, i) => (
                    <tr
                      key={i}
                      className="hover:bg-blue-50 cursor-pointer transition-colors h-14"
                      onClick={() => handleClick(vehicle.id)}
                    >
                      <td className="min-w-[140px] px-4 py-2 first:rounded-l-2xl">{vehicle.make + ' ' + vehicle.model}</td>
                      <td className="min-w-[80px] px-4 py-2">{vehicle.color}</td>
                      <td className="min-w-[60px] px-4 py-2">{vehicle.year}</td>
                      <td className="min-w-[100px] px-4 py-2">{vehicle.plate_number}</td>
                      <td className="min-w-[140px] px-4 py-2">{vehicle.subscription_name}</td>
                      <td className="min-w-[100px] px-4 py-2">
                        <p className="inline-block py-[3px] px-3 bg-green-200 text-green-100 rounded-2xl">{vehicle.subscription_status}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {showAddVehicleModal && (
        <AddModal>
          <h2 className="text-lg font-semibold mb-4">Add Vehicle</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Make */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
              <input
                type="text"
                value={vehicleMake}
                onChange={(e) => setVehicleMake(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input
                type="text"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="number"
                value={vehicleYear}
                onChange={(e) => setVehicleYear(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input
                type="text"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Plate Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plate Number</label>
              <input
                type="text"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Subscription Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subscription</label>
              <select
                value={selectedSubscription?.id || ''}
                onChange={(e) => {
                  const selectedId = Number(e.target.value);
                  const subscription = subscriptions.find(s => s.id === selectedId);
                  setSelectedSubscription(subscription);
                }}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Subscription</option>
                {subscriptions.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.plan_type} - {sub.frequency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {selectedSubscription && (
            <>
              <label className="block text-sm text-gray-600 mb-2">
                This subscription already has a vehicle. Would you like to swap it with this one?
                <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center space-x-6 mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="swap-subscription"
                    value="yes"
                    checked={swapChoice === 'yes'}
                    onChange={() => setSwapChoice('yes')}
                    className="form-radio text-blue-100"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="swap-subscription"
                    value="no"
                    checked={swapChoice === 'no'}
                    onChange={() => setSwapChoice('no')}
                    className="form-radio text-blue-100"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </>
          )}
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleAddVehicleCancel}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleAddVehicleConfirm}
              className="px-4 py-2 rounded-md bg-blue-100 text-white hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </AddModal>
      )}
    </div>
  );
}