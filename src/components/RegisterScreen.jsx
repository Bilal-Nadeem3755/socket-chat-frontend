import { useState } from "react";
import { registerUser } from "../services/auth";

function RegisterScreen({
  onRegisterSuccess,
  onShowLogin,
}) {

  const [fullName, setFullName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // ==========================================
  // Register
  // ==========================================

  const handleRegister = async (event) => {

    event.preventDefault();

    setError("");


    if (
      !fullName.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim()
    ) {

      setError(
        "Please fill in all fields."
      );

      return;
    }


    if (password.length < 8) {

      setError(
        "Password must be at least 8 characters."
      );

      return;
    }


    try {

      setLoading(true);

      const data = await registerUser({
        full_name: fullName.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
      });

      console.log(
        "✅ Registration successful:",
        data.user
      );

      onRegisterSuccess(data.user);

    } catch (error) {

      setError(
        error.message ||
        "Registration failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#BDD9D7] px-4 py-8">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* ======================================
            Header
        ====================================== */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-[#03363D]">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Register to start chatting
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
          onSubmit={handleRegister}
          className="space-y-4"
        >

          {/* Full Name */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
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


          {/* Username */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
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
                setEmail(e.target.value)
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
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
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


          {/* Register Button */}

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
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>


        {/* ======================================
            Login
        ====================================== */}

        <div className="text-center mt-6">

          <p className="text-sm text-gray-500">

            Already have an account?{" "}

            <button
              type="button"
              onClick={onShowLogin}
              className="
                font-semibold
                text-[#03363D]
                hover:text-[#05515A]
              "
            >
              Login
            </button>

          </p>

        </div>

      </div>

    </div>
  );
}

export default RegisterScreen;