import { Vehicle } from "@/lib/definitions";
import { useState, useEffect } from "react";

export default function Vehicle({ id }: { id: number }) {
  const status = [
    "Active", "Overdue", "Cancelled", "Trialing", "Expired", "Refunded"
  ];

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect (() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(`/api/users/${id}/vehicles`);
        const data = await res.json();
        console.log("Fetched vehicles:", data);
        setVehicles(data);
      } catch (error) {
        console.error("Failed to fetch vehicles: ", error);
      }
    };

    fetchVehicles();
  }, [id]);

  return (
    <div className="flex flex-col space-y-2 h-full overflow-hidden">
      <span className="font-semibold text-black text-[20px]">Vehicle</span>
    </div>
  );
}