'use client';
import { use, useEffect, useState } from "react";
import { User } from "@/lib/definitions";

import UserNav from "@/components/navigation/user-nav";
import UserInfo from "@/components/user/user-info";
import PaymentInfo from "@/components/user/payment-info/payment-info";
import Subscriptions from "@/components/user/subscription-info/subscriptions";
import Vehicles from "@/components/user/vehicle-info/vehicles";

const buttons = ["Customer Info", "Payment Info", "Subscriptions", "Vehicles"];

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState("Customer Info");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/users/user/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const buttonClass = (button: string) =>
    button === selectedButton
      ? "flex whitespace-nowrap text-blue-100 bg-blue-50 py-2 px-3 rounded-3xl"
      : "flex whitespace-nowrap text-black-100 py-2 px-3 rounded-3xl";

      if (loading) return <div className="p-10">Loading...</div>;
      if (!user) return <div className="p-10">User not found.</div>;
    
      return (
        <div className="flex flex-col h-screen">
    
          {/* Pass openSidebar as onMenuClick */}
          <UserNav name={user.first_name + " " + user.last_name} onMenuClick={toggleSidebar} />
    
          {/* Remove old small screen hamburger menu button here */}
    
          {/* Main container */}
          <div className="flex flex-row flex-1 mx-2 mb-2 rounded-xl bg-yellow-100 border shadow overflow-hidden relative">
    
            {/* Sidebar */}
            <div
              className={`
                desktop-large:block w-[220px] p-10 space-y-6 flex flex-col items-start
                ${sidebarOpen ? 'absolute top-0 left-0 bottom-0 bg-yellow-100 z-50 shadow-lg' : 'hidden'}
                desktop-large:relative desktop-large:translate-x-0 desktop-large:flex
                transition-transform duration-300 ease-in-out
              `}
              style={sidebarOpen ? { width: "220px" } : {}}
            >
              {/* Close button */}
              <button
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
                className="mb-6 font-bold text-black desktop-large:hidden self-end"
              >
                &times;
              </button>
    
              {buttons.map((button) => (
                <button
                  key={button}
                  onClick={() => {
                    setSelectedButton(button);
                    setSidebarOpen(false);
                  }}
                  className={buttonClass(button)}
                >
                  {button}
                </button>
              ))}
            </div>
    
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-10">
              {selectedButton === "Customer Info" && <UserInfo userInfo={user} />}
              {selectedButton === "Payment Info" && <PaymentInfo id={id} />}
              {selectedButton === "Subscriptions" && <Subscriptions id={id} />}
              {selectedButton === "Vehicles" && <Vehicles id={id} />}
            </div>
    
            {/* Overlay */}
            {sidebarOpen && (
              <div
                className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 z-40 desktop-large:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </div>
        </div>
      );
    }