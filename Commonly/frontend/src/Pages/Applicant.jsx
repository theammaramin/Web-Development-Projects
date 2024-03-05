import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from '../components/Navbar2';

const Applicant = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [applicantData, setApplicantData] = useState(null);
  const [gradesData, setGradesData] = useState(null);
  const [status, setStatus]= useState({
    ReviewStatus:"",
  });

  const handleChange= (e) =>{
    console.log("Target name:", e.target.name);
    console.log("Target value:", e.target.value);
    setStatus((prev)=>({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick= async (e,userId) =>{
    e.preventDefault();
    try{
      console.log(status);
      console.log("UserID: ", userId);
      await axios.put(`http://localhost:8800/reviewstatus/${userId}`, status);


    }catch(err){
      console.log(err);
    }
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch applicant data
        const applicantResponse = await axios.get(`http://localhost:8800/api/status/${userId}`);
        setApplicantData(applicantResponse.data);
        
        // Fetch grades data
        const gradesPromises = applicantResponse.data.map(async (applicant) => {
          const gradesResponse = await axios.get(`http://localhost:8800/api/grades/${applicant.UserId}`);
          return gradesResponse.data;
        });
  
        // Wait for all grades requests to complete
        const allGradesData = await Promise.all(gradesPromises);
  
        setGradesData(allGradesData);
  
        console.log(applicantResponse.data);
        console.log(allGradesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [userId]);

  const handleViewGradesClick = (recordUserId) => {
    // Use the navigate function to go to the desired route
    window.open(`/grades/${recordUserId}`, '_blank')
  };

  const handleViewAnswersClick= (recordUserId)=>{
    console.log({userId},"Is college id")
    window.open(`/viewanswers/${userId}/${recordUserId}`, '_blank')


  }
  

  return (
    <div>
      <header>
        <Navbar2 />
      </header>
      <h2>Applicant Information</h2>
      {applicantData ? (
        Array.isArray(applicantData) ? (
          applicantData.map((record) => (
            <div key={record.StatusID}>
              <p>StatusID: {record.StatusID}</p>
              <p>UserId: {record.UserId}</p>
              <p>SubmissionDate: {record.SubmissionDate}</p>
              <p>ReviewStatus: {record.ReviewStatus}</p>
              <button className="btn btn-primary btn-block" onClick={() => handleViewGradesClick(record.UserId)}>View Grades</button>


              <button className="btn btn-primary btn-block" onClick={() => handleViewAnswersClick(record.UserId)}>View Answers</button>


              <form>
              <div className="mb-3">
                    <label htmlFor="status"></label>
                    <select
                      id="ReviewStatus"
                      className="form-control"
                      name="ReviewStatus" 
                      onChange={handleChange}
                      value={status.ReviewStatus}
                    >
                      <option value="pending">Pending</option>
                      <option value="accept">Accept</option>
                      <option value="reject">Reject</option>


                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={(e) => handleClick(e, record.UserId)}
                  >
                    Change Status
                  </button>
                  </form>


              <hr/>
              
            </div>
          ))
        ) : (
          <div>
            <p>StatusID: {applicantData.StatusID}</p>
            <p>UserId: {applicantData.UserId}</p>
            <p>SubmissionDate: {applicantData.SubmissionDate}</p>
            <p>ReviewStatus: {applicantData.ReviewStatus}</p>
          </div>

          
        )
      ) : (
        <p>Loading applicant data...</p>
      )}

     
    </div>
  );
};

export default Applicant;
