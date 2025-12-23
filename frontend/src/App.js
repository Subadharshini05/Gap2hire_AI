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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "I have experience in AWS and Docker",
      }),
    });

    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Gap2Hire</h1>
      <p>From Skill Gaps to Get Hired</p>

      <button onClick={analyzeResume}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {result && (
        <div className="card">
          <h3>✅ Strengths</h3>
          <ul>
            {result.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h3>⚠️ Skill Gaps</h3>
          <ul>
            {result.gaps.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>

          <h3>🚀 Suggestions</h3>
          <ul>
            {result.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;