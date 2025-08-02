import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import ErrorImage from '../img/Error_background.jpg';

const ErrorPage = ({ code = 404, message = "Page Not Found" }) => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${ErrorImage})` }}
    >
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" />
      <div
        className="relative z-10 flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl border-2 border-teal-300/50 shadow-2xl shadow-teal-400/30 bg-gray-800/40 backdrop-blur-xl max-w-2xl mx-4 transition-shadow duration-300 hover:shadow-teal-300/40"
        style={{ boxShadow: '0 8px 32px 0 rgba(0, 255, 255, 0.15)' }}
      >
        <FaExclamationTriangle className="text-teal-400 text-5xl sm:text-6xl mb-4 animate-pulse" />
        <h1 className="text-4xl sm:text-5xl font-bold text-teal-200 drop-shadow-lg mb-2">{code}</h1>
        <p className="text-lg sm:text-xl text-teal-100 mb-6 font-medium text-center">{message}</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 rounded-lg bg-teal-500/90 text-white font-bold text-lg shadow-lg shadow-teal-400/40 border border-teal-300/60 hover:bg-teal-400/90 hover:scale-105 active:scale-95 active:bg-teal-600/90 transition-all duration-300 ease-in-out backdrop-blur-md transform focus:outline-none focus:ring-2 focus:ring-teal-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

