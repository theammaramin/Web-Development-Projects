// HeroSection.js

import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css'; // Import your custom styles

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Commonly</h1>
        <p>Your pathway to success starts here</p>
        <Link to="/add">
          <button>Get Started</button>
        </Link>
       
      </div>
    </div>
  );
};

export default HeroSection;
