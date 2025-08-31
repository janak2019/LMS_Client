import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../store/slices/authSlice'

import closeIcon from '../assets/closeIcon.png'
import keyIcon from '../assets/keyIcon.png'
import {toogleSettingPopup}  from '../store/slices/popUpSlice.js'
const SettingPopup = () => {

  const [currentPassword,setCurrentPassword] =useState("")
  const [newPassword,setNewPassword] =useState("")
  const [confirmPassword,setConfirmPassword] =useState("")
  const dispatch = useDispatch()

  const {loading} = useSelector((state)=> state.auth);
  const handleUpdatepassword = (e)=>{
    e.preventDefault();
    const data = new FormData()
    data.append("currentPassword",currentPassword)
    data.append("newPassword",newPassword)
    data.append("confirmPassword",confirmPassword)
    dispatch(updatePassword(data))
  }


  return (
   <h1 className='fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50'>
         <div className='w-full bg-white rounded-lg shadow-lg md:w-1/3'>
           <div className='p-6'>
             <header className='flex justify-between items-center mb-7 pb-5 border-b-[1px] border-b-black'>
               <div className='flex items-center gap-3'>
                 <img src={keyIcon} className='h-10 bg-gray-400 p-1 rounded-lg' alt="key-icon" />
                 <h3 className='text-xxl font-bold'>Update Credentials</h3>
               </div>
               <img src={closeIcon} className="h-4" alt="" onClick={()=>dispatch(toogleSettingPopup())} />
   
             </header>
           </div>
         </div>
       </h1>
  )
}

export default SettingPopup