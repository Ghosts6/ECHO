import React, { useState } from "react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="w-full max-w-md bg-white rounded shadow p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        {/* Form fields here */}
        <form>
          <input className="w-full mb-3 p-2 border rounded" type="email" placeholder="Email" required />
          <input className="w-full mb-3 p-2 border rounded" type="password" placeholder="Password" required />
          {isSignUp && (
            <input className="w-full mb-3 p-2 border rounded" type="password" placeholder="Confirm Password" required />
          )}
          <button className="w-full bg-blue-600 text-white py-2 rounded mb-2" type="submit">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="flex justify-between mt-2 text-sm">
          <button className="text-blue-600 hover:underline" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </button>
          <a href="/forgot" className="text-blue-600 hover:underline">Forgot?</a>
        </div>
      </div>
    </main>
  );
}
