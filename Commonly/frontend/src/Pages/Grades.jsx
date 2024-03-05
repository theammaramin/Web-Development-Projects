import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import 'bootstrap/dist/css/bootstrap.min.css';

const Grades = () => {
  const { userId } = useParams();
  const [grade, setGrade] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch grades data for the specified user
        const response = await axios.get(`http://localhost:8800/api/grades/${userId}`);
        setGrade(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <Navbar2 />
      <div className="container mt-5 d-flex justify-content-center align-items-center">
        <div className="card">
          <div className="card-body text-center">
            <h2 className="mb-4">Grades Information</h2>
            {grade ? (
              <div>
                <p className="card-text">ScoreID: {grade.ScoreID}</p>
                <p className="card-text">UserID: {grade.userID}</p>
                <p className="card-text">Math Grade: {grade.math_grade}</p>
                <p className="card-text">English Grade: {grade.english_grade}</p>
                <p className="card-text">Urdu Grade: {grade.urdu_grade}</p>
                <p className="card-text">Pakistan Studies Grade: {grade.Pak_studies_grade}</p>
                <p className="card-text">Islamiat Grade: {grade.islamiat_grade}</p>
                <p className="card-text">
                  Optional Subject 1: {grade.optional_subject1_name}, Grade: {grade.optional_subject1_grade}
                </p>
                <p className="card-text">
                  Optional Subject 2: {grade.optional_subject2_name}, Grade: {grade.optional_subject2_grade}
                </p>
                <p className="card-text">
                  Optional Subject 3: {grade.optional_subject3_name}, Grade: {grade.optional_subject3_grade}
                </p>
                <p className="card-text">
                  Optional Subject 4: {grade.optional_subject4_name}, Grade: {grade.optional_subject4_grade}
                </p>
              </div>
            ) : (
              <p>Loading grades data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;
