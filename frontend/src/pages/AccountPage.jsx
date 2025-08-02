import React from "react";

  return (
    <div className="max-w-5xl mx-auto py-14 px-4">
      <h1 className="text-5xl font-extrabold text-cyan-700 mb-6 text-center tracking-tight drop-shadow-lg">Your Account</h1>
      <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-10 mt-8 border-2 border-cyan-200/60">
        <div className="flex justify-center border-b border-cyan-200/60 mb-6">
          <button onClick={() => setActiveTab('personal')} className={`px-6 py-2 text-lg font-semibold ${activeTab === 'personal' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500'}`}>Personal Information</button>
          <button onClick={() => setActiveTab('medical')} className={`px-6 py-2 text-lg font-semibold ${activeTab === 'medical' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500'}`}>Medical Background</button>
        </div>
        {activeTab === 'personal' ? renderPersonalForm() : renderMedicalForm()}
        <div className="mt-6 text-right">
          <button onClick={handleSubmit} className="btn">Save Changes</button>
        </div>
        {successMessage && <div className="mt-4 text-green-600 text-center">{successMessage}</div>}
      </div>
    </div>
  );
};

export default AccountPage;