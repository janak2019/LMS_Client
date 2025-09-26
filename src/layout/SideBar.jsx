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
import {LayoutDashboard, Users, BookOpen, ClipboardList,Book, ShieldUser } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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



  return (
    <>
     

<aside
  className={`${isSideBarOpen ? "w-64" : "w-20"} 
    z-10 transition-all duration-300 md:relative md:left-0 
    flex bg-black text-white flex-col h-full`}
  style={{ position: "fixed" }}
>
  {/* Logo + Collapse Toggle */}
  <div className="px-4 py-4 flex justify-between items-center border-b border-gray-700">
    <img
      src={logo}
      alt="logo"
      className={`${isSideBarOpen ? "w-32" : "w-10"} transition-all duration-300`}
    />
    {/* Collapse Button */}
    <button
      className="hidden md:flex items-center justify-center p-1 rounded hover:bg-gray-700"
      onClick={() => setIsSideBarOpen(!isSideBarOpen)}
    >
      {isSideBarOpen ? (
        <ChevronLeft className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </button>
  </div>

  {/* Navigation */}
  <nav className="flex-1 px-2 py-6 space-y-2">
    {[
      { name: "Dashboard", icon: <LayoutDashboard className="h-6 w-6" />, action: () => setSelectedComponent("Dashboard") },
      { name: "Books", icon: <Book className="h-6 w-6" />, action: () => setSelectedComponent("Books") },
      ...(isAuthenticated && user?.role === "Admin"
        ? [
            { name: "Catalog", icon: <ListBulletIcon className="h-6 w-6" />, action: () => setSelectedComponent("Catalog") },
            { name: "Users", icon: <Users className="h-6 w-6" />, action: () => setSelectedComponent("Users") },
            { name: "Add New Admin", icon: <ShieldUser className="h-6 w-6" />, action: () => dispatch(toogleAddNewAdminPopup()) },
          ]
        : []),
      { name: "My Borrowed Books", icon: <BookOpenIcon className="h-6 w-6" />, action: () => setSelectedComponent("MyBorrowedBooks") },
      { name: "Update Credentials", icon: <Cog6ToothIcon className="h-6 w-6" />, action: () => dispatch(toogleSettingPopup()) },
    ].map((item, idx) => (
      <button
        key={idx}
        className="w-full flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-gray-800"
        onClick={item.action}
      >
        {item.icon}
        {isSideBarOpen && <span>{item.name}</span>}
      </button>
    ))}
  </nav>

  {/* Logout */}
  <div className="px-4 py-4 border-t border-gray-700">
    <button
      className="w-full flex items-center justify-center space-x-3 py-2 rounded-md hover:bg-gray-800"
      onClick={handleLogout}
    >
      <ArrowRightOnRectangleIcon className="h-6 w-6" />
      {isSideBarOpen && <span>Log Out</span>}
    </button>
  </div>

  {/* Mobile Close Button */}
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
