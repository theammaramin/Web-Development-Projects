import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/AddStyles.css';
import Navbar from '../components/Navbar';

const Add = () => {
  const [book, setBooks] = useState({
    Name: "",
    email: "",
    password: "",
    ContactInformation: "",
    type: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBooks(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/user", book);
      console.log(response.data);
      const res = await axios.post('http://localhost:8800/api/getid', book);
      console.log(res.data.id);
      
      if (book.type === "student") {
        navigate(`/uquestion/${res.data.id}`);
      } else {
        navigate(`/cquestion/${res.data.id}`);
      }

    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.error === "Email already exists") {
        setErrorMessage("Email already exists. Please use a different email.");
      } else {
        setErrorMessage("An error occurred while signing up. Please try again later.");
      }
      console.log(err);
    }
  };

  return (
    <div>
      <header><Navbar/></header>
      <div className="container-fluid p-10">
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-md-20">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-5">
                  <h1 className="mb-4 text-center">Sign Up</h1>
                  {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                  <form>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        name="Name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Address"
                        name="email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone Number"
                        name="ContactInformation"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="type"></label>
                      <select
                        id="type"
                        className="form-control"
                        name="type"
                        onChange={handleChange}
                        value={book.type}
                      >
                        <option value="">Signing Up As</option>
                        <option value="student">Applicant</option>
                        <option value="college">College</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      onClick={handleClick}
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
