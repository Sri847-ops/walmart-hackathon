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

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)",
      padding: "1rem",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    header: {
      padding: "2rem 2rem 1rem",
      textAlign: "center",
    },
    logo: {
      width: "60px",
      height: "60px",
      backgroundColor: "#16a34a",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1rem",
      color: "white",
      fontSize: "24px",
    },
    title: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      color: "#166534",
      margin: "0 0 0.5rem",
    },
    subtitle: {
      color: "#6b7280",
      fontSize: "0.875rem",
      margin: 0,
    },
    content: {
      padding: "0 2rem 2rem",
    },
    tabs: {
      display: "flex",
      backgroundColor: "#f3f4f6",
      borderRadius: "8px",
      padding: "4px",
      marginBottom: "1.5rem",
    },
    tab: {
      flex: 1,
      padding: "0.75rem",
      textAlign: "center",
      border: "none",
      backgroundColor: "transparent",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.875rem",
      fontWeight: "500",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    activeTab: {
      backgroundColor: "white",
      color: "#16a34a",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    label: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#374151",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "0.875rem",
      transition: "border-color 0.2s",
      boxSizing: "border-box",
    },
    inputFocus: {
      outline: "none",
      borderColor: "#16a34a",
      boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.1)",
    },
    passwordContainer: {
      position: "relative",
    },
    passwordToggle: {
      position: "absolute",
      right: "0.75rem",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#6b7280",
      fontSize: "1rem",
    },
    forgotPassword: {
      fontSize: "0.75rem",
      color: "#16a34a",
      textDecoration: "none",
      alignSelf: "flex-end",
    },
    submitButton: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#16a34a",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    submitButtonHover: {
      backgroundColor: "#15803d",
    },
    divider: {
      margin: "1.5rem 0",
      textAlign: "center",
      position: "relative",
      color: "#6b7280",
      fontSize: "0.75rem",
    },
    dividerLine: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      height: "1px",
      backgroundColor: "#e5e7eb",
    },
    dividerText: {
      backgroundColor: "white",
      padding: "0 1rem",
    },
    googleButton: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      backgroundColor: "white",
      borderRadius: "6px",
      fontSize: "0.875rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      transition: "background-color 0.2s",
    },
    footer: {
      marginTop: "1.5rem",
      textAlign: "center",
      fontSize: "0.75rem",
      color: "#6b7280",
    },
    link: {
      color: "#16a34a",
      textDecoration: "none",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>🏪</div>
          <h1 style={styles.title}>Welcome to GreenMart</h1>
          <p style={styles.subtitle}>Sign in to your account to continue</p>
        </div>

        <div style={styles.content}>
          <div style={styles.tabs}>
            <button
              type="button"
              style={{
                ...styles.tab,
                ...(loginType === "user" ? styles.activeTab : {}),
              }}
              onClick={() => handleTabClick("user")}
            >
              👤 Customer
            </button>
            <button
              type="button"
              style={{
                ...styles.tab,
                ...(loginType === "seller" ? styles.activeTab : {}),
              }}
              onClick={() => handleTabClick("seller")}
            >
              🏪 Seller
            </button>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="email">
                {loginType === "user" ? "Email" : "Business Email"}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={loginType === "user" ? "customer@example.com" : "seller@business.com"}
                required
                style={styles.input}
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
              />
            </div>

            <div style={styles.inputGroup}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={styles.label} htmlFor="password">
                  Password
                </label>
                <a
                  href={loginType === "user" ? "/forgot-password" : "/seller/forgot-password"}
                  style={styles.forgotPassword}
                >
                  Forgot password?
                </a>
              </div>
              <div style={styles.passwordContainer}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  style={styles.input}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                />
                <button type="button" style={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={styles.submitButton}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.submitButton.backgroundColor)}
            >
              Sign In as {loginType === "user" ? "Customer" : "Seller"}
            </button>
          </form>

          <div style={styles.divider}>
            <div style={styles.dividerLine}></div>
            <span style={styles.dividerText}>Or continue with</span>
          </div>

          <button
            style={styles.googleButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f9fafb")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
          >
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

          <div style={styles.footer}>
            {loginType === "user" ? (
              <>
                Don't have an account?{" "}
                <a href="/signup" style={styles.link}>
                  Sign up as Customer
                </a>
                <br />
                <span>or </span>
                <a href="/seller/signup" style={styles.link}>
                  Register as Seller
                </a>
              </>
            ) : (
              <>
                Don't have a seller account?{" "}
                <a href="/seller/signup" style={styles.link}>
                  Register as Seller
                </a>
                <br />
                <span>or </span>
                <a href="/signup" style={styles.link}>
                  Sign up as Customer
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

