import React from 'react';

const teamMembers = [
  {
    name: "Nazanin Soleimani",
    role: "Front Developer",
    avatar: "https://ui-avatars.com/api/?name=Nazanin+Soleimani&background=0D8ABC&color=fff",
    linkedin: "https://www.linkedin.com/in/nazanin-soleimani/"
  },
  {
    name: "Kiarash Bashokian",
    role: "Project Owner / Full Stack",
    avatar: "https://ui-avatars.com/api/?name=Kiarash+Bashokian&background=0D8ABC&color=fff",
    linkedin: "#"
  },
  {
    name: "Parsa Meshkini",
    role: "Front Developer",
    avatar: "https://ui-avatars.com/api/?name=Parsa+Meshkini&background=0D8ABC&color=fff",
    linkedin: "#"
  },
  {
    name: "Iman Hashemi",
    role: "Front Developer",
    avatar: "https://ui-avatars.com/api/?name=Iman+Hashemi&background=0D8ABC&color=fff",
    linkedin: "#"
  },
  {
    name: "Arhsia Azimloo",
    role: "Front Developer",
    avatar: "https://ui-avatars.com/api/?name=Arhsia+Azimloo&background=0D8ABC&color=fff",
    linkedin: "#"
  }
];

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-5xl font-extrabold text-primary mb-6 text-center tracking-tight">Echo Health Platform</h1>
      <p className="text-xl text-gray-700 mb-10 text-center max-w-3xl mx-auto">
        Echo is an innovative health platform leveraging artificial intelligence to deliver personalized medical insights and seamless healthcare access. Our vision is to empower individuals and healthcare professionals with secure, data-driven solutions, fostering a future where technology and medicine work hand-in-hand for better outcomes. We are committed to privacy, accessibility, and excellence in digital health.
      </p>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center bg-white rounded-lg shadow p-6 border hover:scale-105 transition-transform">
              <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full border-2 border-primary mb-4" />
              <div className="font-bold text-secondary text-lg mb-1 text-center">{member.name}</div>
              <div className="text-gray-600 text-sm mb-2 text-center">{member.role}</div>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">LinkedIn</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;