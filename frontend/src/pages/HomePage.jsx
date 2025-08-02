import React from 'react';
import { Link } from 'react-router-dom';
import { FaNotesMedical, FaUserMd, FaCalendarAlt } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-neutral p-4 sm:p-6 md:p-8">
      {/* Hero Section */}
      <section className="text-center w-full max-w-4xl mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-accent">
          Welcome to Echo
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-neutral">
          Your Personal AI Health Companion.
        </p>
        <Link to="/aegis" className="btn text-lg sm:text-xl">
          Analyze Your Symptoms with Aegis
        </Link>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-accent">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-secondary p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <FaNotesMedical className="text-5xl text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Intelligent Symptom Analysis</h3>
            <p>
              Describe your symptoms and let our AI, Aegis, provide you with a personalized health overview.
            </p>
          </div>
          <div className="bg-secondary p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <FaUserMd className="text-5xl text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Find Nearby Healthcare</h3>
            <p>
              Aegis can help you locate the best doctors, clinics, and hospitals near you.
            </p>
          </div>
          <div className="bg-secondary p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <FaCalendarAlt className="text-5xl text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Seamless Scheduling</h3>
            <p>
              Let Aegis book your appointments for you, integrating directly with your calendar.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;