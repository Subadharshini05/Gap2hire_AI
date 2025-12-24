import React, { useState } from "react";
import axios from "axios";

const AnalyzePage = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    const res = await axios.post(
      "http://localhost:5000/api/resume/analyze",
      { resumeText, jobDescription }
    );
    setResult(res.data);
    setLoading(false);
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
        <h2>Resume Analysis</h2>

        <textarea
          rows="5"
          style={{ width: "100%" }}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste Resume or Skills"
        />

        <br /><br />

        <textarea
          rows="5"
          style={{ width: "100%" }}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste Job Description"
        />

        <br /><br />

        <button onClick={runAnalysis}>Run Analysis</button>
        &nbsp;&nbsp;
        <a href="/mock-interview">
          <button>Practice Mock Interview</button>
        </a>

        {loading && <p>Analyzing against JD...</p>}

        {result && (
          <>
            <h3>Match Score</h3>
            <p><strong>{result.matchScore}%</strong></p>

            <h3>Strengths</h3>
            <ul>
              {result.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <h3>Skill Gaps</h3>
            <ul>
              {result.gaps.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>

            <h3>ATS Missing Keywords</h3>
            <ul>
              {result.atsMissing.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>

            <h3>Summary</h3>
            <p>{result.summary}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyzePage;
