import React, { useEffect, useState } from "react";
import axios from "axios";

const MockInterviewPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);

  // TEMP: gaps (later will come from analysis screen)
  const gaps = [
    "Hands-on project experience",
    "CI/CD pipeline knowledge"
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.post(
        "http://localhost:5000/api/interview/generate-questions",
        { gaps }
      );
      setQuestions(res.data.questions);
    };

    fetchQuestions();
  }, []);

  const submitAnswer = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/interview/star-evaluate",
      {
        question: questions[currentIndex],
        answer
      }
    );
    setFeedback(res.data);
  };

  if (questions.length === 0) {
    return <p style={{ color: "white" }}>Loading questions...</p>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#000", padding: "40px" }}>
      <div style={{
        background: "#fff",
        maxWidth: "650px",
        margin: "auto",
        padding: "30px",
        borderRadius: "10px"
      }}>
        <h2>Mock Interview – STAR Method</h2>

        <p><strong>Question {currentIndex + 1}:</strong></p>
        <p>{questions[currentIndex]}</p>

        <textarea
          rows="5"
          style={{ width: "100%" }}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer"
        />

        <br /><br />
        <button onClick={submitAnswer}>Submit Answer</button>

        {feedback && (
          <>
            <h3>STAR Feedback</h3>
            <p><b>Situation:</b> {feedback.situation}</p>
            <p><b>Task:</b> {feedback.task}</p>
            <p><b>Action:</b> {feedback.action}</p>
            <p><b>Result:</b> {feedback.result}</p>
            <p><b>Overall:</b> {feedback.overallFeedback}</p>

            {currentIndex < questions.length - 1 && (
              <button
                onClick={() => {
                  setCurrentIndex(currentIndex + 1);
                  setAnswer("");
                  setFeedback(null);
                }}
              >
                Next Question
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MockInterviewPage;
