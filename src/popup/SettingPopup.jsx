import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../store/slices/authSlice'
import { Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline';
import { XSquare } from 'lucide-react'
import { toggleSettingPopup } from '../store/slices/popUpSlice.js'
const SettingPopup = () => {

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const dispatch = useDispatch()

  const { loading } = useSelector((state) => state.auth);
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append("currentPassword", currentPassword)
    data.append("newPassword", newPassword)
    data.append("confirmNewPassword", confirmNewPassword)
    dispatch(updatePassword(data))
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg sm:w-auto lg:w-1/2 2xl:w-1/3">
        <div className="p-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-7 pb-5 border-b border-gray-300">
            <div>
              <Cog6ToothIcon className='w-10' />
            </div>
            <div className="flex items-center gap-3">

              <h3 className="text-xl font-bold">Change Credentials</h3>
            </div>
            <div>
              <XSquare className="w-20 cursor-pointer" alt="close" onClick={() => dispatch(toggleSettingPopup())}
              />
            </div>


          </header>

          {/* Form */}
          <form onSubmit={handleUpdatePassword} className="space-y-4">


            {/* Current Password */}
            <div>
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* New Password */}
            <div>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Confirm Password */}
            <div>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit */}
            <div className='flex gap-4 mr-10'>
              <button
                type="button"
                onClick={() => dispatch(toggleSettingPopup())}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition disabled:opacity-50"
              >CANCEL

              </button>
              <button
                type="submit"
                disabled={loading}

                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition disabled:opacity-50"
              >
                CONFIRM
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SettingPopup