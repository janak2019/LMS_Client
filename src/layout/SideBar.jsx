import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png'
import { FaBook, FaUser } from 'react-icons/fa'
import { BookOpenIcon, UserIcon, ChartBarIcon, Cog6ToothIcon, Squares2X2Icon, LockClosedIcon, XMarkIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { RiAdminFill } from 'react-icons/ri';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { toogleAddNewAdminPopup, toogleSettingPopup } from '../store/slices/popUpSlice.js';

import {logout, resetAuthSlice} from "../store/slices/authSlice.js"
import AddNewAdmin from '../popup/AddNewAdmin';



const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {

  const dispatch = useDispatch();
  const { addNewAdminPopup } = useSelector((state) => state.popup);
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const handleLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message)      
      dispatch(resetAuthSlice())
    }
  }, [dispatch, isAuthenticated, error, loading, message])

  

  return (
    <>
    
      <aside className={`${isSideBarOpen ? "left-0" : "-left-full"} z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black text-white flex-col h-full`}
        style={{ position: "fixed" }}>
        {/* Logo */}
        <div className="px-6 py-6 flex justify-center items-center border-b border-gray-700">
          <img src={logo} width={180} alt="logo" className="rounded-lg" />
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
          {/* Dashboard */}
          <button
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-green-700 hover:scale-105 transform transition-all duration-300"
            onClick={() => setSelectedComponent("Dashboard")}
          >
            <Squares2X2Icon className="w-6 h-6 text-green-400" />
            <span className="font-medium">Dashboard</span>
          </button>

          {/* Books */}
          <button
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-300"
            onClick={() => setSelectedComponent("Books")}
          >
            <BookOpenIcon className="w-5 h-5 text-blue-400" />
            <span className="font-medium">Books</span>
          </button>
          {/* Admin Section */}
          {/* {isAuthenticated && user?.role === "Admin" && (
            <> */}
              <button
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-purple-700 hover:scale-105 transform transition-all duration-300"
                onClick={() => setSelectedComponent("Catalog")}
              >
                <ListBulletIcon className="w-6 h-6 text-purple-400" />
                <span className="font-medium">Catalog</span>
              </button>

              <button
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-yellow-700 hover:scale-105 transform transition-all duration-300"
                onClick={() => setSelectedComponent("Users")}
              >
                <UserIcon className="w-6 h-6 text-yellow-400" />
                <span className="font-medium">Users</span>
              </button>

              <button
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-red-700 hover:scale-105 transform transition-all duration-300"
                onClick={() => dispatch(toogleAddNewAdminPopup())}
              >
                <RiAdminFill className="w-6 h-6 text-red-400" />
                <span className="font-medium">Add New Admin</span>
              </button>
            {/* </> */}
          {/* )} */}
          {/* User Section */}
          {/* {isAuthenticated && user?.role === "User" && ( */}
            <button
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transform transition-all duration-300"
              onClick={() => setSelectedComponent("MyBorrowedBooks")}
            >
              <Cog6ToothIcon className="w-6 h-6 text-indigo-400" />
              <span className="font-medium">My Borrowed Books</span>
            </button>
          {/* )} */}
          {/* Update Credentials */}
          <button
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transform transition-all duration-300"
            onClick={() => dispatch(toogleSettingPopup())}
          >
            <Cog6ToothIcon className="w-6 h-6 text-indigo-400" />
            <span className="font-medium">Update Credentials</span>
          </button>
        </nav>

        {/* Logout */}
        <div className="px-6 py-4 border-t border-gray-700">
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-all duration-300" onClick={handleLogout}>
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
        <XMarkIcon className="h-6 w-6 absolute top-0 right-4 mt-4 block md:hidden" onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
      </aside>

      {addNewAdminPopup && <AddNewAdmin />}
    </>
  )

}

export default SideBar