import { Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toogleSettingPopup } from '../store/slices/popUpSlice';


const Header = ({ sidebarWidth = "md:left-64" }) => {
  const dispatch = useDispatch();
   const { error, message, user, isAuthenticated } = useSelector((state) => state.auth);
  

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      const options = { month: "short", day: "numeric", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 ${sidebarWidth} bg-white shadow-md flex justify-end items-center px-6 py-4 z-40 transition-all duration-300`}
    >
      {/* Right side content */}
      <div className="flex items-center gap-6">
        {/* Date / Time - only visible on md+ */}
        <div className="hidden md:flex flex-col text-right">
          <span className="font-semibold text-gray-700">{currentTime}</span>
          <span className="text-sm text-gray-500">{currentDate}</span>
        </div>

        {/* Divider - only md+ */}
        <span className="hidden md:block h-10 w-[1px] bg-gray-300" />

        {/* User Info */}
        {isAuthenticated && user ? (
  <div className="flex items-center gap-3">
    <UserIcon className="w-7 h-7 text-yellow-500" />
    <div className="flex flex-col leading-tight">
      <span className="text-base font-semibold">
        {user.name}
      </span>
      <span className="text-sm text-gray-500">
        {user.role}
      </span>
    </div>
  </div>
) : (
  <span className="text-gray-400 text-sm">Not logged in</span>
)}


        {/* Settings */}
        <button
          onClick={() => dispatch(toogleSettingPopup())}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Cog6ToothIcon className="w-7 h-7 text-indigo-500 hover:text-indigo-700" />
        </button>
      </div>
    </header>
  );
};

export default Header;
