// Header.js

import React from 'react';
import './Header.css'; // Import your custom styles

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-logo">
            College Guidance Portal
          </div>
          <div className="header-info">
            <p>Your pathway to success starts here</p>
            <button>Get Started</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
