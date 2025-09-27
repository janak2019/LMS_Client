import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi"; // from react-icons
import SideBar from '../layout/SideBar'
import UserDashboard from '../components/UserDashboard'
import AdminDashboard from '../components/AdminDashboard'
import BookManagement from '../components/BookManagement'

import Catalog from '../components/Catalog'
import Users from '../components/Users'
import MyBorrowedBooks from '../components/MyBorrowedBooks'





const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState('')
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  // If user is not logged in → show Public Dashboard
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <div className='relative md:pl-64 flex min-h-screen bg-gray-100'>
        <div className='md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white'>
          <GiHamburgerMenu
            className='text-2xl  cursor-pointer' onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          />

        </div>

        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          setSelectedComponent={setSelectedComponent}
        />

        {
          (
            () => {
              switch (selectedComponent) {
                case 'Dashboard':
                  return user?.role === 'User' ? (
                    <UserDashboard />
                  ) : (
                    <AdminDashboard />
                  )
                  break;

                case 'Books':
                  return <BookManagement />
                  break;

                case 'Catalog':
                  if (user?.role === 'Admin') {
                    return <Catalog />
                  }
                  break;
                case 'Users':
                  if (user?.role === 'Admin') {
                    return <Users />

                  }
                  break;
                case 'My Borrowed Books ':
                  return <MyBorrowedBooks />
                  break;

                default:
                  return user?.role === 'User' ? (
                    <UserDashboard />
                  ) : (
                    <AdminDashboard />
                  )
                  break;
              }
            }
          )()
        }
      </div>
    </>
  )
}




export default Home