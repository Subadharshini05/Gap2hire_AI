import "./App.css";

function App() {
  return (
    <div className="container">
      <h1 className="title">Gap2Hire</h1>
      <p className="tagline">From Skill Gaps to Get Hired</p>

      <div className="card">
        <h2 className="section-title">Interview Practice</h2>

        <div className="section">
          <span className="skill-tag">AWS</span>
          <p>How would you deploy a MERN application on AWS?</p>
        </div>

        <div className="section">
          <span className="skill-tag">Docker</span>
          <p>What problem does Docker solve in application deployment?</p>
        </div>

        <div className="section">
          <span className="skill-tag">System Design</span>
          <p>How would you scale a web application for a large number of users?</p>
        </div>

        <button>Back to Analysis</button>
      </div>
    </div>
  );
}

export default App;