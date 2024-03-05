import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';

const Dashboard = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

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

  const [colleges, setColleges] = useState([]);
  useEffect(() => {
    const fetchAllColleges = async () => {
      try {
        const res = await axios.get("http://localhost:8800/college");
        setColleges(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllColleges();
  }, []);

  const [deleteCollegeIds, setDeleteCollegeIds] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);

  const navigate = useNavigate();

  const handleCheckboxChange = (collegeId) => {
    setSelectedColleges((prevSelectedColleges) => {
      if (prevSelectedColleges.includes(collegeId)) {
        return prevSelectedColleges.filter((id) => id !== collegeId);
      } else {
        return [...prevSelectedColleges, collegeId];
      }
    });
  };

  const handleDelete = async (collegeId) => {
    try {
      await axios.delete(`http://localhost:8800/api/withdraw?collegeId=${collegeId}&userId=${userId}`);
      setDeleteCollegeIds((prevDeleteCollegeIds) => [...prevDeleteCollegeIds, collegeId]);
      setDeleteCollegeIds((prevDeleteCollegeIds) => prevDeleteCollegeIds.filter(id => id !== collegeId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleApplyAll = async () => {
    try {
      const appliedCollegeIds = [];

      const applyAllPromises = selectedColleges.map(async (collegeId) => {
        const applicationData = {
          uid: userId,
          cid: collegeId,
          sdate: formattedDate,
          status: 'pending',
        };

        await axios.post('http://localhost:8800/api/apply', applicationData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        appliedCollegeIds.push(collegeId);
      });

      await Promise.all(applyAllPromises);
      setSelectedColleges([]);

      // Construct the URL with userId and appliedCollegeIds as query parameters
      const queryParams = appliedCollegeIds.join(',');
      const url = `/questionnaire/${userId}?collegeIds=${queryParams}`;

      // Navigate to the questionnaire page with query parameters
      navigate(url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar2 />
      <div className="container mt-5">
        <h1 className="text-center">Welcome to Your Dashboard</h1>
        {userData ? (
          <div className="user-info card p-4 mb-4">
            <p className="lead">User ID: {userData.id}</p>
            <p className="lead">Email: {userData.email}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
  
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((college) => (
              <tr key={college.id}>
                <td>{college.id}</td>
                <td>{college.name}</td>
                <td>
                  {deleteCollegeIds.includes(college.id) ? (
                    <button className="btn btn-danger" onClick={() => handleDelete(college.id)}>
                      Withdraw
                    </button>
                  ) : (
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input custom-checkbox"
                        type="checkbox"
                        onChange={() => handleCheckboxChange(college.id)}
                        checked={selectedColleges.includes(college.id)}
                        style={{ width: '20px', height: '20px' }}
                      />
                      <label className="form-check-label">Apply</label>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {selectedColleges.length > 0 && (
          <button className="btn btn-success col-12" onClick={handleApplyAll}>
            Apply to Selected Colleges
          </button>
        )}
      </div>
    </div>
  );
  
};

export default Dashboard;
