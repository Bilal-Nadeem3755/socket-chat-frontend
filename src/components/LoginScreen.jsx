import { useState } from "react";

import {
  loginUser,
} from "../services/auth";


function LoginScreen({
  onLoginSuccess,
  onShowRegister,
}) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // ==========================================
  // Login
  // ==========================================

  const handleLogin = async (event) => {

    event.preventDefault();

    setError("");


    // ==========================================
    // Validation
    // ==========================================

    if (
      !email.trim() ||
      !password.trim()
    ) {

      setError(
        "Please enter email and password."
      );

      return;
    }


    try {

      setLoading(true);


      // ==========================================
      // Login API
      // ==========================================

      const data =
        await loginUser({
          email: email.trim(),
          password,
        });


      // ==========================================
      // Notify App
      // ==========================================

      onLoginSuccess(
        data.user
      );


    } catch (error) {

      setError(
        error.message ||
        "Login failed. Please try again."
      );


    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#BDD9D7] px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* ======================================
            Header
        ====================================== */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-[#03363D]">
            Socket Chat
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue chatting
          </p>

        </div>


        {/* ======================================
            Error
        ====================================== */}

        {error && (

          <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3">

            <p className="text-sm text-red-600">
              {error}
            </p>

          </div>

        )}


        {/* ======================================
            Form
        ====================================== */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-[#03363D]
                focus:ring-2
                focus:ring-[#03363D]/10
              "
            />

          </div>


          {/* Password */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-[#03363D]
                focus:ring-2
                focus:ring-[#03363D]/10
              "
            />

          </div>


          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-[#03363D]
              hover:bg-[#05515A]
              disabled:bg-gray-400
              text-white
              font-semibold
              py-3
              rounded-xl
              transition-all
              duration-300
            "
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>


        {/* ======================================
            Register
        ====================================== */}

        <div className="text-center mt-6">

          <p className="text-sm text-gray-500">

            Don't have an account?{" "}

            <button
              type="button"
              onClick={
                onShowRegister
              }
              className="
                font-semibold
                text-[#03363D]
                hover:text-[#05515A]
              "
            >
              Register
            </button>

          </p>

        </div>

      </div>

    </div>
  );
}


export default LoginScreen;