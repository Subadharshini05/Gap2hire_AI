import { useState } from "react";
import { analyzeResume } from "../services/api";

function AnalyzePage({ goHome }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const res = await analyzeResume(text);
      setResult(res.data);
    } catch (err) {
      alert("Backend error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Resume Analysis</h2>

      <textarea
        placeholder="Paste your resume here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />

      <button onClick={handleAnalyze}>
        {loading ? "Analyzing..." : "Run Analysis"}
      </button>

      <button onClick={goHome}>Back to Home</button>

      {result && (
        <div>
          <h3>Strengths</h3>
          <ul>{result.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>

          <h3>Skill Gaps</h3>
          <ul>{result.gaps.map((g, i) => <li key={i}>{g}</li>)}</ul>

          <h3>Suggestions</h3>
          <ul>{result.suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

export default AnalyzePage;
