import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: '2rem', minHeight: '80vh' }}>
        <h1>Welcome to Echo</h1>
        <p>Your personal AI health companion.</p>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;