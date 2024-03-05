import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewAnswers = () => {
  const { userId, recordUserId } = useParams();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Define the API endpoint URL


    // Fetch data from the API endpoint
    axios.get(`http://localhost:8800/api/answers?CollegeID=${userId}&UserID=${recordUserId}`)
      .then(response => {
        // Update the state with the fetched data
        setAnswers(response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  }, [userId, recordUserId]);

  return (
    <div>
      <h2>Form Answers</h2>
      {/* Render the answers */}
      <table>
        <thead>
          <tr>
            <th>Answer ID</th>
            <th>User ID</th>
            <th>Question ID</th>
            <th>Answer Text</th>
            <th>College ID</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer, index) => (
            <tr key={index}>
              <td>{answer.AnswerID}</td>
              <td>{answer.UserId}</td>
              <td>{answer.QuestionID}</td>
              <td>{answer.AnswerText}</td>
              <td>{answer.CollegeID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAnswers;