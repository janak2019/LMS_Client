import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // adjust path as needed
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice.js"
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch()

  const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth)

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email))
  }


  useEffect(() => {
    if (message) {
      toast.success(message)
      dispatch(resetAuthSlice())
    }
    if (error) {
      toast.error(error)
      dispatch(resetAuthSlice())

    }
  }, [dispatch, isAuthenticated, error, loading])

  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }


  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-black text-white flex-col items-center justify-center p-10 rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-center max-w-md">
          <img src={logo} alt="logo" className="mx-auto mb-12 h-24 w-auto" />
          <p className="text-gray-300 mb-8 text-lg">
            Remembered your password? Sign in now.
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
          <h3 className="font-bold text-3xl text-gray-900 mb-4">Forgot Password</h3>
          <p className="text-gray-600 text-center mb-8">
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleForgotPassword} className="space-y-4">
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



            <button
              type="submit"
              disabled={loading}
              className="w-full border-2 border-black bg-black text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-black transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
