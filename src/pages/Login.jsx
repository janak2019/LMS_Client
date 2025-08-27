import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import logo from "../assets/logo.png"; // your logo path
import { login, resetAuthSlice } from "../slices/authSlice";
import { toast } from "react-toastify";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth);



  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    dispatch(login(loginData));
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, message, error]);


  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* LEFT SIDE (hidden on mobile) */}
      <div className="hidden md:flex w-1/2 bg-black text-white flex-col items-center justify-center p-10 rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-center max-w-md">
          <img src={logo} alt="logo" className="mx-auto mb-12 h-24 w-auto" />
          <p className="text-gray-300 mb-8 text-lg">
            New here? Create an account to get started.
          </p>
          <Link
            to="/register"
            className="inline-block border-2 border-white rounded-lg font-semibold py-2 px-8 hover:bg-white hover:text-black transition"
          >
            SIGN UP
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-4 mb-6">
            <h3 className="font-bold text-3xl text-gray-900">Sign In</h3>
            <img src={logo} alt="logo" className="h-auto w-32 object-contain" />
          </div>

          <p className="text-gray-600 text-center mb-8">
            Welcome back! Please enter your credentials.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
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


            {/* Password Input */}
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

            {/* Forgot Password link */}
            <div className="flex justify-end mt-2">
              <Link
                to="/password/forget"
                className="text-sm text-gray-600 hover:text-black hover:underline transition"
              >
                Forgot Password?
              </Link>
            </div>


            {/* Error message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full border-2 border-black bg-black text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-black transition disabled:opacity-50"
            >
              {loading ? "Signing In..." : "SIGN IN"}
            </button>
          </form>

          {/* Mobile Sign up link */}
          <div className="block md:hidden text-center mt-4">
            <p className="text-sm">Don’t have an account?</p>
            <Link to="/register" className="text-sm text-gray-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
