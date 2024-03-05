// Footer.js

import React from 'react';
import './Footer.css'; // Import your custom styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
        
              <img
                src={require('./logo.jpg')}
                alt="Logo"
                className="logo-image"
              />
           
          <div className="footer-links">
            <ul>
             <li><a href="/">Home</a></li>
             <li><a href="/aboutus">About Us</a></li>
              <li><a href="/login">Log In</a></li>
              <li><a href="/add">Sign Up</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2023 Commonly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
