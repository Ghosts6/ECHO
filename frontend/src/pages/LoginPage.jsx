
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  // Redirect to home if already logged in
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated")) {
      window.location.replace("/");
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "website") setHoneypot(value);
    else setForm(f => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (honeypot) return false;
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      Swal.fire("Invalid Email", "Please enter a valid email address.", "error");
      return false;
    }
    if (!form.password || form.password.length < 6) {
      Swal.fire("Invalid Password", "Password must be at least 6 characters.", "error");
      return false;
    }
    if (isSignUp) {
      if (!form.name) {
        Swal.fire("Name Required", "Please enter your full name.", "error");
        return false;
      }
      if (form.password !== form.confirmPassword) {
        Swal.fire("Password Mismatch", "Passwords do not match.", "error");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    const url = isSignUp ? "/api/auth/signup/" : "/api/auth/login/";
    const payload = isSignUp
      ? {
          email: form.email,
          username: form.email,
          first_name: form.name.split(" ")[0] || "",
          last_name: form.name.split(" ").slice(1).join(" ") || "",
          password: form.password,
          password_confirm: form.confirmPassword,
          website: honeypot
        }
      : {
          email: form.email,
          password: form.password,
          website: honeypot
        };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        // Mark as logged in and redirect
        localStorage.setItem("isAuthenticated", "true");
        Swal.fire({
          title: "Success",
          text: data.detail || (isSignUp ? "Account created!" : "Login successful!"),
          icon: "success",
          timer: 1200,
          showConfirmButton: false
        });
        setTimeout(() => {
          window.location.replace("/");
        }, 1200);
      } else {
        Swal.fire("Error", data.detail || Object.values(data)[0], "error");
      }
    } catch (err) {
      Swal.fire("Error", "Network error. Please try again.", "error");
    }
  };

  return (
    <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-green-100 flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 w-full">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-blue-200 animate-fade-in">
          <div className="flex justify-center mb-6">
            <img src="img/Logo.png" alt="Echo Alternate Logo" className="w-16 h-16 rounded-full shadow object-cover" />
          </div>
          <h2 className="text-3xl font-extrabold mb-4 text-center text-primary tracking-tight">
            {isSignUp ? "Create Your Account" : "Welcome Back"}
          </h2>
          <form autoComplete="off" className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="relative flex items-center">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary flex items-center">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </span>
                <input
                  className="w-full pl-10 pr-2 mb-1 p-2 border rounded focus:ring-2 text-[#111111] focus:ring-blue-200"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="relative flex items-center">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary flex items-center">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/><path d="M12 2v2m0 16v2m8-10h2m-18 0H2"/></svg>
              </span>
              <input
                className="w-full pl-10 pr-2 mb-1 p-2 border rounded focus:ring-2 text-[#111111] focus:ring-blue-200"
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 top-2 text-primary flex items-center">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="5" y="11" width="14" height="8" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                className="w-full pl-10 pr-10 mb-1 p-2 border rounded focus:ring-2 text-[#111111] focus:ring-blue-200"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-2 text-primary hover:text-blue-500 transition-transform duration-200 focus:outline-none"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span className="inline-block align-middle animate-fade-in">
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </span>
              </button>
            </div>
            {isSignUp && (
              <div className="relative flex items-center">
                <span className="absolute left-3 top-2 text-primary flex items-center">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="5" y="11" width="14" height="8" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  className="w-full pl-10 pr-10 mb-1 p-2 border rounded focus:ring-2 text-[#111111] focus:ring-blue-200"
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-2 text-primary hover:text-blue-500 transition-transform duration-200 focus:outline-none"
                  onClick={() => setShowConfirm(v => !v)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  <span className="inline-block align-middle animate-fade-in">
                    {showConfirm ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </span>
                </button>
              </div>
            )}
            {/* Honeypot field (hidden from users) */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={handleChange}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />
            <button
              className={`w-full text-white py-2 rounded mb-2 font-bold shadow transition-transform duration-300
                bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 animate-pulse hover:scale-110 hover:shadow-lg
              `}
              type="submit"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
          <div className="flex justify-between mt-4 text-sm">
            <button
              className="text-blue-600 hover:underline font-semibold"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
            <a href="/forgot" className="text-blue-600 hover:underline font-semibold">Forgot?</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}