import React, { useEffect, useState } from "react";
import axios from "axios";

const MockInterviewPage = () => {
  const [gaps, setGaps] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [rewrite, setRewrite] = useState("");

  // 🔥 Load gaps ONCE (stable)
  useEffect(() => {
    const storedGaps = JSON.parse(localStorage.getItem("gaps")) || [];
    setGaps(storedGaps);
  }, []);

  // 🔥 Generate questions when gaps are ready
  useEffect(() => {
    if (gaps.length === 0) return;

    const fetchQuestions = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/interview/generate-questions",
          { gaps }
        );
        setQuestions(res.data.questions);
      } catch {
        setQuestions([
          "Explain a challenging project you worked on.",
          "How do you handle real-world deployments?"
        ]);
      }
    };

    fetchQuestions();
  }, [gaps]); // ✅ WARNING FIXED

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

  const rewriteAnswer = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/interview/star-rewrite",
      {
        question: questions[currentIndex],
        answer
      }
    );
    setRewrite(res.data.rewrittenAnswer);
  };

  if (questions.length === 0) {
    return <p style={{ color: "white" }}>Loading interview...</p>;
  }

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
        <button onClick={submitAnswer}>Submit</button>{" "}
        <button onClick={rewriteAnswer}>Rewrite using STAR</button>

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

        {rewrite && (
          <>
            <h3>Improved Answer</h3>
            <p>{rewrite}</p>
          </>
        )}

        {feedback && currentIndex < questions.length - 1 && (
          <button
            onClick={() => {
              setCurrentIndex(currentIndex + 1);
              setAnswer("");
              setFeedback(null);
              setRewrite("");
            }}
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default MockInterviewPage;
