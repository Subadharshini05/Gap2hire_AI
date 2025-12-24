import React, { useState } from "react";
import axios from "axios";

const AnalyzePage = () => {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    const res = await axios.post(
      "http://localhost:5000/api/resume/analyze",
      { resumeText }
    );
    setResult(res.data);
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", padding: "40px" }}>
      <div style={{
        background: "#fff",
        maxWidth: "600px",
        margin: "auto",
        padding: "30px",
        borderRadius: "10px"
      }}>
        <h2>Resume Analysis</h2>

        <textarea
          rows="5"
          style={{ width: "100%" }}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste resume or skills (eg: aws, docker)"
        />

        <br /><br />
        <button onClick={runAnalysis}>Run Analysis</button>

        {loading && <p>Analyzing intelligently...</p>}

        {result && (
          <>
            <h3>Strengths</h3>
            <ul>
              {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>

            <h3>Skill Gaps</h3>
            <ul>
              {result.gaps.map((g, i) => <li key={i}>{g}</li>)}
            </ul>

            <h3>Suggestions</h3>
            <ul>
              {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyzePage;
