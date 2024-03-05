import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from '../components/Navbar2'

const Cdashboard = () => {
  const navigate= useNavigate();
  const { userId } = useParams();
 
 
  console.log("Id is:", { userId })
  const [userData, setUserData] = useState(null);
  const [collegeData,setCollegeData]= useState(null); 

  const currentDate = new Date();
 // Get the components of the date (year, month, day)
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Format the date as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${day}`;


  //  fetching user data 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleClick= async (e) =>{
    e.preventDefault();
    const response = await axios.get(`http://localhost:8800/api/college/${userId}`);
    console.log(response.data.id);
    // navigate(`/collegeform/${response.data.id}`);
    window.open(`/collegeform/${response.data.id}`, '_blank')
  
  }

  const handleApplicants= async (e)=>{
    e.preventDefault();
    const response = await axios.get(`http://localhost:8800/api/college/${userId}`);
    console.log(response.data.id);
    navigate(`/applicant/${response.data.id}`);

    

  }




  return (
   
<div>
  <header><Navbar2/></header>
      <h1>Welcome to Your  College Dashboard</h1>
      {userData ? (
        <div>
          <p>User ID: {userData.id}</p>
          
          <p>Email: {userData.email}</p>

        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={handleClick}>Create Admission Form</button>

      <button onClick={handleApplicants}>View Applicants</button>

    </div>
  )
}

export default Cdashboard
