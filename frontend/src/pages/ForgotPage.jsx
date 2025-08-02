import React from "react";

export default function ForgotPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="w-full max-w-md bg-white rounded shadow p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form>
          <input className="w-full mb-3 p-2 border rounded" type="email" placeholder="Email" required />
          <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">Send Reset Link</button>
        </form>
      </div>
    </main>
  );
}
