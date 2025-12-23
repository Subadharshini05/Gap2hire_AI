import { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    setLoading(true);

    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: "Sample resume text"
      })
    });

    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="app">
      <h1 className="title">Gap2Hire</h1>
      <p className="tagline">From Skill Gaps to Get Hired</p>

      <div className="card">
        <h2>Interview Practice</h2>

        <button onClick={analyzeResume} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {result && (
          <div className="result">
            <h3>✅ Strengths</h3>
            <ul>
              {result.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3>⚠ Skill Gaps</h3>
            <ul>
              {result.gaps.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3>🚀 Suggestions</h3>
            <ul>
              {result.suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;