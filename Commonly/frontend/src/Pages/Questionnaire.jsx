import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Questionnaire = () => {
  const { userId } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const collegeIds = queryParams.getAll('collegeIds');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/questions`, {
          params: { collegeIds: collegeIds.join(',') },
        });
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [collegeIds]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      for (const question of questions) {
        const answerText = answers[question.QuestionID];
        await axios.post('http://localhost:8800/api/answers', {
          UserId: userId,
          QuestionID: question.QuestionID,
          AnswerText: answerText,
          CollegeID: question.CollegeID,
        });
      }
      console.log('Answers submitted successfully!');
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };
    
  return (
    <div>
      <h1>Questionnaire</h1>
      <p>College IDs: {collegeIds.join(', ')}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {questions.map(question => (
            <div key={question.QuestionID}>
              <p>Question ID: {question.QuestionID}</p>
              <p>Question Text: {question.QuestionText}</p>
              <input
                type="text"
                value={answers[question.QuestionID] || ''}
                onChange={e => handleAnswerChange(question.QuestionID, e.target.value)}
              />
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
