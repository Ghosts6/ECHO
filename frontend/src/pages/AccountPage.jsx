
import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaMapMarkerAlt, FaUserShield, FaHeartbeat, FaAllergies, FaWeight, FaRulerVertical, FaFileMedicalAlt, FaShieldAlt, FaNotesMedical } from 'react-icons/fa';
import apiClient from '../api/client';
import { showSuccess, showError } from '../utils/alerts';

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userRes, patientRes] = await Promise.all([
          apiClient.get('/api/account/'),
          apiClient.get('/api/patient/')
        ]);
        setUser(userRes.data);
        setPatient(patientRes.data);
      } catch (err) {
        showError('Failed to load account info. Please login again.');
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);


  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePatientChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  // Simple validation helpers
  const validateUser = (u) => {
    if (!u.username || !u.email) return 'Username and email are required.';
    if (!/^\S+@\S+\.\S+$/.test(u.email)) return 'Invalid email address.';
    return null;
  };
  const validatePatient = (p) => {
    if (!p.blood_type) return 'Blood type is required.';
    if (p.height && (isNaN(p.height) || p.height < 0)) return 'Height must be a positive number.';
    if (p.weight && (isNaN(p.weight) || p.weight < 0)) return 'Weight must be a positive number.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'personal') {
        const err = validateUser(user);
        if (err) return showError(err);
        await apiClient.put('/api/account/', user);
        showSuccess('Personal information updated!');
      } else {
        // Convert comma-separated fields to arrays for backend
        const patientData = {
          ...patient,
          allergies: typeof patient.allergies === 'string' ? patient.allergies.split(',').map(s => s.trim()).filter(Boolean) : patient.allergies,
          chronic_conditions: typeof patient.chronic_conditions === 'string' ? patient.chronic_conditions.split(',').map(s => s.trim()).filter(Boolean) : patient.chronic_conditions,
          current_medications: typeof patient.current_medications === 'string' ? patient.current_medications.split(',').map(s => s.trim()).filter(Boolean) : patient.current_medications,
          family_medical_history: typeof patient.family_medical_history === 'string' ? patient.family_medical_history.split(',').map(s => s.trim()).filter(Boolean) : patient.family_medical_history,
        };
        const err = validatePatient(patientData);
        if (err) return showError(err);
        await apiClient.put('/api/patient/', patientData);
        showSuccess('Medical information updated!');
      }
    } catch (err) {
      showError('Failed to update information. Please try again.');
    }
  };


  if (loading) {
    return <div className="text-center text-cyan-700 animate-pulse">Loading account...</div>;
  }

  // If not authenticated, show a message (helpful for 401 errors)
  if (!user) {
    return <div className="text-center text-red-600 font-bold mt-10">You must be logged in to view your account.</div>;
  }

  const renderPersonalForm = () => (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="form-group">
        <label htmlFor="username" className="form-label flex items-center text-black"><FaUser className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Username</label>
        <input type="text" id="username" name="username" value={user?.username || ''} onChange={handleUserChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label flex items-center text-black"><FaEnvelope className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Email</label>
        <input type="email" id="email" name="email" value={user?.email || ''} onChange={handleUserChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group">
        <label htmlFor="phone_number" className="form-label flex items-center text-black"><FaPhone className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Phone Number</label>
        <input type="text" id="phone_number" name="phone_number" value={user?.phone_number || ''} onChange={handleUserChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group">
        <label htmlFor="date_of_birth" className="form-label flex items-center text-black"><FaBirthdayCake className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Date of Birth</label>
        <input type="date" id="date_of_birth" name="date_of_birth" value={user?.date_of_birth || ''} onChange={handleUserChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group">
        <label htmlFor="gender" className="form-label flex items-center text-black"><FaVenusMars className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Gender</label>
        <select id="gender" name="gender" value={user?.gender || ''} onChange={handleUserChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white hover:border-cyan-700 transition-all duration-200">
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
          <option value="P">Prefer not to say</option>
        </select>
      </div>
      <div className="form-group md:col-span-2">
        <label htmlFor="address" className="form-label flex items-center text-black"><FaMapMarkerAlt className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Address</label>
        <textarea id="address" name="address" value={user?.address || ''} onChange={handleUserChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200"></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="emergency_contact_name" className="form-label flex items-center text-black"><FaUserShield className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Emergency Contact Name</label>
        <input type="text" id="emergency_contact_name" name="emergency_contact_name" value={user?.emergency_contact_name || ''} onChange={handleUserChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group">
        <label htmlFor="emergency_contact_phone" className="form-label flex items-center text-black"><FaPhone className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Emergency Contact Phone</label>
        <input type="text" id="emergency_contact_phone" name="emergency_contact_phone" value={user?.emergency_contact_phone || ''} onChange={handleUserChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group md:col-span-2">
        <label htmlFor="emergency_contact_relationship" className="form-label flex items-center text-black"><FaUserShield className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Emergency Contact Relationship</label>
        <input type="text" id="emergency_contact_relationship" name="emergency_contact_relationship" value={user?.emergency_contact_relationship || ''} onChange={handleUserChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
    </form>
  );

  const renderMedicalForm = () => (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="form-group">
        <label htmlFor="blood_type" className="form-label flex items-center text-black"><FaHeartbeat className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Blood Type</label>
        <select id="blood_type" name="blood_type" value={patient?.blood_type || ''} onChange={handlePatientChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white hover:border-cyan-700 transition-all duration-200">
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="height" className="form-label flex items-center text-black"><FaRulerVertical className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Height (cm)</label>
        <input type="number" id="height" name="height" value={patient?.height || ''} onChange={handlePatientChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group">
        <label htmlFor="weight" className="form-label flex items-center text-black"><FaWeight className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Weight (kg)</label>
        <input type="number" id="weight" name="weight" value={patient?.weight || ''} onChange={handlePatientChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group md:col-span-2">
        <label htmlFor="allergies" className="form-label flex items-center text-black"><FaAllergies className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Allergies (comma-separated)</label>
        <input type="text" id="allergies" name="allergies" value={patient?.allergies?.join(', ') || ''} onChange={(e) => setPatient({ ...patient, allergies: e.target.value.split(', ') })} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group md:col-span-2">
        <label htmlFor="chronic_conditions" className="form-label flex items-center text-black"><FaFileMedicalAlt className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Chronic Conditions (comma-separated)</label>
        <input type="text" id="chronic_conditions" name="chronic_conditions" value={patient?.chronic_conditions?.join(', ') || ''} onChange={(e) => setPatient({ ...patient, chronic_conditions: e.target.value.split(', ') })} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group md:col-span-2">
        <label htmlFor="current_medications" className="form-label flex items-center text-black"><FaNotesMedical className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Current Medications (comma-separated)</label>
        <input type="text" id="current_medications" name="current_medications" value={patient?.current_medications?.join(', ') || ''} onChange={(e) => setPatient({ ...patient, current_medications: e.target.value.split(', ') })} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group md:col-span-2">
        <label htmlFor="family_medical_history" className="form-label flex items-center text-black"><FaFileMedicalAlt className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Family Medical History (comma-separated)</label>
        <input type="text" id="family_medical_history" name="family_medical_history" value={patient?.family_medical_history?.join(', ') || ''} onChange={(e) => setPatient({ ...patient, family_medical_history: e.target.value.split(', ') })} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group">
        <label htmlFor="insurance_provider" className="form-label flex items-center text-black"><FaShieldAlt className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Insurance Provider</label>
        <input type="text" id="insurance_provider" name="insurance_provider" value={patient?.insurance_provider || ''} onChange={handlePatientChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group">
        <label htmlFor="insurance_policy_number" className="form-label flex items-center text-black"><FaShieldAlt className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Insurance Policy Number</label>
        <input type="text" id="insurance_policy_number" name="insurance_policy_number" value={patient?.insurance_policy_number || ''} onChange={handlePatientChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
      <div className="form-group">
        <label htmlFor="insurance_group_number" className="form-label flex items-center text-black"><FaShieldAlt className="mr-2 text-black group-hover:text-cyan-700 transition-colors duration-200" />Insurance Group Number</label>
        <input type="text" id="insurance_group_number" name="insurance_group_number" value={patient?.insurance_group_number || ''} onChange={handlePatientChange} className="form-input text-[#111] border-gray-400 focus:border-cyan-700 focus:ring-cyan-700 bg-white placeholder-gray-500 hover:border-cyan-700 transition-all duration-200" />
      </div>
    </form>
  );

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