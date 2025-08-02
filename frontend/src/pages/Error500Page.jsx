import React from "react";

export default function Error500Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <h1 className="text-4xl font-bold mb-4">500 – Server Error 😵</h1>
      <p className="text-lg text-gray-700 mb-6">Something went wrong on our end. Please try again later.</p>
    </main>
  );
}
