// components/AnalysisResult.js

function AnalysisResult({ result }) {
  if (!result) return null;

  return (
    <div className="result">
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
  );
}

export default AnalysisResult;
