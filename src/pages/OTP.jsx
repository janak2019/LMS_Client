import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import { otpVerification, resetAuthSlice } from '../slices/authSlice'
import { toast } from 'react-toastify'
import logo from '../assets/logo.png'


const OTP = () => {
  const { email } = useParams()
  const [otp, setOtp] = useState("")
  const dispatch = useDispatch()
  const { loading,
    error,
    message,
    user,
    isAuthenticated, } = useSelector((state) => state.auth)

  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification({email,otp}))
  }
  useEffect(() => {
    if (message) {
      toast.success
    }
    if (error) {
      toast.error(error)
      dispatch(resetAuthSlice(email, otp))

    }
  }, [dispatch, isAuthenticated, error, loading])

  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <Link
            to={"/login"}
            className="absolute top-8 left-8 border-2 border-black rounded-3xl font-semibold px-6 py-2 hover:bg-black hover:text-white transition duration-300"
          >
            ← Back
          </Link>

          <div className="max-w-sm w-full text-center">
            {/* Logo */}
            <div className="flex justify-center mb-10">
              <img src={logo} alt="logo" className="h-20 w-auto" />
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Check Your Mailbox
            </h1>
            <p className="text-gray-600 mb-8">
              Please enter the OTP we sent to your email
            </p>

            {/* OTP FORM */}
            <form onSubmit={handleOtpVerification} className="space-y-6">
              <div className="text-left">
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="5-digit OTP"
                  className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                className="w-full border-2 border-black bg-black text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-black transition duration-300"
              >
                VERIFY
              </button>
            </form>

            {/* Resend Option */}
            <p className="mt-6 text-sm text-gray-600">
              Didn’t receive the code?{" "}
              <button
                type="button"
                // onClick={handleResendOtp}
                className="text-black font-semibold hover:underline"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex w-full md:w-1/2 bg-black text-white flex-col items-center justify-center p-12 rounded-bl-[80px] rounded-tl-[80px]">
          <div className="max-w-sm text-center">
            <div className="flex justify-center mb-12">
              <img src={logo} alt="logo" className="h-24 w-auto" />
            </div>
            <p className="mb-8 text-gray-200">New to our platform? Sign up now.</p>
            <Link
              to={"/register"}
              className="block border-2 border-white px-8 py-3 rounded-lg font-semibold bg-black text-white hover:bg-white hover:text-black transition duration-300"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </>

  )
}

export default OTP