import React, { useState } from "react";
import axios from "axios";

const MockInterviewPage = () => {
  const [question] = useState(
    "Describe a time you used AWS or Docker in a project."
  );
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);

  const submitAnswer = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/interview/star-evaluate",
      {
        question,
        answer
      }
    );
    setFeedback(res.data);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", padding: "40px" }}>
      <div
        style={{
          background: "#fff",
          maxWidth: "650px",
          margin: "auto",
          padding: "30px",
          borderRadius: "10px"
        }}
      >
        <h2>Mock Interview – STAR Method</h2>

        <p><strong>Question:</strong></p>
        <p>{question}</p>

        <textarea
          rows="5"
          style={{ width: "100%" }}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here"
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
          </>
        )}
      </div>
    </div>
  );
};

export default MockInterviewPage;
