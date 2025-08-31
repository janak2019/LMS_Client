import { Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toogleSettingPopup } from '../store/slices/popUpSlice';


const Header = () => {
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
      className={`absolute top-0 right-0 left-0 bg-white w-full shadow-md flex justify-between items-center px-6 py-4 `}
    >
      {/* Left side content */}
    <div>
      <UserIcon className='h-6 w-6' />
      <div className='flex flex-col'>
        {/* <span className='text-sm font-medium sm-text-xl sm:font-semibold'>{user && user.name}</span> */}
        <span className='text-sm font-medium sm-text-xl sm:font-semibold'>Janak Acharya</span>
        {/* <span className='text-sm font-medium sm-text-xl sm:font-semibold'>{user && user.role}</span> */}
        <span className='text-sm font-medium sm-text-xl sm:font-semibold'>Admin</span>
      </div>
    </div>



      {/* Right side content */}
      <div className="hidden md:flex items-center gap-2">
        
        <div className="flex flex-col text-sm lg:text-base items-end font-semibold">
          <span className="font-semibold text-gray-700">{currentTime}</span>
          <span className="text-sm text-gray-500">{currentDate}</span>
        </div>

        {/* Divider - only md+ */}
        <span className="bg-black h-14 w-[2px]" />

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
