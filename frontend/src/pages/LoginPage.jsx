"use client"

import { useState } from "react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginType, setLoginType] = useState("user")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTabClick = (type) => {
    setLoginType(type);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formLoginType = loginType || "user";
    const trimmedLoginType = formLoginType.trim();
    console.log("loginType from form:", formLoginType, "trimmed:", trimmedLoginType);

    // Validate login type
    if (trimmedLoginType !== "user" && trimmedLoginType !== "seller") {
      alert("Invalid login type selected. Please select either 'User' or 'Seller'.")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, loginType: trimmedLoginType }),
      })

      const data = await res.json()

      if (res.ok) {
        console.log("Login successful:", data);

        // Save token to localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        if (data.user && data.user.loginType) {
          localStorage.setItem("role", data.user.loginType);
        }

        // Redirect based on loginType
        if (trimmedLoginType === "user") {
          window.location.href = "/";
        } else {
          window.location.href = "/seller";
        }
      } else {
        alert(data.message || "Login failed.")
        console.error("Login failed:", data.message || "Unknown error")
      }
    } catch (err) {
      alert("An error occurred during login. Please try again.")
      console.error("Error while logging in:", err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-emerald-100 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl">
            🏪
          </div>
          <h1 className="text-3xl font-bold text-green-800">
            Welcome to GreenMart
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to your account to continue
          </p>
        </div>

        <div className="px-8 pb-8">
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              className={`flex-1 p-2 text-center rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                loginType === "user"
                  ? "bg-white text-green-600 shadow"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick("user")}
            >
              👤 Customer
            </button>
            <button
              type="button"
              className={`flex-1 p-2 text-center rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                loginType === "seller"
                  ? "bg-white text-green-600 shadow"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick("seller")}
            >
              🏪 Seller
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">
                {loginType === "user" ? "Email" : "Business Email"}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={
                  loginType === "user"
                    ? "customer@example.com"
                    : "seller@business.com"
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href={
                    loginType === "user"
                      ? "/forgot-password"
                      : "/seller/forgot-password"
                  }
                  className="text-xs text-green-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors hover:bg-green-700"
            >
              Sign In as {loginType === "user" ? "Customer" : "Seller"}
            </button>
          </form>

          <div className="my-6 text-center relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <button className="w-full py-2.5 border border-gray-300 bg-white rounded-lg text-sm flex items-center justify-center gap-2 transition-colors hover:bg-gray-50">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 text-center text-xs text-gray-500">
            {loginType === "user" ? (
              <>
                Don't have an account?{" "}
                <a href="/signup" className="text-green-600 hover:underline">
                  Sign up as Customer
                </a>
                <br />
                <span>or </span>
                <a
                  href="/seller/signup"
                  className="text-green-600 hover:underline"
                >
                  Register as Seller
                </a>
              </>
            ) : (
              <>
                Don't have a seller account?{" "}
                <a
                  href="/seller/signup"
                  className="text-green-600 hover:underline"
                >
                  Register as Seller
                </a>
                <br />
                <span>or </span>
                <a href="/signup" className="text-green-600 hover:underline">
                  Sign up as Customer
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

