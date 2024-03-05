import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar'

const Cquestion = () => {
    const { userId } = useParams();
    console.log("Id is:", { userId });

    const [book, setBooks]= useState({
        userid: userId,
        name:"",
        area:"",
        nA:"",
        nB:"",
        nC:"",
        nD:"",
        nE:"",
      });

      const navigate= useNavigate();
  const handleChange= (e) =>{
    console.log("Target name:", e.target.name);
    console.log("Target value:", e.target.value);
    setBooks((prev)=>({...prev, [e.target.name]: e.target.value}));
  };


  const handleClick= async (e) =>{
    e.preventDefault();
    try{
      console.log(book);
      await axios.post("http://localhost:8800/college",book);
      navigate(`/login`);

    }catch(err){
      console.log(err);
    }
  }


  return (
    <div>
      <header><Navbar/></header>
    <div className="container-fluid p-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-20">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-5">
              <h1 className="mb-4 text-center">Add New College</h1>
              <form>
              <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="College Name"
                      name="name"
                      onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="College Area"
                      name="area"
                      onChange={handleChange}
                    />
                  </div>
                  <div><h3>Grade Requirements</h3></div>
                  <div className="mb-3">
                    <label htmlFor="grades"></label>
                    <select
                      id="A"
                      className="form-control"
                      name="nA"
                      onChange={handleChange}
                      value={book.nA}
                    >
                      <option value="">Number of A</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>

                    </select>
                  </div>



                  <div className="mb-3">
                    <label htmlFor="grades"></label>
                    <select
                      id="B"
                      className="form-control"
                      name="nB"
                      onChange={handleChange}
                      value={book.nB}
                    >
                      <option value="">Number of B</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>

                    </select>
                  </div>




                  <div className="mb-3">
                    <label htmlFor="grades"></label>
                    <select
                      id="C"
                      className="form-control"
                      name="nC"
                      onChange={handleChange}
                      value={book.nC}
                    >
                      <option value="">Number of C</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>

                    </select>
                  </div>






                  <div className="mb-3">
                    <label htmlFor="grades"></label>
                    <select
                      id="D"
                      className="form-control"
                      name="nD"
                      onChange={handleChange}
                      value={book.nD}
                    >
                      <option value="">Number of D</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>

                    </select>
                  </div>


                  <div className="mb-3">
                    <label htmlFor="grades"></label>
                    <select
                      id="E"
                      className="form-control"
                      name="nE"
                      onChange={handleChange}
                      value={book.nE}
                    >
                      <option value="">Number of E</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>

                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleClick}
                  >
                    Add College
                  </button>
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

export default Cquestion
