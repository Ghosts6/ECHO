import React from "react";

export default function RecordsPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">Your Records 📄</h2>
      <p className="text-lg text-gray-700 mb-4">View and manage your generated health reports here.</p>
      <div className="border rounded p-4 bg-slate-100 text-center text-gray-500">
        No records to display yet.
      </div>
    </main>
  );
}
