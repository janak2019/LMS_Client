import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '../assets/logo.png'
import { register, resetAuthSlice } from '../store/slices/authSlice'

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { loading, error, message, user, isAuthenticated, } = useSelector(state => state.auth)
  const navigateTo = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("name", name)
    data.append("email", email)
    data.append("password", password)
    dispatch(register(data))
  }
  useEffect(() => {
    if (message && email) {
      
      navigateTo(`/otp-verification/${email}`)
    }
    if (error) {
      toast.error(error)
      dispatch(resetAuthSlice())

    }
  }, [dispatch, isAuthenticated, error, loading, message, email])

  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }


  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* LEFT SIDE */}
        <div className="hidden md:flex w-full md:w-1/2 bg-black text-white flex-col items-center justify-center p-10 rounded-tr-[80px] rounded-br-[80px]">
          <div className="text-center max-w-md">
            <img src={logo} alt="logo" className="mx-auto mb-12 h-24 w-auto" />
            <p className="text-gray-300 mb-8 text-lg">
              Already have an account? Sign in now.
            </p>
            <Link
              to="/login"
              className="inline-block border-2 border-white rounded-lg font-semibold py-2 px-8 hover:bg-white hover:text-black transition"
            >
              SIGN IN
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-sm">
            {/* Heading + Logo */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-4 mb-6">
              <h3 className="font-bold text-3xl text-gray-900">Sign Up</h3>
              <img src={logo} alt="logo" className="h-auto w-32 object-contain" />
            </div>

            <p className="text-gray-600 text-center mb-8">
              Please provide your information to create an account.
            </p>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  required
                />
              </div>

              {/* Mobile Sign in link */}
              <div className="block md:hidden text-center mt-4">
                <p className="text-sm">Already have an account?</p>
                <Link to="/login" className="text-sm text-gray-600 hover:underline">
                  Sign In
                </Link>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full border-2 border-black bg-black text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-black transition"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    </>

  )

}
export default Register