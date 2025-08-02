import React from "react";

export default function ResetPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="w-full max-w-md bg-white rounded shadow p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form>
          <input className="w-full mb-3 p-2 border rounded" type="password" placeholder="New Password" required />
          <input className="w-full mb-3 p-2 border rounded" type="password" placeholder="Confirm Password" required />
          <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">Reset Password</button>
        </form>
      </div>
    </main>
  );
}
