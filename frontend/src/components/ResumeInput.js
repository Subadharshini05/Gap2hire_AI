// components/ResumeInput.js

function ResumeInput({ resume, setResume, onAnalyze, loading }) {
  return (
    <>
      <textarea
        rows="6"
        placeholder="Paste your resume here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <button onClick={onAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Run Analysis"}
      </button>
    </>
  );
}

export default ResumeInput;
