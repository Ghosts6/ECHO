import React, { useState } from "react";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (honeypot) return;
    // Email validation
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }
    try {
      const res = await fetch("/api/auth/forgot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: honeypot })
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
        Swal.fire("Success", "If your email exists in our database, a reset link has been sent.", "success");
      } else {
        Swal.fire("Error", "No account found with this email address.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Network error. Please try again.", "error");
    }
  };

  return (
    <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-green-100 flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 w-full p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-blue-200 animate-fade-in">
          <div className="flex justify-center mb-6">
            <img src="img/Logo.png" alt="Echo Logo" className="w-14 h-14 rounded-full shadow object-cover" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center text-primary">Forgot Password</h2>
          {sent ? (
            <p className="text-green-600 text-center">If your email exists, a reset link has been sent.</p>
          ) : (
            <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/><path d="M12 2v2m0 16v2m8-10h2m-18 0H2"/></svg>
                </span>
                <input
                  className="w-full pl-10 mb-1 p-2 border rounded focus:ring-2 focus:ring-blue-200"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
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
              <button className="w-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white py-2 rounded font-bold shadow hover:scale-105 transition-transform" type="submit">Send Reset Link</button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
