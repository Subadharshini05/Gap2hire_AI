import "./App.css";

function App() {
  return (
    <div className="container">
      <h1 className="title">Gap2Hire</h1>
      <p className="tagline">From Skill Gaps to Get Hired</p>

      <div className="card">
        <h2 className="section-title">Resume Analysis</h2>

        <div className="score">
          Match Score: <span>72%</span>
        </div>

        <div className="section">
          <h3>Missing Skills</h3>
          <ul>
            <li>AWS</li>
            <li>Docker</li>
          </ul>
        </div>

        <div className="section">
          <h3>Resume Feedback</h3>
          <ul>
            <li>Projects lack deployment details</li>
            <li>Cloud skills are not mentioned</li>
          </ul>
        </div>

        <button>Practice Interview Questions</button>
      </div>
    </div>
  );
}

export default App;
