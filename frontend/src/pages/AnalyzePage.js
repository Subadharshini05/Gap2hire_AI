import { useState } from "react";
import axios from "axios";

const AnalyzePage = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    if (!file) {
      alert("Upload resume PDF");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/resume/analyze",
        formData
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Resume Analysis</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={runAnalysis}>
        {loading ? "Analyzing..." : "Run Analysis"}
      </button>

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
  );
};

export default AnalyzePage;
