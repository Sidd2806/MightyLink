import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../api/user.api.js";
import {useDispatch, useSelector} from "react-redux"
import { login } from "../store/slice/authSlice.js";
import {useNavigate} from "@tanstack/react-router"
const LoginForm = ({state}) => {
  const [email, setEmail] = useState("darkloop2806@gmail.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth= useSelector((state)=>state.auth)
  const dispatch= useDispatch()
  const navigate=useNavigate()
  const handleSubmit = async() => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setError("");
    setLoading(true);
     try{
     const data= await loginUser(email,password);
     console.log(data);
     dispatch(login(data.user))
     navigate({to:'/dashboard'})
     setLoading(false)
    }catch(err){
      console.error("Login error:", err?.response?.data || err.message || err)
      const serverMessage = err?.response?.data?.message || err?.response?.data?.error || "invalid credentials"
      setError(serverMessage)
      setLoading(false)
    }
  };

  return (
    <div
      className="
        w-96 p-6 rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-xl
        hover:scale-[1.02]
        transition-all duration-300
      "
    >
      <h2 className="text-xl font-semibold text-center mb-4 text-white">
        Login
      </h2>

      {error && (
        <p className="text-red-400 text-sm text-center mb-3">
          {error}
        </p>
      )}

      <div  className="space-y-8">
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full px-3 py-2 rounded-md
            bg-black/40 text-white
            border border-white/10
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-600
          "
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-3 py-2 rounded-md
              bg-black/40 text-white
              border border-white/10
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-600
            "
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute right-3 top-2.5 text-sm
              text-blue-400 cursor-pointer
              hover:text-blue-300
            "
          >
             {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Button */}
        <button
        onClick={handleSubmit}
          type="submit"
          disabled={loading}
          className="
            w-full py-2 rounded-md font-semibold text-white
            bg-linear-to-r from-blue-700 to-indigo-800
            hover:from-blue-600 hover:to-indigo-700
            disabled:opacity-60
            transition-all
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      <p className="text-xs text-center text-gray-400 mt-4">
        Don't have an account? <span  ></span> {" "}
        <span onClick={()=>state(false)} className="text-blue-400 cursor-pointer hover:underline">
          Sign up
        </span>
      </p>
    </div>
  );
};

export default LoginForm;