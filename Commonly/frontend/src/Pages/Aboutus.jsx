
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Aboutus.css'; // Import your custom styles
import Navbar from '../components/Navbar';

const Aboutus = () => {
  return (
    <div>
      <Navbar/>
      <div className="container-fluid  py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1 className="display-4 aboutus-title mb-4">Welcome to Commonly</h1>
            <p className="lead aboutus-text mb-4">
              Where simplicity meets opportunity in the realm of A-level education!
            </p>
            <p className="aboutus-text">
              We understand the challenges that aspiring students face when applying to multiple colleges for their A-level studies. Commonly streamlines this process by providing a user-friendly application portal that allows you to apply to multiple A-level colleges with just a single application. Our mission is to empower students on their academic journey, making the application process efficient and stress-free. With Commonly, you can explore various educational institutions, submit your applications seamlessly, and open doors to a world of possibilities. Join us in revolutionizing the A-level application experience, as we believe that every student deserves a straightforward and accessible path to their educational aspirations. Welcome to Commonly, where your academic future begins with simplicity and ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
