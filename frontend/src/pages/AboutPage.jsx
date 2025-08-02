import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';


const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await apiClient.get('/api/team/');
        setTeamMembers(res.data);
      } catch (e) {
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-14 px-4">
      <h1 className="text-5xl font-extrabold text-cyan-700 mb-6 text-center tracking-tight drop-shadow-lg">Echo Health Platform</h1>
      <p className="text-xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
        Echo is an innovative health platform leveraging artificial intelligence to deliver personalized medical insights and seamless healthcare access. Our vision is to empower individuals and healthcare professionals with secure, data-driven solutions, fostering a future where technology and medicine work hand-in-hand for better outcomes. We are committed to privacy, accessibility, and excellence in digital health.
      </p>
      <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-10 mt-8 border-2 border-cyan-200/60">
        <h2 className="text-3xl font-bold text-cyan-600 mb-10 text-center tracking-wide">Meet the Team</h2>
        {loading ? (
          <div className="text-center text-cyan-400 animate-pulse">Loading team...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {teamMembers.sort((a, b) => a.name.localeCompare(b.name)).map((member, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white/80 rounded-xl shadow-lg p-7 border-2 border-cyan-100 hover:scale-105 hover:shadow-cyan-200/60 transition-transform duration-200 group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-300 shadow-md mb-4 group-hover:shadow-cyan-400/60 transition-shadow duration-200">
                  <img src={member.image || member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="font-bold text-cyan-700 text-lg mb-1 text-center group-hover:text-cyan-500 transition-colors duration-200">{member.name}</div>
                <div className="text-gray-600 text-sm mb-2 text-center">{member.role}</div>
                {member.linkedin && member.linkedin !== '#' && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline text-xs font-semibold group-hover:text-cyan-800 transition-colors duration-200">LinkedIn</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;