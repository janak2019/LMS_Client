import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';
import placeholder from '../assets/avatar-placeholder.png'; // fallback avatar
import { BookOpenIcon, UserIcon, Cog6ToothIcon, Squares2X2Icon, ListBulletIcon, ArrowRightOnRectangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { RiAdminFill } from 'react-icons/ri';
import { toogleAddNewAdminPopup, toogleSettingPopup } from '../store/slices/popUpSlice.js';
import { logout, resetAuthSlice } from "../store/slices/authSlice.js";
import SettingPopup from '../popup/SettingPopup';
import AddNewAdmin from '../popup/AddNewAdmin';

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const { addNewAdminPopup, settingPopup } = useSelector((state) => state.popup);
  const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Optionally: dispatch an action to update avatar in backend here
      // dispatch(updateAvatar(file));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message]);

  // Reusable nav button
  const NavButton = ({ onClick, Icon, label, hoverColor, iconColor }) => (
    <button
      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transform transition-all duration-300 hover:scale-105 ${hoverColor}`}
      onClick={onClick}
    >
      <Icon className={`w-6 h-6 ${iconColor}`} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <>
      <aside
        className={`${isSideBarOpen ? "left-0" : "-left-full"} z-10 transition-all duration-700 md:relative md:left-0 flex w-auto bg-black text-white flex-col h-full`}
        style={{ position: "fixed" }}
      >
        {/* Logo */}
        <div className="px-6 py-4 flex justify-center items-center border-b border-gray-700">
          <img src={logo} width={180} alt="logo" className="rounded-lg" />
        </div>



        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 ">
          <button
            className='w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2' onClick={() => setSelectedComponent("Dashboard")}>
            <Squares2X2Icon className='h-5 w-5' />
            <span>Dashboard</span>
          </button>

          <button
            className='w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2' onClick={() => setSelectedComponent("Dashboard")}>
            <BookOpenIcon className='h-5 w-5' />
            <span>Books</span>
          </button>

          {isAuthenticated && user?.role === "Admin" && (
            <>
              <button
                className='w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2' onClick={() => setSelectedComponent("Catalog")}>
                <ListBulletIcon className='h-5 w-5' />
                <span>Catalog</span>
              </button>
              <button
                className='w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2' onClick={() => setSelectedComponent("Users")}>
                <UserIcon className='h-5 w-5' />
                <span>Users</span>
              </button>
              <button
                className='w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2' 
                onClick={() => dispatch(toogleAddNewAdminPopup())}
                >
                <RiAdminFill className='h-5 w-5' />
                <span>Add New Admin</span>
              </button>
            </>
          )}

          {isAuthenticated && user?.role === "User" && (
            
            <>
            <button
                className='w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2' onClick={() => setSelectedComponent("My Borrowed Books")}>
                <BookOpenIcon className='h-5 w-5' />
                <span>My Borrowed Books</span>
              </button>
            </>
            
           )}

          <button
            className='w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2' onClick={() =>dispatch(toogleSettingPopup())}>
            <Cog6ToothIcon className='h-5 w-5' />
            <span>Update Credentials</span>
          </button>
        </nav>

        {/* Logout */}
        <div className="px-6 py-4 ">
          <button
            className="py-2 font-medium text-center bg-transparent rounded-md hover:cursor-pointer flex items-center justify-center space-x-5 mx-auto"
            onClick={handleLogout}
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>

        <XMarkIcon
          className="h-6 w-6 absolute top-0 right-4 mt-4 block md:hidden cursor-pointer"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        />
      </aside>

      {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup && <SettingPopup />}
    </>
  );
};

export default SideBar;
