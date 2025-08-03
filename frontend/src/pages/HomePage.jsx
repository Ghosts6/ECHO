import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaNotesMedical, FaUserMd, FaCalendarAlt } from 'react-icons/fa';
import '../index.css';

const features = [
  {
    icon: <FaNotesMedical className="text-5xl text-accent mx-auto mb-4" />,
    title: 'Intelligent Symptom Analysis',
    description:
      'Describe your symptoms and let our AI, Aegis, provide you with a personalized health overview.',
  },
  {
    icon: <FaUserMd className="text-5xl text-accent mx-auto mb-4" />,
    title: 'Find Nearby Healthcare',
    description:
      'Aegis can help you locate the best doctors, clinics, and hospitals near you.',
  },
  {
    icon: <FaCalendarAlt className="text-5xl text-accent mx-auto mb-4" />,
    title: 'Seamless Scheduling',
    description:
      'Let Aegis book your appointments for you, integrating directly with your calendar.',
  },
];

const HomePage = () => {
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setTyped(true), 800); // match typing duration
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative min-h-screen w-full text-neutral font-sans overflow-x-hidden">
      {/* Hero Section with full-screen background video and modern look */}
      <section className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
        {/* Background Video only for hero, with circular corners */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 filter blur-md brightness-75 rounded-b-[5rem] transition-all duration-700"
          style={{ pointerEvents: 'none' }}
        >
          <source src="/img/Background-Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Hero Content - minimal modern font, typewriter and fade-in animation */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full text-center px-4 pb-16 pt-24">
          <h1
            className={`typewriter${typed ? ' typed' : ''} overflow-hidden whitespace-nowrap text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 font-sans text-accent transition-all duration-700`}
            style={{
              letterSpacing: '-0.04em',
              fontFamily:
                "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
              background: 'none',
            }}
          >
            Welcome to Echo
          </h1>
          <p
            className="fade-in-up text-xl sm:text-2xl md:text-3xl mb-10 font-medium text-white/90 font-sans transition-all duration-700"
            style={{
              fontFamily:
                "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
            }}
          >
            Your Personal AI Health Companion.
          </p>
          <Link
            to="/aegis"
            className="btn text-lg sm:text-xl px-8 py-4 rounded-full font-semibold shadow-xl bg-accent hover:bg-cyan-400 transition-all duration-300 border-2 border-white/20"
            style={{
              boxShadow: '0 4px 32px 0 rgba(0,220,255,0.15)',
              fontFamily:
                "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
            }}
          >
            Analyze Your Symptoms with Aegis
          </Link>
        </div>
      </section>

      {/* Features Section: full width, solid background, no video behind */}
      <section className="w-full mt-32 fade-down flex justify-center">
        <div className="w-full max-w-7xl bg-primary bg-opacity-90 rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-accent font-sans tracking-tight">
            Key Features
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flip-card w-full h-64 group"
              >
                <div className="flip-card-inner w-full h-full">
                  {/* Front Side */}
                  <div className="flip-card-front bg-secondary bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg flex flex-col justify-center items-center h-full font-sans relative overflow-hidden border border-solid border-accent/20">
                    {/* Light effect on hover */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute -top-1/4 left-1/2 w-2/3 h-1/2 bg-gradient-to-br from-cyan-200/40 to-transparent rounded-full blur-2xl -translate-x-1/2" />
                    </div>
                    {feature.icon}
                    <h3 className="text-2xl font-bold mb-2 font-sans">
                      {feature.title}
                    </h3>
                  </div>
                  {/* Back Side */}
                  <div className="flip-card-back bg-secondary bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg flex flex-col justify-center items-center h-full font-sans relative overflow-hidden border border-solid border-accent/20">
                    {/* Light effect on hover */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute -top-1/4 left-1/2 w-2/3 h-1/2 bg-gradient-to-br from-cyan-200/40 to-transparent rounded-full blur-2xl -translate-x-1/2" />
                    </div>
                    <p className="text-base">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;