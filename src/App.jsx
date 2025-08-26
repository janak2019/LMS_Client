import React from "react" 
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ResetPassword from "./pages/ResetPassword"
import OTP from "./pages/OTP"
import ForgetPassword from "./pages/ForgetPassword"
import { ToastContainer } from "react-toastify"

function App() {
 

  return (<Router>

      <Routes>
        
        <Route path="/" element={<Home />} / >
        <Route path="/login" element={<Login/>} / >
        <Route path="/register" element={<Register />} / >
        <Route path="/password/forget" element={<ForgetPassword/>} / >
        <Route path="/otp-verification/:email" element={<OTP />} / >
        <Route path="password/reset/:token" element={<ResetPassword />} / >

      </Routes>  
      <ToastContainer theme="dark"  />
      
    </Router>
    
  )
}

export default App
