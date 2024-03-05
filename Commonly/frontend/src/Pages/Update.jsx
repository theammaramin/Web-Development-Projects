import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './styles/UpdateStyles.css';
import Navbar from '../components/Navbar'

const Update = () => {
  const [book, setBooks]= useState({
    Name: "",
    email: "",
  });

  const [error,setError] = useState(false);
  const location = useLocation();
  const navigate= useNavigate();
  const bookId = location.pathname.split("/")[2];
  const handleChange= (e) =>{
    console.log("Target name:", e.target.name);
    console.log("Target value:", e.target.value);
    setBooks((prev)=>({...prev, [e.target.name]: e.target.value}))
  };
  const handleClick= async (e) =>{
    e.preventDefault();
    try{
      console.log(book);
      await axios.put(`http://localhost:8800/user/${bookId}`, book);
      
      // navigate("/");

    }catch(err){
      console.log(err);
    }


  }
 return (
 <div>
  <header><Navbar/></header>
  <div className="container-fluid p-5" >
     
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-20">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <h1 className="mb-4 text-center">Update Record</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="Name"
                      placeholder="Enter name"
                      value={book.Name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter email"
                      value={book.email}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleClick}
                  >
                    Update Record
                  </button>
                  {error && (
                    <p className="text-danger mt-3">
                      Error updating the record.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Update
