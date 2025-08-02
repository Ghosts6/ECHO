import React, { useState } from "react";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaLock, FaKey } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (t) setToken(t);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (honeypot) return;
    if (!password || password.length < 6) {
      Swal.fire({icon: "error", title: "Invalid Password", text: "Password must be at least 6 characters."});
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({icon: "error", title: "Password Mismatch", text: "Passwords do not match."});
      return;
    }
    if (!token) {
      Swal.fire({icon: "error", title: "Missing Token", text: "Reset token is missing from the URL."});
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, password_confirm: confirmPassword, website: honeypot })
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({icon: "success", title: "Success", text: data.detail || "Password has been reset."});
        setPassword("");
        setConfirmPassword("");
      } else {
        Swal.fire({icon: "error", title: "Error", text: data.detail || Object.values(data)[0]});
      }
    } catch (err) {
      Swal.fire({icon: "error", title: "Error", text: "Network error. Please try again."});
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-green-100 flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 w-full p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-blue-200 animate-fade-in">
          <div className="flex justify-center mb-6">
            <FaKey className="w-14 h-14 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center text-primary">Reset Password</h2>
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
            <div className="relative flex items-center">
              <span className="absolute left-3 top-2 text-gray-400 flex items-center"><FaLock /></span>
              <input
                className="w-full pl-10 pr-10 mb-1 p-2 border rounded focus:ring-2 focus:ring-blue-200 text-[#111111]"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{color: '#111111'}}
              />
              <button type="button" tabIndex="-1" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-2 text-gray-400 focus:outline-none">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 top-2 text-gray-400 flex items-center"><FaLock /></span>
              <input
                className="w-full pl-10 pr-10 mb-1 p-2 border rounded focus:ring-2 focus:ring-blue-200 text-[#111111]"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                style={{color: '#111111'}}
              />
              <button type="button" tabIndex="-1" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-2 text-gray-400 focus:outline-none">
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* Honeypot field (hidden from users) */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />
            <button className="w-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white py-2 rounded font-bold shadow hover:scale-105 transition-transform disabled:opacity-60" type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
