import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaMapMarkerAlt, FaUserShield, FaHeartbeat, FaAllergies, FaWeight, FaRulerVertical, FaFileMedicalAlt, FaShieldAlt, FaNotesMedical } from 'react-icons/fa';

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = () => {
      setUser({
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
        phone_number: '123-456-7890',
        date_of_birth: '1990-01-01',
        gender: 'M',
        address: '123 Main St, Anytown, USA',
        emergency_contact_name: 'Jane Doe',
        emergency_contact_phone: '098-765-4321',
        emergency_contact_relationship: 'Spouse',
      });
      setPatient({
        blood_type: 'O+',
        height: '180',
        weight: '80',
        allergies: ['Peanuts', 'Aspirin'],
        chronic_conditions: ['Hypertension'],
        current_medications: ['Lisinopril'],
        family_medical_history: ['Heart disease'],
        insurance_provider: 'Blue Cross',
        insurance_policy_number: 'X123456789',
        insurance_group_number: 'G98765',
      });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock API call
    setSuccessMessage('Your information has been updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (loading) {
    return <div className="text-center text-cyan-400 animate-pulse">Loading account...</div>;
  }

  const renderPersonalForm = () => (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="form-group">
        <label htmlFor="username" className="form-label flex items-center"><FaUser className="mr-2" />Username</label>
        <input type="text" id="username" name="username" value={user?.username || ''} onChange={handleUserChange} className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label flex items-center"><FaEnvelope className="mr-2" />Email</label>
        <input type="email" id="email" name="email" value={user?.email || ''} onChange={handleUserChange} className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="phone_number" className="form-label flex items-center"><FaPhone className="mr-2" />Phone Number</label>
        <input type="text" id="phone_number" name="phone_number" value={user?.phone_number || ''} onChange={handleUserChange} className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="date_of_birth" className="form-label flex items-center"><FaBirthdayCake className="mr-2" />Date of Birth</label>
        <input type="date" id="date_of_birth" name="date_of_birth" value={user?.date_of_birth || ''} onChange={handleUserChange} className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="gender" className="form-label flex items-center"><FaVenusMars className="mr-2" />Gender</label>
        <select id="gender" name="gender" value={user?.gender || ''} onChange={handleUserChange} className="form-input">
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
          <option value="P">Prefer not to say</option>
        </select>
      </div>
      <div className="form-group md:col-span-2">
        <label htmlFor="address" className="form-label flex items-center"><FaMapMarkerAlt className="mr-2" />Address</label>
        <textarea id="address" name="address" value={user?.address || ''} onChange={handleUserChange} className="form-input"></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="emergency_contact_name" className="form-label flex items-center"><FaUserShield className="mr-2" />Emergency Contact Name</label>
        <input type="text" id="emergency_contact_name" name="emergency_contact_name" value={user?.emergency_contact_name || ''} onChange={handleUserChange} className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="emergency_contact_phone" className="form-label flex items-center"><FaPhone className="mr-2" />Emergency Contact Phone</label>
        <input type="text" id="emergency_contact_phone" name="emergency_contact_phone" value={user?.emergency_contact_phone || ''} onChange={handleUserChange} className="form-input" />
      </div>
      <div className="form-group md:col-span-2">
        <label htmlFor="emergency_contact_relationship" className="form-label flex items-center"><FaUserShield className="mr-2" />Emergency Contact Relationship</label>
        <input type="text" id="emergency_contact_relationship" name="emergency_contact_relationship" value={user?.emergency_contact_relationship || ''} onChange={handleUserChange} className="form-input" />
      </div>
    </form>
  );

  const renderMedicalForm = () => (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="form-group">
        <label htmlFor="blood_type" className="form-label flex items-center"><FaHeartbeat className="mr-2" />Blood Type</label>
        <select id="blood_type" name="blood_type" value={patient?.blood_type || ''} onChange={handlePatientChange} className="form-input">
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
        <label htmlFor="height" className="form-label flex items-center"><FaRulerVertical className="mr-2" />Height (cm)</label>
        <input type="number" id="height" name="height" value={patient?.height || ''} onChange={handlePatientChange} className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="weight" className="form-label flex items-center"><FaWeight className="mr-2" />Weight (kg)</label>
        <input type="number" id="weight" name="weight" value={patient?.weight || ''} onChange={handlePatientChange} className="form-input" />
      </div>
      <div className="form-group md:col-span-2">
        <label htmlFor="allergies" className="form-label flex items-center"><FaAllergies className="mr-2" />Allergies (comma-separated)</label>
        <input type="text" id="allergies" name="allergies" value={patient?.allergies?.join(', ') || ''} onChange={(e) => setPatient({ ...patient, allergies: e.target.value.split(', ') })} className="form-input" />
      </div>
      <div className="form-group md:col-span-2">
        <label htmlFor="chronic_conditions" className="form-label flex items-center"><FaFileMedicalAlt className="mr-2" />Chronic Conditions (comma-separated)</label>
        <input type="text" id="chronic_conditions" name="chronic_conditions" value={patient?.chronic_conditions?.join(', ') || ''} onChange={(e) => setPatient({ ...patient, chronic_conditions: e.target.value.split(', ') })} className="form-input" />
      </div>
      <div className="form-group md:col-span-2">
        <label htmlFor="current_medications" className="form-label flex items-center"><FaNotesMedical className="mr-2" />Current Medications (comma-separated)</label>
        <input type="text" id="current_medications" name="current_medications" value={patient?.current_medications?.join(', ') || ''} onChange={(e) => setPatient({ ...patient, current_medications: e.target.value.split(', ') })} className="form-input" />
      </div>
      <div className="form-group md:col-span-2">
        <label htmlFor="family_medical_history" className="form-label flex items-center"><FaFileMedicalAlt className="mr-2" />Family Medical History (comma-separated)</label>
        <input type="text" id="family_medical_history" name="family_medical_history" value={patient?.family_medical_history?.join(', ') || ''} onChange={(e) => setPatient({ ...patient, family_medical_history: e.target.value.split(', ') })} className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="insurance_provider" className="form-label flex items-center"><FaShieldAlt className="mr-2" />Insurance Provider</label>
        <input type="text" id="insurance_provider" name="insurance_provider" value={patient?.insurance_provider || ''} onChange={handlePatientChange} className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="insurance_policy_number" className="form-label flex items-center"><FaShieldAlt className="mr-2" />Insurance Policy Number</label>
        <input type="text" id="insurance_policy_number" name="insurance_policy_number" value={patient?.insurance_policy_number || ''} onChange={handlePatientChange} className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="insurance_group_number" className="form-label flex items-center"><FaShieldAlt className="mr-2" />Insurance Group Number</label>
        <input type="text" id="insurance_group_number" name="insurance_group_number" value={patient?.insurance_group_number || ''} onChange={handlePatientChange} className="form-input" />
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