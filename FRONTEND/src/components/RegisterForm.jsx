import React, { useState } from "react";
import { registerUser } from "../api/user.api";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const RegisterForm = ({state}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await registerUser(name, password, email);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const msg =
        err?.response?.data?.message || err.message || "Registration failed";
      setError(msg);
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
        Register
      </h2>

      {error && (
        <p className="text-red-400 text-sm text-center mb-3">{error}</p>
      )}
      {success && (
        <p className="text-green-400 text-sm text-center mb-3">{success}</p>
      )}

      <div className="space-y-6">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
						w-full px-3 py-2 rounded-md
						bg-black/40 text-white
						border border-white/10
						placeholder-gray-400
						focus:outline-none focus:ring-2 focus:ring-blue-600
					"
        />

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
        <button
          onClick={handleSubmit}
          type="submit"
          disabled={loading}
          className="
						w-full py-2 rounded-md font-semibold text-white
						bg-gradient-to-r from-blue-700 to-indigo-800
						hover:from-blue-600 hover:to-indigo-700
						disabled:opacity-60
						transition-all
					"
        >
          {loading ? "Registering..." : "Create account"}
        </button>
      </div>
      <p className="text-xs text-center text-gray-400 mt-4">
        Already have an account? <span ></span>{" "}
        <span onClick={()=>state(true)} className="text-blue-400 cursor-pointer hover:underline">
          Sign in
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
