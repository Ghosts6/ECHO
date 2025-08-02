import React, { useState } from "react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-8 bg-gradient-to-br from-blue-100 via-white to-green-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-blue-200 animate-fade-in">
        <div className="flex justify-center mb-6">
          <img src="img/Logo.png" alt="Echo Alternate Logo" className="w-16 h-16 rounded-full shadow object-cover" />
        </div>
        <h2 className="text-3xl font-extrabold mb-4 text-center text-primary tracking-tight">
          {isSignUp ? "Create Your Account" : "Welcome Back"}
        </h2>
        <form autoComplete="off" className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </span>
              <input
                className="w-full pl-10 mb-1 p-2 border rounded focus:ring-2 focus:ring-blue-200"
                type="text"
                name="name"
                placeholder="Full Name"
                required
              />
            </div>
          )}
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/><path d="M12 2v2m0 16v2m8-10h2m-18 0H2"/></svg>
            </span>
            <input
              className="w-full pl-10 mb-1 p-2 border rounded focus:ring-2 focus:ring-blue-200"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">
              {/* Lock icon for password */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="5" y="11" width="14" height="8" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            <input
              className="w-full pl-10 mb-1 p-2 border rounded focus:ring-2 focus:ring-blue-200"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          {isSignUp && (
            <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">
              {/* Lock icon for confirm password */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="5" y="11" width="14" height="8" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
              <input
                className="w-full pl-10 mb-1 p-2 border rounded focus:ring-2 focus:ring-blue-200"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </div>
          )}
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
  );
}
