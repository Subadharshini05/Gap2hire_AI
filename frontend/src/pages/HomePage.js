function HomePage({ goToAnalyze }) {
  return (
    <div className="card">
      <h1>Gap2Hire AI</h1>
      <p>Analyze your resume and identify skill gaps</p>

      <button className="primary" onClick={goToAnalyze}>
        Start Resume Analysis
      </button>
    </div>
  );
}

export default HomePage;
